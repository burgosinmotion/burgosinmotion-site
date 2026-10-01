"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const filters = ["Todos", "CEP Panels", "ScriptUI JSX", "Gratis / Freebies"];

const tools = [
  {
    name: "MotionDeck CEP Pro",
    category: "CEP Panels",
    badge: "BESTSELLER",
    meta: "Panel CEP HTML5",
    compatibility: "Win & Mac",
    description: "El panel definitivo para After Effects. Aplica curvas de aceleración personalizadas, ajusta puntos de anclaje y stagerea capas con 1 solo clic.",
    price: "$29",
    action: "Ver Detalles & Comprar",
    href: "mailto:hola@burgosinmotion.com?subject=Comprar%20MotionDeck%20CEP%20Pro",
    accent: "violet",
  },
  {
    name: "Storyline-to-AE Bridge",
    category: "ScriptUI JSX",
    meta: "ScriptUI JSX",
    compatibility: "E-Learning Workflow",
    description: "Convierte la estructura de tus módulos de Articulate Storyline directamente en composiciones organizadas de After Effects listo para animar.",
    price: "$19",
    action: "Ver Detalles & Demo",
    href: "mailto:hola@burgosinmotion.com?subject=Demo%20Storyline-to-AE%20Bridge",
    accent: "cyan",
  },
  {
    name: "Keyframe Cleaner Lite",
    category: "Gratis / Freebies",
    badge: "FREEBIE",
    meta: "ScriptUI Dockable",
    compatibility: "Herramienta Gratuita",
    description: "Limpia fotogramas clave redundantes e inútiles en tus proyectos complejos con un solo atajo.",
    price: "$0",
    action: "Descargar Gratis",
    href: "mailto:hola@burgosinmotion.com?subject=Descargar%20Keyframe%20Cleaner%20Lite",
    accent: "emerald",
  },
];

export default function ToolsStoreSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const visibleTools = useMemo(
    () => activeFilter === "Todos" ? tools : tools.filter((tool) => tool.category === activeFilter),
    [activeFilter],
  );

  return (
    <motion.section
      id="herramientas"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-6 md:py-32"
    >
      <div className="pointer-events-none absolute left-[-14%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-violet-500/[0.032] blur-[150px]" />

      <div className="mb-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
            ▣ MARKETPLACE DIGITAL
          </p>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-zinc-50 md:text-6xl">
            Herramientas & Extensiones AE
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            Herramientas desarrolladas por un diseñador para diseñadores. Optimiza tu flujo de trabajo, elimina tareas repetitivas y ahorra cientos de horas en After Effects.
          </p>
        </div>

        <div className="flex w-full flex-wrap gap-2 rounded-xl border border-white/[0.08] bg-white/[0.045] p-1.5 lg:w-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-xs font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:flex-none ${
                activeFilter === filter
                  ? "bg-violet-500 text-white shadow-[0_10px_24px_rgba(99,102,241,0.28)]"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {visibleTools.map((tool, index) => (
          <motion.article
            key={tool.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className={`group overflow-hidden rounded-2xl border bg-[#111827]/82 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-700 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${
              tool.accent === "cyan"
                ? "border-cyan-300/[0.14] hover:border-cyan-200/[0.26]"
                : tool.accent === "emerald"
                  ? "border-emerald-300/[0.14] hover:border-emerald-200/[0.26]"
                  : "border-violet-300/[0.16] hover:border-violet-200/[0.28]"
            }`}
          >
            <div className="relative border-b border-white/[0.07] p-6">
              {tool.badge ? (
                <span className={`absolute right-4 top-3 rounded-full px-3 py-1 text-[0.65rem] font-black ${
                  tool.badge === "FREEBIE" ? "bg-emerald-400 text-[#062016]" : "bg-violet-500 text-white"
                }`}>
                  {tool.badge}
                </span>
              ) : null}
              <div className={`rounded-xl border p-4 font-mono text-[0.68rem] ${
                tool.accent === "cyan"
                  ? "border-emerald-300/[0.22] bg-emerald-300/[0.045] text-emerald-300"
                  : tool.accent === "emerald"
                    ? "border-violet-300/[0.20] bg-violet-400/[0.08] text-violet-200"
                    : "border-cyan-300/[0.16] bg-[#070914] text-cyan-300"
              }`}>
                <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <strong>{tool.name.replace(" Pro", " v2.4")}</strong>
                  <span className="rounded bg-emerald-400/[0.16] px-2 py-1 text-[0.58rem] text-emerald-200">
                    AE 2022-2026
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-bold text-white">
                  <span className="rounded bg-violet-500/45 py-2">Ease Curve</span>
                  <span className="rounded bg-violet-500/35 py-2">Anchor Center</span>
                  <span className="rounded bg-violet-500/35 py-2">Stagger Keys</span>
                </div>
                <div className="mt-4 flex justify-between rounded bg-black/35 px-2 py-2">
                  <span className="text-zinc-500">Preset: Bounce Soft</span>
                  <span>Apply [1-Click]</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded border border-violet-200/[0.18] bg-violet-300/[0.10] px-3 py-1 font-mono text-[0.68rem] text-violet-100">
                  {tool.meta}
                </span>
                <span className="font-mono text-[0.68rem] text-zinc-500">
                  {tool.compatibility}
                </span>
              </div>
              <h3 className="text-2xl font-black leading-tight text-white">{tool.name}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-400">{tool.description}</p>

              <div className="mt-7 border-t border-white/[0.08] pt-5">
                <p className="text-sm text-zinc-400">
                  {tool.price === "$0" ? "Descarga Libre" : "Licencia Individual"}
                </p>
                <div className="mt-1 flex items-end gap-1">
                  <strong className={`text-3xl font-black ${tool.price === "$0" ? "text-emerald-300" : "text-white"}`}>
                    {tool.price}
                  </strong>
                  <span className="pb-1 text-xs text-zinc-400">USD</span>
                </div>
                <a
                  href={tool.href}
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    tool.accent === "emerald"
                      ? "border-emerald-300/[0.22] bg-emerald-400/[0.14] text-emerald-200 hover:bg-emerald-400/[0.20] focus-visible:outline-emerald-200"
                      : tool.accent === "cyan"
                        ? "border-white/[0.14] bg-white/[0.035] text-zinc-100 hover:bg-white/[0.07] focus-visible:outline-cyan-200"
                        : "border-violet-300/30 bg-violet-500 text-white hover:bg-violet-400 focus-visible:outline-violet-200"
                  }`}
                >
                  {tool.action}
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
