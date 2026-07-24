import { Helmet } from "react-helmet-async";
import { useLang } from "@/components/LangGuard";
import { LANGS } from "@/i18n/dictionaries";

type SEOProps = {
  /** Ruta interna sin idioma, comenzando por "/". Ej: "/proyecto" o "/actualidad/mi-slug". */
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
};

/**
 * Metadatos por página vía react-helmet-async.
 * - Emite title, description, OG, twitter, canonical y hreflang para es/ca/en/x-default.
 * - Rutas relativas (sin dominio) — los crawlers las resuelven contra el host activo.
 */
export function SEO({ path, title, description, ogImage, ogType = "website" }: SEOProps) {
  const lang = useLang();
  const canonical = `/${lang}${path === "/" ? "" : path}`;
  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

      <link rel="canonical" href={canonical} />
      {LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`/${l}${path === "/" ? "" : path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`/es${path === "/" ? "" : path}`} />
    </Helmet>
  );
}
