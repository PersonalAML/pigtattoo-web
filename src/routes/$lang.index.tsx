import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";
import { getNoticias, type Noticia } from "@/lib/contentful.functions";
import { PARTNERS } from "@/lib/site-data";

const noticiasQuery = queryOptions({
  queryKey: ["noticias"],
  queryFn: () => getNoticias(),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/$lang/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(noticiasQuery),
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `PIGTATTOO — ${d.meta.tagline}` },
        { name: "description", content: d.home.heroSubtitle },
        { property: "og:title", content: `PIGTATTOO — ${d.meta.tagline}` },
        { property: "og:description", content: d.home.heroSubtitle },
      ],
      links: [{ rel: "canonical", href: `/${lang}` }],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  const { data } = useSuspenseQuery(noticiasQuery);
  const latest = (data.items as Noticia[]).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-secondary via-background to-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-5 md:py-28">
          <div className="md:col-span-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {d.home.heroKicker}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
              {d.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {d.home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/$lang/proyecto"
                params={{ lang }}
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {d.home.heroCta}
              </Link>
              <Link
                to="/$lang/actividades"
                params={{ lang }}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {d.home.heroCtaSecondary}
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="absolute -right-3 -top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                AEI-AGRI
              </div>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Socios</dt>
                  <dd className="font-display text-3xl font-bold text-primary">6</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Actividades</dt>
                  <dd className="font-display text-3xl font-bold text-primary">8</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">CCAA</dt>
                  <dd className="font-display text-3xl font-bold text-primary">4</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Duración</dt>
                  <dd className="font-display text-3xl font-bold text-primary">2024–26</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
            {d.home.whatTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {d.home.whatBody}
          </p>
        </div>
      </section>

      {/* PILARES */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold text-primary">{d.home.pillarsTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: d.home.pillar1Title, b: d.home.pillar1Body },
              { t: d.home.pillar2Title, b: d.home.pillar2Body },
              { t: d.home.pillar3Title, b: d.home.pillar3Body },
            ].map((p, i) => (
              <article key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 font-display text-lg font-bold text-accent">
                  {i + 1}
                </div>
                <h3 className="font-display text-lg font-semibold text-primary">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold text-primary">{d.home.newsTitle}</h2>
            <Link
              to="/$lang/actualidad"
              params={{ lang }}
              className="text-sm font-semibold text-accent hover:underline"
            >
              {d.home.newsCta} →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latest.length === 0 && (
              <p className="col-span-full rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
                {data.configured ? d.news.empty : "La conexión con Contentful aún no está configurada. Configúrala para ver noticias reales."}
              </p>
            )}
            {latest.map((n) => (
              <NewsCard key={n.id} n={n} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* SOCIOS */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold text-primary">{d.home.partnersTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((p) => (
              <li
                key={p.id}
                className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-card px-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                title={p.name}
              >
                {p.short}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACTO CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-primary px-8 py-12 text-center text-primary-foreground shadow-sm">
          <h2 className="font-display text-3xl font-bold">{d.home.contactCtaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">{d.home.contactCtaBody}</p>
          <Link
            to="/$lang/contacto"
            params={{ lang }}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:brightness-95"
          >
            {d.home.contactCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}

function NewsCard({ n, lang }: { n: Noticia; lang: Lang }) {
  const d = getDict(lang);
  const date = n.fecha ? new Date(n.fecha).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES") : null;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {n.imagenDestacada ? (
        <img
          src={n.imagenDestacada.url}
          alt={n.imagenDestacada.title ?? n.titulo}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-secondary to-accent/20" />
      )}
      <div className="flex flex-1 flex-col p-5">
        {n.categoria && (
          <span className="mb-2 inline-block w-fit rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            {n.categoria}
          </span>
        )}
        <h3 className="font-display text-lg font-semibold leading-snug text-primary">{n.titulo}</h3>
        {n.extracto && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.extracto}</p>
        )}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          {date && <time dateTime={n.fecha}>{date}</time>}
          <Link
            to="/$lang/actualidad/$slug"
            params={{ lang, slug: n.slug }}
            className="font-semibold text-accent hover:underline"
          >
            {d.news.readMore} →
          </Link>
        </div>
      </div>
    </article>
  );
}
