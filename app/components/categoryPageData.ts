import type { CategoryId } from "./categoryData";

type ProjectSection = {
  type: "projects";
  eyebrow: string;
  title: string;
  description?: string;
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

export const categoryPageData: Record<CategoryId, CategoryPageConfig> = {
  motion: {
    sections: [
      {
        type: "projects",
        eyebrow: "PROYECTO DESTACADO",
        title: "Delitos Ambientales.",
        description:
          "Tres piezas audiovisuales de Motion Graphics para ESSBIO sobre contenidos relacionados con delitos ambientales.",
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
          "FINNING y Prevención de delitos reúnen experiencias formativas interactivas con mecánicas de juego y escenarios de aprendizaje.",
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
          "FINNING propone encontrar pares en una actividad de aprendizaje; Prevención de delitos combina una misión con exploración, pistas y preguntas.",
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
        type: "cards",
        eyebrow: "MECÁNICAS EN LOS PROYECTOS",
        title: "Interacción y progreso.",
        description:
          "Dos experiencias aplican dinámicas distintas para guiar la participación.",
        layout: "grid",
        items: [
          {
            title: "Asociar pares",
            description:
              "FINNING presenta tarjetas que se giran y se revisan para encontrar pares.",
          },
          {
            title: "Explorar una misión",
            description:
              "Prevención de delitos propone recorrer una oficina, reunir pistas y responder preguntas.",
          },
          {
            title: "Seguir el avance",
            description:
              "Las experiencias muestran indicadores como tiempo, vidas, preguntas y puntaje de investigación.",
          },
        ],
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
          "FINNING y Prevención de delitos muestran experiencias interactivas de aprendizaje desarrolladas en Articulate Storyline.",
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
          "ESSBIO combina ilustración, texto en pantalla y elementos jurídicos en tres piezas audiovisuales de Motion Graphics.",
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
          "Prevención de delitos combina una misión guiada, exploración de una oficina, pistas y preguntas en una experiencia interactiva.",
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
