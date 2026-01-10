import { useEffect, useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  id: string;
  type: string;
  title: string;
  content: string;
  icon_name: string;
  display_order: number;
}

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
  const [contacts, setContacts] = useState<ContactInfo[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data) {
        setContacts(data);
      }
    };

    fetchContacts();
  }, []);

  const getContactByType = (type: string) => {
    return contacts.find((c) => c.type === type)?.content || "";
  };

  return (
    <footer className="bg-black py-10 sm:py-16 text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 sm:mb-12 grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">HQ LOGISTICS</h4>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-white/70">
              Your trusted partner for reliable cargo transport since 2020.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-1 hover:bg-primary"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-bold text-primary">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base text-white/70 transition-all hover:pl-2 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-bold text-primary">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base text-white/70 transition-all hover:pl-2 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 sm:mb-4 text-sm sm:text-base font-bold text-primary">Contact</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/70">
              {getContactByType("phone") && <li>{getContactByType("phone")}</li>}
              {getContactByType("email") && <li>{getContactByType("email")}</li>}
              {getContactByType("location") && <li>{getContactByType("location")}</li>}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-white/50">
          <p>&copy; 2025 HQ Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
