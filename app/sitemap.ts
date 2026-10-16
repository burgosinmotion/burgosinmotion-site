import type { MetadataRoute } from "next";
import { portfolioCategories } from "./components/categoryData";
import { portfolioProjects } from "./components/projectData";

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
    ...portfolioCategories.map((category) => ({
      url: `${siteUrl}${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...portfolioProjects.flatMap((project) =>
      project.hasCaseStudy && project.slug
        ? [
            {
              url: `${siteUrl}${project.slug}`,
              changeFrequency: "monthly" as const,
              priority: 0.8,
            },
          ]
        : [],
    ),
  ];
}
