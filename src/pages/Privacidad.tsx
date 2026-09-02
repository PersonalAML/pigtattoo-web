import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { LegalContent } from "@/components/LegalContent";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { getLegal } from "@/i18n/legal";

export default function Privacidad() {
  const lang = useLang();
  const d = getDict(lang);
  const page = getLegal(lang).privacy;

  return (
    <>
      <SEO
        path="/privacidad"
        title={`${d.legal.privacyTitle} — PIGTATTOO`}
        description={page.description}
        breadcrumbs={[{ name: d.legal.privacyTitle, path: "/privacidad" }]}
      />
      <PageHeader title={d.legal.privacyTitle} />
      <LegalContent page={page} lang={lang} />
    </>
  );
}
