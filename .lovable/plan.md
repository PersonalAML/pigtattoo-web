## Problema

Al navegar desde Inicio a Consorcio (o entre cualquier par de secciones), la página conserva la posición de scroll anterior y el usuario aterriza a media página. Confirmado: no existe ningún componente ni efecto de scroll en `src/App.tsx` ni en los componentes (`rg` de `scrollTo`/`useLocation` sin resultados), y React Router v6 no restaura el scroll por defecto.

## Solución

Añadir un componente `ScrollToTop` que, en cada cambio de ruta, lleve la ventana a la parte superior.

1. Nuevo `src/components/ScrollToTop.tsx`:
   - Usa `useLocation()` y un `useEffect` sobre `pathname`.
   - Llama a `window.scrollTo({ top: 0, left: 0 })`.
   - Respeta anclas: si `location.hash` existe, intenta hacer scroll al elemento con ese id en vez de al inicio.
   - Respeta `prefers-reduced-motion` (comportamiento instantáneo si está activo; suave en caso contrario).
2. Montarlo en `src/App.tsx` dentro del `BrowserRouter`, justo antes de las `Routes`, para que aplique a todas las páginas (cabecera, footer, enlaces de socios en Inicio, migas, etc.).

## Detalles técnicos

- Solo se dispara con cambios de `pathname` (y `hash`), no en re-renders, para no interferir con interacciones dentro de la misma página.
- No requiere tocar los enlaces existentes: es una solución global, no por enlace.
