export default function BrandWordmark({ className = '', showStudio = true }) {
  const fullLabel = showStudio ? 'TRI-ELEMENT DESIGN' : 'TRI-ELEMENT'

  return (
    <span
      className={`inline-flex max-w-full sm:whitespace-nowrap ${className}`.trim()}
      style={{ alignItems: 'baseline', fontWeight: 'bold' }}
      aria-label={fullLabel}
    >
      {/* "TR" */}
      <span aria-hidden="true">TR</span>

      {/* Colored bars replacing the "I" */}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          height: '0.72em',
          width: '0.28em',
          margin: '0 1px',
          flexShrink: 0,
          verticalAlign: 'baseline',
          position: 'relative',
          top: '0.02em',
        }}
      >
        <svg viewBox="0 0 20 36" style={{ height: '100%', width: '100%' }} preserveAspectRatio="none" aria-hidden="true">
          <line x1="4" y1="4"  x2="16" y2="4"  stroke="rgb(249 115 22)" strokeWidth="5" strokeLinecap="butt" />
          <line x1="4" y1="18" x2="16" y2="18" stroke="rgb(59 130 246)"  strokeWidth="5" strokeLinecap="butt" />
          <line x1="4" y1="32" x2="16" y2="32" stroke="rgb(34 197 94)"   strokeWidth="5" strokeLinecap="butt" />
        </svg>
      </span>

      {/* Hyphen then ELEMENT (and optionally DESIGN) */}
      <span aria-hidden="true">{showStudio ? '-ELEMENT DESIGN' : '-ELEMENT'}</span>
    </span>
  )
}
