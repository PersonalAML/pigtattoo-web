# Reconstrucción total — Vite + React SPA (sin SSR)

Restricciones innegociables asumidas:

1. **Vite + React** como SPA pura (renderizado en cliente).
2. **Prohibido** TanStack Start, Next.js, Remix, Server Functions y cualquier SSR.
3. **Enrutado 100% cliente** con React Router v6 (`BrowserRouter`).
4. **Contentful directo desde el navegador** con CDA (token público de solo lectura). Sin proxies ni backend.

Se descarta por completo el código y la arquitectura anteriores.

## 1. Purga previa

Eliminar del proyecto todo rastro de TanStack Start y su ecosistema:

- `src/routes/`, `src/router.tsx`, `src/routeTree.gen.ts`, `src/server.ts`, `src/start.ts`.
- `src/lib/contentful.functions.ts` y cualquier `*.functions.ts` / `*.server.ts`.
- Dependencias en `package.json`: `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@tanstack/react-router-devtools`.
- `vite.config.ts` reescrito como config Vite + React estándar (plugin `@vitejs/plugin-react`, sin plugins de TanStack).
- Limpieza de `tsconfig.json` (rutas y tipos de TanStack).

Se conservan y reutilizan: `src/i18n/{es,ca,en}.json`, `src/lib/site-data.ts` (socios, actividades, docs) y los textos ya redactados.

## 2. Stack técnico definitivo

- **Vite 5 + React 18** (CSR).
- **React Router v6** (`BrowserRouter`, `Routes`, `Route`, `Navigate`, `useParams`, `useLocation`).
- **react-helmet-async** para metadatos dinámicos por página (title, description, OG, canonical, hreflang, JSON-LD).
- **Tailwind CSS v3** + configuración `tailwind.config.js` / `postcss.config.js` clásicos.
- **shadcn/ui** compatible con Tailwind v3 (solo los componentes que necesitemos).
- **@fontsource/poppins** y **@fontsource/open-sans** self-hosted (RGPD).
- **`contentful`** (SDK JS oficial) llamado directo desde el navegador.
- **`@contentful/rich-text-react-renderer`** + **`@contentful/rich-text-types`** para el cuerpo de noticias.
- **Netlify Forms** (`data-netlify="true"` + honeypot) — sin envío en v1.

## 3. Estructura de carpetas

```
src/
  main.tsx                  ReactDOM + BrowserRouter + HelmetProvider
  App.tsx                   Layout + <Routes>
  index.css                 Tailwind base + tokens
  components/
    SiteHeader.tsx
    SiteFooter.tsx
    CookieBanner.tsx
    PageHeader.tsx
    ImageFrame.tsx
    SEO.tsx                 wrapper Helmet (title/desc/OG/canonical/hreflang)
    LangGuard.tsx           valida :lang ∈ {es,ca,en} y expone contexto
  i18n/
    dictionaries.ts
    es.json / ca.json / en.json
  lib/
    contentful.ts           createClient con VITE_CONTENTFUL_*
    site-data.ts
    consent.ts              lógica GA4 (consent + hostname)
    slug.ts                 derivar slug desde título
  pages/
    RedirectHome.tsx        "/" → "/es"
    Home.tsx
    Proyecto.tsx
    Consorcio.tsx
    Actividades.tsx
    ActualidadList.tsx
    ActualidadDetalle.tsx
    Resultados.tsx
    Contacto.tsx
    Accesibilidad.tsx
    AvisoLegal.tsx
    Privacidad.tsx
    Cookies.tsx
    NotFound.tsx
public/
  robots.txt
  sitemap.xml               v1 escrito a mano
  _redirects                "/* /index.html 200" (SPA fallback en Netlify)
netlify.toml                forms + redirects + headers básicos
tailwind.config.js
postcss.config.js
```

## 4. Enrutado (React Router v6)

```
/               → <Navigate to="/es" replace />
/:lang          → <LangGuard><Layout><Outlet/></Layout></LangGuard>
  index          → Home
  proyecto
  consorcio
  actividades
  actualidad
  actualidad/:slug
  resultados
  contacto
  accesibilidad
  aviso-legal
  privacidad
  cookies
*               → NotFound
```

- `LangGuard` valida el idioma; si no es válido, redirige a `/es`.
- Switcher de idioma implementado pero oculto (`SHOW_LANG_SWITCHER = false`).
- Enlaces con `<Link to>`; navegación dependiente del idioma actual.

## 5. SEO por página

Componente `<SEO title description path lang ogImage? type?/>` que emite vía Helmet:

- `<title>`, `meta description`.
- `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (opcional), `twitter:card`.
- `<link rel="canonical">` autoreferencial (relativo).
- `<link rel="alternate" hreflang="es|ca|en|x-default">` para las tres variantes de la misma ruta.

JSON-LD:

- `Organization` global en `App.tsx`.
- `Article` en detalle de noticia (a partir de la entry Contentful).

Detalle de noticia: título/descripcion/OG derivados de `titulo`, `extracto`, `imagenDestacada`.

## 6. Contentful desde el navegador

```ts
// src/lib/contentful.ts
import { createClient } from "contentful";
export const cf = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN,
});
```

- `VITE_CONTENTFUL_SPACE_ID` y `VITE_CONTENTFUL_TOKEN` en `.env` (públicas, CDA de solo lectura).
- Sin backend, sin proxy, sin gateway.
- Content type `contenidoPigtattoo` con los campos ya acordados.
- Funciones cliente `getNoticias({limit, skip})` y `getNoticiaBySlug(slug)`; slug derivado del título.
- Estado de carga y fallback UI si la API falla o el token no está aún configurado (se muestran datos mock para poder ver la sección).
- Rich text con `@contentful/rich-text-react-renderer`.
- Sin caché en v1.

## 7. Diseño y CSS (doc V2)

- Tokens CSS: Azul Medianoche, Azul Cerceta, Rosa Salmón (solo decorativo), Gris Piedra, Blanco.
- Poppins 500/600 (titulares y CTAs UPPERCASE) + Open Sans 400/700 (cuerpo).
- Interlineado 1.2 titulares / 1.6 texto.
- Media queries clásicas (Opción 1 del doc). Sin `clamp()`.
- Estilos `table.pig` para vistas tabulares de Actividades/Resultados.
- Sin modo noche.

## 8. Legales y cumplimiento

- Páginas: Aviso legal, Privacidad, **Política de cookies**, **Declaración de accesibilidad (RD 1112/2018)**.
- Footer: enlaces a las 4 legales + copyright plano + declaración de financiación (placeholder MAPA/FEADER/PEPAC 2025).
- Banner de cookies (aceptar/rechazar/gestionar); consentimiento en `localStorage` (`pigtattoo.consent`), revocable desde `/es/cookies`.
- GA4 solo si `consent === "granted" && hostname === "pigtattoo.es"`. Bloqueado en localhost y previews.

## 9. Formulario Netlify

Formulario en Contacto:
- `name="contacto"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`.
- Campos: nombre, email, asunto, mensaje, consentimiento explícito.
- Sin envío real en v1. Se activará automáticamente al desplegar en Netlify.

## 10. Publicación futura en Netlify

- `public/_redirects` con `/*    /index.html   200` para el fallback SPA.
- `netlify.toml` con build (`bun run build` → `dist/`) y detección de formularios.

## 11. Orden de ejecución

1. Purga total del stack TanStack + reset de `vite.config.ts`, `package.json`, `tsconfig.json`, `index.html`.
2. Bootstrap Vite + React + Router + Helmet + Tailwind v3 + tokens + fuentes.
3. Layout raíz (Header, Footer, CookieBanner) + `LangGuard`.
4. Páginas con contenido mock ya redactado y `<SEO>` en cada una.
5. Cliente Contentful + Actualidad (listado y detalle) con fallback.
6. Resultados unificados (entregables + materiales).
7. Formulario Netlify-ready.
8. Legales completas + accesibilidad + robots + sitemap + `_redirects` + `netlify.toml`.
9. Verificación (build, navegación, screenshots).

## Notas técnicas honestas

- La plantilla actual del sandbox Lovable está pensada para TanStack Start. Forzar Vite + React SPA implica:
  - Renunciar a integraciones automáticas de plataforma (server functions, Lovable Cloud, previews con SSR).
  - Todo lo dinámico que requiera un secreto real deberá vivir en Netlify Functions post-despliegue.
- El CDA token de Contentful está diseñado para exponerse en clientes (solo lectura), por lo que su uso en `VITE_*` es adecuado.
- Tailwind v3 exige `tailwind.config.js` + `postcss.config.js` clásicos (adiós al `@theme` de v4).

## Pendiente por tu parte (no bloquea)

- Space ID + CDA token de Contentful.
- GA4 Measurement ID.
- Logos, imágenes reales, textos oficiales, datos reales de socios y actividades, documentos.
