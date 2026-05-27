export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-400">
          Motion Design • Interactive Learning • Creative Technology
        </p>

        <h1 className="mb-6 text-6xl font-bold md:text-8xl">
          Burgos In Motion
        </h1>

        <p className="mb-4 text-2xl font-light md:text-3xl">
          Ideas en movimiento.
        </p>

        <p className="mb-10 text-2xl font-light md:text-3xl">
          Experiencias con impacto.
        </p>

        <p className="max-w-2xl text-lg text-zinc-400">
          Creamos experiencias digitales que combinan diseño, movimiento e
          interactividad para comunicar, enseñar y generar impacto.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-white px-6 py-3 text-black transition hover:scale-105">
            Ver proyectos
          </button>

          <button className="rounded-xl border border-zinc-600 px-6 py-3 transition hover:border-white">
            Contactar
          </button>
        </div>
      </section>

      {/* Servicios */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Servicios
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Motion Graphics
            </h3>
            <p className="text-zinc-400">
              Animaciones y contenido visual para comunicar ideas con claridad.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Interactive Learning
            </h3>
            <p className="text-zinc-400">
              Cursos, simulaciones y experiencias de aprendizaje digital.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Interactive Development
            </h3>
            <p className="text-zinc-400">
              Storyline, JavaScript y gamificación para experiencias memorables.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Creative Tools
            </h3>
            <p className="text-zinc-400">
              ScriptUI, plantillas y recursos para creadores digitales.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}