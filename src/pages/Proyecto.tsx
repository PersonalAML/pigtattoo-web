import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import headerProyecto from "@/assets/header-proyecto.webp.asset.json";
import metodologiaImg from "@/assets/metodologia.png.asset.json";

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
        breadcrumbs={[{ name: d.project.title, path: "/proyecto" }]}
      />
      <PageHeader
        kicker={d.project.kicker}
        title={d.project.title}
        intro={d.project.intro}
        imageSrc={headerProyecto.url}
        imageAlt="Primer plano de la oreja de un cerdo sujeta con guante de látex, con una marca de identificación en la piel"
      />

      <div className="container-narrow space-y-16 py-14">
        <section id="objetivos" className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl">{d.project.objectivesTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{d.project.objectivesBody}</p>
          </div>
          <ImageFrame aspect="1/1" label="Imagen objetivos" alt="Objetivos del proyecto" />
        </section>
        <section id="metodologia">
          <h2 className="text-2xl">{d.project.methodologyTitle}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{d.project.methodologyBody}</p>
          <figure className="mt-8">
            <img
              src={metodologiaImg.url}
              alt="Esquema de metodología del Proyecto: actividades, hitos, periodos y fechas clave de un vistazo."
              aria-describedby="metodologia-desc"
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-border bg-card object-contain"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Diagrama de metodología: actividades (A1–A8), hitos de resultados (R1–R8), periodos y fechas clave del Proyecto.
            </figcaption>
            <div id="metodologia-desc" className="sr-only">
              <p>El diagrama muestra dos periodos de desarrollo y una fase final de pruebas y análisis.</p>
              <ul>
                <li>Periodo 1 (inicio en febrero de 2026): trabajos iniciales de adquisición de conocimiento — A1 Pruebas iniciales (test malla) y A2 Requisitos de sistemas, bienestar animal, etc. — y desarrollos del Periodo 1: A4 Tinta PIGTATTOO, A3 Hardware de captación de imagen y A3 Pruebas intermedias.</li>
                <li>Periodo 2: desarrollos — A5 Sistema de codificación de la información, A6 Sistema de aplicación de tatuaje y A7 Sistema de IA de visión artificial. Fin de desarrollos: septiembre de 2028.</li>
                <li>Fase final: A8 Repercusión económica y replicabilidad, A8 Fase de pruebas y resultados y A8 Verificación de bienestar animal.</li>
                <li>Hitos de divulgación: divulgación inicial de comienzo del Proyecto; divulgación de resultados (pruebas y requisitos); divulgación de resultados (fin de Periodo 1, abril de 2027); divulgación de resultados (desarrollos completados); divulgación de resultados (fin de Proyecto, abril de 2029).</li>
                <li>Fechas clave: inicio febrero de 2026; fin de Periodo 1 abril de 2027; fin de desarrollos septiembre de 2028; fin de Proyecto abril de 2029.</li>
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
