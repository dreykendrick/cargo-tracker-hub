import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
        .maybeSingle();

      if (data) {
        setNews(data);
      }
      setLoading(false);
    };

    fetchNews();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const estimateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-8 py-32 text-center">
          <h1 className="mb-4 text-4xl font-black">Article Not Found</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The news article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const readTime = estimateReadTime((news.excerpt || "") + (news.content || ""));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Image */}
      {news.image_url && (
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <img
            src={news.image_url}
            alt={news.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
      )}

      <article className={`container mx-auto max-w-3xl px-8 ${news.image_url ? "-mt-32 relative z-10" : "pt-32"}`}>
        {/* Back Button */}
        <Link to="/#news">
          <Button
            variant="ghost"
            size="sm"
            className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Meta Info */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={news.date}>
                {new Date(news.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {news.title}
          </h1>

          {/* Excerpt as Lead */}
          <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {news.excerpt}
          </p>
        </header>

        <Separator className="mb-12" />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {news.content ? (
            <div className="whitespace-pre-wrap text-lg leading-[1.8] text-foreground">
              {news.content}
            </div>
          ) : (
            <p className="text-lg leading-[1.8] text-foreground">
              {news.excerpt}
            </p>
          )}
        </div>

        {/* Share Section */}
        <div className="mt-16 mb-20">
          <Separator className="mb-8" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Published on {new Date(news.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-full"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NewsDetail;
