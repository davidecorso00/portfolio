/**
 * Matrice di competenze, non nuvola di tag.
 *
 * `core: true` marca le cinque tecnologie portanti del profilo: si distinguono
 * per peso tipografico, mai per colore.
 * `evidence` punta a un artefatto ESTERNO — un repository in cui quella
 * categoria è effettivamente usata — non a un paragrafo di questo sito.
 * Ogni riferimento è ricavato dai tag dichiarati sui progetti.
 */

const REPO = {
  privacyBlurrer: "https://github.com/marcosoldani/privacy_blurrer_MLOPS",
  batteryGeis: "https://github.com/marcosoldani/ml_LiBs_project",
  fscli: "https://github.com/davidecorso00/fscli",
  examScheduler: "https://github.com/davidecorso00/exam-scheduler",
  hanoi: "https://github.com/davidecorso00/hanoi-tower",
  minesweeper: "https://github.com/davidecorso00/minesweeper",
  restaurants: "https://github.com/davidecorso00/european-restaurants-analysis",
  bundesliga: "https://github.com/davidecorso00/bundesliga-data-analysis",
  tokenization: "https://github.com/davidecorso00/asset-tokenization",
  buildingSeg: "https://github.com/davidecorso00/building-segmentation",
};

export const skills = [
  {
    category: "Linguaggi",
    items: [
      { name: "Python", core: true },
      { name: "Java" },
      { name: "C++" },
      { name: "C" },
      { name: "SQL" },
      { name: "JavaScript" },
    ],
    evidence: [
      { label: "exam-scheduler", url: REPO.examScheduler },
      { label: "fscli", url: REPO.fscli },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "PyTorch", core: true },
      { name: "scikit-learn" },
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "SHAP" },
    ],
    evidence: [
      { label: "privacy-blurrer", url: REPO.privacyBlurrer },
      { label: "building-segmentation", url: REPO.buildingSeg },
    ],
  },
  {
    category: "Dati e visualizzazione",
    items: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Plotly" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
    ],
    evidence: [
      { label: "european-restaurants", url: REPO.restaurants },
      { label: "bundesliga-analysis", url: REPO.bundesliga },
    ],
  },
  {
    category: "Backend e MLOps",
    items: [
      { name: "FastAPI", core: true },
      { name: "Docker", core: true },
      { name: "MLflow", core: true },
      { name: "Appwrite" },
      { name: "Maven" },
      { name: "Git" },
    ],
    evidence: [
      { label: "battery-geis", url: REPO.batteryGeis },
      { label: "privacy-blurrer", url: REPO.privacyBlurrer },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React" },
      { name: "JavaFX" },
      { name: "FXML" },
      { name: "Tailwind" },
    ],
    evidence: [
      { label: "minesweeper", url: REPO.minesweeper },
      { label: "privacy-blurrer", url: REPO.privacyBlurrer },
    ],
  },
  {
    category: "Test e CI/CD",
    items: [
      { name: "pytest" },
      { name: "JUnit" },
      { name: "Mockito" },
      { name: "JavaFXTest" },
      { name: "GitHub Actions" },
      { name: "GitLab CI" },
    ],
    evidence: [
      { label: "fscli", url: REPO.fscli },
      { label: "privacy-blurrer", url: REPO.privacyBlurrer },
    ],
  },
  {
    category: "Grafica",
    items: [{ name: "OpenGL" }, { name: "GLFW" }, { name: "Rendering 3D" }],
    evidence: [{ label: "hanoi-tower", url: REPO.hanoi }],
  },
  {
    category: "Blockchain",
    items: [{ name: "Solidity" }, { name: "Hardhat" }, { name: "Ethereum" }],
    evidence: [{ label: "asset-tokenization", url: REPO.tokenization }],
  },
];

export const skillAreaCount = skills.length;
