import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Truck, Package, Warehouse, FileText, Ship, Plane, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const allServices = [
  {
    icon: Truck,
    title: "Port to Dry Port Transport",
    description:
      "Efficient cargo movement with real-time GPS tracking and guaranteed delivery times. Our fleet of modern trucks ensures your goods reach their destination safely and on schedule.",
    features: ["Real-time GPS tracking", "Guaranteed delivery times", "Modern fleet", "24/7 support"],
  },
  {
    icon: Package,
    title: "Cargo Handling",
    description:
      "Professional handling with specialized equipment and trained staff for all cargo types. We ensure your goods are handled with utmost care throughout the entire process.",
    features: ["Specialized equipment", "Trained professionals", "All cargo types", "Safety protocols"],
  },
  {
    icon: Warehouse,
    title: "Warehousing & Storage",
    description:
      "Secure facilities with 24/7 surveillance and climate control for your peace of mind. Our state-of-the-art warehouses provide optimal storage conditions for your inventory.",
    features: ["24/7 surveillance", "Climate controlled", "Inventory management", "Flexible terms"],
  },
  {
    icon: FileText,
    title: "Customs Clearance",
    description:
      "Expert assistance to ensure smooth and fast processing of all documentation. Our experienced team navigates complex customs regulations to expedite your shipments.",
    features: ["Expert documentation", "Regulatory compliance", "Fast processing", "Duty optimization"],
  },
  {
    icon: Ship,
    title: "Sea Freight",
    description:
      "Cost-effective ocean shipping solutions for large-scale cargo. We partner with major shipping lines to provide reliable and economical sea freight services worldwide.",
    features: ["Global coverage", "FCL & LCL options", "Port-to-port service", "Competitive rates"],
  },
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Fast and reliable air cargo services for time-sensitive shipments. Our extensive network ensures your urgent cargo reaches its destination quickly and securely.",
    features: ["Express delivery", "Global network", "Temperature control", "Dangerous goods handling"],
  },
  {
    icon: MapPin,
    title: "Land Freight",
    description:
      "Comprehensive road transport solutions across the region. Our extensive network of carriers provides flexible and efficient land transportation options for your cargo.",
    features: ["Regional coverage", "Door-to-door service", "FTL & LTL options", "Cross-border expertise"],
  },
  {
    icon: Warehouse,
    title: "Warehousing Solutions",
    description:
      "Advanced warehousing services with integrated logistics management. From receiving to distribution, we provide end-to-end warehousing solutions tailored to your business needs.",
    features: ["Order fulfillment", "Pick & pack services", "Cross-docking", "Value-added services"],
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/#contact");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-background to-muted pt-32 pb-16">
        <div className="container mx-auto max-w-7xl px-8 text-center">
          <h1 className="mb-6 text-5xl font-black md:text-6xl lg:text-7xl">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            Comprehensive logistics solutions designed to meet all your transportation and supply chain needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col rounded-3xl bg-card border border-border p-8 transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary">
                    <Icon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{service.description}</p>
                  
                  <ul className="mb-6 flex-1 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    onClick={handleGetQuote}
                  >
                    Get a Quote
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;