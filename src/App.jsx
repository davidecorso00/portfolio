import { useState, useEffect } from "react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set(["hero"]));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Asset Tokenization dApp",
      description: "Piattaforma decentralizzata per tokenizzare asset reali su Ethereum. Smart contracts ERC-1155 in Solidity con marketplace P2P, offerte vincolanti, distribuzione automatica dei rendimenti e governance pesata per co-proprietari. Frontend React + MetaMask, deploy su Sepolia testnet.",
      tags: ["Solidity", "Hardhat", "React", "TypeScript", "Ethereum", "IPFS"],
      emoji: "💎",
      color: "#a78bfa",
      link: "https://github.com/davidecorso00/asset-tokenization",
      confidential: false,
      year: "2026",
    },
    {
      title: "Battery GEIS — MLOps",
      description: "Pipeline MLOps per l'analisi di misurazioni GEIS su celle LiCoO₂, basata su dati del Politecnico di Milano (IEEE THERMINIC 2025). Tre task: ricostruzione Leave-One-Out, classificazione young/old e predizione dell'aging. FastAPI + React frontend, MLflow tracking, drift detection, Docker e CI GitHub Actions.",
      tags: ["Python", "scikit-learn", "FastAPI", "React", "Docker", "MLflow"],
      emoji: "🔋",
      color: "#34d399",
      link: "https://github.com/davidecorso00/battery-geis-mlops",
      confidential: false,
      year: "2026",
    },
    {
      title: "Privacy Blurrer",
      description: "Pipeline MLOps per segmentazione e anonimizzazione di persone in immagini. U-Net + ResNet34 servita via FastAPI, frontend React/Vite, MLflow tracking + Model Registry, drift detection, Docker, CI GitHub Actions e 37 test pytest con ~75% coverage.",
      tags: ["Python", "PyTorch", "FastAPI", "React", "Docker", "MLflow"],
      emoji: "🛡️",
      color: "#60a5fa",
      link: "https://github.com/davidecorso00/privacy-blurrer-mlops",
      confidential: false,
      year: "2026",
    },
    {
      title: "Building Segmentation",
      description: "Pipeline di segmentazione semantica pixel-level su immagini satellitari del Massachusetts Buildings Dataset. Approccio patch-based (15×15 px): CNN classifica ogni patch come edificio o sfondo, poi sliding window su tutta l'immagine produce confidence map e maschera binaria.",
      tags: ["Python", "Keras", "TensorFlow", "scikit-image", "Computer Vision"],
      emoji: "🏗️",
      color: "#00d4ff",
      link: "https://github.com/davidecorso00/building-segmentation",
      confidential: false,
      year: "2025",
    },
    {
      title: "Bundesliga Analysis",
      description: "Analisi esplorativa di 14.000+ partite della Bundesliga (1963–2009). Correlazione gol/punti, trend storici del punteggio, heatmap dei risultati esatti, bar chart race animata dei titoli vinti per stagione.",
      tags: ["Python", "Pandas", "Plotly", "Matplotlib", "Seaborn"],
      emoji: "⚽",
      color: "#ff6b35",
      link: "https://github.com/davidecorso00/bundesliga-data-analysis",
      confidential: false,
      year: "2025",
    },
    {
      title: "European Restaurants",
      description: "Analisi di 1M+ ristoranti europei da TripAdvisor. EDA con mappe coropletiche, distribuzione Michelin, correlazione diete-rating. Predizione del rating con Random Forest, Ridge, Bagging e SHAP per l'interpretabilità.",
      tags: ["Python", "Pandas", "Plotly", "scikit-learn", "SHAP"],
      emoji: "🍽️",
      color: "#00ff88",
      link: "https://github.com/davidecorso00/european-restaurants-analysis",
      confidential: false,
      year: "2025",
    },
    {
      title: "FSCLI",
      description: "Simulatore di file system virtuale con CLI integrata in una GUI JavaFX. Architettura MVC a layer, pattern Observer, i18n (EN/IT), preferenze persistenti tra sessioni. Include CI/CD GitLab, test unitari/integrazione/GUI con JUnit, Mockito e JavaFXTest, e misurazione della code coverage.",
      tags: ["Java", "JavaFX", "Maven", "JUnit", "Mockito", "GitLab CI"],
      emoji: "🖥️",
      color: "#818cf8",
      link: "https://github.com/davidecorso00/fscli",
      confidential: false,
      year: "2025",
    },
    {
      title: "Hanoi Tower 3D",
      description: "Scena 3D interattiva della Torre di Hanoi in C++ e OpenGL. Ambiente navigabile con telecamere multiple ed engine custom.",
      tags: ["C++", "OpenGL", "GLFW", "3D Graphics"],
      emoji: "🗼",
      color: "#facc15",
      link: "https://github.com/davidecorso00/hanoi-tower",
      confidential: false,
      year: "2025",
    },
    {
      title: "Minesweeper JavaFX",
      description: "Campo minato desktop con architettura MVC a 4 layer (Frontend, Application, Business, Data). Gestione completa del gameplay, save/load dello stato, win/loss detection, i18n multilingua (EN/IT) e layout FXML con preferenze persistenti.",
      tags: ["Java", "JavaFX", "Maven", "MVC", "FXML", "i18n"],
      emoji: "💣",
      color: "#f43f5e",
      link: "https://github.com/davidecorso00/minesweeper-javafx",
      confidential: false,
      year: "2025",
    },
    {
      title: "Scraperty",
      description: "Web scraper LLM-powered sviluppato per CoStar Group nell'ambito della partnership Virginia Tech × SUPSI. Crawler dinamico con Ollama che trasforma HTML in JSON strutturato con 91% di speedup rispetto a una pipeline ChatGPT equivalente.",
      tags: ["Python", "React", "Ollama", "LLM", "Appwrite", "Maps API"],
      emoji: "🕷️",
      color: "#e879f9",
      link: null,
      confidential: true,
      year: "2025",
    },
    {
      title: "Exam Scheduler",
      description: "Soluzione in C con DP bottom-up su rolling array per minimizzare il tempo totale di N esami con sistema crediti. Quattro versioni dalla ricorsione esponenziale alla soluzione ottimale O(N×K) tempo, O(K) spazio.",
      tags: ["C", "Dynamic Programming", "Algorithms", "O(N×K)"],
      emoji: "🎓",
      color: "#c084fc",
      link: "https://github.com/davidecorso00/exam-scheduler",
      confidential: false,
      year: "2024",
    },
  ];

  const skills = [
    { category: "Languages",       items: ["Python", "Java", "C++", "C", "SQL", "JavaScript"] },
    { category: "AI / ML",         items: ["scikit-learn", "TensorFlow", "Keras", "PyTorch", "SHAP"] },
    { category: "Data & Viz",      items: ["Pandas", "NumPy", "Plotly", "Matplotlib", "Seaborn"] },
    { category: "Frontend",        items: ["React", "JavaFX", "FXML", "Tailwind"] },
    { category: "Backend & Tools", items: ["FastAPI", "Maven", "Docker", "MLflow", "Appwrite", "Git"] },
    { category: "Testing & CI/CD", items: ["JUnit", "Mockito", "JavaFXTest", "pytest", "GitLab CI"] },
    { category: "Graphics",        items: ["OpenGL", "GLFW", "3D Rendering"] },
    { category: "Blockchain",      items: ["Solidity", "Hardhat", "Ethereum"] },
  ];

  const navItems = [
    { id: "hero",      label: "Home" },
    { id: "about",     label: "About" },
    { id: "projects",  label: "Progetti" },
    { id: "skills",    label: "Skills" },
    { id: "education", label: "Formazione" },
    { id: "contact",   label: "Contatti" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const vis = (id) => visibleSections.has(id);

  return (
    <div style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace", background: "#0a0a0f", color: "#e0e0e8", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#0a0a0f;}
        ::-webkit-scrollbar-thumb{background:#1a1a2e;border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:#00ff88;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
        @keyframes glitch{0%,100%{text-shadow:2px 0 #00ff88,-2px 0 #ff0055;}25%{text-shadow:-2px 0 #00ff88,2px 0 #ff0055;}50%{text-shadow:2px 2px #00ff88,-2px -2px #ff0055;}75%{text-shadow:-2px 2px #00ff88,2px -2px #ff0055;}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes gridDrift{0%{transform:translateY(0);}100%{transform:translateY(40px);}}
        @keyframes scan{0%{top:-10%;}100%{top:110%;}}

        .vis{animation:fadeUp .8s ease-out forwards;}
        .hid{opacity:0;transform:translateY(40px);}

        .nav-link{color:#555;text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;transition:all .3s;cursor:pointer;padding:8px 0;border:none;background:none;font-family:'JetBrains Mono',monospace;position:relative;}
        .nav-link:hover,.nav-link.on{color:#00ff88;}
        .nav-link.on::before{content:'>';position:absolute;left:-15px;color:#00ff88;animation:blink 1s infinite;}

        .card{background:#0f0f1a;border:1px solid #1a1a2e;border-radius:12px;padding:28px;transition:all .4s cubic-bezier(.22,1,.36,1);cursor:default;position:relative;overflow:hidden;}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--ac);transform:scaleX(0);transition:transform .4s;transform-origin:left;}
        .card:hover::before{transform:scaleX(1);}
        .card:hover{border-color:var(--ac);transform:translateY(-4px);box-shadow:0 8px 40px rgba(0,0,0,.4);}

        .tag{background:#1a1a2e;border:1px solid #252540;padding:5px 12px;border-radius:5px;font-size:12px;color:#888;transition:all .3s;display:inline-block;}
        .tag:hover{border-color:#00ff88;color:#00ff88;background:rgba(0,255,136,.04);}

        .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:transparent;color:#00ff88;border:1px solid #00ff88;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:14px;cursor:pointer;transition:all .3s;text-decoration:none;letter-spacing:1px;}
        .btn:hover{background:#00ff88;color:#0a0a0f;box-shadow:0 0 30px rgba(0,255,136,.3);}
        .btn-ghost{border-color:#333;color:#666;}
        .btn-ghost:hover{background:#1a1a2e;color:#fff;border-color:#555;box-shadow:none;}

        @media(max-width:768px){
          .desk{display:none!important;}.mob-btn{display:flex!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .proj-grid{grid-template-columns:1fr!important;}
          .skill-grid{grid-template-columns:1fr!important;}
        }
        @media(min-width:769px){.mob-btn{display:none!important;}.mob-nav{display:none!important;}}
      `}</style>

      {/* Background effects */}
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(0,255,136,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,.03) 1px,transparent 1px)",backgroundSize:"40px 40px",zIndex:0,pointerEvents:"none",animation:"gridDrift 8s linear infinite"}}/>
      <div style={{position:"fixed",top:"-10%",left:0,width:"100%",height:4,background:"linear-gradient(transparent,rgba(0,255,136,.06),transparent)",zIndex:1,pointerEvents:"none",animation:"scan 6s linear infinite"}}/>
      <div style={{position:"fixed",width:400,height:400,borderRadius:"50%",pointerEvents:"none",zIndex:1,left:mousePos.x-200,top:mousePos.y-200,background:"radial-gradient(circle,rgba(0,255,136,.04) 0%,transparent 70%)",transition:"transform .15s"}}/>

      {/* Navigation */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"16px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",background:scrollY>50?"rgba(10,10,15,.92)":"transparent",backdropFilter:scrollY>50?"blur(20px)":"none",borderBottom:scrollY>50?"1px solid #1a1a2e":"1px solid transparent",transition:"all .3s"}}>
        <div onClick={()=>scrollTo("hero")} style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:20,color:"#00ff88",letterSpacing:2,cursor:"pointer"}}>{"<D/>"}</div>
        <div className="desk" style={{display:"flex",gap:28}}>
          {navItems.map(n=><button key={n.id} className={`nav-link ${activeSection===n.id?"on":""}`} onClick={()=>scrollTo(n.id)}>{n.label}</button>)}
        </div>
        <button className="mob-btn" onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"1px solid #1a1a2e",color:"#00ff88",padding:"8px 12px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:14,borderRadius:6}}>{menuOpen?"[x]":"[≡]"}</button>
      </nav>

      {menuOpen&&(
        <div className="mob-nav" style={{position:"fixed",top:56,left:0,right:0,background:"rgba(10,10,15,.97)",backdropFilter:"blur(20px)",zIndex:99,padding:"20px 40px",borderBottom:"1px solid #1a1a2e",display:"flex",flexDirection:"column",gap:14}}>
          {navItems.map(n=><button key={n.id} className={`nav-link ${activeSection===n.id?"on":""}`} onClick={()=>scrollTo(n.id)} style={{textAlign:"left"}}>{n.label}</button>)}
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 clamp(24px,8vw,120px)",position:"relative",zIndex:2}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:14,color:"#00ff88",marginBottom:24,opacity:.8,letterSpacing:2}}>
            <span style={{animation:"pulse 2s infinite"}}>▌</span> ~/portfolio $
          </div>
          <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(44px,7vw,82px)",fontWeight:800,lineHeight:1.05,marginBottom:24,color:"#fff"}}>
            Davide Corso<br/>
            <span style={{color:"#00ff88",animation:"glitch 3s infinite",display:"inline-block"}}>Developer</span>
          </h1>
          <p style={{fontSize:"clamp(16px,2vw,20px)",color:"#777",maxWidth:560,lineHeight:1.7,marginBottom:40,fontFamily:"'Space Grotesk',sans-serif",margin:"0 auto 40px"}}>
            Computer Engineering @ SUPSI · ML/AI · Full-Stack<br/>
            Appassionato di AI e sviluppo software.
          </p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
            <button className="btn" onClick={()=>scrollTo("projects")}>Vedi i progetti →</button>
            <button className="btn btn-ghost" onClick={()=>scrollTo("contact")}>Contattami</button>
          </div>
        </div>
        <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,opacity:.35}}>
          <span style={{fontSize:11,letterSpacing:2}}>SCROLL</span>
          <div style={{width:1,height:40,background:"linear-gradient(#00ff88,transparent)"}}/>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={vis("about")?"vis":"hid"} style={{minHeight:"70vh",padding:"120px clamp(24px,8vw,120px)",position:"relative",zIndex:2}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:48}}>
            <span style={{color:"#00ff88",fontSize:14}}>01.</span>
            <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff"}}>About me</h2>
            <div style={{flex:1,height:1,background:"#1a1a2e",marginLeft:16}}/>
          </div>
          <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
            <div style={{background:"#0f0f1a",border:"1px solid #1a1a2e",borderRadius:12,padding:24,fontSize:14,lineHeight:1.8}}>
              <div style={{display:"flex",gap:6,marginBottom:14}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:"#ff5f57"}}/>
                <div style={{width:10,height:10,borderRadius:"50%",background:"#febc2e"}}/>
                <div style={{width:10,height:10,borderRadius:"50%",background:"#28c840"}}/>
              </div>
              <div style={{color:"#444"}}>// about.json</div>
              <div>{"{"}</div>
              {[
                ['"name"',    '"Davide Corso"'],
                ['"role"',    '"CS Student & Developer"'],
                ['"university"', '"SUPSI — DTI"'],
                ['"location"', '"Porlezza (CO), Italia 🇮🇹"'],
                ['"focus"',   '["ML/AI", "MLOps", "Full-Stack"]'],
              ].map(([k,v],i)=>(
                <div key={i} style={{paddingLeft:20}}>
                  <span style={{color:"#00ff88"}}>{k}</span>: <span style={{color:"#facc15"}}>{v}</span>{i<4?",":""}
                </div>
              ))}
              <div>{"}"}</div>
            </div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:16,lineHeight:1.9,color:"#999"}}>
              <p style={{marginBottom:20}}>
                Sono Davide, vengo da Porlezza e studio <strong style={{color:"#fff"}}>Ingegneria Informatica</strong> alla SUPSI in Svizzera. Il mio percorso mi ha portato a esplorare il mondo del <strong style={{color:"#00ff88"}}>Machine Learning</strong>, del <strong style={{color:"#00ff88"}}>MLOps</strong> e dello sviluppo full-stack.
              </p>
              <p style={{marginBottom:20}}>
                Mi piace mettermi alla prova con progetti diversi — ogni volta è un'occasione per imparare qualcosa di nuovo e capire un po' meglio come funzionano le cose sotto il cofano.
              </p>
              <p>Fuori dal codice, mi trovate in palestra, a guardare la Formula 1 o il calcio, o a discutere di economia e attualità.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={vis("projects")?"vis":"hid"} style={{padding:"120px clamp(24px,8vw,120px)",position:"relative",zIndex:2}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:48}}>
            <span style={{color:"#00ff88",fontSize:14}}>02.</span>
            <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff"}}>Progetti</h2>
            <div style={{flex:1,height:1,background:"#1a1a2e",marginLeft:16}}/>
          </div>
          <div className="proj-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(330px,1fr))",gap:24}}>
            {projects.map((p,i)=>(
              <div key={i} className="card" style={{"--ac":p.color}} onMouseEnter={()=>setHoveredProject(i)} onMouseLeave={()=>setHoveredProject(null)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <span style={{fontSize:30}}>{p.emoji}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {p.confidential&&(
                      <span style={{fontSize:9,padding:"2px 7px",borderRadius:3,border:"1px solid #333",color:"#555",letterSpacing:1,fontFamily:"'JetBrains Mono',monospace"}}>🔒 CONFIDENTIAL</span>
                    )}
                    <span style={{fontSize:12,color:"#333"}}>/{String(i+1).padStart(2,"0")}</span>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <h3 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:600,color:"#fff"}}>{p.title}</h3>
                  <span style={{fontSize:11,color:"#444",fontFamily:"'JetBrains Mono',monospace"}}>{p.year}</span>
                </div>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:14,color:"#666",lineHeight:1.7,marginBottom:18}}>{p.description}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {p.tags.map((t,j)=>(
                    <span key={j} style={{fontSize:11,padding:"3px 10px",borderRadius:4,background:"rgba(255,255,255,.02)",border:`1px solid ${hoveredProject===i?p.color+"44":"#1a1a2e"}`,color:hoveredProject===i?p.color:"#444",fontFamily:"'JetBrains Mono',monospace",transition:"all .3s",letterSpacing:.5}}>{t}</span>
                  ))}
                </div>
                <div style={{marginTop:18,paddingTop:14,borderTop:"1px solid #141425",display:"flex",gap:16,alignItems:"center"}}>
                  {p.confidential?(
                    <span style={{fontSize:12,color:"#3a3a3a",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>// source not available</span>
                  ):(
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#444",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1,textDecoration:"none",transition:"color .3s"}} onMouseEnter={(e)=>e.currentTarget.style.color=p.color} onMouseLeave={(e)=>e.currentTarget.style.color="#444"}>GitHub →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={vis("skills")?"vis":"hid"} style={{padding:"120px clamp(24px,8vw,120px)",position:"relative",zIndex:2}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:48}}>
            <span style={{color:"#00ff88",fontSize:14}}>03.</span>
            <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff"}}>Tech Stack</h2>
            <div style={{flex:1,height:1,background:"#1a1a2e",marginLeft:16}}/>
          </div>
          <div className="skill-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20}}>
            {skills.map((s,i)=>(
              <div key={i} style={{background:"#0f0f1a",border:"1px solid #1a1a2e",borderRadius:12,padding:24}}>
                <h4 style={{fontSize:12,color:"#00ff88",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>{s.category}</h4>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {s.items.map((it,j)=><span key={j} className="tag">{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className={vis("education")?"vis":"hid"} style={{padding:"120px clamp(24px,8vw,120px)",position:"relative",zIndex:2}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:48}}>
            <span style={{color:"#00ff88",fontSize:14}}>04.</span>
            <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff"}}>Formazione</h2>
            <div style={{flex:1,height:1,background:"#1a1a2e",marginLeft:16}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            <div style={{background:"#0f0f1a",border:"1px solid #1a1a2e",borderRadius:12,padding:40}}>
              <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
                <div style={{width:56,height:56,borderRadius:12,background:"linear-gradient(135deg,#00ff88,#00d4ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"#0a0a0f",fontFamily:"'Outfit',sans-serif",flexShrink:0}}>S</div>
                <div style={{flex:1,minWidth:250}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                    <h3 style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:600,color:"#fff",marginBottom:4}}>SUPSI — DTI</h3>
                    <span style={{fontSize:12,color:"#555",fontFamily:"'JetBrains Mono',monospace"}}>2023 — 2026</span>
                  </div>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,color:"#00ff88",marginBottom:6}}>Bachelor in Ingegneria Informatica</p>
                  <p style={{fontSize:12,color:"#444",marginBottom:20}}>Scuola Universitaria Professionale della Svizzera Italiana</p>
                  <p style={{fontSize:12,color:"#555",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Corsi principali</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {["Machine Learning","Deep Learning & Computer Vision","Machine Learning Operations","Natural Language Processing","Security and Privacy by Design","Blockchain Engineering","Software Engineering","Advanced Algorithms"].map((c,i)=>
                      <span key={i} className="tag">{c}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={{background:"#0f0f1a",border:"1px solid #1a1a2e",borderRadius:12,padding:40}}>
              <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
                <div style={{width:56,height:56,borderRadius:12,background:"linear-gradient(135deg,#facc15,#ff6b35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"#0a0a0f",fontFamily:"'Outfit',sans-serif",flexShrink:0}}>M</div>
                <div style={{flex:1,minWidth:250}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                    <h3 style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:600,color:"#fff",marginBottom:4}}>I.T.I.S. Magistri Cumacini</h3>
                    <span style={{fontSize:12,color:"#555",fontFamily:"'JetBrains Mono',monospace"}}>2018 — 2023</span>
                  </div>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,color:"#facc15",marginBottom:6}}>Diploma in Informatica e Telecomunicazioni</p>
                  <p style={{fontSize:12,color:"#444",marginBottom:20}}>Como, Italia</p>
                  <p style={{fontSize:12,color:"#555",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Materie principali</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {["Informatica","Sistemi e Reti","Telecomunicazione","Tecnologie e Progettazione di Sistemi","Gestione Progetto"].map((c,i)=>
                      <span key={i} className="tag">{c}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={vis("contact")?"vis":"hid"} style={{padding:"120px clamp(24px,8vw,120px) 80px",position:"relative",zIndex:2}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:48}}>
            <span style={{color:"#00ff88",fontSize:14}}>05.</span>
            <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff"}}>Contatti</h2>
          </div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,color:"#777",lineHeight:1.8,marginBottom:40}}>
            Hai un progetto interessante o vuoi collaborare?<br/>Scrivimi, sono sempre aperto a nuove opportunità.
          </p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="mailto:corso.davide4@gmail.com" className="btn">📧 Email</a>
            <a href="https://github.com/davidecorso00" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>
            <a href="https://www.linkedin.com/in/davidecorso04/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"40px clamp(24px,8vw,120px)",borderTop:"1px solid #1a1a2e",textAlign:"center",position:"relative",zIndex:2}}>
        <p style={{fontSize:12,color:"#2a2a3e"}}>Progettato e sviluppato da Davide Corso · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Portfolio;
