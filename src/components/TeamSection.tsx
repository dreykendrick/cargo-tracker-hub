import { Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "James Mwakasege",
    role: "Chief Executive Officer",
    bio: "20+ years experience in logistics and supply chain management across East Africa.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Grace Kimaro",
    role: "Chief Operations Officer",
    bio: "Expert in port operations and cargo management with 15 years in the industry.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Hassan Mwenda",
    role: "Logistics Manager",
    bio: "Specializes in route optimization and fleet management for timely deliveries.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Amina Rashid",
    role: "Customer Relations Manager",
    bio: "Dedicated to ensuring exceptional client experience and satisfaction.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

export const TeamSection = () => {
  return (
    <section id="team" className="bg-background py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black md:text-5xl">Meet Our Team</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Dedicated professionals committed to your logistics success
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl bg-card transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-72 w-full object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-bold">{member.name}</h3>
                <div className="mb-3 font-semibold text-primary">{member.role}</div>
                <p className="mb-4 text-sm text-muted-foreground">{member.bio}</p>
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
