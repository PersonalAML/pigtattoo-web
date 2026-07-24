import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";

export const Route = createFileRoute("/$lang/privacidad")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.legal.privacyTitle} — PIGTATTOO` },
        { name: "description", content: d.legal.privacyBody.slice(0, 155) },
      ],
      links: [{ rel: "canonical", href: `/${lang}/privacidad` }],
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader title={d.legal.privacyTitle} />
      <div className="mx-auto max-w-3xl px-4 py-14 text-muted-foreground">
        <p className="leading-relaxed">{d.legal.privacyBody}</p>
      </div>
    </>
  );
}
