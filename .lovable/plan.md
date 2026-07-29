## Plan de revisiones de la web (pigtattoo.es)

Propuesta por fases, de mayor a menor riesgo. Cada fase se puede lanzar por separado.

### Hallazgos ya verificados en el código

- **Crítico — /ca y /en están rotos.** `src/i18n/en.json` y `ca.json` sólo tienen 9 claves (`meta`, `nav`) frente a las 101 de `es.json`, y `getDict(lang)` devuelve el diccionario tal cual sin fusionar con español. Las páginas leen `d.home.partnersTitle`, `d.consortium.intro`, etc., que serán `undefined` en esos idiomas → pantalla en blanco por TypeError. Las rutas `/ca/` y `/en/` están, sin embargo, publicadas en `hreflang` desde `SEO.tsx`.
- **SEO — sitemap incompleto**: `public/sitemap.xml` sólo lista URLs `/es/...` y sin dominio; faltan `/ca/` y `/en/` y las entradas `xhtml:link` alternate (el namespace está declarado pero no se usa).
- **SEO — sin og:image**: ni en `index.html` ni en `SEO.tsx`; los previews sociales quedarán a criterio del hosting.
- **SEO — sin JSON-LD por página** más allá del `Organization` global de `App.tsx` (faltan `BreadcrumbList`, `Article` en noticias).
- Correcto ya: `_redirects` SPA, `robots.txt`, canonical + hreflang por ruta, `lang` dinámico, scroll al inicio, skip-link y `<main>` único.

### Fase 1 — Bloqueantes funcionales

1. Fusión profunda de diccionarios (`es` como base, sobrescribe `ca`/`en`) para que ningún idioma pueda romper la app.
2. Decidir política V1: o traducir por completo `ca`/`en`, o dejar el fallback a español visible y marcar esas rutas como `noindex` hasta tener traducción.
3. Repaso de errores de consola en las 11 rutas × 3 idiomas con navegador headless.

### Fase 2 — Accesibilidad (objetivo WCAG 2.1 AA)

1. Auditoría automatizada con axe-core sobre todas las rutas (contraste, nombres accesibles, roles, orden de foco).
2. Revisión manual: navegación completa sólo con teclado, foco visible en todos los interactivos, trampas de foco en el banner de cookies, tamaño de objetivo táctil ≥44 px.
3. Textos alternativos: revisar `alt` de cabeceras e imágenes decorativas (`alt=""`), y validar el patrón `aria-describedby` del mapa del consorcio con lector de pantalla.
4. Formulario de contacto: `id`/`for` explícitos, `aria-invalid`, mensajes de error asociados y `aria-live` para el estado de envío.
5. Actualizar `src/pages/Accesibilidad.tsx` con la declaración de accesibilidad real (estado de conformidad, fecha, vía de contacto).

### Fase 3 — SEO técnico

1. Sitemap con las 33 URLs (11 rutas × 3 idiomas) y `xhtml:link` alternate; añadir la directiva `Sitemap:` en `robots.txt` cuando el dominio esté activo.
2. `og:image` por defecto (1200×630) y por noticia; recordatorio de que los crawlers sociales no ejecutan JS en una SPA.
3. JSON-LD: `BreadcrumbList` en secciones internas y `Article` en el detalle de noticia.
4. Revisión de títulos (<60 car.) y descripciones (<160 car.) de las 11 páginas; un único `<h1>` y jerarquía de encabezados correcta por página.
5. Escaneo SEO de la plataforma una vez publicado.

### Fase 4 — Usabilidad y contenido

1. Estados vacíos, de carga y de error en Actualidad y Resultados (hoy dependen de datos aún no conectados).
2. Coherencia de navegación: activo en el menú, migas de pan, comportamiento en móvil, footer.
3. Página 404 con salidas útiles y en el idioma correcto.
4. Revisión de consistencia tipográfica y de tokens de color en todas las secciones (repaso final del sistema de diseño).
5. Revisión responsive en 360/768/1280/1920 px con capturas.

### Fase 5 — Rendimiento y cumplimiento

1. Peso de imágenes, `width`/`height` para evitar CLS, `loading="lazy"` salvo la cabecera de Inicio, `fetchpriority="high"` en la LCP.
2. Auditoría Lighthouse (rendimiento, accesibilidad, buenas prácticas, SEO).
3. RGPD: verificar que GA4 sólo se carga tras consentimiento y sólo en `pigtattoo.es`, revisar textos de cookies/privacidad y la ausencia de recursos de terceros no consentidos (fuentes ya self-hosted).

### Fase 6 — Preparación de datos (cuando llegue el contenido)

1. Conexión con Contentful (`contenidoPigtattoo`) y sustitución de mocks.
2. Regeneración del sitemap incluyendo las noticias.
3. Netlify Forms: prueba de envío real y página de agradecimiento.

### Notas técnicas

- Las auditorías se ejecutan con navegador headless contra el servidor local; axe-core se instala como dependencia de desarrollo.
- No se toca la arquitectura: sigue siendo Vite + React SPA pura con React Router y `react-helmet-async`.
- Los metadatos por ruta sólo los ven los crawlers que ejecutan JS; para previews sociales por página haría falta SSR, algo que queda fuera de este plan.
