import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function AvisoLegal() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/aviso-legal"
        title={`${d.legal.noticeTitle} — PIGTATTOO`}
        description="Aviso legal del sitio web del Grupo Operativo PIGTATTOO: datos identificativos del titular, condiciones de uso y propiedad intelectual."
        breadcrumbs={[{ name: d.legal.noticeTitle, path: "/aviso-legal" }]}
      />
      <PageHeader title={d.legal.noticeTitle} />
      <div className="container-narrow max-w-3xl space-y-8 py-14 text-muted-foreground">
        <p className="leading-relaxed">
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSICE), se facilitan los siguientes
          datos identificativos del titular de este sitio web.
        </p>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Titular del sitio web</h2>
          <ul className="space-y-1 leading-relaxed">
            <li>
              <strong className="text-primary">Denominación:</strong> Clúster Español de Productores
              de Ganado Porcino (i+Porc)
            </li>
            <li>
              <strong className="text-primary">CIF:</strong> G99539363
            </li>
            <li>
              <strong className="text-primary">Domicilio:</strong> C/ María de Luna, 11 · 50017
              Zaragoza (España)
            </li>
            <li>
              <strong className="text-primary">Teléfono:</strong>{" "}
              <a href="tel:+34613722505" className="text-primary underline">
                +34 613 72 25 05
              </a>
            </li>
            <li>
              <strong className="text-primary">Contacto:</strong>{" "}
              <Link to={`/${lang}/contacto`} className="text-primary underline">
                formulario de contacto
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Objeto del sitio</h2>
          <p className="leading-relaxed">
            Este sitio web tiene una finalidad exclusivamente informativa y divulgativa de las
            actividades y resultados del Grupo Operativo Supraautonómico PIGTATTOO, cofinanciado por
            el FEADER (Unión Europea) y el Ministerio de Agricultura, Pesca y Alimentación en el
            marco del Plan Estratégico de la PAC 2023-2027. No se realizan a través de él
            actividades de comercio electrónico ni de contratación en línea.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Condiciones de uso</h2>
          <p className="leading-relaxed">
            El acceso al sitio web es libre y gratuito. La persona usuaria se compromete a hacer un
            uso diligente del sitio y de sus contenidos, absteniéndose de utilizarlos con fines
            ilícitos o lesivos para terceros. El titular no garantiza la disponibilidad continuada
            del sitio ni se responsabiliza de los daños derivados de interrupciones técnicas ajenas
            a su control, ni del contenido de los sitios de terceros a los que se pueda enlazar
            desde estas páginas.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Propiedad intelectual e industrial
          </h2>
          <p className="leading-relaxed">
            Los contenidos de este sitio (textos, imágenes, diseño, código y materiales
            descargables) pertenecen al titular o a las entidades del consorcio PIGTATTOO, o se
            utilizan con la debida autorización. Se permite la reproducción parcial con fines
            divulgativos o docentes siempre que se cite la fuente y no se altere el contenido.
            Las marcas y logotipos de las entidades participantes son propiedad de sus respectivos
            titulares.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Legislación aplicable
          </h2>
          <p className="leading-relaxed">
            Las presentes condiciones se rigen por la legislación española. Para cualquier
            controversia serán competentes los juzgados y tribunales del domicilio del titular,
            salvo que la normativa de consumo disponga otro fuero.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Créditos fotográficos</h2>
          <ul className="space-y-1 text-sm leading-relaxed">
            <li>Portada: Zoe Richardson (Unsplash)</li>
            <li>Actualidad: Marwen Larafa (Unsplash)</li>
            <li>Contacto: David Vives (Unsplash)</li>
            <li>
              Proyecto, Actividades, Resultados y Materiales e imagen de concepto: ilustraciones
              generadas con inteligencia artificial para el proyecto PIGTATTOO.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
