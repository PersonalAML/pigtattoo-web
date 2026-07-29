import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function NotFound() {
  const lang = useLang();
  const d = getDict(lang);
  const base = `/${lang}`;
  const links = [
    { to: `${base}/proyecto`, label: d.nav.project },
    { to: `${base}/actividades`, label: d.nav.activities },
    { to: `${base}/actualidad`, label: d.nav.news },
    { to: `${base}/consorcio`, label: d.nav.consortium },
    { to: `${base}/contacto`, label: d.nav.contact },
  ];
  return (
    <div className="container-narrow max-w-2xl py-24 text-center">
      <Helmet>
        <html lang={lang} />
        <title>404 — PIGTATTOO</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="font-display text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-primary">
        {d.misc.notFoundTitle}
      </h1>
      <p className="mt-3 text-muted-foreground">{d.misc.notFoundBody}</p>
      <Link to={base} className="cta mt-8 inline-flex">
        {d.misc.backHome}
      </Link>
      <nav aria-label={d.misc.notFoundLinks} className="mt-10">
        <h2 className="text-sm font-semibold text-primary">{d.misc.notFoundLinks}</h2>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-primary underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
