import { useCopy } from "../hooks/useCopy";
import { ArrowUpRight } from "./Icons";
import { SectionHead } from "./SectionHead";

const EMAIL = "corso.davide4@gmail.com";

const LINKS = [
  { label: "GitHub", url: "https://github.com/davidecorso00" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/davidecorso04/" },
];

export function Contact() {
  const { copied, copy } = useCopy();

  return (
    <section
      id="contatti"
      aria-labelledby="contatti-title"
      className="rule-top section-pad grid-page"
    >
      <SectionHead index="05" id="contatti-title" title="Contatti" />

      <div className="reveal col-span-full lg:col-span-6 lg:col-start-4">
        <p className="max-w-[46ch] text-lead text-ink-2">
          <span className="text-ink">
            Cerco una posizione in ambito AI/ML in Svizzera
          </span>
          , a partire dalla conclusione del bachelor nel 2026.
        </p>

        {/* La larghezza del bottone è riservata: passando a "Copiato" la riga
            non si deve spostare. */}
        <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <a
            href={`mailto:${EMAIL}`}
            className="t-h2 text-email link-rule text-ink break-all"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={() => copy(EMAIL)}
            className="label text-ink-3 hover:text-ink min-w-[7ch] cursor-pointer text-left transition-colors duration-[var(--dur-micro)]"
          >
            {copied ? "Copiato" : "Copia"}
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? "Indirizzo email copiato negli appunti" : ""}
          </span>
        </div>
      </div>

      <ul className="reveal col-span-full mt-10 lg:col-span-2 lg:col-start-11 lg:mt-0">
        {LINKS.map((link) => (
          <li key={link.url} className="border-t border-rule">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-ink-2 hover:text-ink flex items-center justify-between gap-3 py-4 transition-colors duration-[var(--dur-micro)]"
            >
              {link.label}
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
