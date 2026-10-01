import type { Metadata } from "next";
import ElearningInteractiveSection from "../components/ElearningInteractiveSection";

export const metadata: Metadata = {
  title: "Demos Interactivas",
  description: "Explora e interactúa con demos reales desarrolladas en Articulate Storyline.",
};

export default function InteractiveDemosPage() {
  return (
    <main>
      <ElearningInteractiveSection />
    </main>
  );
}