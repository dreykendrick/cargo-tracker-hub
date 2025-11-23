import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";

const jobs = [
  {
    title: "Logistics Coordinator",
    location: "Dar es Salaam",
    type: "Full Time",
    posted: "Posted 2 days ago",
    description: "Seeking an experienced logistics coordinator to manage daily operations.",
  },
  {
    title: "Warehouse Manager",
    location: "Dar es Salaam",
    type: "Full Time",
    posted: "Posted 5 days ago",
    description: "Looking for a warehouse manager to oversee inventory at our dry port.",
  },
  {
    title: "Truck Driver",
    location: "Dar es Salaam",
    type: "Full Time",
    posted: "Posted 1 week ago",
    description: "Professional truck drivers needed with valid licenses for cargo transport.",
  },
];

export const JobsSection = () => {
  return (
    <section id="jobs" className="bg-background py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black md:text-5xl">Join Our Team</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore exciting career opportunities at HQ Logistics
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 rounded-3xl bg-card p-8 transition-all hover:translate-x-2 hover:shadow-2xl md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1">
                <h3 className="mb-3 text-2xl font-bold">{job.title}</h3>
                <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {job.posted}
                  </div>
                </div>
                <p className="leading-relaxed text-muted-foreground">{job.description}</p>
              </div>
              <Button
                size="lg"
                className="rounded-xl bg-primary font-semibold hover:bg-primary-accent whitespace-nowrap"
              >
                Apply Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
