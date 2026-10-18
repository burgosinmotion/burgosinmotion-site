"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { buttonContactStyles } from "./buttonStyles";
import { portfolioCategories, type CategoryId } from "./categoryData";

const navItems = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Portfolio", href: "/#proyectos" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Demos", href: "/demos-interactivas" },
];

const navLinkClass = "rounded-sm transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200";
const mobileLinkClass = "flex min-h-11 items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-200";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [activeId, setActiveId] = useState<CategoryId>("motion");
  const headerRef = useRef<HTMLElement>(null);
  const areasTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const panelWrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const focusFirst = useRef(false);
  const clickOpenedAreas = useRef(false);
  const pointerInAreasZone = useRef(false);
  const suppressHover = useRef(false);
  const hoverOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCategory = portfolioCategories.find((area) => area.id === activeId) ?? portfolioCategories[0];

  const cancelHoverTimers = useCallback(() => {
    if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    hoverOpenTimer.current = null;
    hoverCloseTimer.current = null;
  }, []);

  const closeMenus = useCallback(() => {
    cancelHoverTimers();
    clickOpenedAreas.current = false;
    suppressHover.current = pointerInAreasZone.current;
    pointerInAreasZone.current = false;
    setAreasOpen(false);
    setMenuOpen(false);
    setMobileAreasOpen(false);
  }, [cancelHoverTimers]);

  function canHover(pointerType: string) {
    return pointerType === "mouse" && window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches;
  }

  function enterAreasZone() {
    cancelHoverTimers();
    if (!pointerInAreasZone.current) suppressHover.current = false;
    pointerInAreasZone.current = true;
  }

  function handleTriggerPointerEnter(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!canHover(event.pointerType)) return;
    enterAreasZone();
    if (suppressHover.current || clickOpenedAreas.current || areasOpen) return;

    hoverOpenTimer.current = setTimeout(() => {
      hoverOpenTimer.current = null;
      if (pointerInAreasZone.current && !suppressHover.current && !clickOpenedAreas.current) {
        setActiveId(portfolioCategories.find((area) => area.slug === pathname)?.id ?? "motion");
        setAreasOpen(true);
      }
    }, 80);
  }

  function handleAreasZonePointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (!canHover(event.pointerType)) return;
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && (areasTriggerRef.current?.contains(nextTarget) || panelWrapperRef.current?.contains(nextTarget))) {
      cancelHoverTimers();
      pointerInAreasZone.current = true;
      return;
    }

    pointerInAreasZone.current = false;
    if (hoverOpenTimer.current) clearTimeout(hoverOpenTimer.current);
    hoverOpenTimer.current = null;
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = setTimeout(() => {
      hoverCloseTimer.current = null;
      suppressHover.current = false;
      if (!clickOpenedAreas.current) setAreasOpen(false);
    }, 100);
  }

  function toggleAreas() {
    cancelHoverTimers();
    if (areasOpen) {
      clickOpenedAreas.current = false;
      suppressHover.current = pointerInAreasZone.current;
      setAreasOpen(false);
      return;
    }

    clickOpenedAreas.current = true;
    suppressHover.current = false;
    setActiveId(portfolioCategories.find((area) => area.slug === pathname)?.id ?? "motion");
    setAreasOpen(true);
  }

  function openAreas(keyboard = false) {
    if (keyboard && areasOpen) {
      clickOpenedAreas.current = true;
      suppressHover.current = false;
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      return;
    }
    cancelHoverTimers();
    clickOpenedAreas.current = true;
    suppressHover.current = false;
    setActiveId(portfolioCategories.find((area) => area.slug === pathname)?.id ?? "motion");
    focusFirst.current = keyboard;
    setAreasOpen(true);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (areasOpen && focusFirst.current) {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      focusFirst.current = false;
    }
  }, [areasOpen]);

  useEffect(() => {
    const handleOutside = (event: Event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenus();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (areasOpen) areasTriggerRef.current?.focus();
      else if (menuOpen) mobileTriggerRef.current?.focus();
      closeMenus();
    };
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("focusin", handleOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("popstate", closeMenus);
    desktopQuery.addEventListener("change", closeMenus);
    return () => {
      cancelHoverTimers();
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("focusin", handleOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("popstate", closeMenus);
      desktopQuery.removeEventListener("change", closeMenus);
    };
  }, [areasOpen, menuOpen, closeMenus, cancelHoverTimers]);

  useEffect(() => cancelHoverTimers, [cancelHoverTimers]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ease-out motion-reduce:transition-none ${scrolled ? "border-white/[0.07] bg-[#121212]/80 py-1 backdrop-blur-[22px]" : "border-white/[0.08] bg-[#121212]/40 py-2 backdrop-blur-xl"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-6">
        <Link href="/" aria-label="Ir al inicio" onClick={closeMenus} className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
          <Image src="/brand/icon-header-burgosinmotion-white.png" alt="" width={48} height={48} priority className="h-11 w-11 object-contain" />
        </Link>
        <nav aria-label="Navegación principal" className="hidden items-center gap-5 text-xs font-semibold text-zinc-100 lg:flex xl:gap-8">
          <Link href="/" onClick={closeMenus} className={navLinkClass}>Home</Link>
          <button ref={areasTriggerRef} type="button" aria-expanded={areasOpen} aria-controls="areas-desktop"
            onPointerEnter={handleTriggerPointerEnter} onPointerLeave={handleAreasZonePointerLeave}
            onClick={toggleAreas}
            onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); openAreas(true); } }}
            className={`${navLinkClass} inline-flex min-h-11 items-center gap-2 ${areasOpen ? "text-cyan-200" : ""}`}>
            Áreas <span aria-hidden="true" className={`text-[10px] transition-transform motion-reduce:transition-none ${areasOpen ? "rotate-180" : ""}`}>⌄</span>
          </button>
          {navItems.map((item) => <Link key={item.label} href={item.href} onClick={closeMenus} className={navLinkClass}>{item.label}</Link>)}
          <Link href="/#contact" onClick={closeMenus} className={`${buttonContactStyles} navbar-contact min-h-[1.875rem] px-5 py-1.5 text-xs`}>Contacto</Link>
        </nav>
        <button ref={mobileTriggerRef} type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="navigation-mobile" onClick={() => { setMenuOpen(!menuOpen); setMobileAreasOpen(false); }} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] text-white transition-colors hover:border-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-200 lg:hidden">
          <span aria-hidden="true" className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>
      {areasOpen ? (
        <div ref={panelWrapperRef} onPointerEnter={(event) => { if (canHover(event.pointerType)) enterAreasZone(); }} onPointerLeave={handleAreasZonePointerLeave} className="absolute right-[clamp(2rem,4vw,5rem)] top-full hidden w-[min(60rem,calc(100%-clamp(5rem,9vw,11rem)-clamp(2rem,4vw,5rem)))] pt-2 lg:block">
          <nav ref={panelRef} id="areas-desktop" aria-label="Áreas de trabajo" className="areas-menu grid w-full max-h-[calc(100dvh-7rem)] grid-cols-[1.15fr_1fr] gap-3 overflow-y-auto overscroll-contain rounded-2xl border border-white/[0.12] bg-[#101214]/98 p-3 shadow-[0_30px_90px_#0009] backdrop-blur-2xl">
            <div className="min-w-0">
              <p className="px-4 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Seis áreas. Una mirada.</p>
              {portfolioCategories.map((area) => (
                <Link key={area.id} href={area.slug} aria-current={pathname === area.slug ? "page" : undefined} onClick={closeMenus} onFocus={() => setActiveId(area.id)} onPointerEnter={() => setActiveId(area.id)} className={`group grid min-h-[64px] grid-cols-[1.5rem_minmax(0,1fr)_1rem] items-center gap-3 rounded-xl px-4 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-200 motion-reduce:transition-none ${activeId === area.id ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"}`}>
                  <span className="font-mono text-[10px] text-cyan-300/70">{area.number}</span>
                  <span className="min-w-0"><span className="block text-sm font-semibold text-zinc-100">{area.title}</span><span className="mt-1 line-clamp-1 text-xs leading-5 text-zinc-500">{area.description}</span></span>
                  <span aria-hidden="true" className={activeId === area.id ? "text-cyan-200" : "text-zinc-600"}>↗</span>
                </Link>
              ))}
              <Link href="/#categorias" onClick={closeMenus} className="mx-4 mt-4 inline-flex min-h-10 items-center border-b border-white/20 text-xs text-zinc-300 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-200">Explorar todas las áreas <span aria-hidden="true" className="ml-3">↗</span></Link>
            </div>
            <figure className="relative min-h-[340px] overflow-hidden rounded-xl bg-[#191d20]">
              <Image key={activeCategory.id} src={activeCategory.media} alt={activeCategory.mediaAlt} fill sizes="440px" className="areas-menu h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-7"><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200">{activeCategory.number} / Burgos in Motion</p><p className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white">{activeCategory.title}</p><p className="mt-3 text-xs leading-5 text-zinc-300">{activeCategory.tags.slice(0, 2).join(" · ")}</p></figcaption>
            </figure>
          </nav>
        </div>
      ) : null}
      {menuOpen ? (
        <nav id="navigation-mobile" aria-label="Navegación móvil" className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain border-t border-white/[0.08] bg-[#121212]/98 px-5 py-4 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <Link href="/" onClick={closeMenus} className={mobileLinkClass}>Home</Link>
            <button type="button" aria-expanded={mobileAreasOpen} aria-controls="areas-mobile" onClick={() => setMobileAreasOpen(!mobileAreasOpen)} className={`${mobileLinkClass} w-full text-left`}>Áreas <span aria-hidden="true">{mobileAreasOpen ? "−" : "+"}</span></button>
            {mobileAreasOpen ? (
              <div id="areas-mobile" className="grid gap-1 border-l border-cyan-300/20 pl-2">
                {portfolioCategories.map((area) => <Link key={area.id} href={area.slug} aria-current={pathname === area.slug ? "page" : undefined} onClick={closeMenus} className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/[0.04] hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-200"><span className="font-mono text-[10px] text-cyan-300/70">{area.number}</span>{area.title}</Link>)}
              </div>
            ) : null}
            {navItems.map((item) => <Link key={item.label} href={item.href} onClick={closeMenus} className={mobileLinkClass}>{item.label}</Link>)}
            <Link href="/#contact" onClick={closeMenus} className={`${buttonContactStyles} mt-2`}>Contacto</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
