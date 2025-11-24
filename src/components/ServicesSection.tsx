import { Truck, Package, Warehouse, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Truck,
    title: "Port to Dry Port Transport",
    description:
      "Efficient cargo movement with real-time GPS tracking and guaranteed delivery times.",
  },
  {
    icon: Package,
    title: "Cargo Handling",
    description:
      "Professional handling with specialized equipment and trained staff for all cargo types.",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Storage",
    description:
      "Secure facilities with 24/7 surveillance and climate control for your peace of mind.",
  },
  {
    icon: FileText,
    title: "Customs Clearance",
    description:
      "Expert assistance to ensure smooth and fast processing of all documentation.",
  },
];

export const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black md:text-5xl">Our Services</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive logistics solutions designed for your success
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl bg-muted p-8 transition-all hover:-translate-y-2 hover:bg-card hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary">
                  <Icon className="h-8 w-8 text-primary transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => navigate("/services")}
            size="lg"
            className="rounded-full bg-primary font-semibold shadow-lg hover:bg-primary-accent"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};
