import { useLang } from "@/components/LangGuard";
import { getDict, td } from "@/i18n/dictionaries";

const MILESTONES = [
  { id: "t1", date: "2025-06-01" },
  { id: "t2", date: "2026-01-01" },
  { id: "t3", date: "2027-04-30" },
  { id: "t4", date: "2028-07-01" },
  { id: "t5", date: "2029-04-30" },
];

const START = new Date("2025-06-01").getTime();
const END = new Date("2029-04-30").getTime();

function pct(date: string) {
  const t = new Date(date).getTime();
  return Math.min(100, Math.max(0, ((t - START) / (END - START)) * 100));
}

export function Timeline() {
  const lang = useLang();
  const d = getDict(lang);
  const milestones = MILESTONES.map((m) => ({
    ...m,
    label: td(lang, "timeline", m.id, "label"),
    title: td(lang, "timeline", m.id, "title"),
  }));
  const now = Date.now();
  const progress = Math.min(100, Math.max(0, ((now - START) / (END - START)) * 100));

  return (
    <div className="mt-10">
      {/* Desktop: línea horizontal */}
      <div className="relative hidden pb-2 lg:block" role="list" aria-label={d.a11y.timelineLabel}>
        {/* Línea base */}
        <div className="absolute left-0 right-0 top-3 h-1 rounded-full bg-muted" aria-hidden="true" />
        {/* Progreso */}
        <div
          className="absolute left-0 top-3 h-1 rounded-full bg-accent transition-[width]"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
        {/* Marcador "hoy" */}
        {progress > 0 && progress < 100 && (
          <div
            className="absolute top-0 z-10 -translate-x-1/2"
            style={{ left: `${progress}%` }}
            aria-hidden="true"
          >
            <span className="mx-auto block h-7 w-0.5 bg-primary" />
            <span className="mt-1 inline-block -translate-x-[calc(50%-1px)] rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
              {d.a11y.today}
            </span>
          </div>
        )}
        {/* Hitos */}
        <ol className="relative grid grid-cols-5 gap-4 pt-14">
          {milestones.map((m, i) => {
            const done = new Date(m.date).getTime() <= now;
            return (
              <li key={m.label} role="listitem">
                <span
                  className={`absolute top-[7px] h-4 w-4 -translate-x-1/2 rounded-full border-2 ${
                    done ? "border-accent bg-accent" : "border-accent/50 bg-background"
                  }`}
                  style={{ left: `${((i + 0.5) / milestones.length) * 100}%` }}
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <p className="font-display text-sm font-semibold text-primary">{m.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.title}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Móvil: línea vertical */}
      <ol className="space-y-4 border-l-2 border-accent/40 pl-6 lg:hidden" aria-label={d.a11y.timelineLabel}>
        {milestones.map((m) => {
          const done = new Date(m.date).getTime() <= now;
          return (
            <li key={m.label} className="relative">
              <span
                className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 ${
                  done ? "border-accent bg-accent" : "border-accent/50 bg-background"
                }`}
                aria-hidden="true"
              />
              <p className="font-display text-sm font-semibold text-primary">{m.label}</p>
              <p className="text-sm text-muted-foreground">{m.title}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
