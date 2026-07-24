
# Plan: Cumplir contraste AA usando Azul Medianoche en textos sobre fondo claro

## Contexto
En la revisión previa quedó pendiente que el Azul Cerceta (`#5cbdb9`) sobre fondos claros (Blanco / Gris Piedra / `secondary`) no cumple WCAG AA (~2.5:1). Confirmas que en esos fondos el texto debe ir siempre en Azul Medianoche, reservando el Cerceta para fondos (CTAs, acentos gráficos) y elementos decorativos no textuales.

## Cambios

### 1. Kickers y etiquetas de categoría
Sustituir `text-accent` por `text-primary` (Azul Medianoche) en:
- `src/components/PageHeader.tsx` — kicker superior del H1.
- `src/pages/Home.tsx` — kicker del hero y etiqueta "categoría" en tarjetas de noticias.
- Cualquier otro uso residual de `text-accent` como texto sobre fondo claro (auditar `Actividades`, `ActualidadList`, `ActualidadDetalle`, `Proyecto`, `Resultados`, `Contacto`).

Se mantiene la jerarquía visual con `uppercase tracking-[0.2em] font-semibold text-xs`, que ya diferencia el kicker del H1 sin necesidad de color.

### 2. Botón outline (`cta-outline`)
En `src/index.css`, cambiar el texto del `cta-outline` de `text-accent` a `text-primary`, y el borde puede mantenerse en Cerceta (elemento gráfico, no texto) o pasarse también a Azul Medianoche para coherencia. Propuesta: borde Cerceta + texto Azul Medianoche (el borde como elemento decorativo cumple; el texto pasa a ~11:1).

### 3. Hover de enlaces
Enlaces tipo "Leer más → " y "Ver todas → " actualmente hacen `hover:text-accent`. Al pasar el ratón el texto se vuelve ilegible sobre fondo claro. Cambiar el hover a `hover:text-primary/70` o `hover:underline` sin cambio de color, en:
- `src/pages/Home.tsx`
- `src/pages/ActualidadList.tsx` y `ActualidadDetalle.tsx` si aplica.

### 4. Elementos que SÍ mantienen Cerceta
- Fondos de CTA (`.cta`) — el texto encima ya es Azul Medianoche (arreglado previamente).
- Bordes decorativos (`border-accent`, `border-accent/40` en `ImageFrame`).
- Retícula radial decorativa del `ImageFrame`.
- `--ring` de focus (elemento gráfico, no texto).

### 5. Verificación
- `bun run build` y `tsgo`.
- Playwright: captura de `/es`, `/es/consorcio`, `/es/actualidad` para confirmar que ningún texto queda en Cerceta sobre fondo claro.

## Fuera de alcance
No se toca la paleta (los HSL del V2 se mantienen intactos). Solo se reasigna qué token usa cada texto.
