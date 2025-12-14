import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, Briefcase, Clock, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  created_at: string;
}

const applicationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  coverLetter: z.string().trim().max(2000, "Cover letter too long").optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export const JobsSection = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_listings")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "Posted yesterday";
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`;
    if (diffInDays < 30) return `Posted ${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `Posted ${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
    setFormData({ fullName: "", email: "", phone: "", coverLetter: "" });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ApplicationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ApplicationFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Application Submitted!",
      description: `Your application for ${selectedJob?.title} has been received. We'll be in touch soon.`,
    });

    setIsDialogOpen(false);
    setLoading(false);
  };

  if (jobs.length === 0) {
    return (
      <section id="jobs" className="bg-background py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black md:text-5xl">Join Our Team</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              No open positions at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="jobs" className="bg-background py-12 sm:py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 sm:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-black">Join Our Team</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
            Explore exciting career opportunities at HQ Logistics
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl bg-card p-5 sm:p-8 transition-all hover:translate-x-1 sm:hover:translate-x-2 hover:shadow-2xl md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1">
                <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold">{job.title}</h3>
                <div className="mb-2 sm:mb-3 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    {getTimeAgo(job.created_at)}
                  </div>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{job.description}</p>
              </div>
              <Button
                size="lg"
                onClick={() => handleApplyClick(job)}
                className="rounded-xl bg-primary font-semibold hover:bg-primary-accent whitespace-nowrap"
              >
                Apply Now
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your application for this position at {selectedJob?.location}.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Input
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
            </div>

            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <Input
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div>
              <Textarea
                name="coverLetter"
                placeholder="Cover Letter / Why are you interested in this role?"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={4}
              />
              {errors.coverLetter && <p className="mt-1 text-xs text-destructive">{errors.coverLetter}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 bg-primary font-semibold hover:bg-primary-accent"
            >
              {loading ? "Submitting..." : "Submit Application"}
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
