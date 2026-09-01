import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import { LogoFrame } from "@/components/ImageFrame";
import { useLang } from "@/components/LangGuard";
import { getDict, td, type Lang } from "@/i18n/dictionaries";
import { PARTNERS, SUBCONTRACTED } from "@/lib/site-data";
import mapaAsset from "@/assets/mapa-consorcio.png.asset.json";

const MAPA_DESC_ID = "mapa-desc";

const MapaDescription = ({ items }: { items: readonly string[] }) => (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

function PartnerLogoLink({ partner, dict }: { partner: (typeof PARTNERS)[number]; dict: ReturnType<typeof getDict> }) {
  if (!partner.url) {
    return <LogoFrame src={partner.logo} alt={`${dict.a11y.logoOf} ${partner.name}`} label={partner.short} className="p-3" />;
  }
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${dict.a11y.websiteOf} ${partner.name}`}
      className="block rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <LogoFrame src={partner.logo} alt={`${dict.a11y.logoOf} ${partner.name}`} label={partner.short} className="p-3" />
    </a>
  );
}

function SubcontractedLogoLink({ partner, dict }: { partner: (typeof SUBCONTRACTED)[number]; dict: ReturnType<typeof getDict> }) {
  if (!partner.url) {
    return <LogoFrame src={partner.logo} alt={`${dict.a11y.logoOf} ${partner.name}`} label={partner.short} />;
  }
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${dict.a11y.websiteOf} ${partner.name}`}
      className="block rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <LogoFrame src={partner.logo} alt={`${dict.a11y.logoOf} ${partner.name}`} label={partner.short} />
    </a>
  );
}

export default function Consorcio() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/consorcio"
        title={`${d.consortium.title} — PIGTATTOO`}
        description={d.consortium.intro}
        breadcrumbs={[{ name: d.consortium.title, path: "/consorcio" }]}
      />
      <PageHeader
        kicker={d.consortium.kicker}
        title={d.consortium.title}
        intro={d.consortium.intro}
        imageSrc={mapaAsset.url}
        imageAlt={d.images.map}
        imageDescribedBy={MAPA_DESC_ID}
        imageDescription={<MapaDescription items={d.images.mapItems} />}
      />
      <div className="container-narrow space-y-16 py-14">
        <section>
          <h2 className="text-2xl">{d.consortium.partnersTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p) => (
              <article key={p.id} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <PartnerLogoLink partner={p} dict={d} />
                <h3 className="mt-4 text-base font-bold text-primary">{p.short}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{td(lang, "partners", p.id, "role")}</p>
                <p className="mt-2 text-sm font-bold text-primary">{td(lang, "partners", p.id, "description")}</p>
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
                    <SubcontractedLogoLink partner={p} dict={d} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">{p.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{td(lang, "partners", p.id, "role")}</p>
                    <p className="mt-1 text-xs font-bold text-primary">{td(lang, "partners", p.id, "description")}</p>
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
