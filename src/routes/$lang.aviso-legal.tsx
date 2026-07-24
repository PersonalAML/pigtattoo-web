import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";

export const Route = createFileRoute("/$lang/aviso-legal")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.legal.noticeTitle} — PIGTATTOO` },
        { name: "description", content: d.legal.noticeBody.slice(0, 155) },
      ],
      links: [{ rel: "canonical", href: `/${lang}/aviso-legal` }],
    };
  },
  component: LegalNoticePage,
});

function LegalNoticePage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader title={d.legal.noticeTitle} />
      <div className="mx-auto max-w-3xl px-4 py-14 text-muted-foreground">
        <p className="leading-relaxed">{d.legal.noticeBody}</p>
      </div>
    </>
  );
}
