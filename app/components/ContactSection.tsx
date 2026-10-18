"use client";

import { motion } from "framer-motion";
import { FaBehance, FaLinkedinIn, FaVimeoV } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import ContactButton, { contactEmail as email } from "./ContactMethods";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  const [copyFeedback, setCopyFeedback] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyFeedback("Correo copiado");
    } catch {
      setCopyFeedback("Selecciona el correo y cópialo manualmente.");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyFeedback(""), 4000);
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-6 md:pb-24 md:pt-32"
    >
      <span id="contacto" className="absolute -top-28" aria-hidden="true" />
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

          <div className="mt-12 flex max-w-xl flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#121212]/76 p-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="text-2xl text-cyan-300" aria-hidden="true">✉</span>
              <div className="min-w-0">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-zinc-500">
                  Email Directo
                </p>
                <ContactButton
                  className="break-all text-left font-bold text-zinc-50 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                >
                  {email}
                </ContactButton>
              </div>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full bg-white/[0.07] px-4 py-2 font-mono text-xs font-bold text-zinc-100 transition hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              Copiar
            </button>
            <p role="status" className="w-full text-sm text-cyan-200 empty:hidden">{copyFeedback}</p>
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.055] text-xs font-bold text-zinc-400 transition hover:border-cyan-300 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                <social.icon aria-hidden="true" className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </motion.section>
  );
}
