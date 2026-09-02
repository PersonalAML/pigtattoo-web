import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { LegalContent } from "@/components/LegalContent";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { getLegal } from "@/i18n/legal";

export default function Cookies() {
  const lang = useLang();
  const d = getDict(lang);
  const page = { ...getLegal(lang).cookies, intro: [d.cookies.body] };

  return (
    <>
      <SEO
        path="/cookies"
        title={`${d.cookies.title} — PIGTATTOO`}
        description={page.description}
        breadcrumbs={[{ name: d.cookies.title, path: "/cookies" }]}
      />
      <PageHeader title={d.cookies.title} />
      <LegalContent page={page} lang={lang} />
    </>
  );
}
