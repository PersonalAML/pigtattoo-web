import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function Privacidad() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/privacidad"
        title={`${d.legal.privacyTitle} — PIGTATTOO`}
        description={d.legal.privacyBody.slice(0, 155)}
      />
      <PageHeader title={d.legal.privacyTitle} />
      <div className="container-narrow max-w-3xl py-14 text-muted-foreground">
        <p className="leading-relaxed">{d.legal.privacyBody}</p>
      </div>
    </>
  );
}
