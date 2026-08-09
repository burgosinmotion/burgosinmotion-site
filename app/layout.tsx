import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SmoothScroll from "./smooth-scroll";

const siteUrl = new URL("https://www.burgosinmotion.com");
const siteTitle =
  "Burgos in Motion | Motion Graphics, E-Learning y Desarrollo Creativo";
const siteDescription =
  "Motion graphics, e-learning interactivo y desarrollo creativo por Diego Burgos para experiencias digitales con narrativa, diseño y movimiento.";
const socialImage = "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Burgos in Motion",
  title: {
    default: siteTitle,
    template: "%s | Burgos in Motion",
  },
  description: siteDescription,
  keywords: [
    "Burgos in Motion",
    "Diego Burgos",
    "motion graphics",
    "e-learning interactivo",
    "desarrollo creativo",
    "diseño audiovisual",
    "Storyline",
    "ScriptUI",
  ],
  authors: [{ name: "Diego Burgos" }],
  creator: "Diego Burgos",
  publisher: "Burgos in Motion",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "Burgos in Motion",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Burgos in Motion - Motion Graphics, E-Learning y Desarrollo Creativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
