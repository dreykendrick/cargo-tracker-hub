import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  id: string;
  type: string;
  title: string;
  content: string;
  icon_name: string;
  display_order: number;
}

const AdminContact = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    content: "",
    icon_name: "",
    display_order: 0,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/portal");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchContacts();
    }
  }, [user, isAdmin]);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .order("display_order");

    if (error) {
      toast({ title: "Error", description: "Failed to fetch contact info", variant: "destructive" });
    } else {
      setContacts(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("contact_info")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error", description: "Failed to update contact info", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Contact info updated successfully" });
        fetchContacts();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("contact_info").insert(formData);

      if (error) {
        toast({ title: "Error", description: "Failed to add contact info", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Contact info added successfully" });
        fetchContacts();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact info?")) return;

    const { error } = await supabase.from("contact_info").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete contact info", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Contact info deleted successfully" });
      fetchContacts();
    }
  };

  const handleEdit = (contact: ContactInfo) => {
    setEditingId(contact.id);
    setFormData({
      type: contact.type,
      title: contact.title,
      content: contact.content,
      icon_name: contact.icon_name,
      display_order: contact.display_order,
    });
    setOpen(true);
  };

  const resetForm = () => {
    setFormData({
      type: "",
      title: "",
      content: "",
      icon_name: "",
      display_order: 0,
    });
    setEditingId(null);
    setOpen(false);
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/portal")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-black">Manage Contact Info</h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Contact Info" : "Add New Contact Info"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Type (e.g., phone, email, address)"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                />
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="Content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
                <Input
                  placeholder="Icon Name (lucide-react)"
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  placeholder="Display Order"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingId ? "Update" : "Add"} Contact Info
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {contact.title}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(contact)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(contact.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-1">{contact.type}</p>
                <p className="text-sm">{contact.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
