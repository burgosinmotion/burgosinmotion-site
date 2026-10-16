"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectCaseStudyVideo } from "./projectCaseStudyData";

export default function MotionProjectVideos({
  videos,
}: {
  videos: ProjectCaseStudyVideo[];
}) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!activeVideo || !videoRef.current) {
      return;
    }

    videoRef.current.play().catch(() => {
      setPlaybackError(
        "No se pudo iniciar la reproducción automáticamente. Usa el control de play del video.",
      );
    });
  }, [activeVideo]);

  return (
    <div className="space-y-14 md:space-y-24">
      {videos.map((video, index) => {
        const isActive = activeVideo === video.src;
        const isReversed = index % 2 === 1;

        return (
          <article
            key={video.src}
            className={`grid items-center gap-6 lg:grid-cols-12 lg:gap-12 ${
              isReversed ? "lg:[direction:rtl]" : ""
            }`}
          >
            <figure className="min-w-0 lg:col-span-8 lg:[direction:ltr]">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.10] bg-black">
                {isActive ? (
                  <video
                    ref={videoRef}
                    src={video.src}
                    poster={video.poster}
                    title={`${video.title} — Delitos Ambientales`}
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    onPlay={() => setPlaybackError(null)}
                    onError={() =>
                      setPlaybackError(
                        "No se pudo cargar este video. Inténtalo de nuevo o revisa tu conexión.",
                      )
                    }
                    className="absolute inset-0 h-full w-full bg-black"
                  />
                ) : (
                  <>
                    <Image
                      src={video.poster}
                      alt={`Fotograma representativo de ${video.title}`}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/20 transition-colors hover:bg-black/35 motion-reduce:transition-none"
                    />
                    <button
                      type="button"
                      aria-label={`Reproducir ${video.title}`}
                      onClick={() => {
                        setPlaybackError(null);
                        setActiveVideo(video.src);
                      }}
                      className="absolute inset-0 flex items-center justify-center text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-cyan-200"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-16 place-items-center rounded-full border border-white/80 bg-black/45 pl-1 text-2xl backdrop-blur-sm transition-transform hover:scale-105 motion-reduce:transition-none"
                      >
                        ▶
                      </span>
                      <span className="absolute bottom-4 right-4 rounded bg-black/75 px-2.5 py-1 font-mono text-xs text-white">
                        {video.duration}
                      </span>
                    </button>
                  </>
                )}
              </div>
              {isActive && playbackError ? (
                <p role="status" className="mt-3 text-sm leading-6 text-amber-200">
                  {playbackError}
                </p>
              ) : null}
            </figure>
            <div className="min-w-0 lg:col-span-4 lg:[direction:ltr]">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                {video.title}
              </p>
              <p className="mt-3 font-mono text-sm text-zinc-500">
                {video.duration}
              </p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-300 md:text-base">
                {video.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
