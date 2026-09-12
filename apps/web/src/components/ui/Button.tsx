import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ondark'

const variantClass: Record<Variant, string> = {
  primary: 'oz-btn-primary',
  secondary: 'oz-btn-secondary',
  ondark: 'oz-btn-ondark',
}

type ButtonAsLink = {
  href: string
  variant?: Variant
  children: ReactNode
  className?: string
}

export function ButtonLink({
  href,
  variant = 'primary',
  children,
  className = '',
}: ButtonAsLink) {
  return (
    <Link
      href={href}
      className={`oz-btn ${variantClass[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`oz-btn ${variantClass[variant]} ${className}`}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        animation: 'oz-spin 700ms linear infinite',
        display: 'inline-block',
      }}
    />
  )
}
