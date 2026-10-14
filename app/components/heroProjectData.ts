export type HeroCategory =
  | "motion"
  | "elearning"
  | "storyline"
  | "gamification"
  | "multimedia"
  | "interactive"
  | "javascript"
  | "process";

export type HeroProjectMediaType = "image" | "video";
export type HeroProjectColor = "cyan" | "magenta" | "white" | "gray";

export type HeroProject = {
  id: string;
  number: string;
  categories: HeroCategory[];
  type: string;
  title: string;
  color: HeroProjectColor;
  media: string;
  mediaType: HeroProjectMediaType;
  mediaAlt: string;
  depth: number;
  position: {
    side: "left" | "right";
    offset: number;
    top: number;
  };
  projectUrl: string;
  description?: string;
};

export const heroProjects: HeroProject[] = [
  {
    id: "motion-01",
    number: "01",
    categories: ["motion"],
    type: "MOTION GRAPHICS",
    title: "Historias en movimiento",
    color: "cyan",
    media: "/projects/motion-graphics-project.png",
    mediaType: "image",
    mediaAlt: "Composición de motion graphics en After Effects",
    depth: 6,
    position: { side: "left", offset: 3, top: 20 },
    projectUrl: "/proyectos",
  },
  {
    id: "gamification-01",
    number: "02",
    categories: ["elearning", "gamification"],
    type: "GAMIFICACIÓN",
    title: "Aprender jugando",
    color: "magenta",
    media: "/projects/storyline-project.png",
    mediaType: "image",
    mediaAlt: "Captura local de una experiencia de aprendizaje gamificada",
    depth: 10,
    position: { side: "left", offset: 10, top: 38 },
    projectUrl: "/demos-interactivas",
  },
  {
    id: "process-01",
    number: "03",
    categories: ["process", "motion"],
    type: "BEHIND THE SCENES",
    title: "Del concepto al movimiento",
    color: "gray",
    media: "/projects/motion-graphics-project.png",
    mediaType: "image",
    mediaAlt: "Timeline y composición de una pieza audiovisual",
    depth: 13,
    position: { side: "left", offset: 4, top: 66 },
    projectUrl: "/proyectos",
  },
  {
    id: "storyline-01",
    number: "04",
    categories: ["elearning", "storyline", "interactive"],
    type: "ARTICULATE STORYLINE",
    title: "Experiencias que enseñan",
    color: "magenta",
    media: "/projects/storyline-project.png",
    mediaType: "image",
    mediaAlt: "Captura local de una actividad interactiva de Storyline",
    depth: 8,
    position: { side: "right", offset: 3, top: 18 },
    projectUrl: "/demos-interactivas",
  },
  {
    id: "multimedia-01",
    number: "05",
    categories: ["multimedia", "interactive"],
    type: "DISEÑO MULTIMEDIA",
    title: "Diseño con intención",
    color: "white",
    media: "/projects/motiondeck-project.png",
    mediaType: "image",
    mediaAlt: "Vista previa local de una pieza multimedia",
    depth: 6,
    position: { side: "right", offset: 10, top: 40 },
    projectUrl: "/proyectos",
  },
  {
    id: "javascript-01",
    number: "06",
    categories: ["javascript", "interactive", "gamification"],
    type: "JAVASCRIPT INTERACTIVO",
    title: "Interacción en cada detalle",
    color: "cyan",
    media: "/projects/storyline-project.png",
    mediaType: "image",
    mediaAlt: "Vista previa local de una experiencia interactiva",
    depth: 12,
    position: { side: "right", offset: 4, top: 67 },
    projectUrl: "/proyectos",
  },
];

export const heroExpertise: {
  label: string;
  categories: HeroCategory[];
}[] = [
  { label: "Motion Graphics", categories: ["motion"] },
  { label: "E-Learning", categories: ["elearning"] },
  { label: "Articulate Storyline", categories: ["storyline"] },
  { label: "Gamificación", categories: ["gamification"] },
  { label: "JavaScript", categories: ["javascript"] },
  { label: "Experiencias Interactivas", categories: ["interactive"] },
];
