import { education } from "../data/education";
import { SectionHead } from "./SectionHead";

export function Education() {
  const first = education[education.length - 1].from;
  const last = education[0].to;

  return (
    <section
      id="formazione"
      aria-labelledby="formazione-title"
      className="rule-top section-pad grid-page"
    >
      <SectionHead
        index="04"
        id="formazione-title"
        title="Formazione"
        counter={`${first} — ${last}`}
      />

      <div className="col-span-full lg:col-span-9 lg:col-start-4">
        {education.map((item) => (
          <div key={item.id} className="reveal rule-top grid-content py-7">
            <p className="num text-data text-ink-3 mb-3 lg:col-span-2 lg:mb-0 lg:pt-1">
              {item.from}
              <span aria-hidden="true"> — </span>
              {item.to}
            </p>

            <div className="lg:col-span-4">
              <h3 className="t-title text-title text-ink">{item.institution}</h3>
              <p className="text-body text-ink-2 mt-1">{item.degree}</p>
              <p className="text-small text-ink-3 mt-1">
                {item.fullName ? `${item.fullName} · ${item.city}` : item.city}
              </p>
            </div>

            <div className="mt-4 lg:col-span-3 lg:mt-0 lg:pt-1">
              <p className="label text-ink-3 mb-2">Corsi principali</p>
              <p className="text-small text-ink-3">
                {item.courses.map((course, i) => (
                  <span key={course}>
                    {/* Spazio unificatore prima del separatore: il punto
                        mediano non deve mai aprire una riga. */}
                    {i > 0 && " · "}
                    {course}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
        <div className="rule-top" />
      </div>
    </section>
  );
}
