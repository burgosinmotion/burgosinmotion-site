"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonGradientStyles } from "./buttonStyles";

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Portfolio", href: "/#proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Demos", href: "/demos-interactivas" },
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
        ? "border-white/[0.07] bg-[rgba(18,18,18,0.3)] py-1 backdrop-blur-[22px]"
        : "border-white/[0.08] bg-[#121212]/30 py-2 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-6">
        <Link
          href="/#hero"
          aria-label="Ir al inicio"
          className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70"
        >
          <Image
            src="/brand/icon-header-burgosinmotion-white.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-xs font-semibold text-zinc-100 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative inline-flex items-center rounded-sm transition duration-300 ease-out hover:text-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            href="/#contact"
            className={`${buttonGradientStyles} navbar-contact min-h-[1.875rem] px-5 py-1.5 text-xs`}
          >
            Contacto
          </Link>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] text-white transition hover:border-cyan-400 hover:text-cyan-400 lg:hidden"
        >
          <span aria-hidden="true" className="text-xl">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/[0.08] bg-[#121212]/94 px-5 py-4 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className={buttonGradientStyles}
            >
              Contacto
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
