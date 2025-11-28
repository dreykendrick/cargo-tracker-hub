import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  date: string;
  image_url: string | null;
}

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setNews(data);
      }
      setLoading(false);
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-8 py-20 text-center">
          <h1 className="mb-4 text-3xl font-black">News Not Found</h1>
          <p className="mb-8 text-muted-foreground">The news article you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto max-w-4xl px-8 py-20">
        <div className="mb-6 text-sm font-semibold text-primary">
          {new Date(news.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>

        <h1 className="mb-8 text-4xl font-black md:text-5xl">{news.title}</h1>

        {news.image_url && (
          <img
            src={news.image_url}
            alt={news.title}
            className="mb-8 w-full rounded-3xl object-cover"
            style={{ maxHeight: '500px' }}
          />
        )}

        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-xl leading-relaxed text-muted-foreground">{news.excerpt}</p>
          {news.content && (
            <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground">
              {news.content}
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NewsDetail;
