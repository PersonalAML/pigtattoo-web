import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getDict, type Lang } from "@/i18n/dictionaries";
import { CookieBanner } from "./CookieBanner";

type NavItem = { to: string; label: string };

function useNav(lang: Lang): NavItem[] {
  const d = getDict(lang);
  return [
    { to: `/${lang}`, label: d.nav.home },
    { to: `/${lang}/proyecto`, label: d.nav.project },
    { to: `/${lang}/consorcio`, label: d.nav.consortium },
    { to: `/${lang}/actividades`, label: d.nav.activities },
    { to: `/${lang}/actualidad`, label: d.nav.news },
    { to: `/${lang}/resultados`, label: d.nav.results },
    { to: `/${lang}/contacto`, label: d.nav.contact },
  ];
}

function Header({ lang }: { lang: Lang }) {
  const items = useNav(lang);
  const d = getDict(lang);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to={`/${lang}` as string} className="flex items-center gap-3">
          <span
            aria-label="Logotipo PIGTATTOO (pendiente)"
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-dashed border-accent/50 bg-gradient-to-br from-secondary to-[var(--color-salmon)]/30 font-display text-[9px] font-bold uppercase tracking-tight text-accent"
          >
            LOGO
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-primary">PIGTATTOO</span>
            <span className="hidden text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
              Grupo Operativo
            </span>
          </span>
        </Link>
        <nav aria-label={d.nav.home} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to as string}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-secondary [&.active]:text-foreground"
                  activeOptions={{ exact: n.to === `/${lang}` }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
            Menú
          </summary>
          <div className="absolute right-0 top-full mt-2 w-64 rounded-md border border-border bg-card p-2 shadow-lg">
            <ul className="flex flex-col">
              {items.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to as string}
                    className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary [&.active]:bg-secondary"
                    activeOptions={{ exact: n.to === `/${lang}` }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </header>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-primary">PIGTATTOO</h2>
          <p className="mt-2 text-sm text-muted-foreground">{d.meta.tagline}</p>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {d.footer.linksTitle}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to={`/${lang}/aviso-legal` as string} className="hover:text-accent">Aviso legal</Link></li>
            <li><Link to={`/${lang}/privacidad` as string} className="hover:text-accent">Política de privacidad</Link></li>
            <li><Link to={`/${lang}/cookies` as string} className="hover:text-accent">Política de cookies</Link></li>
            <li><Link to={`/${lang}/contacto` as string} className="hover:text-accent">{d.nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {d.footer.financingTitle}
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {d.footer.financingBody}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["MAPA", "FEADER", "UE"].map((l) => (
              <div
                key={l}
                aria-label={`Logo ${l} (pendiente)`}
                className="flex aspect-[3/2] items-center justify-center rounded-md border-2 border-dashed border-accent/40 bg-secondary text-[10px] font-bold uppercase tracking-widest text-accent"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          © {year} PIGTATTOO. {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}

export function SiteLayout({ lang, children }: { lang: Lang; children?: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <Header lang={lang} />
      <main id="main" className="flex-1">
        {children ?? <Outlet />}
      </main>
      <Footer lang={lang} />
      <CookieBanner />
    </div>
  );
}
