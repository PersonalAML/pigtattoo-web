/**
 * Genera public/sitemap.xml con las rutas estáticas (11 secciones × 3 idiomas)
 * y, si hay credenciales de Contentful, una entrada por noticia publicada.
 *
 * Se ejecuta automáticamente antes de `npm run build` (script `prebuild`).
 * Sin credenciales escribe solo las rutas estáticas: nunca falla el build.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://pigtattoo.es";
const LANGS = ["es", "ca", "en"];
const OUT = resolve(ROOT, "public/sitemap.xml");

/** Rutas estáticas: [path relativo al idioma, changefreq, priority] */
const ROUTES = [
  ["", "weekly", "1.0"],
  ["proyecto", "monthly", "0.8"],
  ["consorcio", "monthly", "0.8"],
  ["actividades", "monthly", "0.8"],
  ["actualidad", "weekly", "0.9"],
  ["resultados", "monthly", "0.8"],
  ["contacto", "yearly", "0.6"],
  ["accesibilidad", "yearly", "0.3"],
  ["aviso-legal", "yearly", "0.3"],
  ["privacidad", "yearly", "0.3"],
  ["cookies", "yearly", "0.3"],
];

function loadEnv() {
  const env = { ...process.env };
  for (const file of [".env", ".env.local", ".env.production"]) {
    const p = resolve(ROOT, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

async function fetchNoticias(env) {
  const space = env.VITE_CONTENTFUL_SPACE_ID;
  const token = env.VITE_CONTENTFUL_TOKEN;
  const environment = env.VITE_CONTENTFUL_ENVIRONMENT || "master";
  if (!space || !token) return [];
  const url =
    `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries` +
    `?content_type=contenidoPigtattoo&limit=1000&select=fields.titulo,fields.fecha,sys.updatedAt`;
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      console.warn(`[sitemap] Contentful respondió ${res.status}; se omiten las noticias.`);
      return [];
    }
    const data = await res.json();
    return (data.items || [])
      .filter((i) => i.fields?.titulo)
      .map((i) => ({
        slug: slugify(i.fields.titulo),
        lastmod: (i.sys?.updatedAt || "").slice(0, 10),
      }));
  } catch (err) {
    console.warn("[sitemap] No se pudo consultar Contentful:", err.message);
    return [];
  }
}

function alternates(path) {
  const links = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}/${l}${path}"/>`,
  );
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/es${path}"/>`);
  return links.join("\n");
}

function urlBlock(lang, path, changefreq, priority, lastmod) {
  return [
    "  <url>",
    `    <loc>${SITE}/${lang}${path}</loc>`,
    alternates(path),
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

const env = loadEnv();
const noticias = await fetchNoticias(env);

const blocks = [];
for (const [route, changefreq, priority] of ROUTES) {
  const path = route ? `/${route}` : "";
  for (const lang of LANGS) blocks.push(urlBlock(lang, path, changefreq, priority, null));
}
for (const n of noticias) {
  for (const lang of LANGS) {
    blocks.push(urlBlock(lang, `/actualidad/${n.slug}`, "monthly", "0.7", n.lastmod || null));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generado por scripts/build-sitemap.mjs. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join("\n")}
</urlset>
`;

writeFileSync(OUT, xml, "utf8");
console.log(
  `[sitemap] ${blocks.length} URLs escritas en public/sitemap.xml ` +
    `(${noticias.length} noticias de Contentful).`,
);
