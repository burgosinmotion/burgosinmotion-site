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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-cyan-400 bg-black/95 backdrop-blur-3xl py-1"
          : "bg-transparent py-6"
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

        <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
          <a href="#inicio" className="transition duration-300 hover:text-white">Inicio </a>
          <a href="#servicios" className="transition duration-300 hover:text-white">Servicios</a>
          <a href="#showreel" className="transition duration-300 hover:text-white">Showreel</a>
          <a href="#proyectos" className="transition duration-300 hover:text-white">Proyectos</a>
          <a href="#productos" className="transition duration-300 hover:text-white">Productos</a>
          <a href="#sobre-mi" className="transition duration-300 hover:text-white">Sobre mí</a>
          <a href="#contacto" className="transition duration-300 hover:text-white">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
