export type ProjectCaseStudyMedia = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectCaseStudyVideo = {
  src: string;
  poster: string;
  title: string;
  duration: string;
  description: string;
};

export type ProjectCaseStudyContent = {
  intro: string;
  contribution: string;
  metaDescription?: string;
  layoutVariant?: "narrative" | "motion";
  hero?: {
    index?: string;
    kicker?: string;
    headline?: string[];
    caption?: string;
    actionLabel?: string;
    actionHref?: string;
  };
  overview?: {
    type?: string;
    disciplines?: string[];
    fields?: { label: string; value: string }[];
  };
  experience?: {
    label?: string;
    title?: string;
    description?: string;
  };
  interfaceSection?: {
    label?: string;
    title?: string;
  };
  interactionSection?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
  motion?: {
    lead: {
      title: string;
      description: string;
    };
    videos: ProjectCaseStudyVideo[];
    direction: {
      title: string;
      description: string;
      details: { title: string; description: string }[];
    };
    composition: {
      title: string;
      description: string;
      details: { title: string; description: string }[];
    };
    selectedFrames: ProjectCaseStudyMedia[];
  };
  mechanics: {
    title: string;
    description: string;
  }[];
  interfaceDetails: {
    title: string;
    description: string;
  }[];
  gallery?: ProjectCaseStudyMedia[];
};

export const projectCaseStudyData: Record<string, ProjectCaseStudyContent> = {
  "finning-encuentra-el-par-correcto": {
    intro:
      "Experiencia interactiva desarrollada en Articulate Storyline basada en una mecánica de asociación de pares, integrando diseño de interfaz, lógica y gamificación dentro de una actividad de aprendizaje.",
    contribution:
      "Participación en el diseño y construcción de la experiencia, combinando interfaz, estructura, mecánica, lógica e implementación multimedia.",
    mechanics: [
      {
        title: "Girar",
        description: "Presiona las tarjetas para girarlas.",
      },
      {
        title: "Encontrar pares",
        description: "Selecciona cada par correcto.",
      },
      {
        title: "Revisar",
        description: "Presiona “Revisar” para comprobar la selección.",
      },
    ],
    interfaceDetails: [
      {
        title: "Tablero de tarjetas",
        description:
          "La pantalla presenta ocho tarjetas interactivas que se giran para mostrar su contenido.",
      },
      {
        title: "Indicadores de juego",
        description:
          "Un temporizador y cuatro indicadores en forma de corazón acompañan la actividad.",
      },
      {
        title: "Ayuda y revisión",
        description:
          "La interfaz incluye acceso a Finningift y un control para revisar la selección.",
      },
    ],
  },
  "prevencion-de-delitos-estrategia-contra-la-corrupcion": {
    intro:
      "Experiencia interactiva desarrollada en Articulate Storyline alrededor de la prevención de delitos y la corrupción. La demo comienza con una misión y presenta una oficina como escenario de exploración.",
    contribution:
      "Proyecto de autoría propia documentado a partir de la demo publicada y de los elementos que pueden comprobarse directamente en la experiencia.",
    metaDescription:
      "Demo interactiva en Articulate Storyline sobre prevención de delitos y corrupción.",
    layoutVariant: "narrative",
    hero: {
      index: "02",
      kicker: "PREVENCIÓN DE DELITOS",
      headline: ["Estrategia contra", "la corrupción"],
      caption: "DEMO INTERACTIVA / ARTICULATE STORYLINE",
      actionLabel: "Recorrer la experiencia",
    },
    overview: {
      type: "Experiencia interactiva",
      disciplines: [
        "E-Learning",
        "Articulate Storyline",
        "Experiencias Interactivas",
      ],
    },
    experience: {
      label: "LA EXPERIENCIA",
      title: "Una misión en un escenario de oficina.",
      description:
        "La portada da paso a una pantalla de misión. Desde allí, la demo invita a explorar un área de trabajo, reunir pistas y responder preguntas.",
    },
    mechanics: [
      {
        title: "Recibir la misión",
        description:
          "La pantalla “Misión” plantea prevenir delitos contemplados en la Ley 20.393 y explica la tarea antes de entrar al escenario.",
      },
      {
        title: "Explorar la oficina",
        description:
          "La primera etapa observada se titula “Oficina parte 1”. La misión invita a moverse por el área de trabajo y atrapar pistas para sumar puntaje de prevención.",
      },
      {
        title: "Responder preguntas",
        description:
          "La interfaz muestra un contador de preguntas (0/2) y un marcador de investigación (0). La misión indica que aparecerán preguntas durante el recorrido.",
      },
    ],
    interfaceSection: {
      label: "DISEÑO DE LA EXPERIENCIA",
      title: "El progreso forma parte de la escena.",
    },
    interfaceDetails: [
      {
        title: "Misión visible",
        description:
          "Un personaje presenta la tarea y tres indicaciones: explorar el área, evitar faltas relacionadas con la ley y contestar las preguntas.",
      },
      {
        title: "Escenario interactivo",
        description:
          "La etapa observada transcurre en una oficina ilustrada y muestra controles asociados a escenas dentro del escenario.",
      },
      {
        title: "Indicadores de avance",
        description:
          "En la parte superior aparecen el avance de preguntas y el marcador de investigación; la etapa también incluye controles para volver o continuar.",
      },
    ],
    interactionSection: {
      title: "Narrativa, exploración y progreso.",
      description:
        "La demo combina una misión guiada con escenas de oficina y contadores visibles. La invitación a reunir pistas y sumar puntaje, junto con el avance de preguntas, respalda elementos de gamificación sin presentar la experiencia como un juego de puntuación completo.",
      tags: [
        "Narrativa visual",
        "Exploración",
        "Progreso visible",
        "Articulate Storyline",
      ],
    },
  },
  "essbio-delitos-ambientales": {
    intro:
      "Tres piezas audiovisuales de Motion Graphics para ESSBIO que presentan contenidos sobre delitos ambientales mediante ilustración, texto en pantalla y elementos jurídicos.",
    contribution:
      "El material disponible reúne tres videos con explicaciones visuales sobre prevención, disposiciones legales relacionadas con el agua y responsabilidad penal.",
    metaDescription:
      "Tres piezas de Motion Graphics para ESSBIO sobre delitos ambientales.",
    layoutVariant: "motion",
    hero: {
      index: "03",
      kicker: "ESSBIO",
      headline: ["Delitos", "Ambientales"],
      caption: "MOTION GRAPHICS / DISEÑO MULTIMEDIA",
      actionLabel: "Ver las piezas",
      actionHref: "#la-pieza",
    },
    overview: {
      fields: [
        { label: "Cliente", value: "ESSBIO" },
        { label: "Proyecto", value: "Delitos Ambientales" },
        { label: "Disciplina", value: "Motion Graphics" },
        { label: "Área", value: "Diseño Multimedia" },
      ],
    },
    motion: {
      lead: {
        title: "Tres piezas. Un tema en común.",
        description:
          "Las piezas abordan distintos contenidos relacionados con delitos ambientales. Se presentan como piezas numeradas; el material disponible no especifica si forman una serie o capítulos.",
      },
      videos: [
        {
          src: "/projects/essbio-delitos-ambientales/essbio-01.mp4",
          poster:
            "/projects/essbio-delitos-ambientales/posters/essbio-01.webp",
          title: "Pieza 01",
          duration: "01:08",
          description:
            "La pieza incluye un objetivo en pantalla: reconocer conductas constitutivas de delitos ambientales y medidas establecidas en el Modelo de Prevención de Delitos.",
        },
        {
          src: "/projects/essbio-delitos-ambientales/essbio-02.mp4",
          poster:
            "/projects/essbio-delitos-ambientales/posters/essbio-02.webp",
          title: "Pieza 02",
          duration: "01:25",
          description:
            "El material visual presenta los artículos 459 y 461 junto a ejemplos ilustrados sobre derechos de aprovechamiento de aguas y extracción.",
        },
        {
          src: "/projects/essbio-delitos-ambientales/essbio-03.mp4",
          poster:
            "/projects/essbio-delitos-ambientales/posters/essbio-03.webp",
          title: "Pieza 03",
          duration: "01:10",
          description:
            "La pieza muestra los conceptos de persona jurídica y persona natural en relación con la responsabilidad penal.",
        },
      ],
      direction: {
        title: "Ilustración, texto y contexto.",
        description:
          "Los posters y fotogramas revisados combinan personajes ilustrados, rótulos explicativos, iconografía legal y fondos fotográficos de paisajes e instalaciones.",
        details: [
          {
            title: "Personajes",
            description:
              "Figuras ilustradas acompañan la presentación de los contenidos y de los ejemplos.",
          },
          {
            title: "Texto en pantalla",
            description:
              "Títulos, citas legales y frases explicativas organizan la información visible.",
          },
          {
            title: "Color e iconografía",
            description:
              "Contornos y paneles de color contrastan con fondos de instalaciones, mapas y paisajes.",
          },
        ],
      },
      composition: {
        title: "Capas gráficas sobre escenas.",
        description:
          "En los momentos revisados, los recursos alternan fondos fotográficos, ilustraciones y bloques gráficos que jerarquizan la información.",
        details: [
          {
            title: "Composición",
            description:
              "Personajes, rótulos e iconos se distribuyen en áreas separadas para mantener legible cada explicación.",
          },
          {
            title: "Ritmo visual",
            description:
              "El contenido se presenta por bloques visuales sucesivos; cada pieza conserva su propia duración y archivo.",
          },
        ],
      },
      selectedFrames: [
        {
          src: "/projects/essbio-delitos-ambientales/posters/essbio-02.webp",
          alt: "Ilustración sobre los artículos 459 y 461 y ejemplos de extracción de agua",
          caption: "PIEZA 02 / ARTÍCULOS 459 Y 461",
        },
        {
          src: "/projects/essbio-delitos-ambientales/posters/essbio-03.webp",
          alt: "Gráfica sobre responsabilidad penal de personas jurídicas y naturales",
          caption: "PIEZA 03 / RESPONSABILIDAD PENAL",
        },
        {
          src: "/projects/motion-graphics-project.png",
          alt: "Composición sobre la Ley 21.595 abierta en la interfaz de After Effects",
          caption: "CAPTURA DE COMPOSICIÓN / AFTER EFFECTS",
        },
      ],
    },
    mechanics: [],
    interfaceDetails: [],
  },
};
