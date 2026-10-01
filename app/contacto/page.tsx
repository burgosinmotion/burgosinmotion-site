import type { Metadata } from "next";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Conversemos sobre tu próximo proyecto de motion graphics o e-learning.",
};

export default function ContactPage() {
  return (
    <main>
      <h1 className="sr-only">Contacto</h1>
      <ContactSection />
    </main>
  );
}