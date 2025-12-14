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
    <section id="services" className="py-12 sm:py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 sm:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-black">Our Services</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
            Comprehensive logistics solutions designed for your success
          </p>
        </div>

        <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group flex flex-col rounded-2xl sm:rounded-3xl bg-muted p-5 sm:p-8 transition-all hover:-translate-y-2 hover:bg-card hover:shadow-2xl"
              >
                <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 transition-all group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold">{service.title}</h3>
                <p className="mb-3 sm:mb-4 flex-1 text-sm sm:text-base leading-relaxed text-muted-foreground">{service.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    contactSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get a Quote
                </Button>
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
