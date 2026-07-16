import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "sr" | "ru";

export const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "sr", label: "SR", name: "Srpski" },
  { code: "ru", label: "RU", name: "Русский" },
];

type Dict = Record<string, string>;
const translations: Record<Language, Dict> = {
  en: {
    "nav.gallery": "Gallery",
    "nav.amenities": "Amenities",
    "nav.location": "Location",
    "nav.reviews": "Reviews",
    "nav.faq": "FAQ",
    "nav.book": "Book now",
    "nav.language": "Language",
    "common.brand": "Lucia's",
  },
  sr: {
    "nav.gallery": "Galerija",
    "nav.amenities": "Sadržaji",
    "nav.location": "Lokacija",
    "nav.reviews": "Recenzije",
    "nav.faq": "Pitanja",
    "nav.book": "Rezerviši",
    "nav.language": "Jezik",
    "common.brand": "Lucia's",
  },
  ru: {
    "nav.gallery": "Галерея",
    "nav.amenities": "Удобства",
    "nav.location": "Локация",
    "nav.reviews": "Отзывы",
    "nav.faq": "Вопросы",
    "nav.book": "Забронировать",
    "nav.language": "Язык",
    "common.brand": "Lucia's",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = "app.language";

function readStored(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "sr" || stored === "ru" ? stored : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch {
      /* ignore */
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key: string) => translations[language][key] ?? translations.en[key] ?? key,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
