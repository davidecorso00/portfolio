import { factSheet } from "../data/education";
import { ArrowDown, ArrowUpRight } from "./Icons";

/**
 * L'hero non contiene animazioni e non fa reveal: è già visibile al primo
 * paint, animarlo servirebbe solo a ritardarlo.
 *
 * svh e non vh: su mobile 100vh misura la finestra senza la chrome del
 * browser, e spinge la prima riga di contenuto sotto la piega.
 * 88 e non 100: il filetto e l'inizio della sezione successiva devono
 * affiorare, così l'indicatore "scroll" diventa superfluo.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="grid-page min-h-[min(88svh,900px)] content-center pt-[calc(var(--nav-h)+clamp(3rem,10vw,7rem))] pb-16"
    >
      <div className="col-span-full lg:col-span-8">
        <h1 id="hero-name" className="t-display text-display text-ink">
          Davide
          <br />
          Corso
        </h1>
      </div>

      {/* La scheda: è il blocco che cambia il comportamento di chi seleziona
          in quaranta secondi, e quasi nessun altro candidato la pubblica. */}
      <dl className="col-span-full mt-10 self-end lg:col-span-4 lg:mt-0">
        {factSheet.map((row) => (
          <div key={row.term} className="border-t border-rule py-3.5">
            <dt className="label text-ink-3">{row.term}</dt>
            {/* Etichetta sopra, valore sotto: allineare i due su una riga sola
                manderebbe a capo i valori lunghi in modo irregolare. */}
            <dd className="text-data mono text-ink mt-1.5">
              {row.href ? (
                <a href={row.href} className="link-rule">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
              {row.meta && <span className="text-ink-3 block">{row.meta}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <div className="col-span-full mt-14 border-t border-rule pt-8" />

      <p className="col-span-full max-w-[46ch] text-lead text-ink-2 lg:col-span-7">
        <span className="text-ink">
          Costruisco sistemi di machine learning completi
        </span>
        , dal modello all'API che lo serve: esperimenti tracciati, servizi
        containerizzati, test automatici in integrazione continua. Ultimo anno
        di ingegneria informatica alla SUPSI.
      </p>

      <div className="col-span-full mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
        <a href="#progetti" className="label link-rule text-ink flex items-center gap-2">
          Indice dei progetti
          <ArrowDown />
        </a>
        <a
          href="https://github.com/davidecorso00"
          target="_blank"
          rel="noopener noreferrer"
          className="label link-rule text-ink-2 flex items-center gap-2"
        >
          GitHub
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
