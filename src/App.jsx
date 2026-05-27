import { useState, useEffect, useRef, useMemo, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownIcon, ArrowUpRightIcon, LockSimpleIcon } from "@phosphor-icons/react";

const projects = [
  { slug:"asset-tokenization", title:"Asset Tokenization dApp", year:"2026", role:"Blockchain · Full-stack", summary:"Piattaforma decentralizzata per tokenizzare asset reali su Ethereum. Smart contracts ERC-1155 in Solidity con marketplace P2P, offerte vincolanti, distribuzione automatica dei rendimenti e governance pesata per co-proprietari. Frontend React + MetaMask, deploy su Sepolia testnet.", stack:["Solidity","Hardhat","React","TypeScript","Ethereum","IPFS"], link:"https://github.com/davidecorso00/asset-tokenization", confidential:false, span:5 },
  { slug:"battery-geis", title:"Battery GEIS — MLOps", year:"2026", role:"MLOps · Machine Learning", summary:"Pipeline MLOps per l'analisi di misurazioni GEIS su celle LiCoO₂, basata su dati del Politecnico di Milano (IEEE THERMINIC 2025). Tre task: ricostruzione Leave-One-Out, classificazione young/old e predizione dell'aging. FastAPI + React frontend, MLflow tracking, drift detection, Docker e CI GitHub Actions.", stack:["Python","scikit-learn","FastAPI","React","Docker","MLflow"], link:"https://github.com/davidecorso00/battery-geis-mlops", confidential:false, span:7 },
  { slug:"privacy-blurrer", title:"Privacy Blurrer", year:"2026", role:"MLOps · Computer Vision", summary:"Pipeline MLOps per segmentazione e anonimizzazione di persone in immagini. U-Net + ResNet34 servita via FastAPI, frontend React/Vite, MLflow tracking + Model Registry, drift detection, Docker, CI GitHub Actions e 37 test pytest con ~75% coverage.", stack:["Python","PyTorch","FastAPI","React","Docker","MLflow"], link:"https://github.com/davidecorso00/privacy-blurrer-mlops", confidential:false, span:12 },
  { slug:"building-segmentation", title:"Building Segmentation", year:"2025", role:"Computer Vision", summary:"Pipeline di segmentazione semantica pixel-level su immagini satellitari del Massachusetts Buildings Dataset. CNN classifica patch 15×15 px, sliding window produce confidence map e maschera binaria.", stack:["Python","Keras","TensorFlow","scikit-image"], link:"https://github.com/davidecorso00/building-segmentation", confidential:false, span:7 },
  { slug:"bundesliga", title:"Bundesliga Analysis", year:"2025", role:"Data Viz", summary:"Analisi esplorativa di 14.000+ partite della Bundesliga (1963–2009). Trend storici, heatmap dei risultati esatti, bar chart race animata dei titoli per stagione.", stack:["Python","Pandas","Plotly","Seaborn"], link:"https://github.com/davidecorso00/bundesliga-data-analysis", confidential:false, span:5 },
  { slug:"european-restaurants", title:"European Restaurants", year:"2025", role:"Data Science", summary:"Analisi di 1M+ ristoranti europei da TripAdvisor. EDA con mappe coropletiche, predizione del rating con Random Forest, Ridge, Bagging e SHAP per l'interpretabilità.", stack:["Python","Pandas","scikit-learn","SHAP"], link:"https://github.com/davidecorso00/european-restaurants-analysis", confidential:false, span:5 },
  { slug:"fscli", title:"FSCLI", year:"2025", role:"Software Engineering", summary:"Simulatore di file system virtuale con CLI integrata in una GUI JavaFX. Architettura MVC a layer, pattern Observer, i18n, preferenze persistenti. CI/CD GitLab, test JUnit/Mockito/JavaFXTest, code coverage.", stack:["Java","JavaFX","Maven","JUnit","Mockito","GitLab CI"], link:"https://github.com/davidecorso00/fscli", confidential:false, span:12 },
  { slug:"hanoi-3d", title:"Hanoi Tower 3D", year:"2025", role:"Graphics", summary:"Scena 3D interattiva della Torre di Hanoi in C++ e OpenGL. Ambiente navigabile con telecamere multiple ed engine custom.", stack:["C++","OpenGL","GLFW"], link:"https://github.com/davidecorso00/hanoi-tower", confidential:false, span:5 },
  { slug:"minesweeper", title:"Minesweeper JavaFX", year:"2025", role:"Desktop · MVC", summary:"Campo minato desktop con architettura MVC a 4 layer (Frontend, Application, Business, Data). Save/load, win/loss detection, i18n EN/IT, layout FXML con preferenze persistenti.", stack:["Java","JavaFX","Maven","FXML","i18n"], link:"https://github.com/davidecorso00/minesweeper-javafx", confidential:false, span:7 },
  { slug:"scraperty", title:"Scraperty", year:"2025", role:"Full-stack · LLM Engineer", summary:"Web scraper LLM-powered sviluppato per CoStar Group nell'ambito della partnership Virginia Tech × SUPSI. Crawler dinamico con Ollama che trasforma HTML in JSON strutturato con 91% di speedup rispetto a una pipeline ChatGPT equivalente.", stack:["Python","React","Ollama","LLM","Appwrite","Maps API"], link:null, confidential:true, span:12, featured:true },
  { slug:"exam-scheduler", title:"Exam Scheduler", year:"2024", role:"Algorithms", summary:"Soluzione in C con DP bottom-up su rolling array per minimizzare il tempo totale di N esami con sistema crediti. Quattro versioni dalla ricorsione esponenziale alla soluzione ottimale O(N×K) tempo, O(K) spazio.", stack:["C","Dynamic Programming","O(N×K)"], link:"https://github.com/davidecorso00/exam-scheduler", confidential:false, span:7 },
];

const skills = [
  { category:"Languages",       items:["Python","Java","C++","C","SQL","JavaScript"] },
  { category:"ML & AI",         items:["scikit-learn","TensorFlow","Keras","PyTorch","SHAP"] },
  { category:"Data",            items:["Pandas","NumPy","Plotly","Matplotlib","Seaborn"] },
  { category:"Frontend",        items:["React","Tailwind","JavaFX","FXML"] },
  { category:"Backend & Infra", items:["FastAPI","Maven","Docker","MLflow","Appwrite","Git"] },
  { category:"Testing & CI/CD", items:["JUnit","Mockito","JavaFXTest","pytest","GitLab CI"] },
  { category:"Graphics",        items:["OpenGL","GLFW"] },
  { category:"Blockchain",      items:["Solidity","Hardhat","Ethereum"] },
];

const education = [
  { institution:"SUPSI — DTI", degree:"Bachelor in Ingegneria Informatica", location:"Lugano, Svizzera", period:"2023 — 2026", courses:["Machine Learning","Deep Learning & Computer Vision","Machine Learning Operations","Natural Language Processing","Security and Privacy by Design","Blockchain Engineering","Software Engineering","Advanced Algorithms"] },
  { institution:"I.T.I.S. Magistri Cumacini", degree:"Diploma in Informatica e Telecomunicazioni", location:"Como, Italia", period:"2018 — 2023", courses:["Informatica","Sistemi e Reti","Telecomunicazione","Tecnologie e Progettazione di Sistemi","Gestione Progetto"] },
];

const contacts = [
  { label:"Email",    value:"corso.davide4@gmail.com",        href:"mailto:corso.davide4@gmail.com",              external:false },
  { label:"GitHub",   value:"github.com/davidecorso00",       href:"https://github.com/davidecorso00",            external:true },
  { label:"LinkedIn", value:"linkedin.com/in/davidecorso04",  href:"https://www.linkedin.com/in/davidecorso04/",  external:true },
];

const navItems = [
  { id:"about",     label:"About" },
  { id:"work",      label:"Work" },
  { id:"skills",    label:"Skills" },
  { id:"education", label:"Education" },
  { id:"contact",   label:"Contact" },
];

const heroInfo  = [
  { label:"Based in", value:"Porlezza, IT" },
  { label:"Studying",  value:"SUPSI · Lugano" },
  { label:"Focus",     value:"ML/AI · Full-stack" },
];

const aboutInfo = [
  { label:"Adesso",      value:"Bachelor in Ingegneria Informatica · 3° anno" },
  { label:"Working on",  value:"Tesi di laurea" },
  { label:"Interessi",   value:"F1, palestra, attualità, calcio" },
  { label:"Disponibile", value:"Stage e collaborazioni dal 2026" },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity:0, y:24 },
  visible: { opacity:1, y:0, transition:{ type:"spring", stiffness:100, damping:20 } },
};
const staggerVariant = (delay=0) => ({
  hidden:  {},
  visible: { transition:{ staggerChildren:0.06, delayChildren:delay } },
});

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useActiveSection(ids) {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold:0.3, rootMargin:"0px 0px -40% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = e => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function FadeIn({ children, className, as:Tag="div", delay=0 }) {
  const reduced = useReducedMotion();
  const El = motion.create(Tag);
  if (reduced) return <Tag className={className}>{children}</Tag>;
  return (
    <El className={className} initial="hidden" whileInView="visible"
      viewport={{ once:true, amount:0.2, margin:"0px 0px -10% 0px" }}
      variants={staggerVariant(delay)}>
      {children}
    </El>
  );
}

function FadeItem({ children, className, as:Tag="div" }) {
  const reduced = useReducedMotion();
  const El = motion.create(Tag);
  if (reduced) return <Tag className={className}>{children}</Tag>;
  return <El className={className} variants={fadeUp}>{children}</El>;
}

const StatusBadge = memo(function StatusBadge({ label="Open to work", className="" }) {
  const reduced = useReducedMotion();
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-block h-2 w-2 rounded-full bg-accent" />
        {!reduced && (
          <motion.span aria-hidden className="absolute inline-block h-2 w-2 rounded-full bg-accent"
            initial={{ scale:1, opacity:0.55 }}
            animate={{ scale:[1,2.6,1], opacity:[0.55,0,0.55] }}
            transition={{ duration:2.4, ease:"easeOut", repeat:Infinity, repeatDelay:0.2 }} />
        )}
      </span>
      <span className="text-text-muted">{label}</span>
    </span>
  );
});

function MagneticButton({ children, className="", ...props }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { type:"spring", stiffness:180, damping:18, mass:0.4 });
  const sy = useSpring(y, { type:"spring", stiffness:180, damping:18, mass:0.4 });
  return (
    <motion.button ref={ref}
      onMouseMove={e => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width/2) * 0.22);
        y.set((e.clientY - r.top - r.height/2) * 0.22);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={reduced ? undefined : { x:sx, y:sy }}
      className={className} {...props}>
      {children}
    </motion.button>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title"
      className="relative scroll-mt-24 px-6 md:px-10 pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-page grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
        <FadeIn className="md:col-span-8 flex flex-col">
          <FadeItem as="h1" id="hero-title" className="text-display font-medium text-text">
            Davide Corso.
            <span className="block mt-2 text-text-muted">
              Costruisco <span className="text-text">sistemi ML</span> e applicazioni full-stack.
            </span>
          </FadeItem>
          <FadeItem className="mt-10 max-w-[56ch] text-base md:text-lg leading-relaxed text-text-muted">
            Studio Ingegneria Informatica alla SUPSI. Mi occupo di pipeline ML, backend in Python
            e progetti DevOps — dall'analisi dati alla messa in produzione.
          </FadeItem>
          <FadeItem className="mt-12 flex flex-wrap items-center gap-2">
            <MagneticButton onClick={() => scrollTo("work")}
              className="group inline-flex items-center gap-2 rounded-full border border-accent bg-accent/15 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-accent transition-all hover:bg-accent hover:text-bg hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              Vedi i progetti
              <ArrowDownIcon size={14} weight="bold" className="transition-transform group-hover:translate-y-0.5" />
            </MagneticButton>
            <a href="mailto:corso.davide4@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-text-muted transition-all hover:border-border-soft hover:text-text">
              Scrivimi
              <ArrowUpRightIcon size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeItem>
        </FadeIn>
        <FadeIn className="md:col-span-4 md:col-start-9 flex flex-col md:pt-3" delay={0.15}>
          <FadeItem className="border-t border-border-soft">
            {heroInfo.map(item => (
              <div key={item.label} className="flex items-baseline justify-between gap-6 border-b border-border-soft py-3.5">
                <span className="label-meta">{item.label}</span>
                <span className="text-sm text-text text-right">{item.value}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 border-b border-border-soft py-3.5">
              <span className="label-meta">Status</span>
              <StatusBadge label="Open · 2026" className="text-sm" />
            </div>
          </FadeItem>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const reduced = useReducedMotion();

  const article = (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-border-soft bg-surface p-8 md:p-10 card-block hover:border-border">
      {project.featured && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      )}
      <header className="flex items-start justify-between gap-6">
        <span className="label-meta">
          {project.year}
          <span aria-hidden className="text-text-dim mx-2">/</span>
          {project.role}
        </span>
        {project.confidential && (
          <span aria-label="Codice sorgente non disponibile pubblicamente"
            className="inline-flex items-center gap-1.5 label-meta text-text-dim">
            <LockSimpleIcon size={10} weight="bold" />
            Confidential
          </span>
        )}
      </header>
      <div className="mt-8">
        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-text leading-[1.1]">
          {project.title}
        </h3>
        <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-text-muted">
          {project.summary}
        </p>
      </div>
      <footer className="mt-8 flex flex-col gap-4 pt-5 border-t border-border-soft">
        <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-[12px] text-text-faint">
          {project.stack.map((s,i) => (
            <li key={s} className="inline-flex items-center gap-3">
              {s}
              {i < project.stack.length-1 && <span aria-hidden className="text-text-dim">·</span>}
            </li>
          ))}
        </ul>
        {project.confidential ? (
          <span className="font-mono text-[11px] text-text-dim">source private</span>
        ) : (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="group/link self-start inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent/15 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-all hover:bg-accent hover:text-bg hover:shadow-[0_0_16px_rgba(16,185,129,0.2)]">
            GitHub
            <ArrowUpRightIcon size={12} weight="bold" className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        )}
      </footer>
    </article>
  );

  if (reduced) return <div>{article}</div>;
  return (
    <motion.div variants={fadeUp} whileHover={{ y:-3 }}
      transition={{ type:"spring", stiffness:200, damping:22 }}>
      {article}
    </motion.div>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title"
      className="relative scroll-mt-24 border-t border-border-soft px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-page">
        <FadeIn className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <FadeItem className="md:col-span-2">
            <div className="sticky top-28 flex items-baseline gap-3">
              <span className="label-meta">Work</span>
              <span aria-hidden className="h-px flex-1 bg-border-soft" />
            </div>
            <h2 id="work-title" className="sr-only">Work</h2>
          </FadeItem>
          <FadeItem className="md:col-span-10">
            <FadeIn className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ gridAutoRows:"1fr" }}>
              {projects.map((p,i) => <ProjectCard key={p.slug} project={p} index={i} />)}
            </FadeIn>
          </FadeItem>
        </FadeIn>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title"
      className="relative scroll-mt-24 border-t border-border-soft px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-page">
        <FadeIn className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <FadeItem className="md:col-span-3">
            <div className="sticky top-28 flex items-baseline gap-3">
              <span className="label-meta">About</span>
              <span aria-hidden className="h-px flex-1 bg-border-soft" />
            </div>
            <h2 id="about-title" className="sr-only">About</h2>
          </FadeItem>
          <div className="md:col-span-6 space-y-6 text-base md:text-lg leading-relaxed text-text-muted">
            <FadeItem as="p">
              Vengo da Porlezza, sul lago di Lugano, e studio Ingegneria Informatica alla{" "}
              <span className="text-text">SUPSI</span> in Svizzera. Il percorso mi ha portato
              dall'analisi dati al machine learning, fino al deployment di sistemi in produzione.
            </FadeItem>
            <FadeItem as="p">
              Mi piace lavorare su problemi diversi tra loro — un giorno una pipeline di computer
              vision su immagini satellitari, il giorno dopo un algoritmo di programmazione dinamica
              in C, poi un frontend React che interroga un LLM. Ogni progetto è una scusa per
              capire un livello più giù come funzionano le cose.
            </FadeItem>
            <FadeItem as="p">
              Fuori dal codice mi trovate in palestra, a guardare la Formula 1 o il calcio, o a
              discutere di economia e attualità.
            </FadeItem>
          </div>
          <FadeItem className="md:col-span-3">
            <ul className="border-t border-border-soft">
              {aboutInfo.map(item => (
                <li key={item.label} className="border-b border-border-soft py-4">
                  <div className="label-meta mb-1.5">{item.label}</div>
                  <div className="text-sm text-text leading-snug">{item.value}</div>
                </li>
              ))}
            </ul>
          </FadeItem>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title"
      className="relative scroll-mt-24 border-t border-border-soft px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-page">
        <FadeIn className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <FadeItem className="md:col-span-3">
            <div className="sticky top-28 flex items-baseline gap-3">
              <span className="label-meta">Stack</span>
              <span aria-hidden className="h-px flex-1 bg-border-soft" />
            </div>
            <h2 id="skills-title" className="sr-only">Stack</h2>
          </FadeItem>
          <FadeItem className="md:col-span-9">
            <ul className="border-t border-border-soft">
              {skills.map(cat => (
                <li key={cat.category}
                  className="grid grid-cols-1 gap-3 border-b border-border-soft py-5 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span className="md:col-span-3 label-meta">{cat.category}</span>
                  <div className="md:col-span-9 flex flex-wrap gap-x-5 gap-y-2 text-sm md:text-base text-text">
                    {cat.items.map((item,i) => (
                      <span key={item} className="inline-flex items-center gap-5">
                        {item}
                        {i < cat.items.length-1 && <span aria-hidden className="text-text-dim">·</span>}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </FadeItem>
        </FadeIn>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" aria-labelledby="education-title"
      className="relative scroll-mt-24 border-t border-border-soft px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-page">
        <FadeIn className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <FadeItem className="md:col-span-3">
            <div className="sticky top-28 flex items-baseline gap-3">
              <span className="label-meta">Education</span>
              <span aria-hidden className="h-px flex-1 bg-border-soft" />
            </div>
            <h2 id="education-title" className="sr-only">Education</h2>
          </FadeItem>
          <FadeItem className="md:col-span-9">
            <ol className="relative border-l border-border-soft pl-8 md:pl-12">
              {education.map((edu,i) => (
                <li key={edu.institution} className={`relative ${i < education.length-1 ? "pb-12 md:pb-16" : ""}`}>
                  <span aria-hidden className="absolute -left-[37px] md:-left-[49px] top-2 inline-flex h-2 w-2 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-bg ring-1 ring-border" />
                    {i === 0 && <span className="absolute h-2 w-2 rounded-full bg-accent" />}
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-text">{edu.degree}</h3>
                    <span className="label-meta">{edu.period}</span>
                  </div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-text-muted">{edu.institution}</span>
                    <span className="text-text-dim">·</span>
                    <span className="text-text-muted">{edu.location}</span>
                  </div>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-text-faint">
                    {edu.courses.map((c,j) => (
                      <li key={c} className="inline-flex items-center gap-4">
                        {c}
                        {j < edu.courses.length-1 && <span aria-hidden className="text-text-dim">·</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </FadeItem>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title"
      className="relative scroll-mt-24 border-t border-border-soft px-6 md:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-page">
        <FadeIn className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <FadeItem className="md:col-span-5">
            <div className="flex items-baseline gap-3 mb-10">
              <span className="label-meta">Get in touch</span>
              <span aria-hidden className="h-px flex-1 bg-border-soft" />
            </div>
            <h2 id="contact-title" className="sr-only">Get in touch</h2>
            <p className="text-2xl md:text-3xl leading-tight tracking-tight text-text mb-6 max-w-[20ch]">
              Cerco uno stage o una collaborazione per il 2026.
            </p>
            <p className="text-base text-text-muted max-w-[42ch] mb-8">
              Se stai costruendo qualcosa interessante in ambito ML o full-stack, scrivimi due
              righe — rispondo sempre.
            </p>
            <StatusBadge label="Disponibile da Settembre 2026" />
          </FadeItem>
          <FadeItem className="md:col-span-7">
            <ul className="border-t border-border-soft">
              {contacts.map(c => (
                <li key={c.label} className="border-b border-border-soft">
                  <a href={c.href} {...(c.external ? { target:"_blank", rel:"noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-6 py-6 md:py-8 transition-colors">
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-faint w-16">{c.label}</span>
                      <span className="text-lg md:text-2xl tracking-tight text-text group-hover:text-accent transition-colors">{c.value}</span>
                    </div>
                    <ArrowUpRightIcon size={20} weight="bold"
                      className="text-text-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeItem>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const allIds = useMemo(() => ["hero", ...navItems.map(n => n.id)], []);
  const active = useActiveSection(allIds);
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border-soft" : ""}`}>
      <nav className="mx-auto flex h-14 max-w-page items-center justify-between px-6 md:px-10">
        <button onClick={() => scrollTo("hero")}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-text hover:text-accent transition-colors">
          Davide<span className="text-text-faint">/</span>Corso
        </button>
        <ul className="hidden md:flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em]">
          {navItems.map(item => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <button onClick={() => scrollTo(item.id)} aria-current={isActive ? "true" : undefined}
                  className={`relative px-3 py-2 transition-colors ${isActive ? "text-text" : "text-text-faint hover:text-text-muted"}`}>
                  {item.label}
                  {isActive && !reduced && (
                    <motion.span layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                      transition={{ type:"spring", stiffness:400, damping:32 }} />
                  )}
                  {isActive && reduced && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <a href="mailto:corso.davide4@gmail.com"
          className="hidden md:inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted hover:text-accent transition-colors">
          corso.davide4@gmail.com
        </a>
        <button onClick={() => scrollTo("contact")}
          className="md:hidden font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Contact
        </button>
      </nav>
    </header>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-border-soft px-6 md:px-10 py-8">
        <div className="mx-auto max-w-page flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Davide Corso · {new Date().getFullYear()}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
            Built with React · Tailwind · Framer Motion
          </span>
        </div>
      </footer>
    </>
  );
}