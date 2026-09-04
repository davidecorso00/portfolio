import { useState } from "react";

import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Raster } from "./components/Raster";
import { Skills } from "./components/Skills";

import { useActiveSection } from "./hooks/useActiveSection";
import { useReveal } from "./hooks/useReveal";
import { useScrolled } from "./hooks/useScrolled";
import { useTheme } from "./hooks/useTheme";

const NAV_ITEMS = [
  { id: "profilo", label: "Profilo" },
  { id: "progetti", label: "Progetti" },
  { id: "competenze", label: "Competenze" },
  { id: "formazione", label: "Formazione" },
  { id: "contatti", label: "Contatti" },
];

// Fuori dal componente: passarlo come letterale rifarebbe partire
// l'observer a ogni render.
const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { sentinel, scrolled } = useScrolled();
  const { theme, toggle } = useTheme();
  const active = useActiveSection(NAV_IDS);

  useReveal();

  return (
    <>
      {/* Sentinella della navigazione, e insieme bersaglio del "torna in cima". */}
      <div id="top" ref={sentinel} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <a href="#contenuto" className="skip-link label">
        Vai al contenuto
      </a>

      <Raster />

      <Nav
        items={NAV_ITEMS}
        active={active}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        onToggleTheme={toggle}
      />

      <div className="relative z-10">
        <main id="contenuto">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
