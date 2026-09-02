import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import headerProyecto from "@/assets/header-proyecto.webp.asset.json";
import metodologiaImg from "@/assets/metodologia.png.asset.json";
import objetivosImg from "@/assets/objetivos.webp.asset.json";

import { ImageFrame } from "@/components/ImageFrame";
import { Timeline } from "@/components/Timeline";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function Proyecto() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/proyecto"
        title={`${d.project.title} — PIGTATTOO`}
        description={d.project.intro}
        breadcrumbs={[{ name: d.project.title, path: "/proyecto" }]}
      />
      <PageHeader
        kicker={d.project.kicker}
        title={d.project.title}
        intro={d.project.intro}
        imageSrc={headerProyecto.url}
        imageAlt={d.images.project}
      />

      <div className="container-narrow space-y-16 py-14">
        <section id="objetivos" className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl">{d.project.objectivesTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.objectivesBody}</p>
          </div>
          <img
            src={objetivosImg.url}
            alt={d.images.objectivesAlt}
            loading="lazy"
            decoding="async"
            width={1000}
            height={1000}
            className="w-full rounded-xl bg-secondary/30 object-contain"
          />
        </section>
        <section id="metodologia">
          <h2 className="text-2xl">{d.project.methodologyTitle}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{d.project.methodologyBody}</p>
          <figure className="mx-auto mt-8 max-w-3xl">
            <img
              src={metodologiaImg.url}
              alt={d.images.methodologyAlt}
              aria-describedby="metodologia-desc"
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-border bg-card object-contain"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {d.images.methodologyCaption}
            </figcaption>
            <div id="metodologia-desc" className="sr-only">
              <p>{d.images.methodologyIntro}</p>
              <ul>
                {d.images.methodologyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </figure>
        </section>
        <section id="cronograma">
          <h2 className="text-2xl">{d.project.timelineTitle}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{d.project.timelineBody}</p>
          <Timeline />
        </section>
      </div>
    </>
  );
}
