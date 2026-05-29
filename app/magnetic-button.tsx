"use client";

import { motion } from "framer-motion";
import {
  ReactNode,
  useRef,
  MouseEvent,
} from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function MagneticButton({
  children,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    element.style.transform = `
      translate(${x * 0.15}px, ${y * 0.15}px)
    `;
  };

  const handleMouseLeave = () => {
    const element = ref.current;

    if (!element) return;

    element.style.transform = `translate(0px, 0px)`;
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className={`inline-block transition-transform duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}