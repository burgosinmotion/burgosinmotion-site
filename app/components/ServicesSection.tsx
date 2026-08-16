import RevealOnScroll from "./RevealOnScroll";

const services = [
  {
    title: "Motion Graphics",
    text: "Narrativa visual, sistemas de animación y experiencias de marca impulsadas por motion graphics.",
  },
  {
    title: "Aprendizaje Interactivo",
    text: "Experiencias e-learning inmersivas desarrolladas con Storyline, interacción y gamificación.",
  },
  {
    title: "Desarrollo Creativo",
    text: "Interfaces interactivas, experiencias web y soluciones digitales desarrolladas a medida.",
  },
  {
    title: "Productos Digitales",
    text: "Herramientas y extensiones personalizadas para optimizar flujos de trabajo creativos y productivos.",
  },
];

export default function ServicesSection() {
  return (
    <RevealOnScroll
      as="section"
      id="servicios"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      duration={900}
      y={80}
    >
      <div className="pointer-events-none absolute left-[-8%] top-[18%] h-96 w-96 rounded-full bg-cyan-500/[0.035] blur-[120px]" />
      <div className="mb-20 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-300">
          SERVICIOS
        </p>
        <h2 className="text-4xl font-bold md:text-5xl">
          Soluciones creativas a través<br /> del motion y la interacción
        </h2>
      </div>

      <RevealOnScroll
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        delay={120}
        duration={800}
        y={50}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-3xl border border-white/[0.07] bg-[rgba(8,10,18,0.36)] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:-translate-y-2 hover:border-white/[0.12] hover:bg-[rgba(12,15,28,0.5)] motion-reduce:hover:translate-y-0"
          >
            <h3 className="mb-4 text-2xl font-semibold text-zinc-50">
              {service.title}
            </h3>
            <p className="leading-7 text-zinc-300">{service.text}</p>
          </div>
        ))}
      </RevealOnScroll>
    </RevealOnScroll>
  );
}
