import es from "./es.json";
import ca from "./ca.json";
import en from "./en.json";

export type Lang = "es" | "ca" | "en";
export const LANGS: Lang[] = ["es", "ca", "en"];
export const DEFAULT_LANG: Lang = "es";

const dicts = { es, ca, en } as const;

export type Dict = typeof es;

export function isLang(v: string | undefined): v is Lang {
  return v === "es" || v === "ca" || v === "en";
}

/**
 * Get a translation by dot path. Falls back to Spanish, then to the key.
 */
export function getDict(lang: Lang): Dict {
  return dicts[lang] as Dict;
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
