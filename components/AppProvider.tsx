"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Locale, type MessageKey } from "@/lib/i18n";

type Theme = "light" | "dark";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: MessageKey) => string;
};

const AppContext = createContext<Ctx | null>(null);

// localStorage can throw (private mode etc.), so every access is wrapped.
function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uz");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const l = read("idrok-locale");
    if (l === "uz" || l === "ru") setLocaleState(l);
    const th = read("idrok-theme");
    if (th === "dark" || th === "light") setTheme(th);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = locale;
  }, [theme, locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    write("idrok-locale", l);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      write("idrok-theme", next);
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, theme, toggleTheme, t: (key) => messages[locale][key] }),
    [locale, setLocale, theme, toggleTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
