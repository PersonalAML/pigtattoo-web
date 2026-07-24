import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { ConsentControls } from "@/components/CookieBanner";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function Cookies() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/cookies"
        title={`${d.cookies.title} — PIGTATTOO`}
        description={d.cookies.body.slice(0, 155)}
      />
      <PageHeader title={d.cookies.title} />
      <div className="container-narrow max-w-3xl space-y-6 py-14">
        <p className="leading-relaxed text-muted-foreground">{d.cookies.body}</p>
        <ConsentControls />
      </div>
    </>
  );
}
