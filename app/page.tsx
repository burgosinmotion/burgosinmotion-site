import HomeShell from "./components/HomeShell";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ShowreelSection from "./components/ShowreelSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <HomeShell>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ShowreelSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </HomeShell>
  );
}
