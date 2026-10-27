import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { isLanguage, languageStorageKey, translate, type Language } from "@/config/translations";

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string }>({ language: "en", setLanguage: () => {}, t: text => text });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("en");
  useEffect(() => {
    try { const saved = localStorage.getItem(languageStorageKey); if (isLanguage(saved)) updateLanguage(saved); } catch { /* Selection works without storage. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  function setLanguage(next: Language) {
    updateLanguage(next);
    try { localStorage.setItem(languageStorageKey, next); } catch { /* Selection still works for this page. */ }
  }
  return <LanguageContext.Provider value={{ language, setLanguage, t: text => translate(language, text) }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }