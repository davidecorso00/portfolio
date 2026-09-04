import { useEffect, useState } from "react";

/**
 * Sezione attiva nella navigazione, senza listener di scroll.
 *
 * La banda -45%/-55% lascia scoperta una sola riga di pixel a metà schermo:
 * una e una sola sezione può intersecarla, quindi non serve arbitrare fra più
 * entry — che è ciò che faceva sfarfallare la versione precedente.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { threshold: 0, rootMargin: "-45% 0px -55% 0px" }
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
