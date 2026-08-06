"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.section
      id="contacto"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="relative mx-auto max-w-7xl px-6 py-32"
    >
      <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.08] bg-[rgba(8,10,18,0.42)] p-16 shadow-[0_34px_110px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        {/* Glow Background */}
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-fuchsia-500/[0.12] blur-[220px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/[0.12] blur-[220px]" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-300">
            CONTACTO
          </p>

          <h2 className="mx-auto mb-8 max-w-4xl text-5xl md:text-7xl font-bold tracking-tight">
            ¿Tienes una idea, proyecto o desafío?
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-8 text-zinc-300">
            Convirtámoslo en una experiencia digital que combine
            motion graphics, aprendizaje interactivo y desarrollo creativo.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hola@burgosinmotion.com"
              className="rounded-full bg-white
                  hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]
                  px-8 py-4 font-semibold text-black transition hover:scale-[1.02]"
            >
              Hablemos
            </a>

            <a
              href="https://www.linkedin.com/in/dgoburgos/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/[0.1] bg-[rgba(8,10,18,0.38)] px-8 py-4 text-zinc-100 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:border-white/[0.18] hover:bg-white/[0.06]"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-fuchsia-500/35 to-transparent" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
