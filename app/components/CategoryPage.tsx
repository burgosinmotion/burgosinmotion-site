import Image from "next/image";
import Link from "next/link";
import type { PortfolioCategory } from "./categoryData";
import { buttonGradientStyles, buttonOutlineStyles } from "./buttonStyles";

export default function CategoryPage({
  category,
}: {
  category: PortfolioCategory;
}) {
  return (
    <main>
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-6 md:pb-28 md:pt-44">
        <Link
          href="/#categorias"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 transition hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        >
          <span aria-hidden="true">←</span>
          Todas las áreas
        </Link>

        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p
              className={`mb-5 font-mono text-xs font-bold uppercase tracking-[0.3em] ${
                category.accent === "cyan" ? "text-cyan-300" : "text-fuchsia-300"
              }`}
            >
              CATEGORÍA / {category.number}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
              {category.title}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
              {category.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.12] bg-white/[0.035] px-3 py-1.5 text-xs text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href={category.relatedHref} className={buttonOutlineStyles}>
              {category.relatedLabel}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/contacto" className={buttonGradientStyles}>
              Hablemos
            </Link>
          </div>
        </div>

        <figure className="mt-12 overflow-hidden rounded-[1.5rem] border border-white/[0.10] bg-[#101112] md:mt-16">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/8]">
            <Image
              src={category.media}
              alt={category.mediaAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              quality={75}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#090a0c]/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/[0.16] bg-[#121212]/65 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm sm:bottom-7 sm:left-7">
              Imagen de referencia del portafolio
            </span>
          </div>
          <figcaption className="grid gap-5 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                PORTAFOLIO EN PREPARACIÓN
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
                Esta área aún no tiene proyectos publicados en su propia
                colección. La imagen es una referencia visual existente; se
                reemplazará al incorporar piezas finales de esta categoría.
              </p>
            </div>
            <Link
              href={category.relatedHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              {category.relatedLabel}
              <span aria-hidden="true">↗</span>
            </Link>
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
