export const education = [
  {
    id: "supsi",
    from: "2023",
    to: "2026",
    institution: "SUPSI — DTI",
    fullName: "Scuola universitaria professionale della Svizzera italiana",
    degree: "Bachelor in Ingegneria Informatica",
    city: "Lugano, Svizzera",
    courses: [
      "Machine Learning",
      "Deep Learning & Computer Vision",
      "Machine Learning Operations",
      "Natural Language Processing",
      "Security and Privacy by Design",
      "Blockchain Engineering",
      "Software Engineering",
      "Advanced Algorithms",
    ],
  },
  {
    id: "itis",
    from: "2018",
    to: "2023",
    institution: "I.T.I.S. Magistri Cumacini",
    fullName: null,
    degree: "Diploma in Informatica e Telecomunicazioni",
    city: "Como, Italia",
    courses: [
      "Informatica",
      "Sistemi e Reti",
      "Telecomunicazioni",
      "Tecnologie e Progettazione di Sistemi",
      "Gestione Progetto",
    ],
  },
];

/**
 * Scheda sintetica in testa alla pagina: è il blocco che un HR legge nei primi
 * quaranta secondi. Contiene SOLO fatti già dichiarati altrove nel sito.
 *
 * Volutamente assenti, perché non verificabili da qui e troppo costosi da
 * sbagliare: permesso di lavoro, livelli linguistici CEFR, data esatta di
 * disponibilità. Vanno aggiunti a mano — sono le righe di maggior valore.
 */
export const factSheet = [
  { term: "Formazione", value: "Bachelor Ing. Informatica", meta: "SUPSI DTI · 2023 — 2026" },
  { term: "Focus", value: "Machine learning · MLOps · Full-stack" },
  { term: "Sede", value: "Porlezza (CO), Italia" },
  { term: "Contatto", value: "corso.davide4@gmail.com", href: "mailto:corso.davide4@gmail.com" },
];
