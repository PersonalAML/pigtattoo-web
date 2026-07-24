import { SEO } from "@/components/SEO";
import { PageHeader } from "@/components/PageHeader";
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
      />
      <PageHeader
        kicker={d.contact.kicker}
        title={d.contact.title}
        intro={d.contact.intro}
      />
      <div className="container-narrow py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
          <form
            name="contacto"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="hidden" name="form-name" value="contacto" />
            <p className="hidden">
              <label>
                No rellenar: <input name="bot-field" />
              </label>
            </p>
            <p className="text-xs text-muted-foreground">{d.contact.requiredHint}</p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="font-bold text-primary">{d.contact.name} *</span>
                <input
                  required
                  type="text"
                  name="nombre"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="font-bold text-primary">{d.contact.email} *</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="font-bold text-primary">{d.contact.subject} *</span>
              <input
                required
                type="text"
                name="asunto"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm">
              <span className="font-bold text-primary">{d.contact.message} *</span>
              <textarea
                required
                rows={6}
                name="mensaje"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" required name="consentimiento" className="mt-1" />
              <span>{d.contact.consent}</span>
            </label>
            <button type="submit" className="cta">
              {d.contact.submit}
            </button>
            <p className="text-xs text-muted-foreground">{d.contact.successNote}</p>
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
