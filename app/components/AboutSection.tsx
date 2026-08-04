"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";

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
      <div className="grid items-center gap-20 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            SOBRE MÍ
          </p>

          <h2 className="mb-8 text-5xl font-bold leading-tight">
            Motion, interacción y narrativa con propósito.
          </h2>

          <p className="mb-6 text-lg leading-8 text-zinc-400">
            Soy Diego Burgos, creador de Burgos in Motion.
          </p>

          <p className="mb-6 text-lg leading-8 text-zinc-400">
            Diseño experiencias digitales que combinan motion graphics,
            aprendizaje interactivo y desarrollo creativo.
          </p>

          <p className="text-lg leading-8 text-zinc-400">
            Desde proyectos e-learning desarrollados en Storyline hasta
            herramientas personalizadas para After Effects y experiencias
            web interactivas, mi objetivo es crear productos que conecten
            con las personas, faciliten el aprendizaje y generen impacto.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-4xl font-bold"><CountUp end={8} duration={2} />+</h3>
              <p className="mt-2 text-zinc-400">
                Años de Experiencia
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-4xl font-bold"><CountUp end={100} duration={2} />+</h3>
              <p className="mt-2 text-zinc-400">
                Proyectos Formativos
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-4xl font-bold"><CountUp end={50} duration={2} />+</h3>
              <p className="mt-2 text-zinc-400">
                Proyectos Creativos
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-4xl font-bold"><CountUp end={5} duration={2} />+</h3>
              <p className="mt-2 text-zinc-400">
                Herramientas Digitales
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center"
        >
          {/* Glow Background */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-fuchsia-500/30 blur-[220px]" />

          <div className="absolute h-[350px] w-[350px] rounded-full bg-cyan-500/30 blur-[220px]" />

          {/* Image Container */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
            <Image
              src="/diego.jpg"
              alt="Diego Burgos"
              width={380}
              height={500}
              className="h-[500px] w-[380px] rounded-[1.5rem] object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Name & Titles */}
          <div className="mt-8 text-center">
            <h3 className="text-3xl font-bold">
              Diego Burgos
            </h3>

            <div className="mt-4 flex flex-col gap-1 text-zinc-400">
              <span>Diseñador Motion</span>

              <span>Desarrollador Creativo</span>

              <span>Especialista en E-Learning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
