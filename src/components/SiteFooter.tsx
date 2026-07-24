import { Link } from "react-router-dom";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { LogoFrame } from "@/components/ImageFrame";

export function SiteFooter() {
  const lang = useLang();
  const d = getDict(lang);
  const base = `/${lang}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-primary text-primary-foreground">
      <div className="container-narrow py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold">PIGTATTOO</h2>
            <p className="mt-2 text-sm text-primary-foreground/80">{d.meta.tagline}</p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              {d.footer.financingTitle}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-primary-foreground/75">
              {d.footer.financingBody}
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {["MAPA", "FEADER", "PEPAC", "UE"].map((tag) => (
                <div key={tag} className="aspect-square">
                  <LogoFrame label={tag} />
                </div>
              ))}
            </div>
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
