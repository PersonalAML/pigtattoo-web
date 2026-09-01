# Limpieza de consola: 12 rutas x 3 idiomas

## Resultado del repaso (navegador headless)

Se recorrieron 36 URLs (11 rutas + una ruta inexistente, en `/es`, `/ca`, `/en`) capturando errores de consola, excepciones de página y peticiones fallidas.

- 0 excepciones de JavaScript.
- 0 peticiones de red fallidas (imágenes, fuentes y assets cargan correctamente).
- 21 errores de consola: todos el mismo aviso de React sobre la propiedad `fetchPriority`.
- 72 avisos: todos avisos de "future flag" de React Router v6 (2 por página).

No hay ningún fallo funcional. Quedan dos ruidos repetitivos que conviene eliminar.

## Incidencia 1 — Aviso `fetchPriority` (21 errores)

React 18 no reconoce la prop camelCase `fetchPriority` en `<img>` (se añadió en React 19), así que emite un aviso de nivel error en las 7 páginas que usan cabecera con imagen prioritaria: Inicio, Proyecto, Consorcio, Actividades, Actualidad, Resultados y Contacto, en los tres idiomas.

Corrección: pasar el atributo en minúsculas (`fetchpriority`) mediante spread tipado, que React 18 sí reenvía al DOM sin avisar y que los navegadores interpretan igual.

- `src/components/PageHeader.tsx` (línea 61)
- `src/pages/Home.tsx` (línea 55)

## Incidencia 2 — Avisos de React Router (72 avisos)

React Router 6.28 avisa en cada carga sobre `v7_startTransition` y `v7_relativeSplatPath`.

Corrección: activar ambas banderas en el `BrowserRouter` (`future={{ v7_startTransition: true, v7_relativeSplatPath: true }}`). Además de silenciar el ruido, deja el proyecto alineado con el comportamiento de v7.

## Verificación

Repetir el recorrido headless de las 36 URLs y confirmar 0 errores y 0 avisos de consola.

## Detalles técnicos

- Cambios acotados a `src/App.tsx`, `src/components/PageHeader.tsx` y `src/pages/Home.tsx`.
- Sin cambios de dependencias ni de diseño; comportamiento de carga de imágenes idéntico.
