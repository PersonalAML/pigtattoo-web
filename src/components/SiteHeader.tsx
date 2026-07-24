import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";
import { Menu, X } from "lucide-react";

// Doc V2 §3: switcher de idioma implementado pero oculto en v1.
const SHOW_LANG_SWITCHER = false;

export function SiteHeader() {
  const lang = useLang();
  const d = getDict(lang);
  const [open, setOpen] = useState(false);
  const base = `/${lang}`;
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
        <Link to={base} className="flex items-center gap-3">
          <span
            aria-label="Logotipo PIGTATTOO (pendiente)"
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-dashed border-accent/50 bg-secondary font-display text-[9px] font-semibold uppercase tracking-tight text-accent"
          >
            LOGO
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-primary">
              PIGTATTOO
            </span>
            <span className="hidden text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
              Grupo Operativo
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-bold transition-colors ${
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
            <div className="hidden gap-1 md:flex">{/* TODO switcher */}</div>
          ) : null}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-bold lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label="Móvil" className="border-t border-border bg-background lg:hidden">
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
        </nav>
      ) : null}
    </header>
  );
}
