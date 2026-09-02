import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useLang } from "@/components/LangGuard";
import { getDict, LANGS, type Lang } from "@/i18n/dictionaries";
import { Menu, X } from "lucide-react";
import logoPigtattoo from "@/assets/logo-pigtattoo.svg";


// Traducciones ca/en completas: el switcher de idioma ya está disponible.
const SHOW_LANG_SWITCHER = true;


export function SiteHeader() {
  const lang = useLang();
  const d = getDict(lang);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const base = `/${lang}`;
  const rest = location.pathname.replace(/^\/(es|ca|en)/, "");
  const langLabel: Record<Lang, string> = {
    es: d.a11y.languageEs,
    ca: d.a11y.languageCa,
    en: d.a11y.languageEn,
  };
  const items = [
    { to: `${base}`, label: d.nav.home, end: true },
    { to: `${base}/proyecto`, label: d.nav.project },
    { to: `${base}/consorcio`, label: d.nav.consortium },
    { to: `${base}/actividades`, label: d.nav.activities },
    { to: `${base}/actualidad`, label: d.nav.news },
    { to: `${base}/resultados`, label: d.nav.results },
    { to: `${base}/contacto`, label: d.nav.contact },
  ];


  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-narrow flex items-center justify-between gap-4 py-3">
        <Link to={base} className="flex items-center gap-3" aria-label={d.a11y.homeLink}>
          <img
            src={logoPigtattoo}
            alt="PIGTATTOO"
            className="h-9 w-auto md:h-10"
            width={1200}
            height={400}
          />
          <span className="hidden text-[10px] uppercase leading-tight tracking-wider text-muted-foreground sm:block">
            {d.a11y.brandLine1}
            <br />
            {d.a11y.brandLine2}
          </span>
        </Link>


        <nav aria-label={d.a11y.navPrimary} className="hidden lg:block">

          <ul className="flex items-center gap-1">
            {items.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-center text-sm font-bold leading-tight transition-colors ${
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {SHOW_LANG_SWITCHER ? (
            <nav aria-label={d.a11y.languageSwitcher} className="hidden md:block">
              <ul className="flex items-center gap-1">
                {LANGS.map((l) => (
                  <li key={l}>
                    <Link
                      to={`/${l}${rest}`}
                      hrefLang={l}
                      aria-current={l === lang ? "true" : undefined}
                      className={`rounded-md px-2 py-1.5 text-xs font-bold uppercase transition-colors ${
                        l === lang
                          ? "bg-secondary text-foreground"
                          : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="sr-only">{langLabel[l]}</span>
                      <span aria-hidden="true">{l}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-bold lg:hidden"
            aria-label={d.a11y.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label={d.a11y.navMobile} className="border-t border-border bg-background lg:hidden">

          <ul className="container-narrow flex flex-col py-2">
            {items.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm ${
                      isActive ? "bg-secondary text-foreground" : "text-foreground/85 hover:bg-secondary"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {SHOW_LANG_SWITCHER ? (
            <ul
              className="container-narrow flex gap-2 border-t border-border py-3 md:hidden"
              aria-label={d.a11y.languageSwitcher}
            >
              {LANGS.map((l) => (
                <li key={l}>
                  <Link
                    to={`/${l}${rest}`}
                    hrefLang={l}
                    onClick={() => setOpen(false)}
                    aria-current={l === lang ? "true" : undefined}
                    className={`inline-block rounded-md px-3 py-2 text-xs font-bold uppercase ${
                      l === lang ? "bg-secondary text-foreground" : "text-foreground/70 hover:bg-secondary"
                    }`}
                  >
                    <span className="sr-only">{langLabel[l]}</span>
                    <span aria-hidden="true">{l}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>

      ) : null}
    </header>
  );
}
