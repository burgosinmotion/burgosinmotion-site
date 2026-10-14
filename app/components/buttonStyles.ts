export const buttonBaseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold text-[#f5f5f5] transition-[border-color,background-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/80 motion-reduce:transition-none";

export const buttonOutlineStyles = `${buttonBaseStyles} border border-[#a1a1aa] bg-[#121212]/70 hover:border-cyan-400 hover:bg-[#121212]/90`;

export const buttonGradientStyles = `${buttonBaseStyles} border border-cyan-500/40 bg-linear-to-r from-[#121212] to-[#06b6d4] hover:-translate-y-px`;
