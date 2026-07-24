import { useEffect, useState } from "react";

const CONSENT_KEY = "pigtattoo.consent.v1";
const PRODUCTION_HOST = "pigtattoo.es";
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: replace with real GA4 ID at go-live

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

function writeConsent(v: Exclude<Consent, null>) {
  window.localStorage.setItem(CONSENT_KEY, v);
}

function isProductionHost(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === PRODUCTION_HOST;
}

function loadGA() {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __pigtattooGaLoaded?: boolean;
  };
  if (w.__pigtattooGaLoaded) return;
  w.__pigtattooGaLoaded = true;
  w.dataLayer = w.dataLayer || [];
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    (w.dataLayer as unknown[]).push(arguments);
  }
  w.gtag = gtag as (...args: unknown[]) => void;
  w.gtag("js", new Date());
  w.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = readConsent();
    setConsent(v);
    setReady(true);
    if (v === "granted" && isProductionHost()) {
      loadGA();
    }
  }, []);

  if (!ready || consent !== null) return null;

  const accept = () => {
    writeConsent("granted");
    setConsent("granted");
    if (isProductionHost()) loadGA();
  };
  const reject = () => {
    writeConsent("denied");
    setConsent("denied");
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl leading-relaxed">
          Utilizamos cookies analíticas (Google Analytics 4) sólo si aceptas su uso.
          Puedes revisar los detalles en la{" "}
          <a href="/es/cookies" className="underline underline-offset-2 hover:text-accent">
            política de cookies
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={reject} className="cta-outline text-xs">
            Rechazar
          </button>
          <button type="button" onClick={accept} className="cta text-xs">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConsentControls() {
  const [consent, setConsent] = useState<Consent>(null);
  useEffect(() => setConsent(readConsent()), []);
  const reset = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CONSENT_KEY);
      setConsent(null);
      window.location.reload();
    }
  };
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-sm">
      <p>
        Preferencia actual:{" "}
        <strong>
          {consent === "granted" ? "Aceptadas" : consent === "denied" ? "Rechazadas" : "Sin decidir"}
        </strong>
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      >
        Restablecer preferencias
      </button>
    </div>
  );
}
