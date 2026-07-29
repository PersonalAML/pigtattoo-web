import es from "./es.json";
import ca from "./ca.json";
import en from "./en.json";

export type Lang = "es" | "ca" | "en";
export const LANGS: Lang[] = ["es", "ca", "en"];
export const DEFAULT_LANG: Lang = "es";

export type Dict = typeof es;

/** Fusión profunda: el español actúa siempre de base, el idioma sobrescribe lo traducido. */
function deepMerge<T>(base: T, override: unknown): T {
  if (!override || typeof override !== "object" || Array.isArray(override)) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
    const b = out[k];
    out[k] =
      b && typeof b === "object" && !Array.isArray(b) ? deepMerge(b, v) : (v as unknown);
  }
  return out as T;
}

const dicts: Record<Lang, Dict> = {
  es: es as Dict,
  ca: deepMerge(es as Dict, ca),
  en: deepMerge(es as Dict, en),
};

/** Idiomas cuya traducción aún está incompleta (se marcan noindex). */
export const PARTIAL_LANGS: Lang[] = ["ca", "en"];

export function isLang(v: string | undefined): v is Lang {
  return v === "es" || v === "ca" || v === "en";
}

/**
 * Get a translation by dot path. Falls back to Spanish, then to the key.
 */
export function getDict(lang: Lang): Dict {
  return dicts[lang];
}


export function t(lang: Lang, path: string): string {
  const read = (obj: unknown): string | undefined => {
    const parts = path.split(".");
    let cur: unknown = obj;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p];
      } else {
        return undefined;
      }
    }
    return typeof cur === "string" ? cur : undefined;
  };
  return read(dicts[lang]) ?? read(dicts.es) ?? path;
}
