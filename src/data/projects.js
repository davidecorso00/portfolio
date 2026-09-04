/**
 * Due registri, non undici righe di pari dignità.
 *
 * `featured` — tre progetti aperti, con struttura Problema / Metodo / Risultato
 *   e una metric strip. Ogni metrica porta con sé il proprio denominatore:
 *   un numero senza il termine di paragone non si pubblica.
 * `index` — gli altri otto, in tabella compatta espandibile.
 *
 * I testi derivano da quanto già dichiarato dall'autore. Nessuna metrica è
 * stata dedotta, arrotondata o aggiunta.
 */

export const featured = [
  {
    id: "privacy-blurrer",
    title: "Privacy Blurrer",
    year: "2026",
    context: "Progetto MLOps — SUPSI",
    stack: ["Python", "PyTorch", "FastAPI", "React", "Docker", "MLflow"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/marcosoldani/privacy_blurrer_MLOPS" },
    problem:
      "Anonimizzare le persone presenti in un'immagine senza passare da un ritocco manuale, mantenendo il resto della scena intatto.",
    method:
      "Segmentazione semantica con U-Net su encoder ResNet34, servita via FastAPI con frontend React/Vite. Il ciclo di vita del modello è tracciato su MLflow con Model Registry, con drift detection, containerizzazione Docker e CI su GitHub Actions.",
    result:
      "La pipeline è riproducibile end-to-end e coperta da una suite di test automatici eseguita in CI a ogni push.",
    metrics: [
      { value: "37", label: "test pytest" },
      { value: "~75%", label: "coverage del pacchetto" },
    ],
    metricsNote: "Metriche di ingegneria, non di modello.",
  },
  {
    id: "battery-geis",
    title: "Battery GEIS",
    year: "2026",
    context: "Progetto MLOps — SUPSI",
    stack: ["Python", "scikit-learn", "FastAPI", "React", "Docker", "MLflow"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/marcosoldani/ml_LiBs_project" },
    problem:
      "Ricavare lo stato di invecchiamento di celle LiCoO₂ da misurazioni GEIS, partendo da un dataset del Politecnico di Milano presentato a IEEE THERMINIC 2025.",
    method:
      "Tre task distinti sullo stesso dataset: ricostruzione del segnale in Leave-One-Out, classificazione binaria young/old e regressione sull'aging. Servizio FastAPI con frontend React, tracking MLflow, drift detection, Docker e CI su GitHub Actions.",
    result:
      "I tre task condividono una sola pipeline di preprocessing e un unico registro di esperimenti, così che i risultati restino confrontabili fra loro.",
    metrics: [
      { value: "3", label: "task sullo stesso dataset" },
      { value: "LOO", label: "protocollo di validazione" },
    ],
    metricsNote:
      "Il riferimento IEEE THERMINIC 2025 è la provenienza del dataset (Politecnico di Milano), non una pubblicazione dell'autore.",
  },
  {
    id: "scraperty",
    title: "Scraperty",
    year: "2025",
    context: "CoStar Group — partnership Virginia Tech × SUPSI",
    stack: ["Python", "React", "Ollama", "LLM", "Appwrite", "Maps API"],
    source: { kind: "nda", label: "NDA — CoStar Group", url: null },
    problem:
      "Estrarre dati strutturati da pagine web eterogenee, dove ogni sito cambia struttura e un parser scritto a mano invecchia in poche settimane.",
    method:
      "Crawler dinamico che delega la comprensione della pagina a un LLM eseguito in locale con Ollama, trasformando l'HTML grezzo in JSON conforme a uno schema. L'esecuzione locale toglie di mezzo il costo per chiamata e il transito dei dati verso terzi.",
    result:
      "Rispetto a una pipeline equivalente basata su ChatGPT, il tempo di elaborazione si riduce del 91%.",
    metrics: [
      { value: "91%", label: "più veloce di una pipeline ChatGPT equivalente" },
    ],
    metricsNote: "Confronto interno al progetto; i dati di dettaglio non sono divulgabili.",
  },
];

export const index = [
  {
    id: "asset-tokenization",
    title: "Asset Tokenization dApp",
    year: "2026",
    stack: ["Solidity", "Hardhat", "React", "TypeScript"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/asset-tokenization" },
    description:
      "Piattaforma decentralizzata per tokenizzare asset reali su Ethereum. Smart contract ERC-1155 in Solidity con marketplace P2P, offerte vincolanti, distribuzione automatica dei rendimenti e governance pesata per co-proprietari. Frontend React con MetaMask, deploy su testnet Sepolia.",
  },
  {
    id: "building-segmentation",
    title: "Building Segmentation",
    year: "2025",
    stack: ["Python", "Keras", "TensorFlow", "scikit-image"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/building-segmentation" },
    description:
      "Segmentazione semantica pixel-level su immagini satellitari del Massachusetts Buildings Dataset. Approccio patch-based da 15×15 px: una CNN classifica ogni patch come edificio o sfondo, poi una sliding window sull'intera immagine produce confidence map e maschera binaria.",
  },
  {
    id: "european-restaurants",
    title: "European Restaurants",
    year: "2025",
    stack: ["Python", "Pandas", "scikit-learn", "SHAP"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/european-restaurants-analysis" },
    description:
      "Analisi di oltre un milione di ristoranti europei da TripAdvisor. EDA con mappe coropletiche, distribuzione delle stelle Michelin e correlazione fra diete e rating. Predizione del rating con Random Forest, Ridge e Bagging, con SHAP per l'interpretabilità.",
  },
  {
    id: "bundesliga",
    title: "Bundesliga Analysis",
    year: "2025",
    stack: ["Python", "Pandas", "Plotly", "Seaborn"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/bundesliga-data-analysis" },
    description:
      "Analisi esplorativa di oltre 14 000 partite di Bundesliga dal 1963 al 2009. Correlazione fra gol e punti, trend storico del punteggio, heatmap dei risultati esatti e bar chart race dei titoli vinti per stagione.",
  },
  {
    id: "fscli",
    title: "FSCLI",
    year: "2025",
    stack: ["Java", "JavaFX", "Maven", "GitLab CI"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/fscli" },
    description:
      "Simulatore di file system virtuale con CLI integrata in una GUI JavaFX. Architettura MVC a layer con pattern Observer, internazionalizzazione EN/IT e preferenze persistenti fra sessioni. Include CI/CD su GitLab e test unitari, di integrazione e di GUI con JUnit, Mockito e JavaFXTest.",
  },
  {
    id: "minesweeper",
    title: "Minesweeper JavaFX",
    year: "2025",
    stack: ["Java", "JavaFX", "FXML", "MVC"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/minesweeper" },
    description:
      "Campo minato desktop con architettura MVC a quattro layer — frontend, application, business, data. Gestione completa del gameplay, salvataggio e ripristino dello stato, rilevamento di vittoria e sconfitta, internazionalizzazione EN/IT e layout FXML con preferenze persistenti.",
  },
  {
    id: "hanoi-tower",
    title: "Hanoi Tower 3D",
    year: "2025",
    stack: ["C++", "OpenGL", "GLFW"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/hanoi-tower" },
    description:
      "Scena 3D interattiva della Torre di Hanoi in C++ e OpenGL, con ambiente navigabile, telecamere multiple ed engine di rendering scritto da zero.",
  },
  {
    id: "exam-scheduler",
    title: "Exam Scheduler",
    year: "2024",
    stack: ["C", "Dynamic Programming"],
    source: { kind: "repo", label: "GitHub", url: "https://github.com/davidecorso00/exam-scheduler" },
    description:
      "Minimizzazione del tempo totale per N esami con sistema a crediti, risolta in C con programmazione dinamica bottom-up su rolling array. Quattro versioni successive, dalla ricorsione esponenziale alla soluzione ottimale in O(N×K) tempo e O(K) spazio.",
  },
];

export const projectCount = featured.length + index.length;
