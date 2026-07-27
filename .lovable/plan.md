## Cambio solicitado

En la página `/resultados` se invertirá el orden de las dos secciones actuales:

1. **Materiales de difusión** (ahora arriba)
2. **Entregables técnicos** (ahora abajo)

## Archivo a modificar

- `src/pages/Resultados.tsx`

## Implementación

- Intercambiar los dos bloques `<section>` dentro del contenedor principal.
- Mantener el componente `DocCard`, los datos (`RESULTS_DOCS`, `MATERIALS_DOCS`) y los textos del diccionario sin cambios.
- Verificar que el build y la vista previa renderizan el nuevo orden correctamente.

## Nota

No se requieren cambios en diccionarios, rutas ni estilos; solo reordenar JSX.