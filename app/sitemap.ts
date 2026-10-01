import type { MetadataRoute } from "next";

const siteUrl = "https://www.burgosinmotion.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["servicios", "proyectos", "demos-interactivas", "sobre-mi", "contacto"].map((route) => ({
      url: `${siteUrl}/${route}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
