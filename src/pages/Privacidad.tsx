import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function Privacidad() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/privacidad"
        title={`${d.legal.privacyTitle} — PIGTATTOO`}
        description="Política de privacidad de PIGTATTOO: responsable del tratamiento, finalidad, base jurídica, destinatarios y ejercicio de derechos conforme al RGPD y la LOPDGDD."
        breadcrumbs={[{ name: d.legal.privacyTitle, path: "/privacidad" }]}
      />
      <PageHeader title={d.legal.privacyTitle} />
      <div className="container-narrow max-w-3xl space-y-8 py-14 text-muted-foreground">
        <p className="leading-relaxed">
          En cumplimiento del Reglamento (UE) 2016/679, General de Protección de Datos (RGPD), y de
          la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos
          digitales (LOPDGDD), se informa del tratamiento de los datos personales facilitados a
          través de este sitio web.
        </p>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Responsable del tratamiento
          </h2>
          <ul className="space-y-1 leading-relaxed">
            <li>
              <strong className="text-primary">Entidad:</strong> Clúster Español de Productores de
              Ganado Porcino (i+Porc)
            </li>
            <li>
              <strong className="text-primary">CIF:</strong> G99539363
            </li>
            <li>
              <strong className="text-primary">Domicilio:</strong> C/ María de Luna, 11 · 50018
              Zaragoza (España)
            </li>
            <li>
              <strong className="text-primary">Teléfono:</strong>{" "}
              <a href="tel:+34613722505" className="text-primary underline">
                +34 613 72 25 05
              </a>
            </li>
          </ul>
          <p className="leading-relaxed">
            El Clúster Español de Productores de Ganado Porcino (i+Porc), como entidad titular del
            sitio y representante del Grupo Operativo PIGTATTOO, actúa como responsable del
            tratamiento de los datos recogidos a través del sitio web.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Finalidad y base jurídica
          </h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            <li>
              <strong className="text-primary">Consultas del formulario de contacto:</strong>{" "}
              atender y responder la solicitud remitida. Base jurídica: consentimiento de la persona
              interesada (art. 6.1.a RGPD), prestado al marcar la casilla de aceptación.
            </li>
            <li>
              <strong className="text-primary">Analítica web:</strong> obtener estadísticas
              agregadas de uso del sitio. Base jurídica: consentimiento prestado a través del
              banner de cookies. Puede consultarse el detalle en la{" "}
              <Link to={`/${lang}/cookies`} className="text-primary underline">
                política de cookies
              </Link>
              .
            </li>
          </ul>
          <p className="leading-relaxed">
            No se toman decisiones automatizadas ni se elaboran perfiles con los datos facilitados.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Datos tratados</h2>
          <p className="leading-relaxed">
            A través del formulario de contacto se recogen nombre, dirección de correo electrónico,
            asunto y el contenido del mensaje. Se recomienda no incluir en el mensaje datos de
            categorías especiales ni información que no resulte necesaria para atender la consulta.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Plazo de conservación</h2>
          <p className="leading-relaxed">
            Los datos se conservarán durante el tiempo necesario para atender la consulta y,
            posteriormente, mientras se mantengan obligaciones legales o de justificación de la
            ayuda pública asociada al proyecto. Transcurridos dichos plazos, los datos serán
            suprimidos o anonimizados.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Destinatarios y encargados del tratamiento
          </h2>
          <p className="leading-relaxed">
            No se ceden datos a terceros salvo obligación legal. Para la prestación del servicio se
            recurre a proveedores que actúan como encargados del tratamiento, con los que se
            suscriben los correspondientes contratos conforme al artículo 28 del RGPD:
          </p>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            <li>Netlify, Inc. — alojamiento del sitio web y gestión de los envíos del formulario.</li>
            <li>Contentful GmbH — gestión de los contenidos editoriales publicados.</li>
            <li>
              Google Ireland Ltd. — analítica web (Google Analytics 4), únicamente si se acepta el
              uso de cookies analíticas.
            </li>
          </ul>
          <p className="leading-relaxed">
            Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En
            tal caso, las transferencias internacionales se amparan en las Cláusulas Contractuales
            Tipo aprobadas por la Comisión Europea o en decisiones de adecuación vigentes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Derechos</h2>
          <p className="leading-relaxed">
            Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación
            del tratamiento y portabilidad, así como retirar en cualquier momento el consentimiento
            prestado, dirigiéndose por escrito al responsable en la dirección indicada más arriba,
            acreditando su identidad. Asimismo, puede presentar una reclamación ante la Agencia
            Española de Protección de Datos (
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              www.aepd.es
            </a>
            ) si considera que el tratamiento no se ajusta a la normativa vigente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Seguridad</h2>
          <p className="leading-relaxed">
            El responsable aplica las medidas técnicas y organizativas apropiadas para garantizar un
            nivel de seguridad adecuado al riesgo, incluida la transmisión cifrada mediante HTTPS y
            el control de acceso a la información.
          </p>
        </section>
      </div>
    </>
  );
}
