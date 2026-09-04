import { skillAreaCount, skills } from "../data/skills";
import { ArrowUpRight } from "./Icons";
import { SectionHead } from "./SectionHead";

/**
 * Matrice di riferimento, non interfaccia: nessuno stato hover, nessuna pill,
 * nessuna barra di padronanza.
 *
 * Le tecnologie portanti si distinguono per peso tipografico, mai per colore —
 * il budget dell'accento è di due occorrenze per schermata e non si spende qui.
 * La colonna Evidenza rimanda a un artefatto esterno: è l'unica parte della
 * pagina che un revisore può falsificare in trenta secondi.
 */
export function Skills() {
  return (
    <section
      id="competenze"
      aria-labelledby="competenze-title"
      className="rule-top section-pad grid-page"
    >
      <SectionHead
        index="03"
        id="competenze-title"
        title="Competenze"
        counter={`${skillAreaCount} aree`}
      />

      <div className="col-span-full lg:col-span-9 lg:col-start-4">
        <div className="grid-content border-t border-rule-strong py-3 max-lg:hidden">
          <span className="label-lg text-ink-3 lg:col-span-2">Area</span>
          <span className="label-lg text-ink-3 lg:col-span-5">Tecnologie</span>
          <span className="label-lg text-ink-3 lg:col-span-2">Evidenza</span>
        </div>

        {skills.map((row) => (
          <div key={row.category} className="reveal rule-top grid-content py-5">
            <h3 className="label text-ink-3 mb-2 lg:col-span-2 lg:mb-0 lg:pt-1">
              {row.category}
            </h3>

            <p className="text-body text-ink-2 lg:col-span-5">
              {row.items.map((item, i) => (
                <span key={item.name}>
                  {/* Spazio unificatore: il separatore resta attaccato alla
                      voce che precede e non apre mai una riga. */}
                  {i > 0 && <span className="text-ink-3">{" · "}</span>}
                  <span className={item.core ? "font-[550] text-ink" : undefined}>
                    {item.name}
                  </span>
                </span>
              ))}
            </p>

            <p className="mt-3 flex flex-col gap-1 lg:col-span-2 lg:mt-0 lg:items-end lg:pt-1">
              {row.evidence.map((ref) => (
                <a
                  key={ref.url}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-data link-rule text-ink-3 inline-flex items-center gap-1.5"
                >
                  {ref.label}
                  <ArrowUpRight />
                </a>
              ))}
            </p>
          </div>
        ))}
        <div className="rule-top" />
      </div>
    </section>
  );
}
