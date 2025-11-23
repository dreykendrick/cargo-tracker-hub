import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed left-1/2 z-50 w-[calc(100%-40px)] max-w-[1400px] -translate-x-1/2 transition-all duration-400 ${
        isScrolled ? "top-2.5" : "top-5"
      }`}
    >
      <div
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl transition-all"
        style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="text-2xl font-bold text-white drop-shadow-lg">
            HQ LOGISTICS
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-semibold text-white/95 transition-colors hover:text-primary drop-shadow-md"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                size="sm"
                className="gap-2 rounded-full bg-primary font-semibold shadow-lg hover:bg-primary-accent"
              >
                <UserCircle className="h-4 w-4" />
                Client Portal
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white"
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
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-white/95 transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  size="sm"
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
