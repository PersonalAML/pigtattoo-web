import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

export default function NotFound() {
  const lang = useLang();
  const d = getDict(lang);
  return (
    <div className="container-narrow py-24 text-center">
      <Helmet>
        <title>404 — PIGTATTOO</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="text-6xl">404</h1>
      <p className="mt-4 text-muted-foreground">Página no encontrada.</p>
      <Link to={`/${lang}`} className="cta mt-8 inline-flex">
        {d.misc.backHome}
      </Link>
    </div>
  );
}
