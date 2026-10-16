import type { CategoryId } from "./categoryData";

export type PortfolioProject = {
  id: string;
  title: string;
  categories: CategoryId[];
  year?: number;
  client?: string;
  role?: string[];
  tools?: string[];
  thumbnail: string;
  thumbnailAlt: string;
  media?: string;
  mediaWebm?: string;
  mediaType?: "image" | "video";
  featured?: boolean;
  size?: "medium" | "large" | "wide";
  slug?: string;
  hasCaseStudy?: boolean;
  demoUrl?: string;
  summary?: string;
};

export type ProjectSlot = {
  id: string;
  label: string;
  assetPath: string;
  size: "medium" | "large" | "wide" | "portrait" | "square";
  aspect: "landscape" | "portrait" | "square";
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "finning-encuentra-el-par-correcto",
    title: "Encuentra el par correcto",
    client: "FINNING",
    categories: ["elearning", "gamification", "storyline"],
    slug: "/projects/finning-encuentra-el-par",
    hasCaseStudy: true,
    thumbnail: "/scorm/portadas/actividad-demo-01.png",
    thumbnailAlt: "Portada del proyecto FINNING Encuentra el par correcto",
    demoUrl: "/scorm/actividad-demo-01/story.html",
    featured: true,
    size: "wide",
    summary: "Actividad interactiva de aprendizaje para FINNING.",
  },
  {
    id: "prevencion-de-delitos-estrategia-contra-la-corrupcion",
    title: "Prevención de delitos: Estrategia contra la corrupción",
    categories: ["elearning", "gamification", "storyline", "interactive"],
    slug: "/projects/prevencion-delitos-corrupcion",
    hasCaseStudy: true,
    thumbnail: "/scorm/actividad-demo-02/story_content/thumbnail.jpg",
    thumbnailAlt:
      "Portada del proyecto Prevención de delitos: Estrategia contra la corrupción",
    demoUrl: "/scorm/actividad-demo-02/story.html",
    featured: true,
    size: "wide",
    summary:
      "Experiencia interactiva en Articulate Storyline sobre prevención de delitos y corrupción.",
  },
  {
    id: "essbio-delitos-ambientales",
    title: "Delitos Ambientales",
    client: "ESSBIO",
    categories: ["motion", "multimedia"],
    slug: "/projects/essbio-delitos-ambientales",
    hasCaseStudy: true,
    thumbnail:
      "/projects/essbio-delitos-ambientales/posters/essbio-01.webp",
    thumbnailAlt:
      "Ilustración de delitos ambientales con un personaje y símbolos jurídicos sobre un mapa de Chile",
    featured: true,
    size: "wide",
    summary:
      "Tres piezas audiovisuales de Motion Graphics sobre delitos ambientales para ESSBIO.",
  },
];

export function getProjectsByCategory(categoryId: CategoryId): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.categories.includes(categoryId));
}

export function getCaseStudyProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find(
    (project) => project.hasCaseStudy && project.slug === `/projects/${slug}`,
  );
}

export function getNextCaseStudyProject(
  currentProjectId: string,
): PortfolioProject | undefined {
  const caseStudyProjects = portfolioProjects.filter(
    (project) => project.hasCaseStudy && project.slug,
  );
  const currentIndex = caseStudyProjects.findIndex(
    (project) => project.id === currentProjectId,
  );

  if (currentIndex < 0 || caseStudyProjects.length < 2) {
    return undefined;
  }

  return caseStudyProjects[(currentIndex + 1) % caseStudyProjects.length];
}
