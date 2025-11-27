import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image_url: string | null;
}

export const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false })
        .limit(3);
      
      if (data) {
        setNews(data);
      }
    };

    fetchNews();
  }, []);
  return (
    <section id="news" className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black md:text-5xl">Latest News & Updates</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Stay informed with the latest from HQ Logistics
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <div
              key={article.id}
              className="overflow-hidden rounded-3xl bg-muted transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-56 w-full object-cover"
                />
              )}
              <div className="p-6">
                <div className="mb-2 text-sm font-semibold text-primary">
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <h3 className="mb-3 text-xl font-bold">{article.title}</h3>
                <p className="mb-4 leading-relaxed text-muted-foreground">{article.excerpt}</p>
                <Link
                  to={`/news/${article.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
