# Plan de trabajo: tareas pendientes de pigtattoo.es

Organización del documento v3 en fases ordenadas por dependencia. Las tareas de código que puedo ejecutar yo van primero; las que requieren credenciales o acceso a servicios externos van marcadas como **requiere usuario**.

## Fase 0 — Preparación en código (sin dependencias externas)

Cosas que puedo dejar listas ya, antes de tener credenciales:

1. **Formulario oculto para Netlify Forms** (tarea 3) — añadir en `index.html` un formulario estático oculto con los mismos campos (`name`, `email`, `mensaje`, honeypot `bot-field`) para que Netlify lo detecte en el build sin depender del renderizado de la SPA. Verificar que los nombres de campo coinciden con `Contacto.tsx`.
2. **Antispam honeypot** en el formulario visible (`netlify-honeypot="bot-field"`).
3. **Revisión de enlaces externos** (tarea 14) — comprobar con peticiones HTTP que las 9 URLs de los socios en `src/lib/site-data.ts` responden.
4. **Limpieza**: borrar el puntero huérfano `src/assets/mapa-entidades-consorcio.png.asset.json` (vacío y sin uso).
5. **Estados de carga/vacío/error en Actualidad** (tarea 12) — verificar que `ActualidadList` y `ActualidadDetalle` muestran algo correcto cuando Contentful no responde o no hay noticias; añadir estados si faltan.

## Fase 1 — Contentful (bloqueante, requiere usuario)

Necesito que me pases: **Space ID** y **Content Delivery API token** (solo lectura).

1. Configurar `VITE_CONTENTFUL_SPACE_ID` y `VITE_CONTENTFUL_TOKEN` como secretos del proyecto.
2. Crear al menos **3 noticias reales** en Contentful (esto lo hace el equipo en el panel de Contentful; yo puedo verificar).
3. Verificar renderizado de Rich Text, galería, imagen destacada y noticia destacada con entradas reales.
4. Comprobar que las noticias mock dejan de aparecer cuando hay credenciales.

## Fase 2 — Analítica (bloqueante, requiere usuario)

Necesito el **ID de medición GA4 real** (formato `G-XXXXXXXXXX`).

1. Sustituir el placeholder en el código.
2. Tras publicar, comprobar en GA4 (tiempo real) que llegan eventos solo tras aceptar cookies y solo en `pigtattoo.es`.

## Fase 3 — Despliegue y SEO (tras publicar en Netlify)

Requiere el sitio ya desplegado en `pigtattoo.es`:

1. **Netlify Forms**: probar envío real, configurar destinatarios de email.
2. **Sitemap automático**: aplicar la configuración documentada (variables de entorno, build hook de Netlify, webhook de Contentful, comprobación). La guía ya está escrita en el documento v3.
3. **`og:image` absoluta**: validar en depuradores de LinkedIn/Facebook y Twitter Card Validator.
4. **Google Search Console**: alta de la propiedad y envío del sitemap (lo hace GEEZAR).
5. **`robots.txt`** en producción.

## Fase 4 — Auditorías manuales (sitio publicado)

1. Accesibilidad manual: teclado, foco visible, lector de pantalla sobre el mapa del consorcio y la imagen de metodología.
2. Responsive en móvil/tablet/escritorio reales.
3. Lighthouse / Core Web Vitals: LCP < 2,5 s, CLS < 0,1, INP < 200 ms. Corregir lo que penalice.

## Fase 5 — Contenido (continuo, equipo)

1. Textos definitivos de Proyecto (ya aportados; confirmar).
2. Materiales de difusión reales enlazados en Resultados y materiales.
3. Sustituir imágenes genéricas por fotos reales del proyecto cuando existan.

## Opcional / futuro

Modo oscuro (descartado en V1), logo/favicon definitivo, feed RSS de Actualidad.

## Empezaría por

La **Fase 0** ya mismo (no depende de nada). En cuanto me facilites las credenciales de Contentful, continúo con la Fase 1.
