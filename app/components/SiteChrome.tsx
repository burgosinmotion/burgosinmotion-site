"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const standaloneDemoPath = "/demos-preview";

export default function SiteChrome({
  children,
  navbar,
  footer,
}: {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const isStandaloneDemoPage = pathname === standaloneDemoPath;

  return (
    <>
      {isStandaloneDemoPage ? null : navbar}
      {children}
      {isStandaloneDemoPage ? null : footer}
    </>
  );
}