import CategoryShowcase from "./components/CategoryShowcase";
import ServicesSection from "./components/ServicesSection";
import HeroSection from "./components/HeroSection";
import ShowreelSection from "./components/ShowreelSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ShowreelSection />
      <CategoryShowcase />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
