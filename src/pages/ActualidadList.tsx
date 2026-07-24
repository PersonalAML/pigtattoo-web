import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { ImageFrame } from "@/components/ImageFrame";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { getNoticias, type Noticia } from "@/lib/contentful";

export default function ActualidadList() {
  const lang = useLang();
  const d = getDict(lang);
  const base = `/${lang}`;
  const [noticias, setNoticias] = useState<Noticia[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getNoticias({ limit: 24 })
      .then(setNoticias)
      .catch(() => setError(true));
  }, []);

  const destacada = noticias?.find((n) => n.destacada);
  const resto = noticias?.filter((n) => n.id !== destacada?.id) ?? [];

  return (
    <>
      <SEO
        path="/actualidad"
        title={`${d.news.title} — PIGTATTOO`}
        description={d.news.intro}
      />
      <PageHeader
        kicker={d.news.kicker}
        title={d.news.title}
        intro={d.news.intro}
        imageLabel="Imagen actualidad"
        imageAlt="Actualidad de PIGTATTOO"
      />
      <div className="container-narrow py-14">
        {noticias === null && !error ? (
          <p className="text-muted-foreground">{d.misc.loading}</p>
        ) : error ? (
          <p className="text-destructive">{d.news.error}</p>
        ) : noticias!.length === 0 ? (
          <p className="text-muted-foreground">{d.news.empty}</p>
        ) : (
          <>
            {destacada && (
              <article className="mb-10 grid gap-6 overflow-hidden rounded-lg border border-border bg-card md:grid-cols-2">
                <ImageFrame
                  src={destacada.imagen?.url}
                  alt={destacada.imagen?.alt}
                  aspect="4/3"
                  rounded="rounded-none"
                />
                <div className="p-6 md:p-8">
                  <p className="text-xs uppercase tracking-wider text-accent">
                    Destacada · {destacada.categoria ?? "Noticia"}
                  </p>
                  <h2 className="mt-2 text-2xl">{destacada.titulo}</h2>
                  <p className="mt-3 text-muted-foreground">{destacada.extracto}</p>
                  <Link
                    to={`${base}/actualidad/${destacada.slug}`}
                    className="mt-5 inline-block cta"
                  >
                    {d.news.readMore}
                  </Link>
                </div>
              </article>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resto.map((n) => (
                <article key={n.id} className="overflow-hidden rounded-lg border border-border bg-card">
                  <ImageFrame
                    src={n.imagen?.url}
                    alt={n.imagen?.alt}
                    aspect="16/9"
                    label="Imagen noticia"
                    rounded="rounded-none"
                  />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-accent">
                      {n.categoria ?? "Noticia"}
                    </p>
                    <h3 className="mt-2 text-lg">{n.titulo}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.extracto}</p>
                    <Link
                      to={`${base}/actualidad/${n.slug}`}
                      className="mt-3 inline-block text-sm font-bold text-primary hover:text-accent hover:underline"
                    >
                      {d.news.readMore} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
