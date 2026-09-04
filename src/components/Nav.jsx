import { useCallback, useEffect, useRef } from "react";

/**
 * Navigazione fissa.
 *
 * Le voci sono ancore vere, non handler di scroll: seguono lo
 * scroll-behavior del CSS, quindi rispettano prefers-reduced-motion senza
 * codice dedicato, si aprono in una nuova scheda e funzionano senza JS.
 *
 * Da scrollata il fondo diventa OPACO, non traslucido: niente backdrop-filter,
 * che è glassmorphism, promuove un layer a metà scroll e su Safari mobile
 * produce lo scatto della barra.
 */
export function Nav({ items, active, scrolled, menuOpen, setMenuOpen, theme, onToggleTheme }) {
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  const close = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  // Allargando la finestra il pannello mobile resterebbe aperto e ricomparirebbe
  // da solo: lo stato va riallineato al breakpoint, non solo al click.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 45rem)");
    const onChange = (e) => e.matches && close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector("a, button")?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll("a, button");
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target)) return;
      if (toggleRef.current?.contains(e.target)) return;
      close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen, close]);

  const themeLabel =
    theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro";

  return (
    <nav
      className={`no-print fixed inset-x-0 top-0 z-100 h-[var(--nav-h)] transition-colors duration-200 ${
        scrolled ? "border-b border-rule bg-paper" : "border-b border-transparent"
      }`}
      aria-label="Navigazione principale"
    >
      <div className="grid-page h-full items-center">
        <div className="col-span-full flex h-full items-center justify-between gap-6">
          <a href="#top" className="label text-ink shrink-0" aria-label="Torna in cima">
            DC
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {items.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={on ? "true" : undefined}
                    className={`label flex items-center gap-2 transition-colors duration-[var(--dur-micro)] ${
                      on ? "text-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {/* Lo spazio del quadrato è sempre riservato: l'indicatore
                        non deve provocare reflow entrando e uscendo. */}
                    <span
                      aria-hidden="true"
                      className={`size-1.5 shrink-0 ${on ? "bg-accent" : "bg-transparent"}`}
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={themeLabel}
              className="label text-ink-3 flex items-center gap-1.5"
            >
              <span className={theme === "light" ? "text-ink" : ""}>Chiaro</span>
              <span aria-hidden="true">·</span>
              <span className={theme === "dark" ? "text-ink" : ""}>Scuro</span>
            </button>

            <button
              ref={toggleRef}
              type="button"
              className="label text-ink md:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? "Chiudi" : "Indice"}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="menu-mobile"
          ref={panelRef}
          className="absolute inset-x-0 top-full border-b border-rule bg-paper md:hidden"
        >
          <ul className="grid-page py-2">
            {items.map((item) => (
              <li key={item.id} className="col-span-full border-t border-rule first:border-t-0">
                <a
                  href={`#${item.id}`}
                  onClick={close}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block py-4 text-lead ${
                    active === item.id ? "text-ink" : "text-ink-2"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
