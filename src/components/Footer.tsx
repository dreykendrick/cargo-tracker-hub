import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "Track Cargo", href: "#tracking" },
    { label: "Services", href: "#services" },
    { label: "Careers", href: "#jobs" },
  ],
  services: [
    { label: "Port Transport", href: "#services" },
    { label: "Cargo Handling", href: "#services" },
    { label: "Warehousing", href: "#services" },
    { label: "Customs Clearance", href: "#services" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-black py-16 text-white">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-4 text-2xl font-bold">HQ LOGISTICS</h4>
            <p className="mb-6 text-white/70">
              Your trusted partner for reliable cargo transport since 2020.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-1 hover:bg-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-all hover:pl-2 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-primary">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-all hover:pl-2 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-primary">Contact</h4>
            <ul className="space-y-3 text-white/70">
              <li>info@hqlogistics.co.tz</li>
              <li>Dar es Salaam, Tanzania</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <p>&copy; 2025 HQ Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
