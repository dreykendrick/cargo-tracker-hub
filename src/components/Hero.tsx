import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Phone } from "lucide-react";
import heroPort from "@/assets/hero-port.jpg";
import heroTransport from "@/assets/hero-transport.jpg";
import heroWarehouse from "@/assets/hero-warehouse.jpg";

const slides = [
  { id: 1, image: heroPort, alt: "Port Operations" },
  { id: 2, image: heroTransport, alt: "Cargo Transport" },
  { id: 3, image: heroWarehouse, alt: "Warehouse Facility" },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-black leading-tight text-white md:text-7xl">
            A Partner You Can Trust
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl max-w-3xl mx-auto">
            Fast, secure, and efficient cargo transport from Dar es Salaam port to dry
            port. Real-time tracking and professional handling for your peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 rounded-xl bg-primary text-base font-semibold shadow-2xl hover:bg-primary-accent"
              onClick={() => document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Search className="h-5 w-5" />
              Track Cargo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-xl border-white/30 bg-white/10 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Phone className="h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide
                ? "w-10 bg-white"
                : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
