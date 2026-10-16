import type { CategoryId } from "./categoryData";
import type { ProjectSlot } from "./projectData";

type ProjectSection = {
  type: "projects";
  eyebrow: string;
  title: string;
  description?: string;
  slots: ProjectSlot[];
};

type CardsSection = {
  type: "cards";
  eyebrow: string;
  title: string;
  description?: string;
  layout: "grid" | "list" | "steps";
  items: { title: string; description: string }[];
};

type StatementSection = {
  type: "statement";
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
};

type ProcessSection = {
  type: "process";
  eyebrow: string;
  title: string;
  steps: string[];
};

export type CategoryPageSection =
  | ProjectSection
  | CardsSection
  | StatementSection
  | ProcessSection;

type CategoryPageConfig = {
  sections: CategoryPageSection[];
};

const slots = (
  category: string,
  entries: [string, ProjectSlot["size"], ProjectSlot["aspect"]][],
  firstAsset = 1,
): ProjectSlot[] =>
  entries.map(([label, size, aspect], index) => {
    const assetNumber = firstAsset + index;
    return {
      id: `${category}-slot-${assetNumber}`,
      label,
      assetPath: `/projects/${category}/project-${String(assetNumber).padStart(2, "0")}.webp`,
      size,
      aspect,
    };
  });

export const categoryPageData: Record<CategoryId, CategoryPageConfig> = {
  motion: {
    sections: [
      {
        type: "projects",
        eyebrow: "PROYECTO DESTACADO",
        title: "Delitos Ambientales.",
        description:
          "Tres piezas audiovisuales de Motion Graphics para ESSBIO sobre contenidos relacionados con delitos ambientales.",
        slots: slots("motion", [
          ["ESSBIO · Delitos Ambientales", "wide", "landscape"],
        ]),
      },
      {
        type: "cards",
        eyebrow: "BEHIND THE MOTION",
        title: "Del concepto al movimiento.",
        layout: "grid",
        items: [
          {
            title: "Dirección visual",
            description: "Styleframes, paleta y lenguaje gráfico.",
          },
          {
            title: "Composición",
            description: "Jerarquía, ritmo y construcción de escena.",
          },
          {
            title: "Animación",
            description: "Movimiento diseñado para comunicar.",
          },
        ],
      },
    ],
  },
  elearning: {
    sections: [
      {
        type: "projects",
        eyebrow: "EXPERIENCIA DESTACADA",
        title: "Aprendizaje en acción.",
        description:
          "Un espacio para presentar un curso real, su objetivo y su contexto de publicación cuando esa información esté disponible.",
        slots: slots("elearning", [
          ["Preview del curso o experiencia", "wide", "landscape"],
        ]),
      },
      {
        type: "cards",
        eyebrow: "FORMATOS DE APRENDIZAJE",
        title: "Una experiencia para cada contenido.",
        description:
          "Formatos que pueden combinarse según el objetivo de aprendizaje.",
        layout: "grid",
        items: [
          {
            title: "Cursos interactivos",
            description: "Recorridos digitales con decisiones y práctica.",
          },
          {
            title: "Microlearning",
            description: "Unidades breves para contenidos concretos.",
          },
          {
            title: "Evaluaciones",
            description: "Preguntas y feedback dentro del recorrido.",
          },
          {
            title: "Escenarios",
            description: "Situaciones ramificadas para explorar opciones.",
          },
          {
            title: "Experiencias 360°",
            description: "Contenido espacial cuando el proyecto lo requiere.",
          },
          {
            title: "SCORM",
            description: "Paquetes listos para integrarse en un LMS.",
          },
        ],
      },
      {
        type: "process",
        eyebrow: "PROCESO",
        title: "Del contenido al LMS.",
        steps: [
          "Contenido",
          "Diseño",
          "Desarrollo",
          "Interacción",
          "QA",
          "LMS",
        ],
      },
    ],
  },
  gamification: {
    sections: [
      {
        type: "projects",
        eyebrow: "PLAYGROUND",
        title: "Un espacio para jugar y aprender.",
        description:
          "La demo interactiva se incorporará aquí cuando esté lista para publicarse. No hay un juego ficticio simulando un proyecto real.",
        slots: slots("gamification", [
          ["Slot para demo interactiva", "wide", "landscape"],
        ]),
      },
      {
        type: "cards",
        eyebrow: "MECÁNICAS",
        title: "Diseñar la participación.",
        description:
          "Recursos que pueden dar estructura a una experiencia gamificada.",
        layout: "grid",
        items: [
          {
            title: "Desafíos",
            description: "Objetivos claros para avanzar.",
          },
          {
            title: "Vidas",
            description: "Un margen de intento y recuperación.",
          },
          {
            title: "Puntuación",
            description: "Feedback visible sobre las acciones.",
          },
          {
            title: "Progreso",
            description: "Señales para entender cuánto falta.",
          },
          {
            title: "Recompensas",
            description: "Reconocimiento asociado al avance.",
          },
          {
            title: "Feedback",
            description: "Respuesta inmediata a cada decisión.",
          },
        ],
      },
      {
        type: "projects",
        eyebrow: "MINI-JUEGOS",
        title: "Formatos por explorar.",
        slots: slots("gamification", [
          ["Slot para demo de cartas o quiz", "medium", "square"],
          ["Slot para demo de desafío", "medium", "square"],
        ], 2),
      },
      {
        type: "process",
        eyebrow: "PROCESO",
        title: "Una mecánica con propósito.",
        steps: [
          "Objetivo",
          "Reglas",
          "Interacción",
          "Feedback",
          "Prueba",
        ],
      },
    ],
  },
  storyline: {
    sections: [
      {
        type: "projects",
        eyebrow: "STORYLINE EXPERIENCE",
        title: "Interacción construida con intención.",
        description:
          "El espacio para una experiencia real de Storyline, pendiente de incorporar su preview y contexto.",
        slots: slots("storyline", [
          ["Slot para experiencia de Storyline", "wide", "landscape"],
        ]),
      },
      {
        type: "cards",
        eyebrow: "INTERACCIONES",
        title: "Capas, estados y lógica.",
        layout: "grid",
        items: [
          {
            title: "Layers",
            description: "Capas para organizar información y feedback.",
          },
          {
            title: "States",
            description: "Estados visuales que responden al usuario.",
          },
          {
            title: "Triggers",
            description: "Acciones que conectan intención y respuesta.",
          },
          {
            title: "Variables",
            description: "Datos para conservar el estado del recorrido.",
          },
          {
            title: "Drag & drop",
            description: "Interacciones de arrastrar y soltar.",
          },
          {
            title: "360°",
            description: "Escenas explorables en proyectos compatibles.",
          },
        ],
      },
      {
        type: "statement",
        eyebrow: "JAVASCRIPT + STORYLINE",
        title: "Más allá de los triggers.",
        description:
          "Extiendo las posibilidades de Storyline mediante JavaScript para desarrollar interacciones, comportamientos y experiencias que van más allá de las herramientas nativas.",
        details: [
          "Timers",
          "Lógica personalizada",
          "Progreso",
          "Comunicación con LMS",
        ],
      },
      {
        type: "cards",
        eyebrow: "PUBLICACIÓN",
        title: "De Storyline al LMS.",
        layout: "list",
        items: [
          {
            title: "SCORM",
            description: "Paquetes compatibles con el estándar de publicación.",
          },
          {
            title: "xAPI",
            description: "Preparación de experiencias que requieren este estándar.",
          },
          {
            title: "Tracking",
            description: "Seguimiento de avance y finalización según el proyecto.",
          },
        ],
      },
      {
        type: "process",
        eyebrow: "PROCESO TÉCNICO",
        title: "Construcción y validación.",
        steps: [
          "Estructura",
          "Interacción",
          "Lógica",
          "Publicación",
          "QA en LMS",
        ],
      },
    ],
  },
  multimedia: {
    sections: [
      {
        type: "projects",
        eyebrow: "SELECCIÓN VISUAL",
        title: "Composición en distintos formatos.",
        description:
          "La galería está preparada para piezas verticales, cuadradas y apaisadas; se completará con trabajos finales.",
        slots: slots("multimedia", [
          ["Slot para composición vertical", "medium", "portrait"],
          ["Slot para composición cuadrada", "medium", "square"],
          ["Slot para composición apaisada", "wide", "landscape"],
        ]),
      },
      {
        type: "cards",
        eyebrow: "SISTEMAS Y ASSETS",
        title: "Un lenguaje visual consistente.",
        layout: "grid",
        items: [
          {
            title: "Sistemas gráficos",
            description: "Recursos visuales que mantienen una línea común.",
          },
          {
            title: "Contenido digital",
            description: "Composición para formatos y pantallas.",
          },
          {
            title: "Interfaces",
            description: "Jerarquía visual aplicada a experiencias digitales.",
          },
        ],
      },
      {
        type: "process",
        eyebrow: "PROCESO",
        title: "De la intención a la pieza.",
        steps: ["Brief", "Dirección visual", "Composición", "Adaptaciones"],
      },
    ],
  },
  interactive: {
    sections: [
      {
        type: "projects",
        eyebrow: "EXPERIENCIA DESTACADA",
        title: "Diseño que responde.",
        description:
          "Un espacio preparado para una experiencia interactiva real, con media y descripción cuando el proyecto esté listo.",
        slots: slots("interactive", [
          ["Slot para experiencia interactiva", "wide", "landscape"],
        ]),
      },
      {
        type: "projects",
        eyebrow: "EXPERIMENTS / TOOLS",
        title: "Prototipos y herramientas.",
        slots: slots("interactive", [
          ["Slot para prototipo o interfaz", "large", "landscape"],
          ["Slot para experimento o utility", "medium", "square"],
        ], 2),
      },
      {
        type: "statement",
        eyebrow: "MOTION + CODE",
        title: "Diseño que responde.",
        description:
          "Combino movimiento, interacción y JavaScript aplicado a experiencias multimedia para que cada respuesta visual tenga un propósito.",
        details: [
          "Movimiento",
          "Interacción",
          "JavaScript aplicado",
          "Experiencias multimedia",
        ],
      },
      {
        type: "process",
        eyebrow: "PROCESO",
        title: "Probar, ajustar, conectar.",
        steps: ["Idea", "Prototipo", "Interacción", "Prueba", "Refinamiento"],
      },
    ],
  },
};
