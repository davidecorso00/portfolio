import { useEffect, useRef, useState } from "react";

/**
 * Sostituisce il listener di scroll con una sentinella alta 1px in cima al
 * documento: due aggiornamenti di stato per sessione invece di centinaia.
 */
export function useScrolled() {
  const sentinel = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return { sentinel, scrolled };
}
