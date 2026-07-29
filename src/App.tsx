import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieBanner } from "@/components/CookieBanner";
import { LangGuard } from "@/components/LangGuard";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Proyecto from "@/pages/Proyecto";
import Consorcio from "@/pages/Consorcio";
import Actividades from "@/pages/Actividades";
import ActualidadList from "@/pages/ActualidadList";
import ActualidadDetalle from "@/pages/ActualidadDetalle";
import Resultados from "@/pages/Resultados";
import Contacto from "@/pages/Contacto";
import Accesibilidad from "@/pages/Accesibilidad";
import AvisoLegal from "@/pages/AvisoLegal";
import Privacidad from "@/pages/Privacidad";
import Cookies from "@/pages/Cookies";
import NotFound from "@/pages/NotFound";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PIGTATTOO",
  description:
    "Grupo Operativo Supraautonómico para el desarrollo de sistemas de identificación porcina por tatuaje.",
  url: "/",
};

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido principal
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="proyecto" element={<Proyecto />} />
          <Route path="consorcio" element={<Consorcio />} />
          <Route path="actividades" element={<Actividades />} />
          <Route path="actualidad" element={<ActualidadList />} />
          <Route path="actualidad/:slug" element={<ActualidadDetalle />} />
          <Route path="resultados" element={<Resultados />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="accesibilidad" element={<Accesibilidad />} />
          <Route path="aviso-legal" element={<AvisoLegal />} />
          <Route path="privacidad" element={<Privacidad />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Helmet>
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route
          path="/:lang/*"
          element={
            <LangGuard>
              <Layout />
            </LangGuard>
          }
        />
        <Route path="*" element={<Navigate to="/es" replace />} />
      </Routes>
    </>
  );
}
