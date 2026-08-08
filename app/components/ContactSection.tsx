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
      className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:pb-24 md:pt-32 xl:pb-28 xl:pt-36"
    >
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.025] blur-[160px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1050px] text-center">
        <div className="mb-7 flex items-center justify-center gap-5">
          <span className="h-px w-16 bg-white/[0.10]" />
          <p className="text-xs uppercase tracking-[0.34em] text-white/45">
            CONTACTO
          </p>
          <span className="h-px w-16 bg-white/[0.10]" />
        </div>

        <h2 className="mx-auto mb-8 max-w-[900px] text-[2.65rem] font-bold leading-[0.98] tracking-tight text-zinc-50 md:text-7xl">
          ¿Tienes una idea, proyecto o desafío?
        </h2>

        <p className="mx-auto mb-12 max-w-[620px] text-lg leading-8 text-white/70">
          Convirtámoslo en una experiencia digital que combine
          motion graphics, aprendizaje interactivo y desarrollo creativo.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:hola@burgosinmotion.com"
            className="rounded-full bg-white px-8 py-4 font-semibold text-black shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_22px_60px_rgba(0,0,0,0.3)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
          >
            Hablemos
          </a>

          <a
            href="https://www.linkedin.com/in/dgoburgos/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/[0.08] bg-[rgba(8,10,18,0.28)] px-8 py-4 text-zinc-100 shadow-[0_16px_45px_rgba(0,0,0,0.16)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 motion-reduce:hover:translate-y-0"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </motion.section>
  );
}
