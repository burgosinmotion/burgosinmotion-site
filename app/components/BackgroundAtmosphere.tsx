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
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute inset-0 bg-[url('/backgrounds/grid.svg')] opacity-[0.05]"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
