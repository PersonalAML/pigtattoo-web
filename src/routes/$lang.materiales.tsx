import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";
import { MATERIALS_DOCS } from "@/lib/site-data";
import { DocGrid } from "./$lang.resultados";

export const Route = createFileRoute("/$lang/materiales")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.materials.title} — PIGTATTOO` },
        { name: "description", content: d.materials.intro },
        { property: "og:title", content: `${d.materials.title} — PIGTATTOO` },
        { property: "og:description", content: d.materials.intro },
      ],
      links: [{ rel: "canonical", href: `/${lang}/materiales` }],
    };
  },
  component: MaterialsPage,
});

function MaterialsPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader kicker={d.materials.kicker} title={d.materials.title} intro={d.materials.intro} />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <DocGrid docs={MATERIALS_DOCS} downloadLabel={d.materials.download} comingSoonLabel={d.materials.comingSoon} />
      </div>
    </>
  );
}
