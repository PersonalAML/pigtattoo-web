# Plan: Revisión de tipografías y colores

## Objetivo
Alinear el sistema de diseño actual con el documento `Directrices_y_esquemas_Web_V2.md` y corregir los problemas de contraste y carga tipográfica detectados.

## Hallazgos confirmados tras lectura del código y del documento V2

### 1. Colores
- Los tokens HSL en `src/index.css` coinciden con la paleta V2 (Azul Medianoche, Azul Cerceta, Rosa Salmón, Gris Piedra, Blanco).
- **Problema de contraste crítico**: el botón CTA usa `bg-accent` (Azul Cerceta HSL 186,42%,53%) con texto blanco. El ratio es ~2,3:1, inferior al mínimo WCAG AA (4,5:1) para texto de ese tamaño.
- **Color hardcodeado residual**: `src/components/ui/dialog.tsx` y `sheet.tsx` usan `bg-black/80` para fondos de overlay.
- **Bug en degradado decorativo**: `ImageFrame.tsx` referencia `var(--color-salmon)`, variable que no existe en `index.css`.

### 2. Tipografías
- Las fuentes se cargan vía `@fontsource` (cumple Regla G de self-hosting RGPD).
- **Pesos cargados vs. pesos exigidos por V2**:
  - Actual: Poppins 500/600/700 + Open Sans 400/600/700.
  - V2 (Regla A + Regla C): Poppins 500 (CTAs) y 600 (H1/H2); Open Sans 400 (cuerpo) y 700 (énfasis).
- **Uso inconsistente de pesos**:
  - `PageHeader.tsx` aplica `font-bold` (700) al H1; V2 exige SemiBold (600).
  - `SiteHeader.tsx` aplica `font-medium` (500) a los enlaces de navegación, pero Open Sans 500 no está cargado; el navegador renderizará un peso sintético o caerá a 400.

## Acciones propuestas

### A. Correcciones de color
1. **CTA accesible**: mantener el Azul Cerceta exacto del V2 como fondo y cambiar el texto a Azul Medianoche (`text-primary`) para alcanzar >7:1. Esto cumple Regla C (Poppins 500 mayúsculas sobre Azul Cerceta) sin alterar el color corporativo. El hover pasará a un Cerceta ligeramente más oscuro (`bg-accent/90` con texto oscuro).
2. **CTA outline**: ajustar para que el estado hover no dependa de un fondo translúcido que pueda reducir contraste.
3. **Overlays**: reemplazar `bg-black/80` en `dialog.tsx` y `sheet.tsx` por `bg-primary/80` (Azul Medianoche al 80%) o por un token semántico `--overlay`.
4. **Degradado ImageFrame**: corregir `var(--color-salmon)` a `hsl(var(--salmon))` / `to-salmon/25`.
5. **Auditoría de `text-accent`**: verificar que todos los usos de Azul Cerceta sobre fondo claro cumplan 4,5:1; ajustar opacidades o fondos si es necesario.

### B. Correcciones tipográficas
1. **Ajustar pesos cargados** en `src/index.css`:
   - Poppins: 500 y 600.
   - Open Sans: 400 y 700.
2. **Homogeneizar headings**: cambiar `font-bold` a `font-semibold` en `PageHeader.tsx` y cualquier otro H1/H2.
3. **Corregir navegación**: cambiar `font-medium` a `font-semibold` o `font-normal` en los enlaces de `SiteHeader.tsx` para que use un peso realmente cargado (Open Sans 600 se eliminará; se prefiere `font-semibold` mapeado a 600 o `font-bold` a 700; se decidirá en la ejecución para mantener coherencia visual).
4. **Revisar componentes shadcn/ui**: asegurar que no usen pesos no cargados (p. ej. `font-medium` sobre Open Sans sin 500 cargado).

### C. Verificación
1. Ejecutar `bun run lint` y `tsgo` / `tsc --noEmit`.
2. Ejecutar `vite build` para comprobar que no hay errores de CSS.
3. Revisar visualmente la preview en `/es/consorcio` y `/es` para confirmar que los CTAs, headings y navegación se ven nítidos.

## Decisión pendiente incluida en el plan
- **CTA**: se propone texto Azul Medianoche sobre Azul Cerceta. Si prefieres mantener texto blanco, deberíamos oscurecer el Azul Cerceta del CTA a ~HSL(186,42%,38%), lo que rompería el color exacto del V2. Recomiendo la opción de texto oscuro.

## Límite del plan
- Este plan no modifica imágenes, contenidos legales ni la estructura de secciones; se centra exclusivamente en tokens de color, fuentes y su aplicación en componentes.