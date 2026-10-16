import Image from "next/image";
import Link from "next/link";
import type { PortfolioCategory } from "./categoryData";
import { getCategoryById } from "./categoryData";
import InteractiveDemo from "./InteractiveDemo";
import MotionProjectSections from "./MotionProjectSections";
import { getNextCaseStudyProject, type PortfolioProject } from "./projectData";
import type { ProjectCaseStudyContent } from "./projectCaseStudyData";

function NextProject({
  project,
}: {
  project: PortfolioProject | undefined;
}) {
  if (!project?.slug) {
    return null;
  }

  const linkClassName =
    "mt-4 inline-flex min-h-12 max-w-3xl items-center gap-4 text-xl font-semibold leading-snug text-zinc-100 transition-colors hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:text-2xl";

  return (
    <nav
      aria-label="Navegación de proyectos"
      className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-12 sm:px-6 md:py-16"
    >
      <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
        Siguiente proyecto
      </p>
      <Link href={project.slug} className={linkClassName}>
        <span>
          {project.client ? (
            <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {project.client}
            </span>
          ) : null}
          {project.title}
        </span>
        <span aria-hidden="true" className="shrink-0 text-cyan-200">→</span>
      </Link>
    </nav>
  );
}

function ProjectHero({
  project,
  categories,
  content,
}: {
  project: PortfolioProject;
  categories: PortfolioCategory[];
  content: ProjectCaseStudyContent;
}) {
  const hero = content.hero;
  const headline = hero?.headline;

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-32 sm:px-6 md:pb-20 md:pt-40 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <div>
        <Link
          href="/#proyectos"
          className="mb-10 inline-flex min-h-11 items-center gap-2 rounded-sm font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        >
          <span aria-hidden="true">←</span>
          Volver a proyectos
        </Link>
        <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">
          PROJECT / {hero?.index ?? "01"}
        </p>
        {project.client || hero?.kicker ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {project.client ?? hero?.kicker}
          </p>
        ) : null}
        <h1 className="max-w-2xl text-5xl font-black leading-[0.94] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
          {headline
            ? headline.map((line, index) => (
                <span key={line} className="block">
                  {index > 0 ? " " : null}
                  {line}
                  {index === headline.length - 1 ? (
                    <span className="text-cyan-200">.</span>
                  ) : null}
                </span>
              ))
            : (
                <>
                  {project.title}
                  <span className="text-cyan-200">.</span>
                </>
              )}
        </h1>
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Categorías del proyecto">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={category.slug}
                className="inline-flex min-h-10 items-center rounded-full border border-white/[0.12] bg-white/[0.035] px-4 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={hero?.actionHref ?? "#demo"}
          className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-cyan-200/30 px-6 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-200/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        >
          {hero?.actionLabel ?? "Explorar la experiencia"}
          <span aria-hidden="true">↓</span>
        </Link>
      </div>

      <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#090a0c]">
        {project.media && project.mediaType === "video" ? (
          <video
            className="h-full w-full object-contain"
            poster={project.thumbnail}
            playsInline
            controls
            preload="none"
            aria-label={`Vista previa de ${project.title}`}
          >
            <source src={project.media} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            quality={75}
            className="object-contain"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
        />
        <figcaption className="absolute bottom-5 left-5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/75 sm:bottom-7 sm:left-7">
          {hero?.caption ??
            `${project.client ?? "Experiencia interactiva"} / Experiencia interactiva`}
        </figcaption>
      </figure>
    </section>
  );
}

export default function ProjectCaseStudy({
  project,
  content,
}: {
  project: PortfolioProject;
  content: ProjectCaseStudyContent;
}) {
  const categories = project.categories
    .map((categoryId) => getCategoryById(categoryId))
    .filter((category): category is PortfolioCategory => Boolean(category));
  const isNarrative = content.layoutVariant === "narrative";
  const isMotion = content.layoutVariant === "motion";
  const interactionSection = content.interactionSection;
  const nextProject = getNextCaseStudyProject(project.id);

  return (
    <main>
      <ProjectHero project={project} categories={categories} content={content} />

      <section
        aria-label="Resumen del proyecto"
        className="mx-auto grid max-w-7xl gap-10 border-t border-white/[0.08] px-5 py-12 sm:px-6 md:py-16 lg:grid-cols-[0.75fr_1.25fr]"
      >
        {content.overview?.fields ? (
          <dl className="grid grid-cols-2 gap-x-5 gap-y-7">
            {content.overview.fields.map((field) => (
                <div key={field.label}>
                  <dt className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {field.label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-zinc-100 sm:text-base">
                    {field.value}
                  </dd>
                </div>
            ))}
          </dl>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {project.client ? (
                <div>
                  <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Cliente
                  </p>
                  <p className="mt-2 text-base font-semibold text-zinc-100">{project.client}</p>
                </div>
            ) : null}
            <div>
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Tipo
                </p>
                <p className="mt-2 text-base font-semibold text-zinc-100">
                  {content.overview?.type ?? "Experiencia interactiva"}
                </p>
            </div>
            <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Disciplinas
                </p>
                <ul className="mt-2 space-y-1 text-sm leading-6 text-zinc-300">
                  {(content.overview?.disciplines ?? categories.map((category) => category.title)).map(
                    (discipline) => (
                      <li key={discipline}>{discipline}</li>
                    ),
                  )}
                </ul>
            </div>
          </div>
        )}
        <div className="max-w-3xl lg:pl-8">
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Sobre el proyecto
          </p>
          <p className="mt-4 text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
            {content.intro}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400">
            {content.contribution}
          </p>
        </div>
      </section>

      {isMotion ? (
        <MotionProjectSections content={content} />
      ) : (
        <>
      <section className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-cyan-200">
              {content.experience?.label ?? "LA EXPERIENCIA"}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
              {content.experience?.title ?? "Una mecánica sencilla de entender y probar."}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:justify-self-end md:text-base">
            {content.experience?.description ??
              "La pantalla observada presenta un tablero de ocho tarjetas, indicadores visuales de tiempo y vidas, una opción de ayuda y el control “Revisar”. La experiencia completa está disponible en la demo."}
          </p>
        </div>

        <div
          className={
            isNarrative
              ? "grid gap-px overflow-hidden rounded-xl border border-violet-200/15 bg-violet-200/15 md:grid-cols-3"
              : "grid gap-4 md:grid-cols-3"
          }
        >
          {content.mechanics.map((step, index) => (
            <article
              key={step.title}
              className={
                isNarrative
                  ? "bg-[#111214] p-5 sm:p-7"
                  : "border-t border-cyan-200/30 bg-white/[0.025] p-5 sm:p-6"
              }
            >
              <p className="font-mono text-xs font-bold tracking-[0.16em] text-cyan-200">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-xl font-semibold text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-fuchsia-200">
            {content.interfaceSection?.label ?? "DISEÑO DE LA EXPERIENCIA"}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
            {content.interfaceSection?.title ?? "La interfaz también explica cómo participar."}
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
          {content.interfaceDetails.map((detail, index) => (
            <article key={detail.title} className="bg-[#111214] p-6 sm:p-8">
              <p className="font-mono text-xs font-bold text-fuchsia-200">
                0{index + 1} / INTERFAZ
              </p>
              <h3 className="mt-5 text-lg font-semibold text-zinc-100">
                {detail.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {detail.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-cyan-200">
            DETRÁS DE LA INTERACCIÓN
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
            {interactionSection?.title ?? "Diseño + lógica."}
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            {interactionSection?.description ??
              "El trabajo va más allá de la apariencia: organiza el recorrido y conecta la acción de girar las tarjetas con la revisión de los pares seleccionados. Articulate Storyline es el medio de implementación; la experiencia final es el centro del proyecto."}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {(interactionSection?.tags ?? [
              "Diseño",
              "Interfaz",
              "Estructura",
              "Mecánica",
              "Lógica",
              "Implementación multimedia",
            ]).map(
              (discipline) => (
                <li
                  key={discipline}
                  className="rounded-full border border-white/[0.10] px-3 py-2 text-xs text-zinc-300"
                >
                  {discipline}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {content.gallery?.length ? (
        <section className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24">
          <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-zinc-500">
            GALERÍA
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {content.gallery.map((media) => (
              <figure
                key={media.src}
                className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.10] bg-[#090a0c]"
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {project.demoUrl ? (
        <section
          id="demo"
          className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24"
        >
          <div className="mb-9 max-w-3xl">
            <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-cyan-200">
              PRUÉBALO
            </p>
            <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
              Explora la experiencia.
            </h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400 md:text-base">
              La experiencia Storyline se abre al solicitarla; el resto del caso de
              estudio permanece disponible sin cargar su runtime.
            </p>
          </div>
          <InteractiveDemo
            title={project.title}
            poster={project.thumbnail}
            posterAlt={project.thumbnailAlt}
            src={project.demoUrl}
          />
        </section>
      ) : null}
        </>
      )}

      <NextProject project={nextProject} />
    </main>
  );
}
