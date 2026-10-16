export const portfolioCategories = [
  {
    id: "motion",
    number: "01",
    title: "Motion Graphics",
    shortTitle: "Motion",
    expertiseLabel: "Motion Graphics",
    description:
      "Animación, narrativa visual y sistemas gráficos diseñados para comunicar ideas a través del movimiento.",
    slug: "/motion-graphics",
    media: "/projects/essbio-delitos-ambientales/posters/essbio-01.webp",
    mediaAlt:
      "Ilustración de delitos ambientales con un personaje y símbolos jurídicos sobre un mapa de Chile",
    mediaCaption: "ESSBIO / Delitos Ambientales",
    tags: ["After Effects", "2D Motion", "Animation", "Visual Storytelling"],
    accent: "cyan",
    relatedHref: "/proyectos",
    relatedLabel: "Ver proyectos de motion graphics",
  },
  {
    id: "elearning",
    number: "02",
    title: "E-Learning",
    shortTitle: "E-Learning",
    expertiseLabel: "E-Learning",
    description:
      "Experiencias formativas digitales que combinan diseño, interacción y narrativa para transformar contenidos en aprendizaje.",
    slug: "/e-learning",
    media: "/scorm/portadas/actividad-demo-01.png",
    mediaAlt: "Vista de referencia de una experiencia de aprendizaje interactiva",
    tags: ["Interactive Learning", "SCORM", "Instructional Design"],
    accent: "magenta",
    relatedHref: "/demos-interactivas",
    relatedLabel: "Ver demos de aprendizaje interactivo",
  },
  {
    id: "gamification",
    number: "03",
    title: "Gamificación",
    shortTitle: "Gamificación",
    expertiseLabel: "Gamificación",
    description:
      "Experiencias de aprendizaje que incorporan mecánicas de juego, desafíos e interacción para aumentar la participación y el engagement.",
    slug: "/gamificacion",
    media: "/scorm/portadas/actividad-demo-02.png",
    mediaAlt: "Vista de referencia de una actividad gamificada",
    tags: ["Gamification", "Mini Games", "Challenges", "Interactive Activities"],
    accent: "cyan",
    relatedHref: "/demos-interactivas",
    relatedLabel: "Explorar demos interactivas",
  },
  {
    id: "storyline",
    number: "04",
    title: "Articulate Storyline",
    shortTitle: "Storyline",
    expertiseLabel: "Articulate Storyline",
    description:
      "Cursos y experiencias interactivas desarrolladas en Storyline, combinando capas, estados, triggers, JavaScript y lógica personalizada.",
    slug: "/storyline",
    media: "/projects/storyline-project.png",
    mediaAlt: "Interfaz de referencia de una experiencia desarrollada en Storyline",
    tags: ["Storyline 360", "JavaScript", "Triggers", "SCORM"],
    accent: "magenta",
    relatedHref: "/demos-interactivas",
    relatedLabel: "Ver demos de Storyline",
  },
  {
    id: "multimedia",
    number: "05",
    title: "Diseño Multimedia",
    shortTitle: "Multimedia",
    expertiseLabel: "Diseño Multimedia",
    description:
      "Diseño visual aplicado a diferentes formatos, interfaces, contenidos digitales y sistemas gráficos.",
    slug: "/diseno-multimedia",
    media: "/projects/motiondeck-project.png",
    mediaAlt: "Composición de referencia de diseño y contenido multimedia",
    tags: ["Multimedia", "Visual Design", "UI", "Digital Content"],
    accent: "cyan",
    relatedHref: "/proyectos",
    relatedLabel: "Ver proyectos seleccionados",
  },
  {
    id: "interactive",
    number: "06",
    title: "Experiencias Interactivas",
    shortTitle: "Interactividad",
    expertiseLabel: "Experiencias Interactivas",
    description:
      "Interfaces, herramientas y experiencias digitales donde diseño, movimiento y tecnología trabajan juntos.",
    slug: "/experiencias-interactivas",
    media: "/projects/storyline-project.png",
    mediaAlt: "Vista de referencia de una experiencia digital interactiva",
    tags: ["Interactive", "JavaScript", "Creative Development", "UI Motion"],
    accent: "magenta",
    relatedHref: "/demos-interactivas",
    relatedLabel: "Explorar experiencias interactivas",
  },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
export type CategoryId = PortfolioCategory["id"];

export function getCategoryById(id: string): PortfolioCategory | undefined {
  return portfolioCategories.find((category) => category.id === id);
}

export function getCategoryBySlug(slug: string): PortfolioCategory | undefined {
  return portfolioCategories.find(
    (category) => category.slug.slice(1) === slug,
  );
}
