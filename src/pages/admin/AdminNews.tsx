import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image_url: string | null;
}

const AdminNews = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    date: new Date().toISOString().split("T")[0],
    image_url: "",
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/portal");
      toast.error("Access denied. Admin privileges required.");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchNews();
    }
  }, [user, isAdmin]);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error("Failed to load news");
    } else {
      setNews(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      const { error } = await supabase
        .from("news")
        .update(formData)
        .eq("id", editingItem.id);

      if (error) {
        toast.error("Failed to update news");
      } else {
        toast.success("News updated successfully");
        fetchNews();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("news")
        .insert([formData]);

      if (error) {
        toast.error("Failed to create news");
      } else {
        toast.success("News created successfully");
        fetchNews();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete news");
    } else {
      toast.success("News deleted successfully");
      fetchNews();
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      date: item.date,
      image_url: item.image_url || "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      date: new Date().toISOString().split("T")[0],
      image_url: "",
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  if (loading || !user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/portal">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portal
              </Button>
            </Link>
            <h1 className="text-2xl font-black">Manage News</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add News
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit News" : "Add News"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    maxLength={200}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                    maxLength={500}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL (Optional)</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    maxLength={500}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingItem ? "Update" : "Create"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12">
        <div className="grid gap-4">
          {news.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No news items yet. Click "Add News" to create one.
              </CardContent>
            </Card>
          ) : (
            news.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-2">{item.excerpt}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminNews;