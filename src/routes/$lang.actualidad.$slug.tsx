import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, type Block, type Inline } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";
import { getNoticia, type Noticia } from "@/lib/contentful.functions";

const noticiaQuery = (slug: string) =>
  queryOptions({
    queryKey: ["noticia", slug],
    queryFn: () => getNoticia({ data: { slug } }),
    staleTime: 5 * 60 * 1000,
  });

export const Route = createFileRoute("/$lang/actualidad/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(noticiaQuery(params.slug));
    if (!data.item) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    if (!loaderData?.item) {
      return {
        meta: [{ title: "PIGTATTOO" }, { name: "robots", content: "noindex" }],
      };
    }
    const n = loaderData.item;
    const desc = n.extracto ?? "PIGTATTOO";
    const meta: Array<Record<string, string>> = [
      { title: `${n.titulo} — PIGTATTOO` },
      { name: "description", content: desc },
      { property: "og:title", content: n.titulo },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
    ];
    if (n.imagenDestacada?.url) {
      meta.push({ property: "og:image", content: n.imagenDestacada.url });
      meta.push({ name: "twitter:image", content: n.imagenDestacada.url });
    }
    return {
      meta,
      links: [{ rel: "canonical", href: `/${lang}/actualidad/${n.slug}` }],
    };
  },
  component: NewsDetail,
  notFoundComponent: NewsNotFound,
});

function NewsNotFound() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">{d.news.notFound}</h1>
      <Link to="/$lang/actualidad" params={{ lang }} className="mt-6 inline-block text-accent hover:underline">
        ← {d.news.backToList}
      </Link>
    </div>
  );
}

function NewsDetail() {
  const { lang } = Route.useParams() as { lang: Lang };
  const params = Route.useParams();
  const d = getDict(lang);
  const { data } = useSuspenseQuery(noticiaQuery(params.slug));
  const n = data.item as Noticia;
  const date = n.fecha ? new Date(n.fecha).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES", { year: "numeric", month: "long", day: "numeric" }) : null;

  const richOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const target = (node.data as { target?: { fields?: { file?: { url?: string }; title?: string } } }).target;
        const raw = target?.fields?.file?.url;
        if (!raw) return null;
        const url = raw.startsWith("//") ? `https:${raw}` : raw;
        return (
          <figure className="my-6">
            <img src={url} alt={target?.fields?.title ?? ""} className="rounded-lg" loading="lazy" />
            {target?.fields?.title && (
              <figcaption className="mt-2 text-xs text-muted-foreground">{target.fields.title}</figcaption>
            )}
          </figure>
        );
      },
    },
  };

  return (
    <>
      <PageHeader kicker={n.categoria ?? d.news.kicker} title={n.titulo}>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {date && <time dateTime={n.fecha}>{date}</time>}
          {n.autor && (
            <>
              <span>·</span>
              <span>{d.news.byAuthor} {n.autor}</span>
            </>
          )}
        </div>
      </PageHeader>
      <article className="mx-auto max-w-3xl px-4 py-14">
        {n.imagenDestacada && (
          <img src={n.imagenDestacada.url} alt={n.imagenDestacada.title ?? n.titulo} className="mb-8 w-full rounded-xl border border-border" />
        )}
        {n.extracto && <p className="text-lg font-medium leading-relaxed text-foreground">{n.extracto}</p>}
        <div className="prose prose-neutral mt-6 max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-accent">
          {n.cuerpo ? (documentToReactComponents(n.cuerpo, richOptions) as ReactNode) : null}
        </div>
        {n.galeria && n.galeria.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-primary">Galería</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {n.galeria.map((a) => (
                <img key={a.id} src={a.url} alt={a.title ?? ""} loading="lazy" className="rounded-lg border border-border" />
              ))}
            </div>
          </section>
        )}
        <div className="mt-12">
          <Link to="/$lang/actualidad" params={{ lang }} className="text-sm font-semibold text-accent hover:underline">
            ← {d.news.backToList}
          </Link>
        </div>
      </article>
    </>
  );
}
