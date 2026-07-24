import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ImageFrame } from "@/components/ImageFrame";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";
import { RESULTS_DOCS, MATERIALS_DOCS, type DocResource } from "@/lib/site-data";

export const Route = createFileRoute("/$lang/resultados")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.results.title} — PIGTATTOO` },
        { name: "description", content: d.results.intro },
        { property: "og:title", content: `${d.results.title} — PIGTATTOO` },
        { property: "og:description", content: d.results.intro },
      ],
      links: [{ rel: "canonical", href: `/${lang}/resultados` }],
    };
  },
  component: ResultsPage,
});

function DocGrid({ docs, downloadLabel, comingSoonLabel }: { docs: DocResource[]; downloadLabel: string; comingSoonLabel: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {docs.map((doc) => (
        <article key={doc.id} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="hidden w-20 flex-shrink-0 sm:block">
            <ImageFrame aspect="3/4" label={doc.fileType ?? "DOC"} alt={`Portada ${doc.title}`} rounded="rounded-md" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-base font-semibold text-primary">{doc.title}</h3>
              {doc.fileType && (
                <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {doc.fileType}
                </span>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{doc.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {doc.size && <span className="mr-2">{doc.size}</span>}
                {doc.date && <time dateTime={doc.date}>{new Date(doc.date).toLocaleDateString("es-ES")}</time>}
              </span>
              {doc.url ? (
                <a
                  href={doc.url}
                  className="inline-flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:brightness-95"
                  download
                >
                  ↓ {downloadLabel}
                </a>
              ) : (
                <span className="rounded-md border border-dashed border-border px-3 py-1.5 text-xs italic text-muted-foreground">
                  {comingSoonLabel}
                </span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ResultsPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  const deliverablesTitle = (d.results as { deliverablesTitle?: string }).deliverablesTitle ?? "Entregables técnicos";
  const materialsTitle = (d.results as { materialsTitle?: string }).materialsTitle ?? "Materiales de difusión";
  return (
    <>
      <PageHeader
        kicker={d.results.kicker}
        title={d.results.title}
        intro={d.results.intro}
        imageLabel="Imagen de resultados"
        imageAlt="Recopilación de entregables y materiales del proyecto"
      />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-14">
        <section>
          <h2 className="mb-6 font-display text-2xl font-bold text-primary">{deliverablesTitle}</h2>
          <DocGrid docs={RESULTS_DOCS} downloadLabel={d.results.download} comingSoonLabel={d.results.comingSoon} />
        </section>
        <section>
          <h2 className="mb-6 font-display text-2xl font-bold text-primary">{materialsTitle}</h2>
          <DocGrid docs={MATERIALS_DOCS} downloadLabel={d.results.download} comingSoonLabel={d.results.comingSoon} />
        </section>
      </div>
    </>
  );
}
