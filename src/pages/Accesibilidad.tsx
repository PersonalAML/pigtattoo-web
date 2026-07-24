import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function Accesibilidad() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/accesibilidad"
        title={`${d.legal.accessibilityTitle} — PIGTATTOO`}
        description={d.legal.accessibilityBody.slice(0, 155)}
      />
      <PageHeader title={d.legal.accessibilityTitle} />
      <div className="container-narrow max-w-3xl py-14 text-muted-foreground">
        <p className="leading-relaxed">{d.legal.accessibilityBody}</p>
      </div>
    </>
  );
}
