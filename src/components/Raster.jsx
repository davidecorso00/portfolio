/**
 * Il raster di fondo: dodici filetti da 1px sull'attacco di ogni colonna.
 *
 * Non è un ornamento. Poiché ogni riga della pagina usa la stessa .grid-page,
 * i titoli, gli anni e le celle delle tabelle cadono esattamente su queste
 * linee: è la prova visiva che la griglia esiste davvero.
 *
 * Sotto 1280px sparisce — a quelle larghezze le colonne sono troppo strette
 * perché le linee dicano qualcosa, e diventerebbero rumore.
 */
export function Raster() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden xl:block" aria-hidden="true">
      <div className="grid-page h-full">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-full border-l border-[var(--grid-line)]" />
        ))}
      </div>
    </div>
  );
}
