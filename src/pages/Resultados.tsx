import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import headerResultados from "@/assets/header-resultados.webp.asset.json";

import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { RESULTS_DOCS, MATERIALS_DOCS, type DocResource } from "@/lib/site-data";
import { FileText, Download } from "lucide-react";

function DocCard({ doc, dict }: { doc: DocResource; dict: ReturnType<typeof getDict> }) {
  const available = Boolean(doc.url);
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base leading-snug">{doc.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {doc.fileType ?? "PDF"}
            {doc.size ? ` · ${doc.size}` : ""}
            {doc.date ? ` · ${doc.date}` : ""}
          </p>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
      <div className="mt-4">
        {available ? (
          <a href={doc.url} className="cta text-xs" download>
            <Download className="mr-1.5 h-3.5 w-3.5" /> {dict.results.download}
          </a>
        ) : (
          <span className="inline-flex items-center rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
            {dict.results.comingSoon}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Resultados() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/resultados"
        title={`${d.results.title} — PIGTATTOO`}
        description={d.results.intro}
      />
      <PageHeader
        kicker={d.results.kicker}
        title={d.results.title}
        intro={d.results.intro}
        imageSrc={headerResultados.url}
        imageAlt="Informes técnicos impresos con gráficos y un portátil mostrando un panel de datos del proyecto"
      />

      <div className="container-narrow space-y-16 py-14">
        <section>
          <h2 className="text-2xl">{d.results.materialsTitle}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MATERIALS_DOCS.map((doc) => (
              <DocCard key={doc.id} doc={doc} dict={d} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl">{d.results.deliverablesTitle}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESULTS_DOCS.map((doc) => (
              <DocCard key={doc.id} doc={doc} dict={d} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
