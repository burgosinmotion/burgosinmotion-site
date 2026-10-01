import type { Metadata } from "next";
import ElearningPortfolioSection from "../components/ElearningPortfolioSection";
import ProjectsSection from "../components/ProjectsSection";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos seleccionados de motion graphics y aprendizaje interactivo.",
};

export default function ProjectsPage() {
  return (
    <main>
      <h1 className="sr-only">Proyectos</h1>
      <ProjectsSection />
      <ElearningPortfolioSection />
    </main>
  );
}