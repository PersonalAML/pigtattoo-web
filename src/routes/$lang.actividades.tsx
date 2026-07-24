import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ImageFrame } from "@/components/ImageFrame";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";
import { ACTIVITIES, type ActivityStatus } from "@/lib/site-data";

export const Route = createFileRoute("/$lang/actividades")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.activities.title} — PIGTATTOO` },
        { name: "description", content: d.activities.intro },
        { property: "og:title", content: `${d.activities.title} — PIGTATTOO` },
        { property: "og:description", content: d.activities.intro },
      ],
      links: [{ rel: "canonical", href: `/${lang}/actividades` }],
    };
  },
  component: ActivitiesPage,
});

function statusLabel(s: ActivityStatus, lang: Lang): string {
  const d = getDict(lang);
  if (s === "completed") return d.activities.statusCompleted;
  if (s === "in-progress") return d.activities.statusInProgress;
  return d.activities.statusPlanned;
}

function statusClasses(s: ActivityStatus): string {
  // Regla F#3: Azul Cerceta para "Finalizadas", Rosa Salmón para <100% ("próximos pasos")
  if (s === "completed") return "bg-accent/15 text-accent border-accent/40";
  if (s === "in-progress") return "bg-[var(--color-salmon)]/40 text-primary border-[var(--color-salmon)]";
  return "bg-muted text-muted-foreground border-border";
}

function ActivitiesPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader kicker={d.activities.kicker} title={d.activities.title} intro={d.activities.intro} />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {ACTIVITIES.map((a) => (
            <article key={a.id} className="flex gap-5 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="hidden w-28 flex-shrink-0 sm:block">
                <ImageFrame aspect="1/1" label={a.code} alt={`Imagen ${a.code}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-accent">
                    {a.code}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusClasses(a.status)}`}
                  >
                    {statusLabel(a.status, lang)}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-primary">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                <div className="mt-4">
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={a.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${a.title}: ${a.progress}%`}
                  >
                    <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${a.progress}%` }} />
                  </div>
                  <p className="mt-1 text-right text-xs text-muted-foreground">{a.progress}%</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
