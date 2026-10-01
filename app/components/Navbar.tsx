"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Showreel", href: "/#showreel" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Demos Interactivas", href: "/demos-interactivas" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ease-out ${
        scrolled
          ? "border-white/[0.07] bg-[rgba(8,10,18,0.74)] py-1 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-[22px]"
          : "border-white/[0.08] bg-[#0b1020]/72 py-2 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-6">
        <Link
          href="/"
          aria-label="Ir al inicio"
          className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70"
        >
          <span className="min-w-0">
            <Image
              src="/logo_burgosinmotion.svg"
              alt="Burgos in Motion"
              width={180}
              height={70}
              priority
              className="h-auto w-44"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-semibold text-zinc-200/85 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative inline-flex items-center rounded-sm transition duration-300 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
            >
              <span>{item.label}</span>
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.04] text-white lg:hidden"
        >
          <span aria-hidden="true" className="text-xl">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/[0.08] bg-[#0b1020]/94 px-5 py-4 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
