/**
 * Banco de Proyectos Iniciales - Manestar + Avila Arquitectura
 * Especialidades: Arquitectura Sanitaria/Hospitalaria y Obras Residenciales Contemporáneas
 */

export const INITIAL_PROJECTS = [
  // ==========================================================================
  // SUBSECCIÓN 1: ARQUITECTURA PARA LA SALUD
  // ==========================================================================
  {
    id: "proj-tomografo",
    title: "Centro de Diagnóstico por Imágenes: Tomografía Computada & Alta Complejidad",
    shortTitle: "Centro Diagnóstico TAC & Resonancia",
    category: "salud",
    categoryLabel: "Arquitectura Para la Salud",
    year: "2026",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "620 m²",
    use: "Salud / Diagnóstico por Imágenes de Alta Complejidad",
    image: "assets/salud-tomografo-diagnostico.jpg",
    summary: "Infraestructura sanitaria de máxima precisión técnica para instalación de equipamiento tomográfico y resonancia magnética, con búnker plomado, comando visual y bioseguridad.",
    memoriaDescriptiva: `El proyecto responde a los rigurosos requerimientos arquitectónicos y físicos exigidos para la instalación de tomografía computada y resonancia de última generación.

La sala de escaneo incorpora aislamiento radiológico integral en muros, pisos y cielo rasos mediante plomo de densidad certificada, complementado con una ventana de control con vidrio plomado de alta transparencia que garantiza la supervisión visual continua y la bioprotección del operador técnico.

El puesto de comando fue diseñado con criterios ergonómicos, ventilación independiente de presión negativa y distribución modular de bandejas de datos y potencia aisladas. La atmósfera general combina acabados asépticos antibacterianos con una iluminación perimetral tenue que reduce la ansiedad del paciente durante el procedimiento.`,
    details: {
      client: "Institución Médica de Diagnóstico",
      program: "Búnker de tomografía computada, sala de comando con vidrio plomado, vestidor de preparación de pacientes, sala técnica de consolas y acceso de camillas de emergencia.",
      challenges: "Blindaje radiológico estricto, refuerzo estructural de losas para disipación de vibraciones y refrigeración de precisión para consolas electrónicas.",
      specs: [
        { label: "Equipamiento", value: "Tomógrafo Computado Multislice Canon" },
        { label: "Blindaje", value: "Plomo 2.5mm + Vidrio Plomado 2.1mm Eq." },
        { label: "Superficie", value: "620 m²" },
        { label: "Año", value: "2026" }
      ],
      gallery: [
        "assets/salud-tomografo-diagnostico.jpg",
        "assets/salud-lobby-recepcion-principal.jpg",
        "assets/salud-sala-espera-vidriada.jpg",
        "assets/salud-recepcion-clinica.jpg"
      ]
    }
  },
  {
    id: "proj-lobby-principal",
    title: "Centro Médico Polivalente: Lobby Principal & Circulaciones Sanitarias",
    shortTitle: "Lobby & Recepción Centro Médico",
    category: "salud",
    categoryLabel: "Arquitectura Para la Salud",
    year: "2025",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "1.450 m²",
    use: "Salud / Hall Central & Atención al Paciente",
    image: "assets/salud-lobby-recepcion-principal.jpg",
    summary: "Gran hall central de atención médica y triage ambulatorio con mostrador corrido retroiluminado, exclusa vidriada de acceso, biofilia y claridad circulatoria.",
    memoriaDescriptiva: `El hall central articula el flujo de pacientes ambulatorios hacia los consultorios de especialidades, laboratorios y diagnóstico.

El volumen de recepción se materializa a través de un mostrador corrido de madera clara y estrías acanaladas, enfatizado por una garganta lumínica inferior en LED cálido que flota visualmente sobre el solado porcelánico pulido.

Una exclusa de ingreso con carpinterías de aluminio y vidrio templado modula el intercambio térmico con el exterior y optimiza el consumo energético del sistema de climatización central. La vegetación de interior y los amplios aventanamientos con vistas a la arboleda exterior refuerzan los lineamientos proyectuales del Wellness aplicados a la salud.`,
    details: {
      client: "Centro Médico Regional",
      program: "Lobby central de doble altura, mostrador de triage para 4 puestos, esclusa de control térmico, sectores de espera diferida y núcleos de sanitarios accesibles.",
      challenges: "Aislamiento acústico de zonas de espera mediante paneles fonoabsorbentes y circulación diferenciada limpia/sucia.",
      specs: [
        { label: "Capacidad", value: "850 pacientes / día" },
        { label: "Superficie", value: "1.450 m²" },
        { label: "Iluminación", value: "Sistemas LED cálido con control circadiano" },
        { label: "Año", value: "2025" }
      ],
      gallery: [
        "assets/salud-lobby-recepcion-principal.jpg",
        "assets/salud-sala-espera-vidriada.jpg",
        "assets/salud-tomografo-diagnostico.jpg",
        "assets/salud-recepcion-clinica.jpg"
      ]
    }
  },
  {
    id: "proj-aramburu-espera",
    title: "Centro Médico Aramburu: Sala de Espera Panorámica & Arte Biofílico",
    shortTitle: "Centro Médico Aramburu: Sala de Espera",
    category: "salud",
    categoryLabel: "Arquitectura Para la Salud",
    year: "2025",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "520 m²",
    use: "Salud / Sala de Espera & Consultorios",
    image: "assets/salud-sala-espera-vidriada.jpg",
    summary: "Espacio de espera y circulación médica con frente vidriado integral, visuales directas al paisaje natural, mobiliario escandinavo y mural biofílico.",
    memoriaDescriptiva: `Concebida como una pausa en la experiencia médica, la sala de espera del Centro Médico Aramburu maximiza la entrada de luz natural y la permeabilidad visual hacia el parque circundante.

Las carpinterías de suelo a techo con serigrafía micropulida brindan privacidad a la altura de los ojos del paciente sentado, sin perder la conexión con el entorno verde. El espacio incorpora un mural de arte contemporáneo de escala monumental que humaniza el ambiente y rompe con la frialdad hospitalaria convencional.`,
    details: {
      client: "Centro Médico Aramburu",
      program: "Sala de espera panorámica, galería de consultorios, recepción técnica y puestos de autoconsulta.",
      challenges: "Control de deslumbramiento solar matutino mediante vidrios de baja emisividad y cortinas enrollables automatizadas.",
      specs: [
        { label: "Superficie", value: "520 m²" },
        { label: "Vidriados", value: "Frente DVH con lámina de seguridad 6+6" },
        { label: "Ubicación", value: "Córdoba, Argentina" },
        { label: "Año", value: "2025" }
      ],
      gallery: [
        "assets/salud-sala-espera-vidriada.jpg",
        "assets/salud-lobby-recepcion-principal.jpg",
        "assets/salud-recepcion-clinica.jpg"
      ]
    }
  },
  {
    id: "proj-clinica-wellness",
    title: "Clínica de Especialidades & Centro Odontológico Wellness",
    shortTitle: "Clínica Odontológica & Consultorios Wellness",
    category: "salud",
    categoryLabel: "Arquitectura Para la Salud",
    year: "2025",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "380 m²",
    use: "Salud / Odontología & Recepción Wellness",
    image: "assets/clinica-recepcion-wellness.jpg",
    summary: "Diseño y remodelación de clínica odontológica y consultorios bajo estándares Wellness: mostrador curvo, iluminación lineal indirecta y biofilia.",
    memoriaDescriptiva: `El proyecto aborda la humanización de los espacios de atención médica y odontológica a través del lineamiento proyectual Wellness.

La recepción se estructura a partir de un mostrador curvo de madera clara y texturas acanaladas que suavizan el recorrido del paciente. La iluminación lineal rasante emula los ritmos circadianos de luz natural, reduciendo el estrés previo a la consulta.

Los consultorios clínicos cuentan con panelados de vidrio esmerilado que permiten el paso de la luz garantizando privacidad acústica y visual, ergonomía total para los profesionales y acabados sanitarios antibacterianos de fácil higienización.`,
    details: {
      client: "Clínica Privada",
      program: "Recepción y sala de espera Wellness, 3 consultorios odontológicos de alta precisión, área de esterilización, laboratorio y sanitarios accesibles.",
      challenges: "Instalaciones de aire comprimido, aspiración quirúrgica y bandejas eléctricas ocultas bajo cielorraso técnico acústico.",
      specs: [
        { label: "Superficie", value: "380 m²" },
        { label: "Enfoque", value: "Arquitectura Sanitaria Wellness" },
        { label: "Ubicación", value: "Córdoba, Argentina" },
        { label: "Año", value: "2025" }
      ],
      gallery: [
        "assets/clinica-recepcion-wellness.jpg",
        "assets/clinica-consultorio-dental.jpg",
        "assets/salud-recepcion-clinica.jpg"
      ]
    }
  },
  {
    id: "proj-villa-dolores",
    title: "Centro de Diagnóstico e Imágenes Médicas Villa Dolores",
    shortTitle: "Centro Diagnóstico por Imágenes Villa Dolores",
    category: "salud",
    categoryLabel: "Arquitectura Para la Salud",
    year: "2026",
    status: "En obra",
    location: "Villa Dolores - Córdoba, Argentina",
    surface: "547 m²",
    use: "Salud / Diagnóstico por Imágenes",
    image: "assets/villa-dolores-facade.jpg",
    summary: "Centro de diagnóstico por imágenes de alta complejidad en una parcela entre medianeras de 547 m², integrando organización funcional, claridad circulatoria y luz natural.",
    memoriaDescriptiva: `El proyecto resuelve un centro de diagnóstico por imágenes de alta complejidad en una parcela entre medianeras de 547 m², integrando organización funcional, claridad circulatoria y luz natural.

La fachada combina un muro cortina vidriado con una piel metálica microperforada de planos desplazados, que modula el sol del oeste y las visuales desde la calle, aportando privacidad e identidad institucional. Un hall a doble altura articula la recepción, la sala de espera y las circulaciones verticales.

Hacia el interior, un recorrido longitudinal organiza las áreas médicas, acompañado por lucernarios y un patio que incorporan luz natural en la profundidad del lote. Los paños vidriados, los revestimientos acanalados y la madera aportan continuidad visual y calidez.

La planta baja concentra los servicios de Resonancia Magnética, Tomografía, Radiología, Densitometría, Mamografía, Ecografía y Extracciones, contemplando recorridos diferenciados para pacientes y personal. La planta alta aloja áreas administrativas y técnicas complementarias, con una reserva para el crecimiento futuro del centro.`,
    details: {
      client: "Centro de Diagnóstico Villa Dolores",
      program: "Resonancia Magnética, Tomografía, Radiología, Densitometría, Mamografía, Ecografía, Extracciones y área administrativa",
      challenges: "Blindaje electromagnético de jaula de Faraday, piel microperforada de control solar oeste y doble circulación técnica/pública.",
      specs: [
        { label: "Superficie Cubierta", value: "547 m²" },
        { label: "Estado", value: "En obra (2026)" },
        { label: "Ubicación", value: "Villa Dolores - Córdoba" },
        { label: "Tipología", value: "Diagnóstico por Imágenes" }
      ],
      gallery: [
        "assets/villa-dolores-facade.jpg",
        "assets/villa-dolores-night.jpg",
        "assets/salud-tomografo-diagnostico.jpg",
        "assets/salud-lobby-recepcion-principal.jpg"
      ]
    }
  },

  // ==========================================================================
  // SUBSECCIÓN 2: OBRAS Y PROYECTOS RESIDENCIALES
  // ==========================================================================
  {
    id: "proj-residencia-deck",
    title: "Residencia Terra Atardecer: Casa con Doble Altura y Deck",
    shortTitle: "Residencia Terra Atardecer",
    category: "residenciales",
    categoryLabel: "Obras Residenciales",
    year: "2025",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "420 m²",
    use: "Residencial / Vivienda Unifamiliar",
    image: "assets/residencia-deck-atardecer.jpg",
    summary: "Vivienda contemporánea de dos niveles con imponente doble altura vidriada, deck de madera perimetral, integración biofílica y juegos de luz natural al crepúsculo.",
    memoriaDescriptiva: `La vivienda se proyecta como un diálogo constante entre el interior y el parque posterior. El volumen de doble altura vidriado articula la zona social con las áreas privadas de planta alta, permitiendo que la luz del atardecer inunde el corazón de la casa.

El gran deck de madera en planta baja funciona como expansión exterior directa de los ambientes comunes, conectando con el jardín iluminado y un muro verde perimetral que asegura intimidad y frescura térmica pasiva.`,
    details: {
      client: "Privado",
      program: "Living-comedor en doble altura, cocina integrada con isla, 3 dormitorios en suite, galería con asador, deck de madera y piscina.",
      challenges: "Cálculo de carpinterías de aluminio de gran porte con DVH de control solar para evitar sobrecalentamiento vespertino.",
      specs: [
        { label: "Superficie Cubierta", value: "420 m²" },
        { label: "Carpinterías", value: "Aluminio A40 con DVH laminado" },
        { label: "Ubicación", value: "Córdoba, Argentina" },
        { label: "Año", value: "2025" }
      ],
      gallery: [
        "assets/residencia-deck-atardecer.jpg",
        "assets/residencia-fachada-piedra.jpg",
        "assets/residencia-pergola-moderna.jpg"
      ]
    }
  },
  {
    id: "proj-residencia-piedra",
    title: "Residencia Cantera: Casa de Dos Plantas con Piedra y Madera",
    shortTitle: "Residencia Cantera",
    category: "residenciales",
    categoryLabel: "Obras Residenciales",
    year: "2024",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "360 m²",
    use: "Residencial / Vivienda Unifamiliar",
    image: "assets/residencia-fachada-piedra.jpg",
    summary: "Fachada contemporánea caracterizada por un núcleo central de piedra rústica, aventanamientos verticales, jardineras voladas de madera y acceso jerarquizado.",
    memoriaDescriptiva: `Esta residencia destaca por su fuerte impronta volumétrica y honestidad de materiales. El eje vertical de piedra natural enmarca la doble altura del hall de ingreso, mientras que los volúmenes superiores en voladizo incorporan jardineras corridas de madera que aportan calidez y naturaleza a la fachada.

El acceso vehicular y peatonal se resuelven de forma independiente, garantizando comodidad, seguridad y una presencia sobria en el entorno residencial.`,
    details: {
      client: "Privado",
      program: "Planta baja social con cochera doble cerrada, cocina-comedor y patio interno. Planta alta con suite principal y 2 dormitorios con jardineras.",
      challenges: "Detalle constructivo de jardineras suspendidas con sistema de drenaje oculto e impermeabilización bicapa.",
      specs: [
        { label: "Superficie Cubierta", value: "360 m²" },
        { label: "Revestimiento", value: "Piedra natural local y madera tratada" },
        { label: "Ubicación", value: "Córdoba, Argentina" },
        { label: "Año", value: "2024" }
      ],
      gallery: [
        "assets/residencia-fachada-piedra.jpg",
        "assets/residencia-deck-atardecer.jpg",
        "assets/residencia-pergola-moderna.jpg"
      ]
    }
  },
  {
    id: "proj-residencia-pergola",
    title: "Residencia El Prado: Casa Contemporánea con Pérgola & Piedra",
    shortTitle: "Residencia El Prado",
    category: "residenciales",
    categoryLabel: "Obras Residenciales",
    year: "2024",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "295 m²",
    use: "Residencial / Vivienda de Una Planta",
    image: "assets/residencia-pergola-moderna.jpg",
    summary: "Vivienda en una sola planta con desarrollo horizontal, pérgola metálica moderna, muro de piedra iluminado y ventanales apaisados integrados a canteros.",
    memoriaDescriptiva: `Diseñada bajo los principios de accesibilidad y fluidez espacial en una única planta, la Residencia El Prado propone una volumetría pura y extendida. La pérgola metálica aporta sombra y jerarquía al ingreso y estacionamiento, articulándose con un muro exterior en piedra iluminado con rasantes cálidas.

Las aberturas frontales quedan enmarcadas por cajones en relieve con jardineras incorporadas, protegiendo las visuales interiores y generando un microclima verde permanente.`,
    details: {
      client: "Privado",
      program: "3 dormitorios (1 en suite), estar-comedor integrado, pérgola vehicular exterior, galería semicubierta con asador y patio parquizado.",
      challenges: "Estructura metálica liviana autoportante para la pérgola y solados de hormigón intertrabado drenante.",
      specs: [
        { label: "Superficie Cubierta", value: "295 m²" },
        { label: "Tipología", value: "Vivienda Unifamiliar en 1 Planta" },
        { label: "Ubicación", value: "Córdoba, Argentina" },
        { label: "Año", value: "2024" }
      ],
      gallery: [
        "assets/residencia-pergola-moderna.jpg",
        "assets/residencia-deck-atardecer.jpg",
        "assets/residencia-fachada-piedra.jpg"
      ]
    }
  }
];
