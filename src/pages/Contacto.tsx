import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
import headerContacto from "@/assets/header-contacto.webp.asset.json";

import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function Contacto() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <>
      <SEO
        path="/contacto"
        title={`${d.contact.title} — PIGTATTOO`}
        description={d.contact.intro}
        breadcrumbs={[{ name: d.contact.title, path: "/contacto" }]}
      />
      <PageHeader
        kicker={d.contact.kicker}
        title={d.contact.title}
        intro={d.contact.intro}
        imageSrc={headerContacto.url}
        imageAlt="Manos escribiendo en una libreta sobre un escritorio de madera, simbolizando la comunicación y el contacto con el equipo del proyecto"
      />

      <div className="container-narrow py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
          <form
            name="contacto"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm"
            aria-describedby="form-required-hint"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="hidden" name="form-name" value="contacto" />
            <p className="hidden">
              <label htmlFor="bot-field">
                No rellenar: <input id="bot-field" name="bot-field" />
              </label>
            </p>
            <p id="form-required-hint" className="text-xs text-muted-foreground">
              {d.contact.requiredHint}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-sm">
                <label htmlFor="campo-nombre" className="font-bold text-primary">
                  {d.contact.name} *
                </label>
                <input
                  required
                  type="text"
                  autoComplete="name"
                  id="campo-nombre"
                  name="nombre"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="campo-email" className="font-bold text-primary">
                  {d.contact.email} *
                </label>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  id="campo-email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="text-sm">
              <label htmlFor="campo-asunto" className="font-bold text-primary">
                {d.contact.subject} *
              </label>
              <input
                required
                type="text"
                id="campo-asunto"
                name="asunto"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="campo-mensaje" className="font-bold text-primary">
                {d.contact.message} *
              </label>
              <textarea
                required
                rows={6}
                id="campo-mensaje"
                name="mensaje"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                required
                id="campo-consentimiento"
                name="consentimiento"
                className="mt-1"
              />
              <label htmlFor="campo-consentimiento">{d.contact.consent}</label>
            </div>
            <button type="submit" className="cta">
              {d.contact.submit}
            </button>
            <p role="status" aria-live="polite" className="text-xs text-muted-foreground">
              {d.contact.successNote}
            </p>

          </form>
          <aside className="space-y-4 text-sm">
            <div className="rounded-lg border border-border bg-secondary/60 p-4">
              <h2 className="text-base font-bold text-primary">PIGTATTOO</h2>
              <p className="mt-1 text-muted-foreground">
                Coordinación del Grupo Operativo. Datos de contacto pendientes de aportar por el
                consorcio.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
