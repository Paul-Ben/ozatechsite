/**
 * Interim brand mark.
 *
 * The real badge lives on the current site at `assets/logo.svg` (31.8 KB).
 * Note that `assets/logo.png`, which the old site references first, returns 404
 * — see docs/01-content-inventory.md §7.
 *
 * TO REPLACE: drop the optimised badge at `apps/web/public/logo.svg`, then
 * swap this component's body for:
 *
 *   <Image src="/logo.svg" alt="" width={40} height={40} className={className} />
 *
 * Until then this geometric stand-in keeps the layout honest and uses only
 * brand tokens, so nothing needs restyling when the real mark lands.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Ozatech Services"
      focusable="false"
    >
      <circle cx="24" cy="24" r="23" fill="var(--oz-navy-700)" />
      <circle
        cx="24"
        cy="24"
        r="19.5"
        fill="none"
        stroke="var(--oz-gold-300)"
        strokeWidth="2.5"
      />
      {/* Hard hat silhouette */}
      <path
        d="M13 29a11 11 0 0 1 22 0Z"
        fill="var(--oz-gold-300)"
      />
      <path
        d="M21 18.6a11 11 0 0 1 6 0V15a3 3 0 0 0-6 0Z"
        fill="var(--oz-gold-300)"
      />
      <rect
        x="10.5"
        y="29"
        width="27"
        height="3"
        rx="1.5"
        fill="var(--oz-gold-300)"
      />
      {/* Safety glasses */}
      <rect
        x="15.5"
        y="33.5"
        width="17"
        height="4"
        rx="2"
        fill="var(--oz-gold-300)"
        opacity="0.85"
      />
    </svg>
  )
}
