import Image from "next/image";
import MotionProjectVideos from "./MotionProjectVideos";
import type { ProjectCaseStudyContent } from "./projectCaseStudyData";

export default function MotionProjectSections({
  content,
}: {
  content: ProjectCaseStudyContent;
}) {
  const motion = content.motion;

  if (!motion) {
    return null;
  }

  return (
    <>
      <section
        id="la-pieza"
        className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24"
      >
        <div className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-cyan-200">
              LA PIEZA
            </p>
            <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
              {motion.lead.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:justify-self-end md:text-base">
            {motion.lead.description}
          </p>
        </div>
        <MotionProjectVideos videos={motion.videos} />
      </section>

      <section className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-fuchsia-200">
              DIRECCIÓN VISUAL
            </p>
            <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
              {motion.direction.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:justify-self-end md:text-base">
            {motion.direction.description}
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
          {motion.direction.details.map((detail, index) => (
            <article key={detail.title} className="bg-[#111214] p-6 sm:p-8">
              <p className="font-mono text-xs font-bold text-fuchsia-200">
                0{index + 1} / DIRECCIÓN
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
            MOTION &amp; COMPOSICIÓN
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
            {motion.composition.title}
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            {motion.composition.description}
          </p>
          <ul className="mt-7 grid gap-5 sm:grid-cols-2">
            {motion.composition.details.map((detail) => (
              <li key={detail.title} className="border-l border-cyan-200/40 pl-4">
                <h3 className="text-sm font-semibold text-zinc-100">
                  {detail.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {detail.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-white/[0.08] px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10">
          <p className="mb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-zinc-500">
            SELECTED FRAMES
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
            Imágenes del proyecto.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {motion.selectedFrames.map((frame, index) => (
            <figure
              key={frame.src}
              className={`min-w-0 ${
                index === 2 ? "md:col-span-2 md:w-2/3 md:justify-self-center" : ""
              }`}
            >
              <div className="relative aspect-video overflow-hidden rounded-lg border border-white/[0.10] bg-[#101112]">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {frame.caption ? (
                <figcaption className="mt-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {frame.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
