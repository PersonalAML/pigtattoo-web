import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { ImageFrame } from "@/components/ImageFrame";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";
import { getNoticias, type Noticia } from "@/lib/contentful.functions";

const noticiasQuery = queryOptions({
  queryKey: ["noticias"],
  queryFn: () => getNoticias(),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/$lang/actualidad/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(noticiasQuery),
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.news.title} — PIGTATTOO` },
        { name: "description", content: d.news.intro },
        { property: "og:title", content: `${d.news.title} — PIGTATTOO` },
        { property: "og:description", content: d.news.intro },
      ],
      links: [{ rel: "canonical", href: `/${lang}/actualidad` }],
    };
  },
  component: NewsListPage,
});

function NewsListPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  const { data } = useSuspenseQuery(noticiasQuery);
  const items = data.items as Noticia[];

  return (
    <>
      <PageHeader
        kicker={d.news.kicker}
        title={d.news.title}
        intro={d.news.intro}
        imageLabel="Imagen de actualidad"
        imageAlt="Cabecera de la sección de actualidad"
      />
      <div className="mx-auto max-w-6xl px-4 py-14">
        {!data.configured && (
          <div className="mb-8 rounded-lg border border-dashed border-accent/50 bg-accent/5 p-5 text-sm text-foreground">
            La conexión con Contentful aún no está configurada. Añade <code>CONTENTFUL_SPACE_ID</code> y{" "}
            <code>CONTENTFUL_API_KEY</code> para publicar noticias desde el CMS.
          </div>
        )}
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-card p-6 text-muted-foreground">
            {d.news.empty}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <NewsCard key={n.id} n={n} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function NewsCard({ n, lang }: { n: Noticia; lang: Lang }) {
  const d = getDict(lang);
  const date = n.fecha ? new Date(n.fecha).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES") : null;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <ImageFrame
        src={n.imagenDestacada?.url}
        alt={n.imagenDestacada?.title ?? n.titulo}
        label="Imagen de la noticia"
        aspect="16/9"
        rounded="rounded-none"
      />
      <div className="flex flex-1 flex-col p-5">
        {n.categoria && (
          <span className="mb-2 inline-block w-fit rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            {n.categoria}
          </span>
        )}
        <h2 className="font-display text-lg font-semibold leading-snug text-primary">{n.titulo}</h2>
        {n.extracto && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.extracto}</p>}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          {date && <time dateTime={n.fecha}>{date}</time>}
          <Link to="/$lang/actualidad/$slug" params={{ lang, slug: n.slug }} className="font-semibold text-accent hover:underline">
            {d.news.readMore} →
          </Link>
        </div>
      </div>
    </article>
  );
}
