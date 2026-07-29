## Objetivo

Sustituir los marcos placeholder de las cabeceras por imágenes reales, coherentes entre sí, optimizadas y servidas desde el CDN.

## Reparto por sección

| Sección | Origen | Concepto |
|---|---|---|
| Home (hero, 4/5) | Stock (Unsplash/Pexels, licencia libre verificada) | Veterinario/técnico con tableta en nave de cebo, cerdos desenfocados al fondo |
| Proyecto | Generada IA | Detalle de identificación individual en oreja/piel de cerdo + trazabilidad; el stock real de "tatuaje porcino" es inexistente |
| Actividades | Stock | Equipo técnico/veterinario trabajando en instalación ganadera |
| Actualidad | Stock | Jornada técnica / congreso sectorial, público y ponente |
| Consorcio | Sin cambios | Se mantiene el mapa PNG actual |
| Resultados y Materiales | Generada IA | Documentos técnicos y gráficos de datos sobre mesa, tono frío |
| Contacto | Stock | Paisaje agrario o edificio de investigación en España |

Además, imágenes secundarias de Home ("Imagen concepto") y Proyecto ("objetivos", "metodología"): se generan por IA en el mismo estilo, o se dejan como marco si prefieres reducir alcance.

## Especificaciones y tratamiento

- WebP, 1600×1200 (4/3); hero 1400×1750 (4/5). Objetivo 80–150 KB, calidad ~80.
- Tratamiento uniforme aplicado con Pillow: saturación ~0.85, ligero viraje frío hacia Cerceta/Azul medianoche, contraste suave. Se aplica igual a stock y a generadas para que la serie no parezca suelta.
- Sin texto incrustado ni marcas de agua.

## Implementación técnica

1. Descarga de candidatos de stock (solo licencia Unsplash/Pexels/Pixabay libre; se descartan Unsplash+ y Getty), verificando autor y licencia.
2. Generación IA de las 2–4 imágenes sin buen equivalente en stock.
3. Script Python (Pillow) en `/tmp`: recorte al ratio, redimensionado, tratamiento de color, export WebP con control de peso.
4. Subida con `lovable-assets create` → punteros `.asset.json` en `src/assets/` (p. ej. `header-proyecto.webp.asset.json`).
5. Cableado: pasar `imageSrc` y `imageAlt` descriptivo a `PageHeader` en Proyecto, Actividades, ActualidadList, Resultados y Contacto; sustituir los `ImageFrame` del hero y del bloque "concepto" en Home.
6. QA: revisión visual de cada cabecera en el preview (1280 px y móvil), comprobación de que no hay pixelado ni recortes desafortunados, y `alt` correcto en todas.

## Créditos

Se añade un bloque discreto de créditos fotográficos (autor + fuente) en el Aviso legal, cumpliendo buenas prácticas aunque Unsplash/Pexels no lo exijan.
