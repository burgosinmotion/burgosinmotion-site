"use client";
import Image from "next/image";
import {
  motion,
  Variants,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import CountUp from "react-countup";
import MagneticButton from "./magnetic-button";
import { useState, useEffect } from "react";

export default function Home() {
  
  const { scrollY } = useScroll();

const parallaxY = useTransform(
  scrollY,
  [0, 2000],
  [0, -120]
);
    const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 50, 
    stiffness: 200,
  });

  const smoothY = useSpring(mouseY, {
    damping: 50,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - 250);
    mouseY.set(e.clientY - 250);
  };
  // Variantes de Framer Motion para animar los elementos del Hero en cascada
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

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
    <main
      onMouseMove={handleMouseMove}
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#050505]
        via-[#09090F]
        to-[#06070A]
        text-white
      "
    >
      {/* Background Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[700px] w-[700px] rounded-full bg-fuchsia-500/25 blur-[320px]"
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="
      absolute inset-0
      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_50%)]
      " />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/35 blur-[220px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/30 blur-[220px]"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/30 blur-[220px]"
        />
                <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[35%]
            top-[55%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-cyan-500/20
            blur-[260px]
          "
        />
      </div>

      {/* Navbar */}
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

      {/* Hero Section Reemplazado */}
      <section
        id="inicio"
        className="relative flex min-h-screen items-center justify-center px-6 pt-20"
      >        
      {/* Floating Glass Panels */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute right-[8%] top-[22%] hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl lg:block"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
          ENFOQUE ACTUAL
        </p>

        <p className="mt-2 text-lg font-semibold">
          Experiencias interactivas
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-[18%] left-[8%] hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl lg:block"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
          HERRAMIENTAS
        </p>

        <p className="mt-2 text-lg font-semibold">
          Storyline • After Effects • Motion Design
        </p>
      </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="z-10 text-center max-w-5xl"
        >
          {/* Etiqueta superior */}
          <motion.p 
            variants={itemVariants} 
            className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-zinc-400 mb-6"
          >
            Motion Graphics • Aprendizaje Interactivo • Desarrollo Creativo
          </motion.p>

          {/* Título principal con toque editorial */}
          <motion.h1 
            variants={itemVariants} 
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[1.05] mb-8"
          >
            Motion<br />
            <span className="text-zinc-500 italic font-serif font-light">Interacción<br />que conecta.</span>
          </motion.h1>

          {/* Párrafo descriptivo */}
          <motion.p 
            variants={itemVariants} 
            className="text-base md:text-lg lg:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Diseño experiencias digitales que combinan motion graphics,
            e-learning interactivo y desarrollo creativo para crear
            productos memorables.
          </motion.p>

          {/* Botones Call to Action */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative px-8 py-4 bg-white text-black text-sm font-semibold uppercase tracking-wider rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-3">
                Ver Proyectos
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 text-white transition duration-300 hover:border-white hover:bg-white/5 text-sm font-semibold uppercase tracking-wider">
              Trabajemos Juntos
            </button>
          </motion.div>
        </motion.div>
      </section>

      

      {/* SERVICES */}
      <motion.section
        id="servicios"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      >
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            SERVICIOS
          </p>
          <h2 className="text-5xl font-bold">
            Soluciones creativas a través<br /> del motion y la interacción
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              title: "Motion Graphics",
              text: "Narrativa visual, sistemas de animación y experiencias de marca impulsadas por motion graphics.",
            },
            {
              title: "Aprendizaje Interactivo",
              text: "Experiencias e-learning inmersivas desarrolladas con Storyline, interacción y gamificación.",
            },
            {
              title: "Desarrollo Creativo",
              text: "Interfaces interactivas, experiencias web y soluciones digitales desarrolladas a medida.",
            },
            {
              title: "Productos Digitales",
              text: "Herramientas y extensiones personalizadas para optimizar flujos de trabajo creativos y productivos.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:-translate-y-2 hover:border-white/20 hover:bg-white/10"
            >
              <h3 className="mb-4 text-2xl font-semibold">
                {service.title}
              </h3>
              <p className="leading-7 text-zinc-400">{service.text}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Showreel */}
      <motion.section
        id="showreel"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      >
        {/* Título */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            SHOWREEL
          </p>

          <h2 className="text-5xl font-bold">
            Una recopilación de mis mejores trabajos
          </h2>

          <p className="mt-6 text-zinc-400">
            Motion graphics, e-learning y desarrollo creativo.
          </p>
        </div>

        {/* Contenedor */}
        <div
          className="
          relative
          overflow-hidden
          rounded-[2rem]
          border border-white/10
          shadow-[0_0_80px_rgba(217,70,239,0.05)]
        "
        >

          {/* Glow izquierdo */}
          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[180px]" />

          {/* Glow derecho */}
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[180px]" />

          {/* Área del video */}
          <div
            className="
              relative
              aspect-video
              overflow-hidden
              rounded-[1.5rem]
              border border-white/10
              bg-gradient-to-br
              from-fuchsia-500/5
              via-transparent
              to-cyan-500/5
            "
          >

            {/* Grid suave */}
            <div
              className="
                absolute
                inset-0
                opacity-30
              "
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Glow central */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[150px]" />

            {/* Video Showreel */}
            <div className="relative z-10 h-full w-full">
              <iframe
                src="https://player.vimeo.com/video/575675039?h=647682d12b"
                className="h-full w-full rounded-[1.5rem]"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Etiqueta inferior */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-6 py-3 text-sm text-zinc-300 backdrop-blur-xl">
              🎬 Showreel video will be embedded here
            </div>

          </div>
        </div>

        {/* Información */}
        <div className="mt-10 text-center text-zinc-500">

          <p>
            Más de 8 años creando experiencias digitales inmersivas.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
            <span>🎬 Motion Graphics</span>
            <span>📚 E-Learning</span>
            <span>💻 Desarrollo Creativo</span>
          </div>

        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        id="proyectos"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      >
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              PROYECTOS DESTACADOS
            </p>
            <h2 className="max-w-3xl text-5xl font-bold leading-tight">
              Proyectos que combinan motion, interacción y narrativa digital
            </h2>
          </div>
          <button className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-md transition duration-300 hover:border-white hover:bg-white/20">
            Ver Todos los Proyectos
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Motion Graphics */}
          <div className="group relative col-span-12 md:col-span-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] min-h-[500px]">

            <Image
              src="/projects/motion-graphics-project.png"
              alt="Motion Graphics"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Glow hover*/}
              <div
                className="
                  absolute
                  -top-20
                  right-0
                  h-60
                  w-60
                  rounded-full
                  bg-cyan-500/20
                  blur-3xl
                  opacity-0
                  transition
                  duration-700
                  group-hover:opacity-100
                "
              />

            {/* Texto */}
            <div className="absolute bottom-8 left-8 z-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Motion Graphics
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                Sistemas visuales y animación
              </h3>
              
            </div>

          </div>

          {/* E-learning */}
          <div className="group relative col-span-12 md:col-span-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] min-h-[500px]">

            <Image
              src="/projects/storyline-project.png"
              alt="E-Learning"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
              {/* Glow hover*/}
              <div
                className="
                  absolute
                  -top-20
                  right-0
                  h-60
                  w-60
                  rounded-full
                  bg-fuchsia-500/20
                  blur-3xl
                  opacity-0
                  transition
                  duration-700
                  group-hover:opacity-100
                "
              />

            {/* Texto */}
            <div className="absolute bottom-8 left-8 z-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                E-Learning
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                Experiencias inmersivas
              </h3>
            </div>

          </div>

          {/* MotionDeck */}
          <div className="group relative col-span-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] min-h-[550px]">

            <Image
              src="/projects/motiondeck-project.png"
              alt="MotionDeck"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            {/* Texto */}
            <div className="absolute bottom-8 left-8 z-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Herramientas Creativas
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                MotionDeck & ScriptUI
              </h3>
            </div>

          </div>

        </div>
      </motion.section>

        {/* About */}
        <motion.section
          id="sobre-mi"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mx-auto max-w-7xl px-6 py-32"
        >
          <div className="grid items-center gap-20 lg:grid-cols-2">

            {/* LEFT COLUMN */}
            <div>

              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
                SOBRE MÍ
              </p>

              <h2 className="mb-8 text-5xl font-bold leading-tight">
                Motion, interacción y narrativa con propósito.
              </h2>

              <p className="mb-6 text-lg leading-8 text-zinc-400">
                Soy Diego Burgos, creador de Burgos in Motion.
              </p>

              <p className="mb-6 text-lg leading-8 text-zinc-400">
                Diseño experiencias digitales que combinan motion graphics,
                aprendizaje interactivo y desarrollo creativo.
              </p>

              <p className="text-lg leading-8 text-zinc-400">
                Desde proyectos e-learning desarrollados en Storyline hasta
                herramientas personalizadas para After Effects y experiencias
                web interactivas, mi objetivo es crear productos que conecten
                con las personas, faciliten el aprendizaje y generen impacto.
              </p>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6">

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="text-4xl font-bold"><CountUp end={8} duration={2} />+</h3>
                  <p className="mt-2 text-zinc-400">
                    Años de Experiencia
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="text-4xl font-bold"><CountUp end={100} duration={2} />+</h3>
                  <p className="mt-2 text-zinc-400">
                    Proyectos Formativos
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="text-4xl font-bold"><CountUp end={50} duration={2} />+</h3>
                  <p className="mt-2 text-zinc-400">
                    Proyectos Creativos
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="text-4xl font-bold"><CountUp end={5} duration={2} />+</h3>
                  <p className="mt-2 text-zinc-400">
                    Herramientas Digitales
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center"
            >

              {/* Glow Background */}
              <div className="absolute h-[500px] w-[500px] rounded-full bg-fuchsia-500/30 blur-[220px]" />

              <div className="absolute h-[350px] w-[350px] rounded-full bg-cyan-500/30 blur-[220px]" />

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 backdrop-blur-sm">

                <Image
                  src="/diego.jpg"
                  alt="Diego Burgos"
                  width={380}
                  height={500}
                  className="h-[500px] w-[380px] rounded-[1.5rem] object-cover"
              />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              </div>

              {/* Name & Titles */}
              <div className="mt-8 text-center">

                <h3 className="text-3xl font-bold">
                  Diego Burgos
                </h3>

                <div className="mt-4 flex flex-col gap-1 text-zinc-400">

                  <span>Diseñador Motion</span>

                  <span>Desarrollador Creativo</span>

                  <span>Especialista en E-Learning</span>

                </div>

              </div>

            </motion.div>

          </div>
        </motion.section>

      {/* Contacto */}
        <motion.section
          id="contacto"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl px-6 py-32"
        >
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.04] p-16 backdrop-blur-xl">

            {/* Glow Background */}
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-[220px]" />

            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/30 blur-[220px]" />

            {/* Content */}
            <div className="relative z-10 text-center">

              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
                CONTACTO
              </p>

              <h2 className="mx-auto mb-8 max-w-4xl text-5xl md:text-7xl font-bold tracking-tight">
                ¿Tienes una idea, proyecto o desafío?
              </h2>

              <p className="mx-auto mb-12 max-w-2xl text-lg leading-8 text-zinc-400">
                Convirtámoslo en una experiencia digital que combine
                motion graphics, aprendizaje interactivo y desarrollo creativo.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

                <a
                  href="mailto:hola@burgosinmotion.com"
                  className="rounded-full bg-white
                  hover:scale-110
                  hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
                  px-8 py-4 font-semibold text-black transition hover:scale-105"
                >
                  Hablemos
                </a>

                <a
                  href="https://www.linkedin.com/in/dgoburgos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-8 py-4 transition hover:border-white"
                >
                  LinkedIn
                </a>

              </div>
                
              <div className="mt-12 flex flex-col items-center">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />
              </div>

            </div>

          </div>
        </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-zinc-500">
        © 2026 Burgos in Motion — Diseñando experiencias digitales inmersivas.
      </footer>
    </main>
  );
}