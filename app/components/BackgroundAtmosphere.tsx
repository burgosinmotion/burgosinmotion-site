"use client";

export default function BackgroundAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#121212]"
    >
      <div
        className="atmosphere-glow fixed left-1/2 top-1/2 h-[min(74vw,72rem)] w-[min(74vw,72rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "58px 58px",
        }}
      />
    </div>
  );
}
