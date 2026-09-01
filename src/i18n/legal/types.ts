export type LegalBlock =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "dl"; items: { label: string; text: string }[] }
  | { t: "note"; text: string }
  | { t: "table"; caption: string; head: string[]; rows: string[][] }
  | { t: "consent" };

export type LegalSection = { title: string; blocks: LegalBlock[] };

export type LegalPage = {
  /** Meta description para SEO. */
  description: string;
  /** Párrafos introductorios antes de la primera sección. */
  intro: string[];
  sections: LegalSection[];
};

export type LegalDict = {
  notice: LegalPage;
  privacy: LegalPage;
  cookies: LegalPage;
  accessibility: LegalPage;
};
