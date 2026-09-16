/**
 * Banco de Proyectos Iniciales - EMEA Arquitectura
 * Especialidad: Arquitectura Sanitaria/Hospitalaria y Habitacional Contemporánea
 */

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "Centro de Oncología y Terapia Avanzada San Lucas",
    category: "hospitalaria",
    categoryLabel: "Arquitectura Sanitaria",
    year: "2024",
    location: "Buenos Aires, Argentina",
    surface: "14.500 m²",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    summary: "Complejo hospitalario de alta complejidad diseñado bajo estándares de humanización espacial, bioseguridad nivel 3 y doble circulación aséptica.",
    details: {
      client: "Red San Lucas Salud",
      program: "32 salas de infusión ambulatoria, 4 quirófanos inteligentes de flujo laminar, bunker de radioterapia de alta precisión, área de diagnóstico por imágenes y jardines terapéuticos de recuperación.",
      challenges: "Integración de blindaje electromagnético y baritado en subsuelo, control estricto de presiones diferenciales de aire para pacientes inmunodeprimidos y maximización de luz natural en zonas de internación.",
      specs: [
        { label: "Camas de Internación", value: "85 camas" },
        { label: "Quirófanos", value: "4 unidades con flujo laminar" },
        { label: "Eficiencia Energética", value: "Certificación LEED Healthcare Silver" },
        { label: "Tiempo de Ejecución", value: "22 meses (Metodología BIM 5D)" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  },
  {
    id: "proj-2",
    title: "Clínica Materno-Infantil & Quirófanos Pediátricos Auris",
    category: "hospitalaria",
    categoryLabel: "Arquitectura Sanitaria",
    year: "2023",
    location: "Córdoba, Argentina",
    surface: "8.200 m²",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    summary: "Infraestructura médica enfocada en el parto respetado y cuidados neonatales con ambientación neuro-arquitectónica y biofilia aplicada.",
    details: {
      client: "Grupo Auris Medical",
      program: "6 salas de partos integrales (TPR), Unidad de Cuidados Intensivos Neonatales (UCIN) con monitoreo centralizado, consultorios pediátricos con recorridos lúdicos no intimidantes.",
      challenges: "Aislamiento acústico de alto rendimiento en salas de internación neonatal, pisos conductivos antiestáticos sin juntas y accesos diferenciados para emergencias obstétricas.",
      specs: [
        { label: "Puestos UCIN", value: "24 cunas de alta complejidad" },
        { label: "Salas TPR", value: "6 suites hidromédicas" },
        { label: "Calidad del Aire", value: "Filtros HEPA 99.97% con presión positiva" },
        { label: "Superficie", value: "8.200 m² cubiertos" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  },
  {
    id: "proj-3",
    title: "Residencia Bruma: Casa en el Lago",
    category: "habitacional",
    categoryLabel: "Arquitectura Habitacional",
    year: "2024",
    location: "Bariloche, Río Negro",
    surface: "580 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    summary: "Vivienda unifamiliar con envolvente térmica pasiva, estructura de hormigón visto y grandes vanos orientados a las visuales cordilleranas.",
    details: {
      client: "Privado",
      program: "Planta abierta con doble altura, 4 dormitorios en suite, estudio integrado con luz cenital, galería con deck voladizo y sistema de geotermia para calefacción por suelo radiante.",
      challenges: "Implantación en terreno con pendiente pronunciada de 35°, minimización de puentes térmicos en climas extremos y recolección de aguas pluviales para riego de flora nativa.",
      specs: [
        { label: "Tipología", value: "Vivienda Unifamiliar Exclusiva" },
        { label: "Carpinterías", value: "Aluminio RPT con triple vidriado hermético (TVH)" },
        { label: "Aislación", value: "Muros dobles con EPS de alta densidad (120mm)" },
        { label: "Superficie Terreno", value: "2.400 m²" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  },
  {
    id: "proj-4",
    title: "Centro de Diagnóstico por Imágenes & Ambulatorio Metropolitano",
    category: "hospitalaria",
    categoryLabel: "Arquitectura Sanitaria",
    year: "2023",
    location: "Rosario, Santa Fe",
    surface: "4.900 m²",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    summary: "Reconversión de un edificio patrimonial para albergar tecnología médica de última generación con circulaciones fluidas y accesibilidad universal.",
    details: {
      client: "Consorcio Médico del Litoral",
      program: "2 salas de Resonancia Magnética 3T, 3 Tomógrafos Multislice, laboratorio de análisis clínicos automatizado y 18 consultorios polivalentes.",
      challenges: "Cálculo estructural de refuerzos para sobrecargas de equipos pesados (resucitador de helio, jaulas de Faraday) preservando la fachada histórica protegida.",
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
    category: "habitacional",
    categoryLabel: "Arquitectura Habitacional",
    year: "2024",
    location: "Mendoza, Argentina",
    surface: "12.000 m²",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    summary: "Desarrollo residencial de baja densidad articulado en torno a un parque central con vegetación xerófila y terrazas escalonadas.",
    details: {
      client: "Desarrollos Sustentables Caelum",
      program: "36 unidades residenciales de 2, 3 y 4 ambientes con terrazas privadas, sector de coworking, piscina con climatización solar y circuito aeróbico.",
      challenges: "Aprovechamiento de las brisas cordilleranas para ventilación cruzada natural y diseño de parasoles móviles de madera para control solar pasivo en verano.",
      specs: [
        { label: "Unidades", value: "36 departamentos boutique" },
        { label: "Espacios Verdes", value: "4.500 m² de parque nativo" },
        { label: "Energía Renovable", value: "Páneles fotovoltaicos en cubiertas para áreas comunes" },
        { label: "Amenities", value: "Gimnasio, SUM, Cava y Spa" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  },
  {
    id: "proj-6",
    title: "Módulo Quirúrgico Modular de Rápido Despliegue",
    category: "hospitalaria",
    categoryLabel: "Arquitectura Sanitaria",
    year: "2023",
    location: "Neuquén, Argentina",
    surface: "2.100 m²",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80",
    summary: "Arquitectura industrializada de precisión con paneles sanitarios lavables, montaje en seco en tiempo récord y máxima estanqueidad.",
    details: {
      client: "Ministerio de Salud & Sector Privado",
      program: "Bloque quirúrgico de 3 quirófanos con área de recuperación anestésica, esterilización centralizada y vestuarios con exclusas de descompresión.",
      challenges: "Tiempo récord de fabricación off-site (60 días) y montaje in-situ en 21 días, cumpliendo con la estricta normativa de habilitación sanitaria.",
      specs: [
        { label: "Sistema Constructivo", value: "Estructura modular de acero galvanizado y paneles PIR" },
        { label: "Certificación", value: "Clase ISO 7 en áreas quirúrgicas" },
        { label: "Tiempo de Montaje", value: "21 días en obra" },
        { label: "Superficie", value: "2.100 m²" }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80"
      ]
    }
  }
];
