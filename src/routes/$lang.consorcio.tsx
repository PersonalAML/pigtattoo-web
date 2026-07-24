import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";
import { PARTNERS, SUBCONTRACTED, type Partner } from "@/lib/site-data";

export const Route = createFileRoute("/$lang/consorcio")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.consortium.title} — PIGTATTOO` },
        { name: "description", content: d.consortium.intro },
        { property: "og:title", content: `${d.consortium.title} — PIGTATTOO` },
        { property: "og:description", content: d.consortium.intro },
      ],
      links: [{ rel: "canonical", href: `/${lang}/consorcio` }],
    };
  },
  component: ConsortiumPage,
});

function PartnerCard({ p }: { p: Partner }) {
  return (
    <article className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div
        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-secondary text-xs font-bold uppercase tracking-widest text-muted-foreground"
        title="Logo pendiente"
      >
        {p.short}
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-primary">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
      </div>
    </article>
  );
}

function ConsortiumPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader kicker={d.consortium.kicker} title={d.consortium.title} intro={d.consortium.intro} />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-14">
        <section>
          <h2 className="font-display text-2xl font-bold text-primary">{d.consortium.partnersTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PARTNERS.map((p) => (
              <PartnerCard key={p.id} p={p} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-primary">{d.consortium.subcontractedTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SUBCONTRACTED.map((p) => (
              <PartnerCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
