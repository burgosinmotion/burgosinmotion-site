import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Producción E-Learning",
    description:
      "Diseño y desarrollo experiencias de aprendizaje digitales, desde la adaptación visual de contenidos hasta cursos interactivos completos preparados para LMS.",
    capabilities: [
      "Articulate Storyline 360",
      "Cursos interactivos",
      "Gamificación",
      "SCORM / xAPI",
      "JavaScript",
      "Adaptación y localización",
      "QA",
    ],
  },
  {
    number: "02",
    title: "Motion & Animación",
    description:
      "Transformo ideas, conceptos y contenidos en piezas audiovisuales claras y atractivas mediante diseño y animación.",
    capabilities: [
      "Motion Graphics 2D",
      "After Effects",
      "Explainers",
      "Animación gráfica",
      "UI Motion",
      "Piezas audiovisuales",
      "Contenido digital",
    ],
  },
  {
    number: "03",
    title: "Experiencias Interactivas",
    description:
      "Diseño experiencias donde interacción, movimiento y tecnología trabajan juntos para convertir contenido estático en algo que el usuario puede explorar.",
    capabilities: [
      "Gamificación",
      "Mini-juegos",
      "JavaScript",
      "Interfaces interactivas",
      "Actividades personalizadas",
      "Prototipos",
      "Experiencias multimedia",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="services-title"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-24 sm:px-6 md:py-32"
    >
      <div className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
          SERVICIOS
        </p>
        <h2
          id="services-title"
          className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl"
        >
          Soluciones digitales diseñadas para comunicar, enseñar y conectar.
        </h2>
      </div>

      <div className="divide-y divide-white/[0.10] border-y border-white/[0.10]">
        {services.map((service) => (
          <article
            key={service.number}
            className="group grid gap-5 py-7 transition-colors duration-300 hover:bg-white/[0.025] motion-reduce:transition-none sm:gap-6 sm:py-8 md:grid-cols-[3.5rem_minmax(13rem,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-8 md:px-5 md:py-9"
          >
            <span className="font-mono text-sm font-bold tracking-wider text-cyan-300/70 transition-colors duration-300 group-hover:text-cyan-200 motion-reduce:transition-none">
              {service.number}
            </span>

            <h3 className="max-w-xs text-2xl font-bold leading-tight text-zinc-50 transition-transform duration-300 group-hover:translate-x-[3px] sm:text-3xl motion-reduce:transform-none motion-reduce:transition-none">
              {service.title}
            </h3>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                {service.description}
              </p>
              <ul
                aria-label={`Capacidades de ${service.title}`}
                className="mt-5 flex flex-wrap gap-2"
              >
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="rounded-full border border-white/[0.10] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:border-white/[0.16] group-hover:text-zinc-200 motion-reduce:transition-none"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:p-8">
        <h3 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
          ¿Tienes un proyecto en mente?
        </h3>
        <Link
          href="/#contact"
          className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-cyan-200/30 bg-cyan-300/[0.08] px-5 py-3 text-sm font-bold text-cyan-100 transition-colors duration-300 hover:border-cyan-200/60 hover:bg-cyan-300/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transition-none"
        >
          Hablemos
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
