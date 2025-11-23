import { ArrowRight } from "lucide-react";

const news = [
  {
    date: "November 15, 2025",
    title: "New Digital Tracking System Launched",
    excerpt:
      "We're excited to announce the launch of our enhanced real-time tracking system for shipments.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80",
  },
  {
    date: "November 10, 2025",
    title: "Expanding Our Fleet for Better Service",
    excerpt:
      "HQ Logistics invests in 20 new trucks to enhance delivery capacity across Tanzania.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
  },
  {
    date: "November 5, 2025",
    title: "Partnership with Major Shipping Lines",
    excerpt:
      "New strategic partnerships for competitive rates and faster processing times.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
  },
];

export const NewsSection = () => {
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
          {news.map((article, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl bg-muted transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <div className="mb-2 text-sm font-semibold text-primary">{article.date}</div>
                <h3 className="mb-3 text-xl font-bold">{article.title}</h3>
                <p className="mb-4 leading-relaxed text-muted-foreground">{article.excerpt}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
