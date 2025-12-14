import { useState } from "react";
import { MapPin, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contacts = [
  {
    icon: MapPin,
    title: "Main Office",
    info: "Dar es Salaam Port Area, Tanzania",
  },
  {
    icon: Mail,
    title: "Email",
    info: "info@hqlogistics.co.tz",
  },
  {
    icon: Clock,
    title: "Hours",
    info: "Mon-Fri: 7AM-6PM | Sat: 8AM-2PM",
  },
];

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone too long"),
  company: z.string().trim().max(100, "Company name too long").optional(),
  cargoType: z.string().trim().min(1, "Cargo type is required"),
  origin: z.string().trim().min(1, "Origin is required"),
  destination: z.string().trim().min(1, "Destination is required"),
  message: z.string().trim().max(1000, "Message too long").optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    cargoType: "",
    origin: "",
    destination: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = quoteSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof QuoteFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Quote Request Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      cargoType: "",
      origin: "",
      destination: "",
      message: "",
    });
    setLoading(false);
  };

  return (
    <section id="contact" className="bg-foreground py-12 sm:py-20 text-white md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 sm:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-black">Contact Us</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/70">
            We're here to help 24/7
          </p>
        </div>

        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold">Get in Touch</h3>
            <div className="space-y-3 sm:space-y-4">
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 sm:gap-6 rounded-xl sm:rounded-2xl bg-white/5 p-4 sm:p-6 transition-all hover:translate-x-2 hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm sm:text-base font-bold">{contact.title}</h4>
                      <p className="text-xs sm:text-sm text-white/70">{contact.info}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote Form */}
          <div className="rounded-2xl sm:rounded-3xl bg-white/5 p-5 sm:p-8 backdrop-blur-sm">
            <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Get a Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <div>
                  <Input
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Input
                  name="cargoType"
                  placeholder="Cargo Type *"
                  value={formData.cargoType}
                  onChange={handleChange}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
                {errors.cargoType && <p className="mt-1 text-xs text-red-400">{errors.cargoType}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    name="origin"
                    placeholder="Origin *"
                    value={formData.origin}
                    onChange={handleChange}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {errors.origin && <p className="mt-1 text-xs text-red-400">{errors.origin}</p>}
                </div>
                <div>
                  <Input
                    name="destination"
                    placeholder="Destination *"
                    value={formData.destination}
                    onChange={handleChange}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {errors.destination && <p className="mt-1 text-xs text-red-400">{errors.destination}</p>}
                </div>
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Additional Details"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2 bg-primary font-semibold hover:bg-primary-accent"
              >
                {loading ? "Sending..." : "Request Quote"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
