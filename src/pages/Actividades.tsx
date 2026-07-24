import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { ACTIVITIES, type ActivityStatus } from "@/lib/site-data";

function StatusBadge({ status, dict }: { status: ActivityStatus; dict: ReturnType<typeof getDict> }) {
  const map = {
    planned: { label: dict.activities.statusPlanned, cls: "bg-secondary text-primary border border-border" },
    "in-progress": { label: dict.activities.statusInProgress, cls: "bg-salmon/30 text-primary border border-salmon" },
    completed: { label: dict.activities.statusCompleted, cls: "bg-accent/15 text-primary border border-accent/40" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${s.cls}`}>
      {s.label}
    </span>
  );
}

export default function Actividades() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/actividades"
        title={`${d.activities.title} — PIGTATTOO`}
        description={d.activities.intro}
      />
      <PageHeader
        kicker={d.activities.kicker}
        title={d.activities.title}
        intro={d.activities.intro}
        imageLabel="Imagen actividades"
        imageAlt="Actividades del proyecto"
      />
      <div className="container-narrow py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {ACTIVITIES.map((a) => (
            <article key={a.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-wider text-primary">
                    {a.code}
                  </p>
                  <h3 className="mt-1 text-lg">{a.title}</h3>
                </div>
                <StatusBadge status={a.status} dict={d} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progreso</span>
                  <span className="font-bold text-primary">{a.progress}%</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full ${a.status === "completed" ? "bg-accent" : "bg-salmon"}`}
                    style={{ width: `${a.progress}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
