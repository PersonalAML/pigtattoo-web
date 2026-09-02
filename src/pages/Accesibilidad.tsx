import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { LegalContent } from "@/components/LegalContent";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { getLegal } from "@/i18n/legal";

export default function Accesibilidad() {
  const lang = useLang();
  const d = getDict(lang);
  const page = getLegal(lang).accessibility;

  return (
    <>
      <SEO
        path="/accesibilidad"
        title={`${d.legal.accessibilityTitle} — PIGTATTOO`}
        description={page.description}
        breadcrumbs={[{ name: d.legal.accessibilityTitle, path: "/accesibilidad" }]}
      />
      <PageHeader title={d.legal.accessibilityTitle} />
      <LegalContent page={page} lang={lang} />
    </>
  );
}
