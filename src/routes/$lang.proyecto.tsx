import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";

export const Route = createFileRoute("/$lang/proyecto")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.project.title} — PIGTATTOO` },
        { name: "description", content: d.project.intro },
        { property: "og:title", content: `${d.project.title} — PIGTATTOO` },
        { property: "og:description", content: d.project.intro },
      ],
      links: [{ rel: "canonical", href: `/${lang}/proyecto` }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader kicker={d.project.kicker} title={d.project.title} intro={d.project.intro} />
      <div className="mx-auto max-w-4xl space-y-14 px-4 py-14">
        <section id="objetivos">
          <h2 className="font-display text-2xl font-bold text-primary">{d.project.objectivesTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.objectivesBody}</p>
        </section>
        <section id="metodologia">
          <h2 className="font-display text-2xl font-bold text-primary">{d.project.methodologyTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.methodologyBody}</p>
        </section>
        <section id="cronograma">
          <h2 className="font-display text-2xl font-bold text-primary">{d.project.timelineTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.timelineBody}</p>
          <ol className="mt-6 space-y-4 border-l-2 border-accent/40 pl-6">
            {[
              { y: "2024", t: "Diseño técnico y arranque" },
              { y: "2025", t: "Validación en campo y estudios de bienestar" },
              { y: "2026", t: "Integración, análisis y transferencia" },
            ].map((m) => (
              <li key={m.y} className="relative">
                <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background" />
                <p className="font-display text-sm font-bold text-accent">{m.y}</p>
                <p className="text-sm text-muted-foreground">{m.t}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
