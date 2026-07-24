import { createClient, type Asset, type EntryFieldTypes, type Entry } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import { slugify } from "@/lib/slug";

// Content type definido en Contentful: `contenidoPigtattoo`.
export type ContenidoPigtattooSkeleton = {
  contentTypeId: "contenidoPigtattoo";
  fields: {
    titulo: EntryFieldTypes.Symbol;
    extracto: EntryFieldTypes.Text;
    fecha: EntryFieldTypes.Date;
    autor?: EntryFieldTypes.Symbol;
    categoria?: EntryFieldTypes.Symbol;
    imagenDestacada?: EntryFieldTypes.AssetLink;
    cuerpo?: EntryFieldTypes.RichText;
    galeria?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    noticiaDestacada?: EntryFieldTypes.Boolean;
  };
};

export type Noticia = {
  id: string;
  slug: string;
  titulo: string;
  extracto: string;
  fecha: string;
  autor?: string;
  categoria?: string;
  destacada: boolean;
  imagen?: { url: string; alt: string; width?: number; height?: number };
  cuerpo?: Document;
  galeria?: { url: string; alt: string }[];
};

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const TOKEN = import.meta.env.VITE_CONTENTFUL_TOKEN;
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? "master";

export const contentfulConfigured = Boolean(SPACE_ID && TOKEN);

const client = contentfulConfigured
  ? createClient({
      space: SPACE_ID!,
      accessToken: TOKEN!,
      environment: ENVIRONMENT,
    })
  : null;

function assetUrl(asset?: Asset<undefined, string> | { fields: Asset["fields"] }): Noticia["imagen"] {
  if (!asset) return undefined;
  const file = (asset.fields as Asset["fields"]).file as
    | { url?: string; details?: { image?: { width: number; height: number } } }
    | undefined;
  if (!file || !file.url) return undefined;
  const url = file.url.startsWith("//") ? `https:${file.url}` : file.url;
  return {
    url,
    alt: ((asset.fields as Asset["fields"]).description as string) ?? "",
    width: file.details?.image?.width,
    height: file.details?.image?.height,
  };
}

function mapEntry(entry: Entry<ContenidoPigtattooSkeleton, undefined, string>): Noticia {
  const f = entry.fields;
  const titulo = f.titulo as string;
  return {
    id: entry.sys.id,
    slug: slugify(titulo),
    titulo,
    extracto: (f.extracto as string) ?? "",
    fecha: (f.fecha as string) ?? entry.sys.createdAt,
    autor: f.autor as string | undefined,
    categoria: f.categoria as string | undefined,
    destacada: Boolean(f.noticiaDestacada),
    imagen: assetUrl(f.imagenDestacada as Asset | undefined),
    cuerpo: f.cuerpo as Document | undefined,
    galeria: Array.isArray(f.galeria)
      ? (f.galeria as Asset[])
          .map((a) => assetUrl(a))
          .filter((x): x is NonNullable<typeof x> => Boolean(x))
          .map((x) => ({ url: x.url, alt: x.alt }))
      : undefined,
  };
}

/** Noticias mock para desarrollar sin credenciales de Contentful. */
const MOCK_NOTICIAS: Noticia[] = [
  {
    id: "mock-1",
    slug: "lanzamiento-del-grupo-operativo",
    titulo: "Lanzamiento del Grupo Operativo PIGTATTOO",
    extracto:
      "El consorcio se reúne en Lleida para arrancar el proyecto y definir el plan de trabajo de los próximos dos años.",
    fecha: "2025-07-07",
    autor: "Coordinación PIGTATTOO",
    categoria: "Hito",
    destacada: true,
  },
  {
    id: "mock-2",
    slug: "primer-piloto-en-granja",
    titulo: "Primer piloto de identificación por tatuaje en granja",
    extracto:
      "Arranca la validación en campo del sistema en condiciones reales de explotación porcina.",
    fecha: "2025-09-15",
    categoria: "Actividad",
    destacada: false,
  },
  {
    id: "mock-3",
    slug: "presentacion-en-jornada-tecnica",
    titulo: "Presentación de PIGTATTOO en jornada técnica sectorial",
    extracto:
      "Difusión del proyecto ante productores, industria y administración en jornadas del sector porcino.",
    fecha: "2025-10-20",
    categoria: "Difusión",
    destacada: false,
  },
];

export async function getNoticias(params: { limit?: number; skip?: number } = {}): Promise<Noticia[]> {
  const { limit = 12, skip = 0 } = params;
  if (!client) {
    return MOCK_NOTICIAS.slice(skip, skip + limit);
  }
  try {
    const res = await client.getEntries<ContenidoPigtattooSkeleton>({
      content_type: "contenidoPigtattoo",
      order: ["-fields.fecha"],
      limit,
      skip,
      include: 2,
    });
    return res.items.map(mapEntry).sort((a, b) => Number(b.destacada) - Number(a.destacada));
  } catch (err) {
    console.error("[contentful] getNoticias falló", err);
    return MOCK_NOTICIAS.slice(skip, skip + limit);
  }
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  if (!client) {
    return MOCK_NOTICIAS.find((n) => n.slug === slug) ?? null;
  }
  try {
    const res = await client.getEntries<ContenidoPigtattooSkeleton>({
      content_type: "contenidoPigtattoo",
      include: 2,
      limit: 100,
    });
    const noticia = res.items.map(mapEntry).find((n) => n.slug === slug);
    return noticia ?? null;
  } catch (err) {
    console.error("[contentful] getNoticiaBySlug falló", err);
    return MOCK_NOTICIAS.find((n) => n.slug === slug) ?? null;
  }
}
