# Plan: Actualizar sitemap desactualizado

## Contexto
Las traducciones `/ca/` y `/en/` ya están completas (`PARTIAL_LANGS = []`), por lo que esas rutas son indexables y `SEO.tsx` emite `hreflang` para `es`, `ca`, `en` y `x-default` en todas las páginas. Sin embargo, `public/sitemap.xml` solo lista rutas `/es/` y sus `<xhtml:link>` alternates solo declaran `es` + `x-default`. Esto crea una discrepancia entre las anotaciones hreflang de las páginas y el sitemap.

## Lo que NO se toca (política de sitemap sin URL pública)
- **No añadir dominio base**: no hay `published_url` confirmada, solo preview Lovable. Se mantienen rutas relativas en `<loc>`.
- **No añadir `Sitemap:` a robots.txt** hasta tener dominio público definitivo. El `# Sitemap: TODO` actual se conserva.
- **No migrar** a script generador ni añadir entradas dinámicas de noticias hasta conectar Contentful y tener publicaciones reales.
- **No añadir `<lastmod>`**: no hay timestamp autoritativo por página; se omite.

## Cambios

### 1. Actualizar `public/sitemap.xml`
Para cada una de las 11 rutas (inicio, proyecto, consorcio, actividades, actualidad, resultados, contacto, accesibilidad, aviso-legal, privacidad, cookies), crear tres entradas — `/es/`, `/ca/`, `/en/` — y en cada una declarar los cuatro `<xhtml:link>` alternates: `es`, `ca`, `en` y `x-default`.

Estructura por entrada (ejemplo con `proyecto`):
```xml
<url>
  <loc>/es/proyecto</loc>
  <xhtml:link rel="alternate" hreflang="es" href="/es/proyecto"/>
  <xhtml:link rel="alternate" hreflang="ca" href="/ca/proyecto"/>
  <xhtml:link rel="alternate" hreflang="en" href="/en/proyecto"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="/es/proyecto"/>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```
Lo mismo para `/ca/proyecto` y `/en/proyecto` (con su propio `<loc>` y los mismos cuatro alternates).

Conservar los `changefreq` y `priority` actuales por tipo de página (sección).

### 2. Actualizar el comentario del sitemap
Sustituir el comentario actual sobre "solo /es/ porque /ca/ y /en/ noindex" por uno que indique que las tres lenguas están indexables y que el dominio base se añadirá al confirmar la URL pública.

## Verificación
- Releer `public/sitemap.xml` para confirmar 33 entradas (11 rutas × 3 idiomas) con los cuatro alternates cada una.
- Confirmar que `robots.txt` sigue sin directiva `Sitemap:` activa.
- No requiere typecheck ni build (es un archivo estático `public/`).
