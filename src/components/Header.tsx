import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/image/image8.png");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      // Navigate to home page first, then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchLogo = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "logo_url")
        .maybeSingle();

      if (data?.value) {
        setLogoUrl(data.value);
      }
    };

    fetchLogo();
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#tracking", label: "Track Cargo" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Our Team" },
    { href: "#news", label: "News" },
    { href: "#jobs", label: "Careers" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed left-1/2 z-50 w-[calc(100%-24px)] sm:w-[calc(100%-40px)] max-w-[1400px] -translate-x-1/2 transition-all duration-400 ${
        isScrolled ? "top-2" : "top-3 sm:top-5"
      }`}
    >
      <div
        className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl transition-all"
        style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
      >
        <nav className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* LOGO */}
          <div className="logo">
            <img
              src={logoUrl}
              alt="HQ Logistics"
              className="h-8 sm:h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-semibold text-white/95 transition-colors hover:text-primary drop-shadow-md"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Button
                size="sm"
                onClick={() => navigate("/auth")}
                className="gap-2 rounded-full bg-primary font-semibold shadow-lg hover:bg-primary-accent"
              >
                <UserCircle className="h-4 w-4" />
                Client Portal
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl rounded-b-3xl">
            <ul className="flex flex-col gap-4 p-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      handleNavClick(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-semibold text-white/95 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Button
                  size="sm"
                  onClick={() => {
                    navigate("/auth");
                    setIsMobileMenuOpen(false);
                  }}
                  className="gap-2 rounded-full bg-primary font-semibold shadow-lg hover:bg-primary-accent w-full"
                >
                  <UserCircle className="h-4 w-4" />
                  Client Portal
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
