"use client";

import { motion } from "framer-motion";

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
    <motion.section
      id="servicios"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
    >
      <div className="mb-20 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          SERVICIOS
        </p>
        <h2 className="text-5xl font-bold">
          Soluciones creativas a través<br /> del motion y la interacción
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:-translate-y-2 hover:border-white/20 hover:bg-white/10"
          >
            <h3 className="mb-4 text-2xl font-semibold">
              {service.title}
            </h3>
            <p className="leading-7 text-zinc-400">{service.text}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
