import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";
import { portfolioCategories } from "./categoryData";

const services = portfolioCategories.filter(
  ({ id }) => id === "motion" || id === "elearning" || id === "interactive",
);

export default function ServicesSection() {
  return (
    <RevealOnScroll
      as="section"
      id="servicios"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      duration={900}
      y={80}
    >
      <div className="mb-20 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-300">
          SERVICIOS
        </p>
        <h2 className="text-4xl font-bold md:text-5xl">
          Soluciones creativas a través<br /> del motion y la interacción
        </h2>
      </div>

      <RevealOnScroll
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        delay={120}
        duration={800}
        y={50}
      >
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.slug}
            className="group rounded-3xl border border-white/[0.07] bg-[rgba(8,10,18,0.36)] p-8 transition hover:-translate-y-1 hover:border-white/[0.14] hover:bg-[rgba(12,15,28,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:hover:translate-y-0"
          >
            <h3 className="mb-4 text-2xl font-semibold text-zinc-50">
              {service.title}
            </h3>
            <p className="leading-7 text-zinc-300">{service.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-200">
              Explorar área <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </RevealOnScroll>
    </RevealOnScroll>
  );
}
