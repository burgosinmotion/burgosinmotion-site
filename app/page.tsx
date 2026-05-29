"use client";

import { motion, Variants, useMotionValue, useSpring } from "framer-motion";
import MagneticButton from "./magnetic-button";

export default function Home() {
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

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Background Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[120px]"
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-3xl"
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
          className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-3xl"
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
          className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-3xl"
        />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold tracking-[0.2em]">
            BURGOS IN MOTION
          </h1>

          <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
            <a href="#" className="transition duration-300 hover:text-white">Home</a>
            <a href="#" className="transition duration-300 hover:text-white">Work</a>
            <a href="#" className="transition duration-300 hover:text-white">Services</a>
            <a href="#" className="transition duration-300 hover:text-white">Products</a>
            <a href="#" className="transition duration-300 hover:text-white">About</a>
            <a href="#" className="transition duration-300 hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section Reemplazado */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
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
            Motion Design • Interactive Learning • Creative Development
          </motion.p>

          {/* Título principal con toque editorial */}
          <motion.h1 
            variants={itemVariants} 
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[1.05] mb-8"
          >
            Cinematic Digital <br />
            <span className="text-zinc-500 italic font-serif font-light">Experiences.</span>
          </motion.h1>

          {/* Párrafo descriptivo */}
          <motion.p 
            variants={itemVariants} 
            className="text-base md:text-lg lg:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Burgos in Motion creates cinematic digital experiences combining
            motion, interaction, and learning to build memorable products and
            immersive storytelling.
          </motion.p>

          {/* Botones Call to Action */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative px-8 py-4 bg-white text-black text-sm font-semibold uppercase tracking-wider rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-3">
                Explore Projects
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 text-white transition duration-300 hover:border-white hover:bg-white/5 text-sm font-semibold uppercase tracking-wider">
              Let’s Work Together
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            SERVICES
          </p>
          <h2 className="text-5xl font-bold">
            Creative solutions with motion & interaction
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
              text: "Visual storytelling, animation systems and branded motion experiences.",
            },
            {
              title: "Interactive Learning",
              text: "Immersive e-learning experiences using Storyline and gamification.",
            },
            {
              title: "Creative Development",
              text: "Interactive interfaces, web experiences and experimental UI systems.",
            },
            {
              title: "Digital Products",
              text: "Custom ScriptUI extensions like MotionDeck and CornerFlex, along with workflow tools for creators.",
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
      </section>

      {/* Featured Projects */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              FEATURED WORK
            </p>
            <h2 className="max-w-3xl text-5xl font-bold leading-tight">
              Selected projects blending motion, interaction & storytelling
            </h2>
          </div>
          <button className="rounded-full border border-white/15 px-6 py-3 transition hover:border-white">
            View All Projects
          </button>
        </div>

        <div className="grid gap-8">
          {[
            {
              title: "Interactive Learning Experience",
              category: "Storyline • Gamification • UX",
              description: "Immersive digital learning experiences with interaction-driven storytelling.",
              image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
            },
            {
              title: "Motion Graphics System",
              category: "Motion Design • Visual Identity",
              description: "Cinematic animation systems for modern digital brands and experiences.",
              image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
            },
            {
              title: "ScriptUI Creative Toolkit",
              category: "After Effects • Creative Development",
              description: "Workflow-enhancing tools including custom Graph Editor panels and automated workflow utilities.",
              image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1600&auto=format&fit=crop",
            },
          ].map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              className="group relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm transition duration-500 hover:border-white/20"
            >
              <div
                className="absolute inset-0 scale-100 bg-cover bg-center transition duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-fuchsia-500/10" />
            
              <div className="relative z-10 flex h-full flex-col justify-between gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
                    {project.category}
                  </p>
                  <h3 className="mb-6 text-4xl font-bold transition duration-500 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="text-lg leading-8 text-zinc-400">
                    {project.description}
                  </p>
                </div>
                <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white/10">
                  View Project
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-zinc-500">
        © 2026 Burgos in Motion — Designing immersive digital experiences.
      </footer>
    </main>
  );
}