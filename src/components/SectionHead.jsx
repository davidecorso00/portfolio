/**
 * Testata di sezione: il numero compare UNA volta sola, nel marcatore, e il
 * titolo una volta sola, nell'h2. Il contatore accanto porta informazione
 * reale — quanti progetti, quante aree, quali anni — invece di ripetere
 * l'indice con un'altra grafia.
 *
 * Da 1024px la testata resta agganciata mentre il contenuto scorre: tiene
 * l'orientamento in una pagina lunga senza aggiungere una seconda navigazione.
 */
export function SectionHead({ index, title, counter, id }) {
  return (
    <header className="col-span-full mb-10 lg:col-span-3 lg:mb-0 lg:sticky lg:top-[calc(var(--nav-h)+24px)] lg:self-start">
      <p className="num text-label text-ink-3 tracking-[0.14em]">{index}</p>
      <h2 id={id} className="t-h2 text-h2 mt-3 text-ink">
        {title}
      </h2>
      {counter && (
        <p className="mono text-data text-ink-3 mt-4 border-t border-rule pt-3">
          {counter}
        </p>
      )}
    </header>
  );
}
