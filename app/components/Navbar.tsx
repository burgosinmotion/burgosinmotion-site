"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled
          ? "border-b border-white/[0.07] bg-[rgba(8,10,18,0.66)] py-1 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-[22px]"
          : "border-b border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Image
          src="/logo_burgosinmotion.svg"
          alt="Burgos in Motion"
          width={180}
          height={70}
          priority
          className="w-48 h-auto"
        />

        <nav className="hidden gap-8 text-sm text-zinc-200/90 md:flex">
          <a href="#inicio" className="group relative transition duration-300 ease-out hover:text-white hover:opacity-95">Inicio <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
          <a href="#servicios" className="group relative transition duration-300 ease-out hover:text-white hover:opacity-95">Servicios<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
          <a href="#showreel" className="group relative transition duration-300 ease-out hover:text-white hover:opacity-95">Showreel<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
          <a href="#proyectos" className="group relative transition duration-300 ease-out hover:text-white hover:opacity-95">Proyectos<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
          <a href="#productos" className="group relative transition duration-300 ease-out hover:text-white hover:opacity-95">Productos<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
          <a href="#sobre-mi" className="group relative transition duration-300 ease-out hover:text-white hover:opacity-95">Sobre mí<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
          <a href="#contacto" className="group relative transition duration-300 ease-out hover:text-white hover:opacity-95">Contacto<span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" /></a>
        </nav>
      </div>
    </header>
  );
}
