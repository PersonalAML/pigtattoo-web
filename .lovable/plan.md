# Limpieza de RESULTS_DOCS

## Contexto
Revisados los textos provisionales del sitio. El usuario confirma que los textos de **Home**, **Consorcio**, **Contacto** y **Actividades** (títulos y descripciones) son correctos y definitivos. Las noticias de Actualidad son mock hasta conectar Contentful. Las imágenes y los datos `MATERIALS_DOCS` se mantienen ("Próximamente" es aceptable).

## Cambio
Eliminar la constante `RESULTS_DOCS` de `src/lib/site-data.ts` (líneas 67–74). Ya no se usa en ninguna página — `Resultados.tsx` solo consume `MATERIALS_DOCS`. Se conserva el tipo `DocResource` porque lo usa `MATERIALS_DOCS`.

## Verificación
- `npx tsgo --noEmit` sin errores.
- Comprobar que `Resultados.tsx` sigue renderizando solo los materiales de difusión.
