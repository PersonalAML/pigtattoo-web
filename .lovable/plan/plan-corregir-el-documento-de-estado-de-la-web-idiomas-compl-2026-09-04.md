# Plan: Corregir el documento de estado de la web (idiomas completos)

## Contexto
El usuario señala que **todas las secciones ya están en los tres idiomas** (es/ca/en). La comprobación del código lo confirma:

- `src/i18n/es.json`, `ca.json` y `en.json` tienen las **mismas 199 claves**; ninguna falta en ca ni en en.
- Los únicos valores idénticos entre idiomas son legítimos (no requieren traducción): la marca «PIGTATTOO», los autoglotónimos (`Español`, `Català`, `English`) y el año `2025` del cronograma.
- Las páginas legales también están completas en ES/CA/EN.

Por tanto, el punto del documento actual que dice que faltan "Traducciones CA/EN de los contenidos no legales que aún caen al fallback" es **incorrecto** y debe eliminarse.

## Cambios sobre `/mnt/documents/pigtattoo-web-estado-y-pendientes_v2.md`

Crear una nueva versión `_v3.md` (sin sobrescribir la v2) con estos ajustes:

1. **Sección 1 (Resumen de estado)** — añadir una fila:
   - `Traducciones de todas las secciones (no legales) a CA/EN | Completado`

2. **Sección 3.2, punto 6** — **eliminar** el ítem "Traducciones CA / EN de los contenidos no legales…". Las traducciones están completas.

3. **Sección 3.5, punto 16** — reformular. Las traducciones YA están completas, así que el selector de idiomas podría activarse cuando se quiera; dejarlo como decisión pendiente del usuario, no condicionado a "cuando las traducciones estén completas".

4. **Fecha de actualización** — cambiar a `4 de septiembre de 2026` (misma jornada, refleja la corrección).

5. Renumerar los ítems restantes de la lista para que la numeración siga siendo consecutiva tras eliminar el punto 6.

## Fuera de alcance
- No se toca el código de la web ni los diccionarios JSON: ya están correctos.
- No se sobrescribe `pigtattoo-web-estado-y-pendientes_v2.md`; se crea `_v3.md`.
