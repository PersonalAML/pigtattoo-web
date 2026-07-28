# Plan: Enlaces corporativos en logos del Consorcio

## Contexto
El usuario ha decidido que cada logo de socio/subcontratado en `/es/consorcio` enlace a la web corporativa correspondiente. Solo el logo será clickeable; el resto de la ficha permanece como texto estático.

## URLs a incorporar

| # | Entidad | URL |
|---|---------|-----|
| 1 | i+Porc | `https://www.imasporc.com` |
| 2 | GEEZAR | `https://www.geezar.es` |
| 3 | CEVA | `https://www.ceva.es/` |
| 4 | EQTIC | `https://eqtic.net/` |
| 5 | AGROCAT | `https://www.agrocat.com/` |
| 6 | GUCO | `https://www.grupoarcoiris.com/es/` |
| 7 | IRTA | `https://www.irta.cat/es/programa-de-recerca/bienestar-animal/` |
| 8 | ITENE | `https://itene.com/` |
| 9 | ANPROGAPOR | `http://www.anprogapor.es/asociacion-nacional-ganado-porcino/anprogapor/inicio_2_1_ap.html` |

## Cambios a realizar

1. **Datos**: Añadir campo `url` a cada entrada de `PARTNERS` y `SUBCONTRACTED` en `src/lib/site-data.ts`.
2. **Componente `Consorcio.tsx`**: Envolver cada logo en un `<a>` con:
   - `href={partner.url}`
   - `target="_blank"`
   - `rel="noopener noreferrer"`
   - `aria-label={`Web corporativa de ${partner.name}`}`
3. **Estilos**: Mantener el logo como único elemento interactivo; no hacer clickeable toda la ficha. Añadir un indicativo visual sutil de que es un enlace (por ejemplo, opacidad al hover o un pequeño icono externo opcional).
4. **Validación**: Comprobar en la preview que todos los logos enlazan correctamente y que el resto del contenido de la ficha no se ve afectado.

## Notas
- Se respetan las decisiones previas: Vite + React SPA, React Router v6, i18n con diccionarios JSON, tipografías y colores ya auditados.
- No se modifica la arquitectura general ni se añaden dependencias.

¿Procedo con la implementación?