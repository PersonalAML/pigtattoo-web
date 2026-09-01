import type { Lang } from "@/i18n/dictionaries";
import type { LegalDict } from "./types";
import es from "./es";
import ca from "./ca";
import en from "./en";

const LEGAL: Record<Lang, LegalDict> = { es, ca, en };

export function getLegal(lang: Lang): LegalDict {
  return LEGAL[lang] ?? es;
}

export type { LegalDict, LegalPage, LegalSection, LegalBlock } from "./types";
