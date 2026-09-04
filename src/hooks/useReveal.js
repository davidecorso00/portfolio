import { useEffect } from "react";

/**
 * Comparsa a scroll senza un solo re-render di React: l'observer scrive
 * direttamente la classe sul nodo e smette di osservarlo al primo ingresso.
 *
 * threshold 0 e non una frazione: un blocco più alto del viewport non
 * raggiungerebbe mai una soglia percentuale e resterebbe invisibile per sempre.
 *
 * Il margine superiore enorme non è un trucco: serve a coprire il contenuto
 * SUPERATO senza mai intersecare — atterraggio su un anchor (#contatti),
 * ripristino della posizione di scroll al reload, ricerca del browser che
 * salta a metà pagina. In quei casi l'elemento passa da "sotto il viewport" a
 * "sopra il viewport" restando sempre non-intersecante: isIntersecting non
 * cambia mai valore e il callback non viene MAI invocato. Estendendo la radice
 * verso l'alto, tutto ciò che sta sopra risulta intersecante e viene mostrato
 * subito, mentre il margine inferiore negativo continua a regolare l'ingresso
 * di ciò che sta sotto.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "999999px 0px -12% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}
