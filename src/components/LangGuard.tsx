import { Navigate, useParams } from "react-router-dom";
import { createContext, useContext, type ReactNode } from "react";
import { isLang, type Lang } from "@/i18n/dictionaries";

const LangContext = createContext<Lang>("es");
export const useLang = () => useContext(LangContext);

export function LangGuard({ children }: { children: ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  if (!lang || !isLang(lang)) {
    return <Navigate to="/es" replace />;
  }
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}
