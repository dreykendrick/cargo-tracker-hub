import { Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
  display_order: number;
}

export const TeamSection = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching team members:", error);
      } else {
        setTeam(data || []);
      }
      setIsLoading(false);
    };

    fetchTeamMembers();
  }, []);
  if (isLoading) {
    return (
      <section id="team" className="bg-background py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black md:text-5xl">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Dedicated professionals committed to your logistics success
            </p>
          </div>
          <div className="text-center text-muted-foreground">Loading team members...</div>
        </div>
      </section>
    );
  }

  if (team.length === 0) {
    return (
      <section id="team" className="bg-background py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black md:text-5xl">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Dedicated professionals committed to your logistics success
            </p>
          </div>
          <div className="text-center text-muted-foreground">No team members yet.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="bg-background py-12 sm:py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 sm:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-black">Meet Our Team</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
            Dedicated professionals committed to your logistics success
          </p>
        </div>

        <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="overflow-hidden rounded-2xl sm:rounded-3xl bg-card transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {member.image_url && (
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="h-48 sm:h-72 w-full object-cover"
                />
              )}
              <div className="p-4 sm:p-6 text-center">
                <h3 className="mb-1 sm:mb-2 text-lg sm:text-xl font-bold">{member.name}</h3>
                <div className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold text-primary">{member.position}</div>
                {member.bio && (
                  <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">{member.bio}</p>
                )}
                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-white"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
