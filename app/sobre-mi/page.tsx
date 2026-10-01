import type { Metadata } from "next";
import AboutSection from "../components/AboutSection";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Conoce a Diego Burgos, diseñador multimedia especializado en motion graphics y e-learning.",
};

export default function AboutPage() {
  return (
    <main>
      <h1 className="sr-only">Sobre mí</h1>
      <AboutSection />
    </main>
  );
}