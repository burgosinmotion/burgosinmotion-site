export default function BackgroundAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#05060A]"
    >
      <div
        className="absolute inset-0 bg-[url('/backgrounds/atmosphere-gradient.avif')] opacity-90"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100% 100%",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "96px 96px",
        }}
      />
    </div>
  );
}
