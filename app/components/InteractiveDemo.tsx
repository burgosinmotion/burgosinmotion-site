"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function InteractiveDemo({
  title,
  poster,
  posterAlt,
  src,
}: {
  title: string;
  poster: string;
  posterAlt: string;
  src: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  async function enterFullscreen() {
    setFullscreenError(false);

    try {
      if (!iframeRef.current?.requestFullscreen) {
        setFullscreenError(true);
        return;
      }

      await iframeRef.current.requestFullscreen();
    } catch {
      setFullscreenError(true);
    }
  }

  function loadDemo() {
    if (window.matchMedia("(max-width: 639px)").matches) {
      window.open(src, "_blank", "noopener,noreferrer");
      return;
    }

    setIsLoaded(true);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#08090a]">
      {isLoaded ? (
        <iframe
          ref={iframeRef}
          src={src}
          title={`Demo interactiva — ${title}`}
          allow="autoplay"
          allowFullScreen
          loading="eager"
          className="aspect-video w-full border-0 bg-black"
        />
      ) : (
        <div className="relative aspect-video bg-black">
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(min-width: 1280px) 1120px, 100vw"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />
          <div className="absolute inset-x-5 bottom-5 flex flex-col items-start gap-4 sm:inset-x-8 sm:bottom-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-cyan-200">
                Experiencia Storyline
              </p>
              <p className="mt-2 max-w-xl text-sm text-zinc-200 sm:text-base">
                La demo se carga solo cuando decides probarla.
              </p>
            </div>
            <button
              type="button"
              onClick={loadDemo}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-cyan-300 px-6 text-sm font-bold text-zinc-950 transition-colors hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Abrir demo interactiva
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 border-t border-white/[0.08] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs leading-5 text-zinc-400">
          En pantallas pequeñas, la experiencia se abre en una pestaña nueva.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {isLoaded ? (
            <button
              type="button"
              onClick={enterFullscreen}
              className="inline-flex min-h-10 items-center rounded-sm text-sm font-semibold text-cyan-200 transition-colors hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              Pantalla completa
            </button>
          ) : null}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center rounded-sm text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
          >
            Abrir en una pestaña nueva <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </div>
      </div>
      {fullscreenError ? (
        <p role="status" className="px-6 pb-4 text-sm text-amber-200">
          No se pudo activar pantalla completa. Puedes abrir la demo en una pestaña nueva.
        </p>
      ) : null}
    </div>
  );
}
