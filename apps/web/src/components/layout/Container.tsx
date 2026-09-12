import type { ReactNode } from 'react'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`oz-container ${className}`}>{children}</div>
}

export function Section({
  children,
  surface = 'default',
  tight = false,
  id,
  className = '',
}: {
  children: ReactNode
  surface?: 'default' | 'low' | 'lowest'
  tight?: boolean
  id?: string
  className?: string
}) {
  const bg = {
    default: 'bg-surface',
    low: 'bg-surface-low',
    lowest: 'bg-surface-lowest',
  }[surface]

  return (
    <section
      id={id}
      className={`${tight ? 'oz-section-tight' : 'oz-section'} ${bg} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}
