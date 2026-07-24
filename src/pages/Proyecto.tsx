import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { ImageFrame } from "@/components/ImageFrame";
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
      />
      <PageHeader
        kicker={d.project.kicker}
        title={d.project.title}
        intro={d.project.intro}
        imageLabel="Imagen del proyecto"
        imageAlt="Diagrama o fotografía del sistema PIGTATTOO"
      />
      <div className="container-narrow space-y-16 py-14">
        <section id="objetivos" className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl">{d.project.objectivesTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.objectivesBody}</p>
          </div>
          <ImageFrame aspect="1/1" label="Imagen objetivos" alt="Objetivos del proyecto" />
        </section>
        <section id="metodologia" className="grid gap-8 md:grid-cols-3 md:items-start">
          <ImageFrame aspect="1/1" label="Esquema metodología" alt="Metodología del proyecto" />
          <div className="md:col-span-2">
            <h2 className="text-2xl">{d.project.methodologyTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.methodologyBody}</p>
          </div>
        </section>
        <section id="cronograma">
          <h2 className="text-2xl">{d.project.timelineTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.timelineBody}</p>
          <ol className="mt-6 space-y-4 border-l-2 border-accent/40 pl-6">
            {[
              { y: "2024", t: "Diseño técnico y arranque" },
              { y: "2025", t: "Validación en campo y estudios de bienestar" },
              { y: "2026", t: "Integración, análisis y transferencia" },
            ].map((m) => (
              <li key={m.y} className="relative">
                <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background" />
                <p className="font-display text-sm font-semibold text-primary">{m.y}</p>
                <p className="text-sm text-muted-foreground">{m.t}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
