import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { LogoFrame } from "@/components/ImageFrame";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { PARTNERS, SUBCONTRACTED } from "@/lib/site-data";
import mapaAsset from "@/assets/mapa-consorcio.png.asset.json";

const MAPA_DESC_ID = "mapa-desc";

const MapaDescription = () => (
  <ul>
    <li>i+Porc (Zaragoza, Aragón)</li>
    <li>GEEZAR (Zaragoza, Aragón)</li>
    <li>CEVA (Barcelona, Cataluña)</li>
    <li>EQTIC (Sant Cugat, Cataluña)</li>
    <li>AGROCAT (Sant Fruitós de Bages, Cataluña)</li>
    <li>GUCO (Valderrobres, Aragón)</li>
    <li>IRTA (Caldes de Montbui, Cataluña)</li>
    <li>ITENE (Paterna, Comunidad Valenciana)</li>
    <li>ANPROGAPOR (Madrid, Madrid)</li>
  </ul>
);

export default function Consorcio() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/consorcio"
        title={`${d.consortium.title} — PIGTATTOO`}
        description={d.consortium.intro}
      />
      <PageHeader
        kicker={d.consortium.kicker}
        title={d.consortium.title}
        intro={d.consortium.intro}
        imageSrc={mapaAsset.url}
        imageAlt="Mapa de España mostrando la distribución geográfica y las conexiones de las entidades del consorcio Pigtattoo."
        imageDescribedBy={MAPA_DESC_ID}
        imageDescription={<MapaDescription />}
      />
      <div className="container-narrow space-y-16 py-14">
        <section>
          <h2 className="text-2xl">{d.consortium.partnersTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p) => (
              <article key={p.id} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <LogoFrame src={p.logo} alt={`Logotipo de ${p.name}`} label={p.short} className="p-3" />
                <h3 className="mt-4 text-base">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl">{d.consortium.subcontractedTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUBCONTRACTED.map((p) => (
              <article key={p.id} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 shrink-0">
                    <LogoFrame label={p.short} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">{p.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{p.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
