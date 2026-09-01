import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

const REVIEW_DATE = "29 de julio de 2026";

export default function Accesibilidad() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/accesibilidad"
        title={`${d.legal.accessibilityTitle} — PIGTATTOO`}
        description="Declaración de accesibilidad del sitio web de PIGTATTOO: grado de conformidad con el RD 1112/2018 y la norma EN 301 549 (WCAG 2.1 AA)."
        breadcrumbs={[{ name: d.legal.accessibilityTitle, path: "/accesibilidad" }]}
      />
      <PageHeader title={d.legal.accessibilityTitle} />
      <div className="container-narrow max-w-3xl space-y-8 py-14 text-muted-foreground">
        <p className="leading-relaxed">
          El consorcio PIGTATTOO se ha comprometido, con carácter voluntario, a hacer accesible su
          sitio web tomando como referencia el Real Decreto 1112/2018, de 7 de septiembre, sobre
          accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector
          público, que transpone la Directiva (UE) 2016/2102, y la norma EN 301 549 (equivalente a
          las WCAG 2.1 nivel AA). El sitio pertenece a una entidad privada y no está sujeto por sí
          mismo a dicha norma, pero se adopta como estándar de calidad al tratarse de un proyecto
          cofinanciado con fondos públicos.
        </p>


        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Situación de cumplimiento
          </h2>
          <p className="leading-relaxed">
            Este sitio web es <strong className="text-primary">parcialmente conforme</strong> con
            la norma EN 301 549 y las WCAG 2.1 nivel AA, debido a las excepciones y a la falta de
            conformidad de los aspectos que se indican a continuación. El sitio se encuentra en
            fase de desarrollo y de incorporación de contenidos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Contenido no accesible
          </h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              Las versiones en catalán e inglés están en traducción; parte del contenido se muestra
              todavía en castellano, lo que puede afectar a la lectura con productos de apoyo.
            </li>
            <li>
              Algunos documentos técnicos descargables (entregables y materiales de difusión)
              podrán publicarse en formato PDF sin etiquetado completo de accesibilidad. Se
              facilitará una alternativa accesible a petición del usuario.
            </li>
            <li>
              Determinadas imágenes de cabecera son ilustrativas y provisionales; se sustituirán por
              material propio con textos alternativos definitivos.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Medidas de accesibilidad aplicadas
          </h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            <li>Estructura semántica con un único encabezado principal por página y regiones de navegación, contenido y pie.</li>
            <li>Enlace de salto al contenido principal y foco visible en todos los elementos interactivos.</li>
            <li>Navegación completa mediante teclado y textos alternativos en las imágenes informativas.</li>
            <li>Descripción textual extendida del mapa de entidades del consorcio.</li>
            <li>Contrastes de color revisados sobre la paleta corporativa y tipografías servidas desde el propio dominio.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Preparación de la declaración
          </h2>
          <p className="leading-relaxed">
            Declaración elaborada el {REVIEW_DATE} mediante autoevaluación realizada por el equipo
            de desarrollo, con herramientas automáticas de análisis y revisión manual de navegación
            por teclado y estructura semántica. Se revisará periódicamente conforme avance el
            proyecto.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Observaciones y datos de contacto
          </h2>
          <p className="leading-relaxed">
            Puede comunicar cualquier dificultad de acceso al contenido, solicitar información en
            un formato alternativo o presentar una queja relativa al cumplimiento de los requisitos
            de accesibilidad a través del{" "}
            <Link to={`/${lang}/contacto`} className="text-primary underline">
              formulario de contacto
            </Link>
            . Las comunicaciones serán atendidas por la coordinación del Grupo Operativo.
          </p>
        </section>
      </div>
    </>
  );
}
