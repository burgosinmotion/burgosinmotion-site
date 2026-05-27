"use client";

import { motion } from "framer-motion";
export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
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
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-20 flex justify-center"
      >
        <div className="flex h-14 w-8 justify-center rounded-full border border-white/20">
          <div className="mt-2 h-3 w-3 rounded-full bg-white/70" />
        </div>
      </motion.div>

      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold tracking-[0.2em]">
            BURGOS IN MOTION
          </h1>

          <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              Work
            </a>
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              Services
            </a>
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              Products
            </a>
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              About
            </a>
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-zinc-400">
            Motion Design • Interactive Learning • Creative Development
          </p>

          <h1 className="mb-8 text-6xl font-bold leading-none tracking-tight md:text-8xl lg:text-[10rem]">
            Designing
            <br />
            Digital
            <br />
            Experiences
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            Burgos In Motion creates cinematic digital experiences combining
            motion, interaction and learning to build memorable products and
            immersive storytelling.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-8 py-4 text-black transition hover:scale-105">
              Explore Projects
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 text-white transition hover:border-white">
              Let’s Work Together
            </button>
          </div>
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
              text: "Templates, ScriptUI tools and creative resources for creators.",
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
              description:
                "Immersive digital learning experiences with interaction-driven storytelling.",
              image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
            },
            {
              title: "Motion Graphics System",
              category: "Motion Design • Visual Identity",
              description:
                "Cinematic animation systems for modern digital brands and experiences.",
               image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
            },
            {
              title: "ScriptUI Creative Toolkit",
              category: "After Effects • Creative Development",
              description:
                "Workflow-enhancing tools and interfaces for motion designers.",
              image:
                "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1600&auto=format&fit=crop",
            },
          ].map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              className="group relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm transition duration-500 hover:border-white/20"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 scale-100 bg-cover bg-center transition duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${project.image})`,
                }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Gradient Overlay */}
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
        © 2026 Burgos In Motion — Designing immersive digital experiences.
      </footer>
    </main>
  );
}