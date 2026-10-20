/**
 * Banco de Proyectos Iniciales - EMEA Arquitectura
 * Especialidad: Arquitectura Sanitaria/Hospitalaria y Habitacional Contemporánea
 */

export const INITIAL_PROJECTS = [
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
        "assets/wellness-reception.jpg"
      ]
    }
  },
  {
    id: "proj-siss",
    title: "Centro Médico SISS",
    shortTitle: "Centro Médico SISS",
    category: "salud",
    categoryLabel: "Arquitectura Para la Salud",
    year: "2025",
    status: "Finalizado",
    location: "Córdoba, Argentina",
    surface: "1.850 m²",
    use: "Salud / Consultorios & Diagnóstico",
    image: "assets/siss-hero.jpg",
    summary: "Centro médico polivalente con arquitectura de vanguardia, doble altura de recepción, accesibilidad universal y envolvente de control bioclimático.",
    memoriaDescriptiva: `El Centro Médico SISS fue concebido como una pieza arquitectónica icónica que conjuga prestancia institucional y un diseño enfocado en la experiencia del paciente. 

El pórtico de acceso monumental genera una transición amable entre el entorno urbano y el ámbito sanitario. En el interior, la doble altura, los amplios paños vidriados y la integración con patios de luz natural garantizan un ambiente sereno y acogedor.`,
    details: {
      client: "SISS Salud",
      program: "Consultorios de diversas especialidades, área de estudios complementarios, laboratorio de análisis clínicos y áreas de enfermería.",
      challenges: "Accesibilidad universal total mediante rampas integradas a la volumetría exterior y confort higrotérmico pasivo.",
      specs: [
        { label: "Superficie", value: "1.850 m²" },
        { label: "Año", value: "2025" },
        { label: "Ubicación", value: "Córdoba, Argentina" },
        { label: "Tipología", value: "Centro Médico Polivalente" }
      ],
      gallery: [
        "assets/siss-hero.jpg",
        "assets/siss-cover.jpg"
      ]
    }
  },
  {
    id: "proj-3",
    title: "Residencia Bruma: Casa en el Lago",
    shortTitle: "Residencia Bruma",
    category: "residenciales",
    categoryLabel: "Residenciales",
    year: "2024",
    status: "Finalizado",
    location: "Bariloche, Río Negro",
    surface: "580 m²",
    use: "Residencial / Vivienda Unifamiliar",
    image: "assets/cat-residenciales.jpg",
    summary: "Vivienda unifamiliar con envolvente térmica pasiva, estructura de hormigón visto y grandes vanos orientados a las visuales cordilleranas.",
    memoriaDescriptiva: `Concebida en diálogo íntimo con el entorno paisajístico patagónico, la Residencia Bruma combina pureza volumétrica y calidez material. Los grandes planos vidriados capturan la luz natural y el reflejo del lago, mientras que la estructura de hormigón visto y revestimientos en madera local aseguran eficiencia energética y confort interior constante.`,
    details: {
      client: "Privado",
      program: "Planta abierta con doble altura, 4 dormitorios en suite, estudio integrado con luz cenital, galería con deck voladizo y sistema de geotermia.",
      challenges: "Implantación en terreno con pendiente pronunciada de 35°, minimización de puentes térmicos en climas extremos.",
      specs: [
        { label: "Tipología", value: "Vivienda Unifamiliar Exclusiva" },
        { label: "Carpinterías", value: "Aluminio RPT con triple vidriado hermético (TVH)" },
        { label: "Aislación", value: "Muros dobles con EPS de alta densidad (120mm)" },
        { label: "Superficie Terreno", value: "2.400 m²" }
      ],
      gallery: [
        "assets/cat-residenciales.jpg",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  },
  {
    id: "proj-4",
    title: "Centro de Diagnóstico por Imágenes & Ambulatorio Metropolitano",
    shortTitle: "Centro Ambulatorio Metropolitano",
    category: "salud",
    categoryLabel: "Arquitectura Para la Salud",
    year: "2023",
    status: "Finalizado",
    location: "Rosario, Santa Fe",
    surface: "4.900 m²",
    use: "Salud / Diagnóstico por Imágenes",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    summary: "Reconversión de un edificio patrimonial para albergar tecnología médica de última generación con circulaciones fluidas y accesibilidad universal.",
    memoriaDescriptiva: `Reconversión integral de edificio para albergar equipamiento de diagnóstico de alta complejidad, optimizando el flujo de pacientes ambulatorios y la bioseguridad del personal.`,
    details: {
      client: "Consorcio Médico del Litoral",
      program: "2 salas de Resonancia Magnética 3T, 3 Tomógrafos Multislice, laboratorio de análisis clínicos automatizado y 18 consultorios polivalentes.",
      challenges: "Cálculo estructural de refuerzos para sobrecargas de equipos pesados (resucitador de helio, jaulas de Faraday) preservando la fachada histórica.",
      specs: [
        { label: "Equipamiento Pesado", value: "2 Resonadores 3.0T + 3 TACs" },
        { label: "Flujo de Pacientes", value: "Capacidad para 1.200 consultas/día" },
        { label: "Sistemas Especiales", value: "Jaulas de Faraday de cobre y blindaje plomado" },
        { label: "Superficie", value: "4.900 m²" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  },
  {
    id: "proj-5",
    title: "Complejo Residencial & Jardín Biofílico Caelum",
    shortTitle: "Complejo Residencial Caelum",
    category: "residenciales",
    categoryLabel: "Residenciales",
    year: "2024",
    status: "Finalizado",
    location: "Mendoza, Argentina",
    surface: "12.000 m²",
    use: "Residencial / Desarrollo Multifamiliar",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    summary: "Desarrollo residencial de baja densidad articulado en torno a un parque central con vegetación xerófila y terrazas escalonadas.",
    memoriaDescriptiva: `Conjunto habitacional sustentable estructurado alrededor de pulmones verdes nativos y eficiencia bioclimática con vistas a la cordillera.`,
    details: {
      client: "Desarrollos Sustentables Caelum",
      program: "36 unidades residenciales de 2, 3 y 4 ambientes con terrazas privadas, sector de coworking, piscina y circuito aeróbico.",
      challenges: "Aprovechamiento de las brisas cordilleranas para ventilación cruzada natural y diseño de parasoles móviles.",
      specs: [
        { label: "Unidades", value: "36 departamentos boutique" },
        { label: "Espacios Verdes", value: "4.500 m² de parque nativo" },
        { label: "Energía Renovable", value: "Páneles fotovoltaicos en cubiertas" },
        { label: "Amenities", value: "Gimnasio, SUM, Cava y Spa" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  }
];
