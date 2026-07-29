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
        description={d.legal.noticeBody.slice(0, 155)}
      />
      <PageHeader title={d.legal.noticeTitle} />
      <div className="container-narrow max-w-3xl py-14 text-muted-foreground">
        <p className="leading-relaxed">{d.legal.noticeBody}</p>
        <h2 className="mt-10 text-xl text-primary">Créditos fotográficos</h2>
        <ul className="mt-3 space-y-1 text-sm leading-relaxed">
          <li>Portada: Zoe Richardson (Unsplash)</li>
          <li>Actualidad: Marwen Larafa (Unsplash)</li>
          <li>Contacto: David Vives (Unsplash)</li>
          <li>
            Proyecto, Actividades, Resultados y Materiales e imagen de concepto: ilustraciones
            generadas con inteligencia artificial para el proyecto PIGTATTOO.
          </li>
        </ul>
      </div>

    </>
  );
}
