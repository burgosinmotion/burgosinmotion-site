import type { ReactNode } from "react";
import BackgroundAtmosphere from "./BackgroundAtmosphere";

export default function HomeShell({ children }: { children: ReactNode }) {
  return (
    <main
      className="
        relative
        isolate
        overflow-hidden
        bg-[#05060A]
        text-white
      "
    >
      <BackgroundAtmosphere />
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}
