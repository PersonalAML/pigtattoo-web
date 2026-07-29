import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Lleva la ventana al inicio de la página en cada cambio de ruta.
 * Si la URL incluye un ancla (#id), hace scroll a ese elemento.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash]);

  return null;
}
