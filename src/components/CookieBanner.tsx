import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/components/LangGuard";
import { getDict } from "@/i18n/dictionaries";

const CONSENT_KEY = "pigtattoo.consent.v1";
const PRODUCTION_HOST = "pigtattoo.es";
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: sustituir por el ID real de GA4 al ir a producción

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
  const lang = useLang();
  const d = getDict(lang);
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = readConsent();
    setConsent(v);
    setReady(true);
    if (v === "granted" && isProductionHost()) loadGA();
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
      aria-label={d.cookies.title}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur"
    >
      <div className="container-narrow flex flex-col gap-3 py-4 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl leading-relaxed">
          {d.cookies.banner}{" "}
          <Link to={`/${lang}/cookies`} className="underline underline-offset-2 hover:text-accent">
            {d.cookies.title}
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={reject} className="cta-outline text-xs">
            {d.cookies.reject}
          </button>
          <button type="button" onClick={accept} className="cta text-xs">
            {d.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConsentControls() {
  const lang = useLang();
  const d = getDict(lang);
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
        {d.cookies.current}:{" "}
        <strong>
          {consent === "granted" ? d.cookies.granted : consent === "denied" ? d.cookies.denied : d.cookies.unset}
        </strong>
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
      >
        {d.cookies.resetButton}
      </button>
    </div>
  );
}
