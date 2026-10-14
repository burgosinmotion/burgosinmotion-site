import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ElearningInteractiveSection from "../components/ElearningInteractiveSection";
import { buttonGradientStyles } from "../components/buttonStyles";

export const metadata: Metadata = {
  title: "Demos Interactivas",
  description: "Explora e interactúa con demos reales desarrolladas en Articulate Storyline.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InteractiveDemosPreviewPage() {
  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.08] bg-[#121212]/30 py-2 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3 lg:px-6">
          <span aria-hidden="true" />
          <Link
            href="/"
            aria-label="Burgos in Motion — ir al inicio"
            className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70"
          >
            <Image
              src="/brand/logo-burgosinmotion-white.png"
              alt="Burgos in Motion"
              width={1848}
              height={245}
              priority
              className="h-auto w-24 object-contain sm:w-40"
            />
          </Link>
          <Link
            href="/contacto"
            className={`${buttonGradientStyles} navbar-contact justify-self-end`}
          >
            Contacto
          </Link>
        </div>
      </header>
      <main>
        <ElearningInteractiveSection />
      </main>
    </>
  );
}
