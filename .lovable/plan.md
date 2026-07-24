
# Plan v1 — pigtattoo.es

Objetivo: entregar la v1 pública en español con esqueleto multilingüe listo, diseño sobrio institucional, integración Contentful sólo en Actualidad, GA4 con consentimiento y formulario preparado para Netlify Forms. Contenidos, logos y textos definitivos entran después como reemplazo de mocks.

## 1. Stack y fundamentos

- TanStack Start (ya provisto). File-based routing bajo `src/routes/`.
- Tailwind v4 vía `src/styles.css` con tokens semánticos.
- Fuentes self-hosted RGPD-safe: `@fontsource/poppins` y `@fontsource/open-sans`, subconjunto latin, importadas desde `styles.css`. Cero llamadas a Google Fonts.
- Contentful vía conector estándar de Lovable (Content Delivery API), solo en Actualidad.
- Netlify Forms: formulario con `data-netlify="true"` y honeypot; sin backend en v1.

## 2. Sistema de diseño (tokens oklch en `src/styles.css`)

- `--background` Gris Piedra · `--foreground` Azul Medianoche · `--card` Blanco
- `--primary` Azul Medianoche · `--accent` Ocre para CTAs
- `--muted`, `--border`, `--ring`, `--destructive` estándar shadcn
- Tipografía: Poppins 600/700 para titulares, Open Sans 400/600 para cuerpo
- Contenedor máx. 1200px, secciones `py-20`, radios 0.5rem, sombras sutiles
- Accesibilidad: focus visible, contraste AA, `prefers-reduced-motion`

## 3. Rutas e i18n

Estructura obligatoria `/es/`, `/ca/`, `/en/` con redirección `/ → /es/`. Switcher visual oculto en v1.

```
src/routes/
  __root.tsx              layout global (header, footer, cookie banner)
  index.tsx               redirect a /es/
  $lang.tsx               layout de idioma (valida es|ca|en)
  $lang.index.tsx         Home
  $lang.proyecto.tsx
  $lang.consorcio.tsx
  $lang.actividades.tsx
  $lang.actualidad.index.tsx        Listado (Contentful)
  $lang.actualidad.$slug.tsx        Detalle (head dinámico OG)
  $lang.resultados.tsx    Descargas estáticas
  $lang.materiales.tsx    Descargas estáticas
  $lang.contacto.tsx      Netlify Forms-ready
  $lang.aviso-legal.tsx
  $lang.privacidad.tsx
  $lang.cookies.tsx
```

- Diccionarios en `src/i18n/{es,ca,en}.json`. ES completo; CA/EN con TODOs y fallback a ES.
- `hreflang` en `<head>` de cada ruta.

## 4. Secciones

- **Header**: logo, nav, switcher idioma oculto.
- **Home**: hero + CTA, "Qué es PIGTATTOO", 3 pilares, últimas 3 noticias (Contentful con fallback), franja socios, CTA contacto.
- **Proyecto**: descripción, objetivos, metodología, cronograma.
- **Consorcio**: grid de 6 socios + 3 subcontratados.
- **Actividades**: 8 tarjetas con estado y % progreso.
- **Actualidad**: listado paginado desde Contentful, destacada arriba si `noticiaDestacada`. Detalle con rich text, galería, autor, fecha, categoría; `head()` dinámico con OG derivado del entry.
- **Resultados** y **Materiales**: cuadrícula estática de tarjetas de documento (título, descripción, tipo de archivo, tamaño, fecha, enlace de descarga placeholder). Datos en arrays locales para que el consorcio sustituya solo URLs y metadatos sin rediseñar.
- **Contacto**: formulario Netlify-ready (nombre, email, asunto, mensaje, consentimiento) con honeypot; no envía en v1.
- **Footer**: logos institucionales (placeholders), declaración de financiación (placeholder), enlaces legales, RRSS.

## 5. Contentful (solo Actualidad)

- Conexión con `standard_connectors--connect` (`contentful`) cuando llegue el momento.
- Server functions `getNoticias` y `getNoticia` en `src/lib/contentful.functions.ts`, llamando al gateway con `LOVABLE_API_KEY` + `X-Connection-Api-Key`; resolución de links y assets antes de devolver.
- Content type `contenidoPigtattoo` con campos: `titulo`, `extracto`, `fecha`, `autor`, `categoria`, `imagenDestacada`, `cuerpo` (rich text), `galeria`, `noticiaDestacada`.
- Rich text con `@contentful/rich-text-react-renderer` + `@contentful/rich-text-types`.
- Slug derivado de `titulo`.
- Sin caché en v1.
- Fallback UI si la API falla o no hay entradas.

## 6. Preparación para futuro Netlify

- Server functions autocontenidas, sin dependencias propietarias más allá del gateway.
- Comentario/README con el punto de migración: reemplazar `createServerFn` por Netlify Edge Functions si se decide.
- Aviso registrado: TanStack Start apunta por defecto al runtime Lovable/Cloudflare Workers; el despliegue en Netlify requerirá adaptador específico posterior.

## 7. GA4 + banner de consentimiento

- `<CookieBanner>` en `__root.tsx`: aceptar/rechazar, persiste en `localStorage` (`pigtattoo.consent`), reabrible desde `/es/cookies`.
- `gtag.js` se carga **solo si** `consent === "granted"` **Y** `hostname === "pigtattoo.es"`. Bloqueado siempre en localhost, `*.lovable.app` y previews.
- `GA_MEASUREMENT_ID` como placeholder `G-XXXXXXX`.
- Página `/cookies` explicando finalidad, base legal y revocación.

## 8. SEO

- `head()` por ruta con title/description/og únicos.
- Noticias con `og:image = imagenDestacada`. Home sin `og:image` (hosting lo inyecta).
- `canonical` y `og:url` autorreferenciales relativos.
- `robots.txt` permitiendo todo salvo `/api/`. `sitemap.xml` como server route con `BASE_URL=""` (TODO) para todas las rutas idioma × sección.
- JSON-LD `Organization` en `__root`, `Article` en detalle de noticia.

## 9. Assets y placeholders

- Logo: SVG placeholder minimal.
- Logos socios/institucionales: cuadros grises con siglas.
- Imagen hero: generada con `imagegen`; resto rectángulos de color.
- Textos: mock realista tipo Lorem ipsum.

## 10. Orden de entrega

1. Tokens de diseño + fuentes self-hosted + `__root` con header/footer/banner.
2. Enrutado `/`, `$lang`, redirección y páginas con contenido mock.
3. Sistema i18n + diccionarios ES completos, CA/EN con TODOs, switcher oculto.
4. Actualidad: server functions Contentful + listado + detalle + rich text.
5. Resultados y Materiales: estructura de descargas estática.
6. Formulario contacto Netlify-ready.
7. GA4 condicional + banner + cookies + legales.
8. SEO por ruta, sitemap, robots, JSON-LD.
9. Verificación: build, navegación y screenshots.

## Pendiente por tu parte (no bloquea)

- Space ID + Delivery Token de Contentful (al conectar).
- `G-XXXXXXX` de GA4.
- Logos definitivos, textos reales, declaración de financiación, datos de socios/actividades, documentos reales.
