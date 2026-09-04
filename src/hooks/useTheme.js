import { useCallback, useEffect, useState } from "react";

const KEY = "theme";

function read() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Il valore iniziale è già sul documento: lo scrive lo script pre-paint in
 * index.html, prima del primo frame. Qui non si decide nulla al mount, si
 * legge — altrimenti si reintrodurrebbe il lampo di tema sbagliato.
 */
export function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* modalità privata o storage pieno: il tema resta valido per la sessione */
    }
  }, [theme]);

  // Segue le preferenze di sistema finché l'utente non ha scelto esplicitamente.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem(KEY);
      } catch {
        /* ignora */
      }
      if (!stored) setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return { theme, toggle };
}
