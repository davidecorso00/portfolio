/**
 * I tre soli glifi del sito, disegnati invece che scritti.
 *
 * Motivo tecnico, non estetico: l'unicode-range del subset latin di Archivo e
 * Geist Mono copre U+2191 e U+2193 ma NON U+2192 (→) né U+2197 (↗). Scrivere
 * quelle frecce come carattere le farebbe cadere su un font di sistema, con
 * peso e allineamento diversi dal resto della riga.
 */

export function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" />
    </svg>
  );
}

export function ArrowDown({ className = "" }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 1.5v7M1.75 5.5 5 8.75 8.25 5.5" />
    </svg>
  );
}

export function PlusMinus({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      data-open={open ? "true" : "false"}
      className="pm"
    >
      <path d="M0.5 6h11" />
      <path className="pm-v" d="M6 0.5v11" />
    </svg>
  );
}
