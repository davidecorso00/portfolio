/**
 * Colophon, non firma.
 *
 * Ogni riga dev'essere vera: chi legge questo sito apre il pannello Network e
 * verifica. Se in futuro entra un font da terze parti o un tracker, questa
 * riga cambia per prima.
 */
export function Footer() {
  return (
    <footer className="rule-top grid-page py-8">
      {/* whitespace-nowrap su ogni voce: preferibile che sia la riga a
          spezzarsi fra una voce e l'altra, non una voce a metà. */}
      <div className="col-span-full flex flex-wrap justify-between gap-x-10 gap-y-2">
        <p className="label text-ink-3 whitespace-nowrap">
          © <span className="num">{new Date().getFullYear()}</span> Davide Corso
        </p>
        <p className="label text-ink-3 whitespace-nowrap">
          Archivo Variable · Geist Mono · Griglia <span className="num">12</span>/
          <span className="num">28</span>
        </p>
        <p className="label text-ink-3 whitespace-nowrap">
          React <span className="num">19</span> · Vite <span className="num">6</span> ·
          Tailwind <span className="num">4</span>
        </p>
        <p className="label text-ink-3 whitespace-nowrap">
          Nessun tracker · Nessun cookie · Font auto-ospitati
        </p>
      </div>
    </footer>
  );
}
