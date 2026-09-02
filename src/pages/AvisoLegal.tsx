import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { LegalContent } from "@/components/LegalContent";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { getLegal } from "@/i18n/legal";

export default function AvisoLegal() {
  const lang = useLang();
  const d = getDict(lang);
  const page = getLegal(lang).notice;

  return (
    <>
      <SEO
        path="/aviso-legal"
        title={`${d.legal.noticeTitle} — PIGTATTOO`}
        description={page.description}
        breadcrumbs={[{ name: d.legal.noticeTitle, path: "/aviso-legal" }]}
      />
      <PageHeader title={d.legal.noticeTitle} />
      <LegalContent page={page} lang={lang} />
    </>
  );
}
