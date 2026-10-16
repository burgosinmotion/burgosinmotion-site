import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import RevealOnScroll from "./RevealOnScroll";
import { categoryPageData } from "./categoryPageData";
import type { PortfolioCategory } from "./categoryData";
import { portfolioCategories } from "./categoryData";
import { getProjectsByCategory } from "./projectData";

const accentClass = {
  cyan: "text-cyan-300",
  magenta: "text-fuchsia-300",
} as const;

export default function CategoryPage({
  category,
}: {
  category: PortfolioCategory;
}) {
  const categoryIndex = portfolioCategories.findIndex(
    (item) => item.id === category.id,
  );
  const nextCategory =
    portfolioCategories[(categoryIndex + 1) % portfolioCategories.length];
  const sections = categoryPageData[category.id].sections;
  const projects = getProjectsByCategory(category.id);

  return (
    <main>
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40">
        <Link
          href="/#categorias"
          className="mb-10 inline-flex min-h-11 items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        >
          <span aria-hidden="true">←</span>
          Todas las áreas
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:gap-16">
          <div>
            <p
              className={`mb-5 font-mono text-xs font-bold uppercase tracking-[0.3em] ${accentClass[category.accent]}`}
            >
              {category.number} / 06
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl lg:text-8xl">
              {category.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
              {category.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.12] bg-white/[0.035] px-3 py-1.5 text-xs text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={category.relatedHref}
              className="mt-9 inline-flex min-h-11 items-center gap-3 border-b border-white/[0.16] pb-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-cyan-200/60 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              {category.relatedLabel}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.10] bg-[#101112] sm:aspect-[16/10] lg:aspect-[4/3]">
            <Image
              src={category.media}
              alt={category.mediaAlt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              quality={75}
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-[#090a0c]/75 via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-5 left-5 right-5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/65 sm:bottom-7 sm:left-7">
              {"mediaCaption" in category
                ? category.mediaCaption
                : "Visual de referencia"}
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 sm:px-6 md:pb-20">
        {sections.map((section, sectionIndex) => {
          const delay = Math.min(sectionIndex * 45, 135);

          if (section.type === "projects") {
            const cardCount = Math.max(section.slots.length, projects.length);
            const cards = Array.from({ length: cardCount }, (_, index) => {
              const slot = section.slots[index] ?? {
                id: `${category.id}-project-${index + 1}`,
                label: "Proyecto real",
                assetPath: projects[index]?.thumbnail ?? "",
                size: projects[index]?.size ?? "medium",
                aspect: "landscape" as const,
              };

              return { slot, project: projects[index] };
            });

            return (
              <RevealOnScroll
                key={`${section.type}-${sectionIndex}`}
                as="section"
                className="border-t border-white/[0.08] py-16 md:py-24"
                delay={delay}
                duration={600}
                y={24}
              >
                <div className="mb-8 max-w-3xl md:mb-12">
                  <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] text-zinc-500">
                    {section.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
                    {section.title}
                  </h2>
                  {section.description ? (
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                      {section.description}
                    </p>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-12 md:gap-y-10">
                  {cards.map(({ slot, project }, index) => (
                    <ProjectCard
                      key={slot.id}
                      category={category}
                      slot={slot}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </RevealOnScroll>
            );
          }

          if (section.type === "cards") {
            return (
              <RevealOnScroll
                key={`${section.type}-${sectionIndex}`}
                as="section"
                className="border-t border-white/[0.08] py-16 md:py-24"
                delay={delay}
                duration={600}
                y={24}
              >
                <div className="mb-8 max-w-3xl md:mb-12">
                  <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] text-zinc-500">
                    {section.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
                    {section.title}
                  </h2>
                  {section.description ? (
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                      {section.description}
                    </p>
                  ) : null}
                </div>
                <div
                  className={
                    section.layout === "list"
                      ? "divide-y divide-white/[0.10] border-y border-white/[0.10]"
                      : section.layout === "steps"
                        ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  }
                >
                  {section.items.map((item, index) => (
                    <article
                      key={item.title}
                      className={
                        section.layout === "list"
                          ? "grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:items-baseline"
                          : "min-h-36 border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.035] motion-reduce:transition-none sm:p-6"
                      }
                    >
                      <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/75">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-100">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </RevealOnScroll>
            );
          }

          if (section.type === "statement") {
            return (
              <RevealOnScroll
                key={`${section.type}-${sectionIndex}`}
                as="section"
                className="border-t border-white/[0.08] py-16 md:py-24"
                delay={delay}
                duration={650}
                y={20}
              >
                <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.72fr)] md:gap-16">
                  <div>
                    <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] text-zinc-500">
                      {section.eyebrow}
                    </p>
                    <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
                      {section.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
                      {section.description}
                    </p>
                  </div>
                  <ul className="grid content-start grid-cols-2 gap-x-5 gap-y-4 border-l border-white/[0.10] pl-5 sm:pl-8">
                    {section.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-sm font-medium text-zinc-300"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            );
          }

          return (
            <RevealOnScroll
              key={`${section.type}-${sectionIndex}`}
              as="section"
              className="border-t border-white/[0.08] py-16 md:py-24"
              delay={delay}
              duration={600}
              y={24}
            >
              <div className="mb-8 max-w-3xl md:mb-12">
                <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] text-zinc-500">
                  {section.eyebrow}
                </p>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
                  {section.title}
                </h2>
              </div>
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex min-h-32 flex-col justify-between border-t border-white/[0.14] py-5"
                  >
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-300/75">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-8 text-xl font-semibold text-zinc-100 sm:text-2xl">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </RevealOnScroll>
          );
        })}

        <nav
          aria-label="Navegación entre áreas"
          className="border-t border-white/[0.10] py-10 md:py-14"
        >
          <Link
            href={nextCategory.slug}
            className="group grid gap-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cyan-200 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.26em] text-zinc-500">
                SIGUIENTE ÁREA
              </p>
              <span className="font-mono text-xs font-semibold text-cyan-300/75">
                {nextCategory.number} / 06
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-white sm:text-4xl md:text-5xl">
                {nextCategory.title}
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="text-3xl text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-200 motion-reduce:transition-none sm:text-4xl"
            >
              →
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
