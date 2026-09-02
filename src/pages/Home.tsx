import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { ImageFrame } from "@/components/ImageFrame";
import { useLang } from "@/components/LangGuard";
import { getDict, td } from "@/i18n/dictionaries";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticias, type Noticia } from "@/lib/contentful";
import { PARTNERS } from "@/lib/site-data";
import { LogoFrame } from "@/components/ImageFrame";
import heroHome from "@/assets/header-home.webp.asset.json";
import conceptoHome from "@/assets/home-concepto.webp.asset.json";


export default function Home() {
  const lang = useLang();
  const d = getDict(lang);
  const base = `/${lang}`;
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  useEffect(() => {
    getNoticias({ limit: 3 }).then(setNoticias).catch(() => setNoticias([]));
  }, []);

  return (
    <>
      <SEO
        path="/"
        title={`${d.meta.siteName} — ${d.meta.tagline}`}
        description={d.home.heroSubtitle}
      />

      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-narrow grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {d.home.heroKicker}
            </p>
            <h1 className="text-4xl md:text-5xl">{d.home.heroTitle}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {d.home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`${base}/proyecto`} className="cta">
                {d.home.heroCta}
              </Link>
              <Link to={`${base}/actividades`} className="cta-outline">
                {d.home.heroCtaSecondary}
              </Link>
            </div>
          </div>
          <img
            src={heroHome.url}
            alt={d.images.home}
            {...({ fetchpriority: "high" } as Record<string, string>)}
            decoding="async"
            width={1400}
            height={1750}
            className="w-full rounded-2xl object-cover"
          />

        </div>
      </section>

      {/* Qué es */}
      <section className="container-narrow py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div>
            <h2 className="text-3xl">{d.home.whatTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{d.home.whatBody}</p>
          </div>
          <img
            src={conceptoHome.url}
            alt={d.images.concept}
            loading="lazy"
            width={1600}
            height={1200}
            className="w-full rounded-xl object-cover"
          />

        </div>
      </section>

      {/* Pilares */}
      <section className="border-y border-border bg-card/50 py-20">
        <div className="container-narrow">
          <h2 className="text-3xl">{d.home.pillarsTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: d.home.pillar1Title, body: d.home.pillar1Body },
              { title: d.home.pillar2Title, body: d.home.pillar2Body },
              { title: d.home.pillar3Title, body: d.home.pillar3Body },
            ].map((p) => (
              <article
                key={p.title}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias */}
      <section className="container-narrow py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">{d.home.newsTitle}</h2>
          <Link to={`${base}/actualidad`} className="text-sm font-bold text-primary hover:underline">
            {d.home.newsCta} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {noticias.map((n) => (
            <article key={n.id} className="overflow-hidden rounded-lg border border-border bg-card">
              <ImageFrame
                src={n.imagen?.url}
                alt={n.imagen?.alt}
                aspect="16/9"
                label={d.a11y.newsImage}
                rounded="rounded-none"
              />
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider font-semibold text-primary">{n.categoria ?? d.news.defaultCategory}</p>
                <h3 className="mt-2 text-lg">{n.titulo}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.extracto}</p>
                <Link
                  to={`${base}/actualidad/${n.slug}`}
                  className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
                >
                  {d.news.readMore} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Socios */}
      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="container-narrow">
          <h2 className="text-3xl">{d.home.partnersTitle}</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {PARTNERS.map((p) => (
              <Link
                key={p.id}
                to={`${base}/consorcio`}
                title={td(lang, "partners", p.id, "role")}
                className="group block rounded-lg border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <LogoFrame src={p.logo} alt={`${d.a11y.logoOf} ${p.name}`} label={p.short} className="p-2" />
                <p className="mt-2 text-center text-sm font-bold text-primary group-hover:underline">{p.short}</p>
              </Link>
            ))}
          </div>


        </div>
      </section>

      {/* CTA contacto */}
      <section className="container-narrow py-20 text-center">
        <h2 className="text-3xl">{d.home.contactCtaTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{d.home.contactCtaBody}</p>
        <div className="mt-6">
          <Link to={`${base}/contacto`} className="cta">
            {d.home.contactCtaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
