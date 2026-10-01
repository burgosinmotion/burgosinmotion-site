"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { value: 8, suffix: "+", label: "Años Exp.", color: "text-cyan-300" },
  { value: 100, suffix: "+", label: "Proyectos E-Learning", color: "text-emerald-300" },
  { value: 50, suffix: "+", label: "Videos Motion", color: "text-violet-300" },
];

const stack = [
  "After Effects",
  "Articulate Storyline 360",
  "Lottie / Rive",
  "SCORM / xAPI",
];

export default function AboutSection() {
  return (
    <motion.section
      id="sobre-mi"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-6 md:py-32"
    >
      <div className="pointer-events-none absolute right-[-12%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.035] blur-[150px]" />
      <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <motion.aside
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex min-h-[440px] flex-col items-center justify-center rounded-[1.5rem] border border-violet-300/[0.22] bg-[#111827]/72 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-[4px] border-cyan-300 bg-[#05060A] shadow-[0_0_34px_rgba(34,211,238,0.20)]">
            <Image
              src="/diego.jpg"
              alt="Diego Burgos"
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <h3 className="mt-6 text-2xl font-black text-white">Diego Burgos</h3>
          <p className="mt-1 font-mono text-xs font-bold text-cyan-300">
            Burgos in Motion
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
            Diseñador Multimedia, especialista en E-Learning y Motion Graphics.
          </p>
        </motion.aside>

        <div>
          <p className="mb-7 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
            SOBRE MÍ
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-zinc-50 md:text-5xl">
            Motion e interacción con propósito
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
            Con más de <strong className="text-white">8 años de experiencia</strong>, diseño soluciones que conectan la estética visual con la funcionalidad. Creo experiencias formativas inmersivas en Articulate Storyline y piezas de motion graphics que convierten ideas complejas en historias claras.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.045] p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              >
                <h3 className={`text-3xl font-black leading-none md:text-4xl ${stat.color}`}>
                  <CountUp end={stat.value} duration={2} />
                  {stat.suffix}
                </h3>
                <p className="mt-3 font-mono text-xs leading-5 text-zinc-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-3 font-mono text-sm text-zinc-400">
              Tech Stack & Software:
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/[0.08] bg-white/[0.06] px-3 py-1.5 font-mono text-xs text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
