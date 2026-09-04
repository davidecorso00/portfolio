import { useState } from "react";
import { featured, index as indexProjects, projectCount } from "../data/projects";
import { FigurePipeline } from "./FigurePipeline";
import { ProjectFeatured } from "./ProjectFeatured";
import { ProjectIndexRow } from "./ProjectIndexRow";
import { SectionHead } from "./SectionHead";

export function Projects() {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section
      id="progetti"
      aria-labelledby="progetti-title"
      className="rule-top section-pad grid-page"
    >
      <SectionHead
        index="02"
        id="progetti-title"
        title="Progetti"
        counter={`${projectCount} progetti · 2024 — 2026`}
      />

      <div className="col-span-full lg:col-span-9 lg:col-start-4">
        <p className="label text-ink-3 mb-2">Selezione</p>

        {featured.map((project) => (
          <div key={project.id}>
            <ProjectFeatured project={project} />
            {project.id === "privacy-blurrer" && <FigurePipeline />}
          </div>
        ))}

        <div className="mt-20">
          <p className="label text-ink-3 mb-2">Indice</p>

          {/* Testata di colonna: esiste solo dove le colonne esistono. */}
          <div className="grid-content border-t border-rule-strong py-3 max-lg:hidden">
            <span className="label-lg text-ink-3">№</span>
            <span className="label-lg text-ink-3">Anno</span>
            <span className="label-lg text-ink-3 lg:col-span-3">Progetto</span>
            <span className="label-lg text-ink-3 lg:col-span-3">Stack</span>
            <span className="label-lg text-ink-3 text-right">Fonte</span>
          </div>

          {indexProjects.map((project, i) => (
            <ProjectIndexRow
              key={project.id}
              project={project}
              n={featured.length + i + 1}
              open={open.has(project.id)}
              onToggle={() => toggle(project.id)}
            />
          ))}
          <div className="rule-top" />
        </div>
      </div>
    </section>
  );
}
