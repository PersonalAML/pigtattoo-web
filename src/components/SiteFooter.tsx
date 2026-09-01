import { Link } from "react-router-dom";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import logosFinanciacion from "@/assets/logos-financiacion.jpg.asset.json";

export function SiteFooter() {
  const lang = useLang();
  const d = getDict(lang);
  const base = `/${lang}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-primary text-primary-foreground">
      <div className="container-narrow py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              {d.footer.financingTitle}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-primary-foreground/75">
              {d.footer.financingBody}
            </p>
            <ul className="mt-3 space-y-1 text-xs leading-relaxed text-primary-foreground/75">
              {d.footer.financingFigures.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <img
              src={logosFinanciacion.url}
              alt="Cofinanciado por la Unión Europea. Gobierno de España — Ministerio de Agricultura, Pesca y Alimentación"
              loading="lazy"
              decoding="async"
              className="mt-4 w-full max-w-lg rounded-sm bg-card"
            />
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              {d.footer.linksTitle}
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link to={`${base}/aviso-legal`} className="text-primary-foreground/85 hover:text-accent">
                  {d.legal.noticeTitle}
                </Link>
              </li>
              <li>
                <Link to={`${base}/privacidad`} className="text-primary-foreground/85 hover:text-accent">
                  {d.legal.privacyTitle}
                </Link>
              </li>
              <li>
                <Link to={`${base}/cookies`} className="text-primary-foreground/85 hover:text-accent">
                  {d.cookies.title}
                </Link>
              </li>
              <li>
                <Link to={`${base}/accesibilidad`} className="text-primary-foreground/85 hover:text-accent">
                  {d.legal.accessibilityTitle}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-primary-foreground/15 pt-4 text-xs text-primary-foreground/70">
          © {year} PIGTATTOO — {d.footer.rights}
        </div>
      </div>
    </footer>
  );
}
