import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrackingSection } from "@/components/TrackingSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TeamSection } from "@/components/TeamSection";
import { NewsSection } from "@/components/NewsSection";
import { JobsSection } from "@/components/JobsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TrackingSection />
      <ServicesSection />
      <TeamSection />
      <NewsSection />
      <JobsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
