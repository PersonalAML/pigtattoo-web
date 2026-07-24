/**
 * Contentful integration for the Actualidad (news) section.
 *
 * NOTE — Netlify migration:
 * These server functions only depend on the Lovable connector gateway.
 * To migrate to Netlify, replace `createServerFn` with a Netlify Edge
 * Function that reads CONTENTFUL_SPACE_ID / CONTENTFUL_API_KEY from the
 * Netlify environment and calls the Contentful Content Delivery API
 * directly (https://cdn.contentful.com), returning the same shape.
 */
import { createServerFn } from "@tanstack/react-start";
import type { Document } from "@contentful/rich-text-types";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/contentful";
const CONTENT_TYPE = "contenidoPigtattoo";

export type ContentfulAsset = {
  id: string;
  url: string;
  title?: string;
  width?: number;
  height?: number;
};

export type Noticia = {
  id: string;
  slug: string;
  titulo: string;
  extracto?: string;
  fecha?: string;
  autor?: string;
  categoria?: string;
  imagenDestacada?: ContentfulAsset;
  cuerpo?: Document;
  galeria?: ContentfulAsset[];
  destacada: boolean;
};

function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

type CFEntry = {
  sys: { id: string };
  fields: Record<string, unknown>;
};

type CFAssetRaw = {
  sys: { id: string };
  fields: {
    title?: string;
    file?: {
      url?: string;
      details?: { image?: { width?: number; height?: number } };
    };
  };
};

type CFResponse = {
  items?: CFEntry[];
  includes?: { Asset?: CFAssetRaw[]; Entry?: CFEntry[] };
};

function resolveAsset(link: unknown, assetsById: Map<string, ContentfulAsset>): ContentfulAsset | undefined {
  if (!link || typeof link !== "object") return undefined;
  const l = link as { sys?: { id?: string } };
  const id = l.sys?.id;
  if (!id) return undefined;
  return assetsById.get(id);
}

function buildAssetMap(response: CFResponse): Map<string, ContentfulAsset> {
  const map = new Map<string, ContentfulAsset>();
  const assets = response.includes?.Asset ?? [];
  for (const a of assets) {
    const raw = a.fields?.file?.url;
    if (!raw) continue;
    const url = raw.startsWith("//") ? `https:${raw}` : raw;
    map.set(a.sys.id, {
      id: a.sys.id,
      url,
      title: a.fields.title,
      width: a.fields.file?.details?.image?.width,
      height: a.fields.file?.details?.image?.height,
    });
  }
  return map;
}

function mapEntry(entry: CFEntry, assets: Map<string, ContentfulAsset>): Noticia {
  const f = entry.fields;
  const titulo = String(f.titulo ?? "Sin título");
  const galeriaRaw = Array.isArray(f.galeria) ? (f.galeria as unknown[]) : [];
  return {
    id: entry.sys.id,
    slug: slugify(titulo) || entry.sys.id,
    titulo,
    extracto: typeof f.extracto === "string" ? f.extracto : undefined,
    fecha: typeof f.fecha === "string" ? f.fecha : undefined,
    autor: typeof f.autor === "string" ? f.autor : undefined,
    categoria: typeof f.categoria === "string" ? f.categoria : undefined,
    imagenDestacada: resolveAsset(f.imagenDestacada, assets),
    cuerpo: (f.cuerpo && typeof f.cuerpo === "object") ? (f.cuerpo as Document) : undefined,
    galeria: galeriaRaw
      .map((g) => resolveAsset(g, assets))
      .filter((x): x is ContentfulAsset => Boolean(x)),
    destacada: Boolean(f.noticiaDestacada),
  };
}

async function callContentful(path: string, query: Record<string, string>): Promise<CFResponse | null> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const apiKey = process.env.CONTENTFUL_API_KEY;
  const lovableKey = process.env.LOVABLE_API_KEY;
  if (!spaceId || !apiKey || !lovableKey) {
    return null;
  }
  const url = new URL(`${GATEWAY_URL}/spaces/${spaceId}${path}`);
  for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": apiKey,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Contentful gateway failed [${res.status}]: ${body}`);
    return null;
  }
  return (await res.json()) as CFResponse;
}

export const getNoticias = createServerFn({ method: "GET" }).handler(async (): Promise<{
  items: Noticia[];
  configured: boolean;
  error?: string;
}> => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const apiKey = process.env.CONTENTFUL_API_KEY;
  if (!spaceId || !apiKey) {
    return { items: [], configured: false };
  }
  try {
    const data = await callContentful("/entries", {
      content_type: CONTENT_TYPE,
      order: "-fields.fecha",
      limit: "100",
      include: "2",
    });
    if (!data) return { items: [], configured: true, error: "gateway_error" };
    const assets = buildAssetMap(data);
    const items = (data.items ?? []).map((e) => mapEntry(e, assets));
    return { items, configured: true };
  } catch (e) {
    console.error("getNoticias failed", e);
    return { items: [], configured: true, error: "exception" };
  }
});

export const getNoticia = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<{ item: Noticia | null; configured: boolean }> => {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const apiKey = process.env.CONTENTFUL_API_KEY;
    if (!spaceId || !apiKey) return { item: null, configured: false };
    try {
      const all = await callContentful("/entries", {
        content_type: CONTENT_TYPE,
        limit: "200",
        include: "2",
      });
      if (!all) return { item: null, configured: true };
      const assets = buildAssetMap(all);
      const items = (all.items ?? []).map((e) => mapEntry(e, assets));
      const match = items.find((n) => n.slug === data.slug) ?? null;
      return { item: match, configured: true };
    } catch (e) {
      console.error("getNoticia failed", e);
      return { item: null, configured: true };
    }
  });
