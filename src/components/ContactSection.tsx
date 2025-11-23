import { MapPin, Warehouse, Mail, Clock } from "lucide-react";

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

export const ContactSection = () => {
  return (
    <section id="contact" className="bg-foreground py-20 text-white md:py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black md:text-5xl">Contact Us</h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            We're here to help 24/7
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div
                key={index}
                className="flex gap-6 rounded-2xl bg-white/5 p-8 transition-all hover:translate-x-2 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="mb-2 font-bold">{contact.title}</h4>
                  <p className="text-sm text-white/70">{contact.info}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
