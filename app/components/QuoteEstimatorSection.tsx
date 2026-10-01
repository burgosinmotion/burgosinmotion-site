"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const serviceTypes = [
  { name: "Motion Graphics", detail: "Video explainer, branding animado", min: 700, max: 1500, icon: "▣" },
  { name: "E-Learning Storyline", detail: "Módulo interactivo, SCORM/xAPI", min: 900, max: 1800, icon: "▱" },
  { name: "Experiencias Web Interactivas", detail: "Diseño y desarrollo de experiencias digitales", min: 600, max: 2200, icon: "✦" },
];

const scopes = [
  { label: "Básico (pieza corta / script simple / módulo breve)", factor: 0.72 },
  { label: "Medio / Estándar (Video 60-90s / Experiencia web / Módulo 20 mins)", factor: 1 },
  { label: "Avanzado (sistema completo / automatización compleja / experiencia multi-slide)", factor: 1.45 },
];

export default function QuoteEstimatorSection() {
  const [selectedService, setSelectedService] = useState(1);
  const [selectedScope, setSelectedScope] = useState(1);
  const estimate = useMemo(() => {
    const service = serviceTypes[selectedService];
    const scope = scopes[selectedScope];
    return {
      min: Math.round((service.min * scope.factor) / 50) * 50,
      max: Math.round((service.max * scope.factor) / 50) * 50,
    };
  }, [selectedScope, selectedService]);

  return (
    <motion.section
      id="cotizar"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-6 md:py-32"
    >
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
          COTIZADOR INTERACTIVO
        </p>
        <h2 className="text-4xl font-black leading-tight tracking-tight text-zinc-50 md:text-5xl">
          Calcula un Presupuesto Estimado
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400">
          Selecciona las necesidades de tu proyecto y obtén una estimación instantánea antes de agendar tu llamada.
        </p>
      </div>

      <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-white/[0.08] bg-[#111827]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md md:p-10">
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
          1. Tipo de servicio principal
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceTypes.map((service, index) => (
            <button
              key={service.name}
              type="button"
              onClick={() => setSelectedService(index)}
              className={`rounded-xl border p-5 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${
                selectedService === index
                  ? "border-cyan-300/40 bg-cyan-300/[0.08]"
                  : "border-white/[0.08] bg-[#05060A]/62 hover:border-white/[0.16]"
              }`}
            >
              <span className="font-mono text-xl text-cyan-300">{service.icon}</span>
              <strong className="mt-4 block text-base text-white">{service.name}</strong>
              <span className="mt-2 block text-sm text-zinc-400">{service.detail}</span>
            </button>
          ))}
        </div>

        <label className="mt-9 grid gap-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            2. Alcance / duración estimada
          </span>
          <select
            value={selectedScope}
            onChange={(event) => setSelectedScope(Number(event.target.value))}
            className="rounded-xl border border-white/[0.08] bg-[#05060A]/72 px-5 py-4 text-base font-bold text-zinc-100 outline-none focus:border-cyan-300/40"
          >
            {scopes.map((scope, index) => (
              <option key={scope.label} value={index}>
                {scope.label}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-8 flex flex-col gap-6 rounded-xl border border-violet-300/[0.18] bg-violet-400/[0.035] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
              Rango estimado de inversión
            </p>
            <p className="mt-2 text-4xl font-black text-cyan-300">
              ${estimate.min} - ${estimate.max} USD
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Sujeto a confirmación de requerimientos técnicos
            </p>
          </div>
          <a
            href={`mailto:hola@burgosinmotion.com?subject=Cotización%20${encodeURIComponent(serviceTypes[selectedService].name)}&body=${encodeURIComponent(`Hola Diego,\n\nQuiero cotizar un proyecto de ${serviceTypes[selectedService].name}.\nRango estimado: $${estimate.min} - $${estimate.max} USD.\n`)}`}
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-violet-500 px-6 py-4 font-bold text-white shadow-[0_16px_40px_rgba(99,102,241,0.28)] transition hover:-translate-y-0.5 hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-200 motion-reduce:hover:translate-y-0"
          >
            ✈ Solicitar Cotización Oficial
          </a>
        </div>
      </div>
    </motion.section>
  );
}
