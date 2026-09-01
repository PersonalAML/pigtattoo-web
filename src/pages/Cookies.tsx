import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { ConsentControls } from "@/components/CookieBanner";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function Cookies() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/cookies"
        title={`${d.cookies.title} — PIGTATTOO`}
        description="Política de cookies de PIGTATTOO: cookies técnicas necesarias y cookies analíticas de Google Analytics 4 sujetas a consentimiento previo, con posibilidad de revocación."
        breadcrumbs={[{ name: d.cookies.title, path: "/cookies" }]}
      />
      <PageHeader title={d.cookies.title} />
      <div className="container-narrow max-w-3xl space-y-8 py-14 text-muted-foreground">
        <p className="leading-relaxed">{d.cookies.body}</p>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">¿Qué es una cookie?</h2>
          <p className="leading-relaxed">
            Una cookie es un pequeño archivo que se almacena en el dispositivo de la persona usuaria
            al visitar un sitio web y que permite recordar información sobre su navegación. También
            se equiparan a las cookies otras tecnologías de almacenamiento local del navegador.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">Cookies utilizadas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Relación de cookies y almacenamiento local utilizados en pigtattoo.es
              </caption>
              <thead>
                <tr className="border-b border-border text-primary">
                  <th scope="col" className="py-2 pr-4 font-semibold">Nombre</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Tipo</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Finalidad</th>
                  <th scope="col" className="py-2 font-semibold">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4">pigtattoo.consent.v1</td>
                  <td className="py-2 pr-4">Técnica (almacenamiento local, propia)</td>
                  <td className="py-2 pr-4">
                    Recordar la decisión sobre el uso de cookies analíticas.
                  </td>
                  <td className="py-2">Hasta que se borre o se restablezca</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 pr-4">_ga, _ga_*</td>
                  <td className="py-2 pr-4">Analítica (terceros: Google Analytics 4)</td>
                  <td className="py-2 pr-4">
                    Distinguir usuarios y sesiones para obtener estadísticas agregadas de uso.
                  </td>
                  <td className="py-2">Pendiente de confirmar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="rounded-lg border border-border bg-card p-4 leading-relaxed">
            <strong className="text-primary">Nota:</strong> la configuración de Google Analytics 4
            está pendiente de finalizar. El identificador de medición definitivo y la duración
            exacta de las cookies analíticas se publicarán en esta página antes de su activación.
            Hasta entonces, la analítica no se carga en ningún caso.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Consentimiento y revocación
          </h2>
          <p className="leading-relaxed">
            Las cookies analíticas solo se instalan tras la aceptación expresa mediante el banner
            que se muestra en la primera visita. Puede rechazarlas sin que ello afecte al
            funcionamiento del sitio y modificar su decisión en cualquier momento desde el botón
            situado a continuación. También puede eliminar o bloquear las cookies desde la
            configuración de su navegador.
          </p>
          <ConsentControls />
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">
            Tratamiento de datos y más información
          </h2>
          <p className="leading-relaxed">
            No se utilizan cookies publicitarias, de perfilado ni de redes sociales. Puede consultar
            cómo se tratan los datos personales asociados en la{" "}
            <Link to={`/${lang}/privacidad`} className="text-primary underline">
              política de privacidad
            </Link>{" "}
            y los datos del titular en el{" "}
            <Link to={`/${lang}/aviso-legal`} className="text-primary underline">
              aviso legal
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
