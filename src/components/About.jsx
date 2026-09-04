import { SectionHead } from "./SectionHead";

const NOW = [
  { term: "Ora", value: "Ultimo anno di Bachelor, SUPSI DTI" },
  { term: "Cerco", value: "Una posizione in ambito AI/ML in Svizzera" },
  { term: "Da", value: "Conclusione del bachelor, 2026" },
];

export function About() {
  return (
    <section
      id="profilo"
      aria-labelledby="profilo-title"
      className="rule-top section-pad grid-page"
    >
      <SectionHead
        index="01"
        id="profilo-title"
        title="Profilo"
        counter="SUPSI DTI · 2023 — 2026"
      />

      <div className="reveal col-span-full lg:col-span-6 lg:col-start-4">
        <div className="max-w-[62ch] text-body text-ink-2">
          <p className="mb-4">
            Studio Ingegneria Informatica alla{" "}
            <strong className="font-[550] text-ink">SUPSI</strong>, a Lugano, e vengo
            da Porlezza, sul lago di Como. Gli ultimi due anni li ho passati quasi
            interamente su machine learning e MLOps.
          </p>
          <p className="mb-4">
            Il lavoro che mi interessa sta fra il modello e il sistema: prendere una
            rete che funziona dentro un notebook e portarla dove qualcuno la può
            davvero usare — un'API, un container, una pipeline che si riaddestra e
            si accorge quando i dati cambiano.
          </p>
          <p className="mb-4">
            Non ho lavorato solo su machine learning: smart contract in Solidity,
            applicazioni desktop in Java con test di interfaccia, rendering 3D in C++
            e OpenGL, programmazione dinamica in C. Serve a capire quanto costa
            davvero una scelta tecnica prima di prenderla.
          </p>
          <p className="text-small text-ink-3">
            Fuori dal codice: palestra, Formula 1, calcio, e discussioni di economia
            e attualità.
          </p>
        </div>
      </div>

      <dl className="reveal col-span-full mt-10 self-start bg-paper-2 px-5 py-1 lg:col-span-3 lg:col-start-10 lg:mt-0">
        {NOW.map((row) => (
          <div key={row.term} className="border-t border-rule py-4 first:border-t-0">
            <dt className="label text-ink-3">{row.term}</dt>
            <dd className="text-small text-ink mt-1.5">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
