export type Partner = {
  id: string;
  name: string;
  short: string;
  role: string;
  url?: string;
};

export const PARTNERS: Partner[] = [
  { id: "p1", name: "Socio Beneficiario 1", short: "SB1", role: "Coordinador — cooperativa productora" },
  { id: "p2", name: "Socio Beneficiario 2", short: "SB2", role: "Industria cárnica / matadero" },
  { id: "p3", name: "Socio Beneficiario 3", short: "SB3", role: "Centro tecnológico agroalimentario" },
  { id: "p4", name: "Socio Beneficiario 4", short: "SB4", role: "Universidad — Facultad de Veterinaria" },
  { id: "p5", name: "Socio Beneficiario 5", short: "SB5", role: "Empresa tecnológica de identificación" },
  { id: "p6", name: "Socio Beneficiario 6", short: "SB6", role: "Asociación sectorial porcina" },
];

export const SUBCONTRACTED: Partner[] = [
  { id: "s1", name: "Entidad Subcontratada 1", short: "ES1", role: "Consultoría técnica especializada" },
  { id: "s2", name: "Entidad Subcontratada 2", short: "ES2", role: "Comunicación y difusión" },
  { id: "s3", name: "Entidad Subcontratada 3", short: "ES3", role: "Análisis de laboratorio" },
];

export type ActivityStatus = "planned" | "in-progress" | "completed";
export type Activity = {
  id: string;
  code: string;
  title: string;
  body: string;
  status: ActivityStatus;
  progress: number;
};

export const ACTIVITIES: Activity[] = [
  { id: "a1", code: "A1", title: "Diseño técnico del sistema de tatuaje", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diseño y especificación técnica del sistema de identificación.", status: "completed", progress: 100 },
  { id: "a2", code: "A2", title: "Validación en granja piloto", body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Validación en condiciones reales de explotación.", status: "in-progress", progress: 65 },
  { id: "a3", code: "A3", title: "Estudios de bienestar animal", body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", status: "in-progress", progress: 45 },
  { id: "a4", code: "A4", title: "Integración con sistemas de trazabilidad", body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", status: "in-progress", progress: 30 },
  { id: "a5", code: "A5", title: "Análisis técnico-económico", body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", status: "planned", progress: 10 },
  { id: "a6", code: "A6", title: "Formación a personal de granja y matadero", body: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.", status: "planned", progress: 0 },
  { id: "a7", code: "A7", title: "Difusión y transferencia de resultados", body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.", status: "in-progress", progress: 25 },
  { id: "a8", code: "A8", title: "Coordinación y gestión del proyecto", body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.", status: "in-progress", progress: 55 },
];

export type DocResource = {
  id: string;
  title: string;
  description: string;
  fileType: string;
  size?: string;
  date?: string;
  url?: string;
};

export const RESULTS_DOCS: DocResource[] = [
  { id: "r1", title: "Entregable E1.1 — Especificaciones técnicas", description: "Documento con las especificaciones técnicas del sistema de identificación por tatuaje desarrollado en la Actividad 1.", fileType: "PDF", size: "1.2 MB", date: "2025-03-15" },
  { id: "r2", title: "Entregable E2.1 — Protocolo de validación en campo", description: "Protocolo detallado para la validación del sistema en granjas piloto.", fileType: "PDF", size: "850 KB", date: "2025-05-10" },
  { id: "r3", title: "Entregable E3.1 — Informe preliminar de bienestar animal", description: "Resultados iniciales del estudio comparativo de bienestar animal.", fileType: "PDF" },
  { id: "r4", title: "Entregable E4.1 — Arquitectura de integración", description: "Documento técnico sobre integración con sistemas de trazabilidad existentes." },
  { id: "r5", title: "Entregable E5.1 — Análisis técnico-económico" , description: "Estudio de viabilidad económica y técnica del sistema propuesto." },
  { id: "r6", title: "Publicación científica 1", description: "Artículo científico revisado por pares sobre los resultados intermedios del proyecto." },
];

export const MATERIALS_DOCS: DocResource[] = [
  { id: "m1", title: "Folleto divulgativo del proyecto", description: "Folleto general de presentación del proyecto PIGTATTOO.", fileType: "PDF", size: "2.4 MB" },
  { id: "m2", title: "Ficha técnica del sistema", description: "Ficha técnica sintética del sistema de identificación." , fileType: "PDF"},
  { id: "m3", title: "Cartel institucional", description: "Cartel institucional para eventos y jornadas del proyecto." },
  { id: "m4", title: "Presentación corporativa", description: "Presentación general utilizada en jornadas de difusión." },
  { id: "m5", title: "Vídeo divulgativo", description: "Vídeo de presentación del proyecto y sus objetivos." },
  { id: "m6", title: "Notas de prensa", description: "Recopilación de notas de prensa emitidas durante el proyecto." },
];
