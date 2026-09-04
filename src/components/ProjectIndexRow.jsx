import { ArrowUpRight, PlusMinus } from "./Icons";

/**
 * Riga di indice espandibile.
 *
 * Il link al repository sta DENTRO il pannello, mai dentro il bottone: un
 * elemento interattivo annidato in un altro è HTML non valido e rompe la
 * navigazione da tastiera. La cella FONTE mostra solo testo.
 *
 * Il pannello resta sempre nel DOM — indicizzabile e raggiungibile con Cmd+F —
 * e si apre con una transizione su grid-template-rows, senza misurare altezze
 * in JavaScript.
 */
export function ProjectIndexRow({ project, n, open, onToggle }) {
  const { id, title, year, stack, source, description } = project;
  const panelId = `progetto-${id}`;

  return (
    <div className="rule-top group">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="grid-content min-h-16 w-full cursor-pointer py-5 text-left transition-colors duration-[var(--dur-hover)] hover:bg-paper-2"
        >
          <span className="num text-data text-ink-3 hidden lg:block">
            {String(n).padStart(2, "0")}
          </span>

          <span className="num text-data text-ink-3 hidden lg:block">{year}</span>

          <span className="t-title block text-body text-ink lg:col-span-3">
            {title}
            <span className="num text-data text-ink-3 ml-3 lg:hidden">{year}</span>
          </span>

          <span className="mono text-data text-ink-3 mt-2 block lg:col-span-3 lg:mt-0">
            {stack.join(" · ")}
          </span>

          <span className="mt-3 flex items-center justify-between gap-3 lg:col-span-1 lg:mt-0 lg:justify-end">
            <span className="label text-ink-3">
              {source.kind === "nda" ? "NDA" : "GitHub"}
            </span>
            <span className="text-ink-3 group-hover:text-ink">
              <PlusMinus open={open} />
            </span>
          </span>
        </button>
      </h3>

      <div id={panelId} className="panel" data-open={open ? "true" : "false"}>
        <div>
          <div className="grid-content pb-8">
            <div className="lg:col-span-6 lg:col-start-3">
              <p className="max-w-[72ch] text-small text-ink-2">{description}</p>
              {source.url && (
                <p className="mt-4">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="label link-rule text-ink inline-flex items-center gap-2"
                  >
                    Codice sorgente
                    <ArrowUpRight />
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
