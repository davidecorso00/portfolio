import { ArrowUpRight } from "./Icons";

/**
 * Riga piena, non card: nessun bordo chiuso, nessun raggio, nessuna ombra.
 *
 * La struttura Problema / Metodo / Risultato è fissa e identica sui tre
 * progetti: è la ripetizione a rendere il blocco leggibile in diagonale.
 */
export function ProjectFeatured({ project }) {
  const { title, year, context, stack, source, problem, method, result, metrics, metricsNote } =
    project;

  return (
    <article className="reveal rule-top grid-content py-10">
      {/* Colonna dei metadati: tutto ciò che si legge senza leggere. */}
      <div className="mb-6 lg:col-span-3 lg:mb-0">
        <p className="num text-data text-ink">{year}</p>
        <p className="text-small text-ink-3 mt-1">{context}</p>

        <ul className="mt-5 border-t border-rule pt-3">
          {stack.map((tech) => (
            <li key={tech} className="mono text-data text-ink-3 leading-6">
              {tech}
            </li>
          ))}
        </ul>

        <p className="label text-ink-3 mt-5 border-t border-rule pt-3">
          {source.kind === "nda" ? source.label : "Repository pubblico"}
        </p>
      </div>

      <div className="lg:col-span-6">
        <h3 className="t-title text-title text-ink">{title}</h3>

        <dl className="mt-5 max-w-[72ch]">
          {[
            ["Problema", problem],
            ["Metodo", method],
            ["Risultato", result],
          ].map(([term, text]) => (
            <div key={term} className="mt-4 first:mt-0">
              <dt className="label text-ink-3 mb-1.5">{term}</dt>
              <dd className="text-small text-ink-2">{text}</dd>
            </div>
          ))}
        </dl>

        {/* Nessuno slot vuoto da riempire: se un progetto ha una sola metrica
            vera, si mostra una cella sola. */}
        <div className="mt-7 flex flex-wrap gap-x-12 gap-y-5 border-t border-rule pt-5">
          {metrics.map((m) => (
            <div key={m.label} className="max-w-[24ch]">
              <p className="num text-title text-ink">{m.value}</p>
              <p className="label text-ink-3 mt-1.5">{m.label}</p>
            </div>
          ))}
        </div>

        {metricsNote && (
          <p className="text-small text-ink-3 mt-4 max-w-[72ch]">{metricsNote}</p>
        )}

        {source.url && (
          <p className="mt-6">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label link-rule text-ink inline-flex items-center gap-2"
            >
              Codice sorgente
              <ArrowUpRight />
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
