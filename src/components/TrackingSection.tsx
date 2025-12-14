import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, ClipboardCheck, Truck, Warehouse } from "lucide-react";

const trackingData = {
  steps: [
    {
      icon: CheckCircle2,
      title: "Cargo Received at Port",
      description: "Your cargo has been received at Dar es Salaam Port",
      time: "Nov 15, 2025 - 08:30 AM",
      status: "completed",
    },
    {
      icon: ClipboardCheck,
      title: "Documentation Complete",
      description: "All customs documentation processed successfully",
      time: "Nov 16, 2025 - 02:15 PM",
      status: "completed",
    },
    {
      icon: Truck,
      title: "In Transit",
      description: "Cargo is currently being transported to dry port",
      time: "Nov 17, 2025 - 06:00 AM",
      status: "active",
    },
    {
      icon: Warehouse,
      title: "Ready for Collection",
      description: "Cargo available for pickup at dry port",
      time: "Estimated: Nov 17, 2025 - 04:00 PM",
      status: "pending",
    },
  ],
};

export const TrackingSection = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setShowTimeline(true);
    }
  };

  return (
    <section id="tracking" className="bg-background py-12 sm:py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 sm:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-black">Track Your Cargo</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
            Enter your tracking number for instant shipment status
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl sm:rounded-3xl bg-card p-4 sm:p-8 shadow-2xl">
          <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4">
            <Input
              type="text"
              placeholder="Enter tracking number (e.g., HQ123456)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 rounded-xl border-2 bg-background px-4 py-5 sm:py-6 text-sm sm:text-base focus-visible:ring-primary"
            />
            <Button
              size="lg"
              onClick={handleTrack}
              className="gap-2 rounded-xl bg-primary font-semibold hover:bg-primary-accent w-full sm:w-auto"
            >
              <Search className="h-5 w-5" />
              Track
            </Button>
          </div>

          {showTimeline && (
            <div className="animate-fade-in space-y-6 sm:space-y-8 pt-4">
              {trackingData.steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 sm:gap-6 pl-14 sm:pl-20">
                    <div
                      className={`absolute left-0 top-0 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border-4 transition-all ${
                        step.status === "completed"
                          ? "border-primary bg-primary text-white"
                          : step.status === "active"
                          ? "animate-pulse-ring border-primary bg-white text-primary"
                          : "border-border bg-white text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 sm:mb-2 text-base sm:text-lg font-bold">{step.title}</h4>
                      <p className="mb-1 sm:mb-2 text-sm sm:text-base text-muted-foreground">{step.description}</p>
                      <small className="text-xs sm:text-sm text-muted-foreground">{step.time}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
