"use client";

import { motion } from "framer-motion";
import { FaBehance, FaLinkedinIn, FaVimeoV } from "react-icons/fa6";
import { FormEvent, useState } from "react";

const email = "hola@burgosinmotion.com";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const sender = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "Proyecto Burgos in Motion");
    const message = String(formData.get("message") ?? "");
    const body = encodeURIComponent(
      `Nombre: ${name}\nCorreo: ${sender}\n\n${message}`,
    );

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <motion.section
      id="contacto"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-6 md:pb-24 md:pt-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.12fr] lg:items-start">
        <div className="pt-2">
          <p className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
            CONTACTO
          </p>
          <h2 className="max-w-xl text-[2.75rem] font-black leading-[0.98] tracking-tight text-zinc-50 md:text-5xl">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="mt-8 max-w-xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
            Convirtámoslo en una experiencia digital inolvidable. Escríbeme para conversar sobre tu próximo proyecto de motion graphics o e-learning.
          </p>

          <div className="mt-12 flex max-w-xl items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#05060A]/76 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
            <div className="flex items-center gap-4">
              <span className="text-2xl text-cyan-300" aria-hidden="true">✉</span>
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-zinc-500">
                  Email Directo
                </p>
                <a
                  href={`mailto:${email}`}
                  className="font-bold text-zinc-50 transition hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                >
                  {email}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-lg bg-white/[0.07] px-4 py-2 font-mono text-xs font-bold text-zinc-100 transition hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>

          <div className="mt-6 flex gap-4">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/dgoburgos/", icon: FaLinkedinIn },
              { label: "Behance", href: "https://www.behance.net/dgoburgoss", icon: FaBehance },
              { label: "Vimeo", href: "https://vimeo.com/burgoss", icon: FaVimeoV },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.055] text-xs font-bold text-zinc-400 transition hover:border-white/[0.12] hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                <social.icon aria-hidden="true" className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={submitForm}
          className="rounded-[1.5rem] border border-white/[0.08] bg-[#111827]/78 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 font-mono text-xs font-bold text-zinc-400">
              Nombre Completo
              <input
                name="name"
                required
                placeholder="Tu nombre"
                className="rounded-xl border border-white/[0.08] bg-[#05060A]/78 px-4 py-3 font-sans text-base font-medium text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-200/40"
              />
            </label>
            <label className="grid gap-2 font-mono text-xs font-bold text-zinc-400">
              Correo Electrónico
              <input
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="rounded-xl border border-white/[0.08] bg-[#05060A]/78 px-4 py-3 font-sans text-base font-medium text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-200/40"
              />
            </label>
          </div>

          <label className="mt-5 grid gap-2 font-mono text-xs font-bold text-zinc-400">
            Asunto
            <select
              name="subject"
              className="rounded-xl border border-white/[0.08] bg-[#05060A]/78 px-4 py-3 font-sans text-base font-bold text-zinc-100 outline-none transition focus:border-cyan-200/40"
            >
              <option>Proyecto Motion Graphics</option>
              <option>E-Learning Storyline</option>
              <option>Consulta general</option>
            </select>
          </label>

          <label className="mt-5 grid gap-2 font-mono text-xs font-bold text-zinc-400">
            Mensaje
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Cuéntame sobre los detalles de tu proyecto o requerimiento..."
              className="resize-y rounded-xl border border-white/[0.08] bg-[#05060A]/78 px-4 py-3 font-sans text-base font-medium text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-200/40"
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-violet-500 px-6 py-4 font-bold text-white shadow-[0_16px_40px_rgba(99,102,241,0.28)] transition hover:-translate-y-0.5 hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-200 motion-reduce:hover:translate-y-0"
          >
            <span aria-hidden="true">✈</span>
            Enviar Mensaje
          </button>
        </form>
      </div>
    </motion.section>
  );
}
