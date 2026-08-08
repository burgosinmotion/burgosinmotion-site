"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  {
    value: 8,
    label: "Años de Experiencia",
  },
  {
    value: 100,
    label: "Proyectos Formativos",
  },
  {
    value: 50,
    label: "Proyectos Creativos",
  },
  {
    value: 5,
    label: "Herramientas Digitales",
  },
];

function StatsBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.08] pt-8 md:grid-cols-4 ${className}`}>
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="border-l border-white/[0.08] pl-4 first:border-l-0 first:pl-0 md:first:border-l-0"
        >
          <h3 className="text-4xl font-bold leading-none text-zinc-50"><CountUp end={stat.value} duration={2} />+</h3>
          <p className="mt-3 text-sm leading-5 text-zinc-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <motion.section
      id="sobre-mi"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
    >
      <div className="pointer-events-none absolute right-[-12%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.035] blur-[150px]" />
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-zinc-400">
            <span>01 / ABOUT</span>
            <span className="h-px w-16 bg-white/[0.12]" />
          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-300">
            SOBRE MÍ
          </p>

          <h2 className="mb-8 max-w-[720px] text-4xl font-bold leading-tight text-zinc-50 md:text-5xl">
            Motion, interacción y narrativa con propósito.
          </h2>

          <div className="max-w-[680px]">
            <p className="mb-6 text-xl leading-8 text-zinc-100">
              Soy Diego Burgos, creador de Burgos in Motion.
            </p>

            <p className="mb-6 text-lg leading-8 text-zinc-300">
              Diseño experiencias digitales que combinan motion graphics,
              aprendizaje interactivo y desarrollo creativo.
            </p>

            <p className="text-lg leading-8 text-zinc-300">
              Desde proyectos e-learning desarrollados en Storyline hasta
              herramientas personalizadas para After Effects y experiencias
              web interactivas, mi objetivo es crear productos que conecten
              con las personas, faciliten el aprendizaje y generen impacto.
            </p>
          </div>

          {/* Stats */}
          <StatsBlock className="mt-12 hidden lg:grid" />
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center lg:col-span-5"
        >
          {/* Glow Background */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-fuchsia-500/[0.08] blur-[220px]" />

          <div className="absolute h-[350px] w-[350px] rounded-full bg-cyan-500/[0.08] blur-[220px]" />

          {/* Image Container */}
          <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[2rem] border border-white/[0.06] shadow-[0_34px_100px_rgba(0,0,0,0.34)] sm:max-w-[380px] lg:aspect-auto lg:max-w-[420px]">
            <Image
              src="/diego.jpg"
              alt="Diego Burgos"
              width={380}
              height={500}
              className="h-full w-full object-cover lg:h-[520px]"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Name & Titles */}
          <div className="mt-5 w-full max-w-[340px] text-left sm:max-w-[380px] lg:mt-7 lg:max-w-[420px]">
            <h3 className="text-2xl font-bold text-zinc-50">
              Diego Burgos
            </h3>

            <div className="mt-4 flex flex-col gap-1 text-sm leading-6 text-white/60">
              <span>Diseñador Motion</span>

              <span>Desarrollador Creativo</span>

              <span>Especialista en E-Learning</span>
            </div>
          </div>
        </motion.div>

        <StatsBlock className="lg:hidden" />
      </div>
    </motion.section>
  );
}
