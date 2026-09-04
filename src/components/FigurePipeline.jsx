/**
 * Fig. 1 — la sola illustrazione del sito.
 *
 * Due varianti invece di una compressa: a 320px di larghezza un diagramma
 * orizzontale ridurrebbe le etichette a 4px, cioè a decorazione. Il costo è
 * ~4 kB di markup duplicato e zero JavaScript.
 *
 * Entrambe le SVG sono aria-hidden: la descrizione accessibile è la didascalia,
 * che è testo vero e non una stringa alt duplicata due volte.
 */

const NODES_H = [
  { x: 0, lines: ["DATASET"] },
  { x: 166, lines: ["PREPROCESS"] },
  { x: 332, lines: ["TRAIN", "U-NET / RESNET34"], accent: true },
  { x: 498, lines: ["MODEL", "REGISTRY"] },
  { x: 664, lines: ["FASTAPI", "/predict"] },
  { x: 830, lines: ["REACT UI"] },
];

const NODES_V = [
  { y: 8, lines: ["DATASET"] },
  { y: 78, lines: ["PREPROCESS"] },
  { y: 148, lines: ["TRAIN — U-NET / RESNET34"], accent: true },
  { y: 218, lines: ["MODEL REGISTRY"] },
  { y: 288, lines: ["FASTAPI /predict"] },
  { y: 358, lines: ["REACT UI"] },
];

function Label({ x, y, lines }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="fig-label">
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 14}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="fig-arrow"
        viewBox="0 0 6 6"
        refX="5"
        refY="3"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M0 0.5 L5.5 3 L0 5.5 z" className="fig-head" />
      </marker>
    </defs>
  );
}

export function FigurePipeline() {
  return (
    <div className="reveal rule-top py-10">
      <figure>
      <div aria-hidden="true">
        {/* ---------------------------------------------------- orizzontale
            Attivo solo da 1024px: il testo di una SVG scala col viewBox, e a
            larghezze inferiori queste etichette scenderebbero sotto gli 8px. */}
        <svg viewBox="0 0 960 185" className="fig hidden w-full lg:block">
          <Defs />

          {NODES_H.map((n) => (
            <rect
              key={n.x}
              x={n.x}
              y="8"
              width="130"
              height="48"
              className={n.accent ? "fig-box fig-box--accent" : "fig-box"}
            />
          ))}

          {NODES_H.map((n) => (
            <Label
              key={`l-${n.x}`}
              x={n.x + 65}
              y={n.lines.length > 1 ? 28 : 36}
              lines={n.lines}
            />
          ))}

          {/* Flusso principale: cinque varchi da 36px */}
          {[130, 296, 462, 628, 794].map((x) => (
            <line
              key={x}
              x1={x + 4}
              y1="32"
              x2={x + 32}
              y2="32"
              className="fig-line"
              markerEnd="url(#fig-arrow)"
            />
          ))}

          {/* Osservabilità, sotto il flusso */}
          <rect x="332" y="112" width="296" height="40" className="fig-box" />
          <Label x={480} y={137} lines={["MLFLOW TRACKING · MODEL REGISTRY"]} />

          <rect x="664" y="112" width="130" height="40" className="fig-box" />
          <Label x={729} y={137} lines={["DRIFT MONITOR"]} />

          <line x1="397" y1="56" x2="397" y2="112" className="fig-line fig-line--dash" />
          <line x1="563" y1="56" x2="563" y2="112" className="fig-line fig-line--dash" />
          <line
            x1="729"
            y1="56"
            x2="729"
            y2="108"
            className="fig-line"
            markerEnd="url(#fig-arrow)"
          />

          {/* Anello di retraining */}
          <path
            d="M729 152 V172 H231 V60"
            className="fig-line"
            markerEnd="url(#fig-arrow)"
          />
          <text x="240" y="167" className="fig-label fig-label--start">
            retrain
          </text>
        </svg>

        {/* ------------------------------------------------------- verticale
            Larghezza bloccata: senza il cap, a 900px il viewBox da 320
            moltiplicherebbe le etichette per tre. */}
        <svg viewBox="0 0 320 566" className="fig w-full max-w-[360px] lg:hidden">
          <Defs />

          {NODES_V.map((n) => (
            <rect
              key={n.y}
              x="56"
              y={n.y}
              width="208"
              height="40"
              className={n.accent ? "fig-box fig-box--accent" : "fig-box"}
            />
          ))}

          {NODES_V.map((n) => (
            <Label key={`l-${n.y}`} x={160} y={n.y + 24} lines={n.lines} />
          ))}

          {[48, 118, 188, 258, 328].map((y) => (
            <line
              key={y}
              x1="160"
              y1={y + 4}
              x2="160"
              y2={y + 26}
              className="fig-line"
              markerEnd="url(#fig-arrow)"
            />
          ))}

          <rect x="56" y="438" width="208" height="40" className="fig-box" />
          <Label x={160} y={462} lines={["MLFLOW TRACKING"]} />

          <rect x="56" y="508" width="208" height="40" className="fig-box" />
          <Label x={160} y={532} lines={["DRIFT MONITOR"]} />

          {/* Due rail paralleli sulla destra: non si incrociano mai */}
          <path d="M264 168 H284 V458 H268" className="fig-line fig-line--dash" />
          <path d="M264 308 H300 V528 H268" className="fig-line fig-line--dash" />

          {/* Anello di retraining sul rail sinistro */}
          <path d="M56 528 H32 V98 H52" className="fig-line" markerEnd="url(#fig-arrow)" />
          <text
            transform="rotate(-90 20 300)"
            x="20"
            y="300"
            textAnchor="middle"
            className="fig-label"
          >
            retrain
          </text>
        </svg>
      </div>

      <figcaption className="text-small text-ink-3 mt-5 max-w-[72ch]">
        <span className="mono text-ink">Fig. 1</span> — Pipeline di Privacy
        Blurrer. Il dataset attraversa preprocessing, addestramento della U-Net su
        encoder ResNet34 e registrazione del modello, per essere poi servito da
        FastAPI e consumato dall'interfaccia React. MLflow traccia esperimenti e
        versioni; il monitor di drift osserva le richieste in ingresso e, quando la
        distribuzione si allontana da quella di addestramento, riporta il ciclo al
        preprocessing per il riaddestramento.
      </figcaption>
      </figure>
    </div>
  );
}
