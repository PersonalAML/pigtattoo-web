import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ImageFrame } from "@/components/ImageFrame";
import { getDict, isLang, type Lang } from "@/i18n/dictionaries";

export const Route = createFileRoute("/$lang/contacto")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    const d = getDict(lang);
    return {
      meta: [
        { title: `${d.contact.title} — PIGTATTOO` },
        { name: "description", content: d.contact.intro },
        { property: "og:title", content: `${d.contact.title} — PIGTATTOO` },
        { property: "og:description", content: d.contact.intro },
      ],
      links: [{ rel: "canonical", href: `/${lang}/contacto` }],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const d = getDict(lang);
  return (
    <>
      <PageHeader kicker={d.contact.kicker} title={d.contact.title} intro={d.contact.intro} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="md:col-span-2">
          {/*
            Netlify Forms: on Netlify, this form is auto-detected via
            data-netlify="true" plus the hidden form-name input. It is
            intentionally not wired to any backend in this build.
          */}
          <form
            name="contacto"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              alert(d.contact.successNote);
            }}
          >
            <input type="hidden" name="form-name" value="contacto" />
            <p className="hidden">
              <label>No rellenar: <input name="bot-field" /></label>
            </p>
            <p className="text-xs text-muted-foreground">{d.contact.requiredHint}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">{d.contact.name} *</span>
                <input
                  required
                  name="nombre"
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">{d.contact.email} *</span>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">{d.contact.subject}</span>
              <input
                name="asunto"
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">{d.contact.message} *</span>
              <textarea
                required
                name="mensaje"
                rows={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
              />
            </label>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input required type="checkbox" name="consent" className="mt-1" />
              <span>{d.contact.consent}</span>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {d.contact.submit}
            </button>
            <p className="text-xs italic text-muted-foreground">{d.contact.successNote}</p>
          </form>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-secondary/50 p-6">
            <h2 className="font-display text-lg font-semibold text-primary">PIGTATTOO</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Consorcio del Grupo Operativo Supraautonómico PIGTATTOO.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Correo</dt>
                <dd className="text-foreground">info@pigtattoo.es</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Web</dt>
                <dd className="text-foreground">pigtattoo.es</dd>
              </div>
            </dl>
          </div>
          <ImageFrame
            aspect="4/3"
            label="Mapa / ubicación pendiente"
            alt="Mapa con ubicación del consorcio"
            rounded="rounded-2xl"
          />
        </aside>
      </div>
    </>
  );
}
