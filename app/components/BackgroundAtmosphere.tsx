import Image from "next/image";

export default function BackgroundAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#05060A]"
    >
      <Image
        src="/backgrounds/atmosphere-gradient.avif"
        alt=""
        fill
        unoptimized
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="absolute inset-0 object-fill object-top opacity-90"
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
