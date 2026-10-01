import type { Metadata } from "next";
import QuoteEstimatorSection from "../components/QuoteEstimatorSection";
import ServicesSection from "../components/ServicesSection";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Servicios de motion graphics, e-learning interactivo y experiencias digitales.",
};

export default function ServicesPage() {
  return (
    <main>
      <h1 className="sr-only">Servicios</h1>
      <ServicesSection />
      <QuoteEstimatorSection />
    </main>
  );
}