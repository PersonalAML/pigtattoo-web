import { Helmet } from "react-helmet-async";
import { useLang } from "@/components/LangGuard";
import { LANGS, PARTIAL_LANGS } from "@/i18n/dictionaries";

type Crumb = { name: string; path: string };

type SEOProps = {
  /** Ruta interna sin idioma, comenzando por "/". Ej: "/proyecto" o "/actualidad/mi-slug". */
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
  /** Migas de pan (sin incluir Inicio) para el JSON-LD BreadcrumbList. */
  breadcrumbs?: Crumb[];
};

/**
 * Metadatos por página vía react-helmet-async.
 * - Emite title, description, OG, twitter, canonical y hreflang para es/ca/en/x-default.
 * - Rutas relativas (sin dominio) — los crawlers las resuelven contra el host activo.
 * - Los idiomas con traducción incompleta se marcan noindex hasta que se traduzcan.
 */
export function SEO({ path, title, description, ogImage, ogType = "website", breadcrumbs }: SEOProps) {
  const lang = useLang();
  const suffix = path === "/" ? "" : path;
  const canonical = `/${lang}${suffix}`;
  const noindex = PARTIAL_LANGS.includes(lang);
  const image = ogImage ?? "/og-image.jpg";

  const breadcrumbJsonLd =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "PIGTATTOO", item: `/${lang}` },
            ...breadcrumbs.map((c, i) => ({
              "@type": "ListItem",
              position: i + 2,
              name: c.name,
              item: `/${lang}${c.path}`,
            })),
          ],
        }
      : null;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={lang === "ca" ? "ca_ES" : lang === "en" ? "en_GB" : "es_ES"} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />


      <link rel="canonical" href={canonical} />
      {LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`/${l}${suffix}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`/es${suffix}`} />

      {breadcrumbJsonLd ? (
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
