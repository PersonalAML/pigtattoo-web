import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ConsentControls } from "@/components/CookieBanner";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";

export const Route = createFileRoute("/$lang/cookies")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.cookies.title} — PIGTATTOO` },
        { name: "description", content: d.cookies.body.slice(0, 155) },
      ],
      links: [{ rel: "canonical", href: `/${lang}/cookies` }],
    };
  },
  component: CookiesPage,
});

function CookiesPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader title={d.cookies.title} />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-14">
        <p className="leading-relaxed text-muted-foreground">{d.cookies.body}</p>
        <ConsentControls />
      </div>
    </>
  );
}
