import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SEO } from "@/components/SEO";
import { ImageFrame } from "@/components/ImageFrame";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { getNoticiaBySlug, type Noticia } from "@/lib/contentful";

export default function ActualidadDetalle() {
  const lang = useLang();
  const d = getDict(lang);
  const base = `/${lang}`;
  const { slug = "" } = useParams<{ slug: string }>();
  const [noticia, setNoticia] = useState<Noticia | null | undefined>(undefined);

  useEffect(() => {
    getNoticiaBySlug(slug)
      .then(setNoticia)
      .catch(() => setNoticia(null));
  }, [slug]);

  if (noticia === undefined) {
    return (
      <div className="container-narrow py-14 text-muted-foreground">{d.misc.loading}</div>
    );
  }
  if (noticia === null) {
    return (
      <div className="container-narrow py-14">
        <SEO
          path={`/actualidad/${slug}`}
          title={`${d.news.notFound} — PIGTATTOO`}
          description={d.news.notFound}
        />
        <Helmet><meta name="robots" content="noindex" /></Helmet>
        <h1 className="text-2xl">{d.news.notFound}</h1>
        <Link to={`${base}/actualidad`} className="mt-4 inline-block cta-outline">
          ← {d.news.backToList}
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: noticia.titulo,
    description: noticia.extracto,
    datePublished: noticia.fecha,
    author: noticia.autor ? [{ "@type": "Person", name: noticia.autor }] : undefined,
    image: noticia.imagen?.url,
  };

  return (
    <>
      <SEO
        path={`/actualidad/${noticia.slug}`}
        title={`${noticia.titulo} — PIGTATTOO`}
        description={noticia.extracto}
        ogImage={noticia.imagen?.url}
        ogType="article"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <article className="container-narrow py-14">
        <Link to={`${base}/actualidad`} className="text-sm text-primary hover:underline">

          ← {d.news.backToList}
        </Link>
        <header className="mt-4">
          {noticia.categoria && (
            <p className="text-xs uppercase tracking-wider text-accent">{noticia.categoria}</p>
          )}
          <h1 className="mt-2 text-4xl">{noticia.titulo}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(noticia.fecha).toLocaleDateString(lang)}
            {noticia.autor ? ` · ${d.news.byAuthor} ${noticia.autor}` : ""}
          </p>
        </header>
        <div className="mt-6">
          <ImageFrame
            src={noticia.imagen?.url}
            alt={noticia.imagen?.alt}
            aspect="16/9"
            label="Imagen destacada"
          />
        </div>
        <div className="prose prose-neutral mt-8 max-w-none leading-relaxed text-foreground">
          {noticia.cuerpo ? (
            documentToReactComponents(noticia.cuerpo)
          ) : (
            <p className="text-muted-foreground">{noticia.extracto}</p>
          )}
        </div>
        {noticia.galeria && noticia.galeria.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {noticia.galeria.map((g, i) => (
              <ImageFrame key={i} src={g.url} alt={g.alt} aspect="4/3" />
            ))}
          </div>
        )}
      </article>
    </>
  );
}
