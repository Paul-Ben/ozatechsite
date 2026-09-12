'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navigation, site } from '@/lib/site'
import { Logo } from '@/components/ui/Logo'

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close the mobile panel on navigation.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock background scroll while the mobile panel is open.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="oz-glass-nav sticky top-0 z-50">
      <div className="oz-container flex items-center justify-between gap-4 py-3">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex items-center gap-3 no-underline"
        >
          <Logo className="h-10 w-10 flex-none" />
          <span className="flex flex-col leading-none">
            <span className="font-semibold text-ink">{site.name}</span>
            <span className="oz-muted text-[0.75rem]">{site.strapline}</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) =>
            'children' in item && item.children ? (
              <ServicesDropdown
                key={item.href}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
                items={item.children}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="oz-nav-link"
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link href="/contact" className="oz-btn oz-btn-primary ml-2">
            Request Consultation
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="oz-btn oz-btn-secondary lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="oz-mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
          <span className="sr-only">
            {mobileOpen ? 'Close menu' : 'Open menu'}
          </span>
        </button>
      </div>

      {mobileOpen && (
        <MobileNav
          id="oz-mobile-nav"
          isActive={isActive}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </header>
  )
}

function ServicesDropdown({
  label,
  href,
  active,
  items,
}: {
  label: string
  href: string
  active: boolean
  items: readonly { label: string; href: string }[]
}) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuId = useId()

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => () => cancelClose(), [])

  // Click outside closes.
  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const focusItem = (index: number) => {
    const links = wrapperRef.current?.querySelectorAll<HTMLAnchorElement>(
      '[data-menu-item]',
    )
    if (!links || links.length === 0) return
    const clamped = (index + links.length) % links.length
    links[clamped]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const links = Array.from(
      wrapperRef.current?.querySelectorAll<HTMLAnchorElement>(
        '[data-menu-item]',
      ) ?? [],
    )
    const currentIndex = links.indexOf(document.activeElement as HTMLAnchorElement)

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) setOpen(true)
        focusItem(currentIndex + 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) setOpen(true)
        focusItem(currentIndex - 1)
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          focusItem(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          focusItem(links.length - 1)
        }
        break
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={onKeyDown}
    >
      <span className="flex items-center">
        <Link
          href={href}
          className="oz-nav-link pr-1"
          aria-current={active ? 'page' : undefined}
        >
          {label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          className="oz-nav-link -ml-2 px-2"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${label} menu`}
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{
              transform: open ? 'rotate(180deg)' : undefined,
              transition: 'transform var(--oz-dur-base) var(--oz-ease-standard)',
            }}
          />
        </button>
      </span>

      {open && (
        <ul
          id={menuId}
          className="absolute right-0 top-full z-50 m-0 min-w-[17rem] list-none p-[10px]"
          style={{
            background: 'var(--oz-glass-menu-bg)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderRadius: 'var(--oz-radius-md)',
            boxShadow: 'var(--oz-elev-4)',
          }}
        >
          {items.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                data-menu-item
                className="block rounded-[12px] px-3 py-[10px] text-[0.9rem] text-ink no-underline hover:bg-[rgba(18,37,79,.06)]"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function MobileNav({
  id,
  isActive,
  onClose,
}: {
  id: string
  isActive: (href: string) => boolean
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Focus trap + Escape.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const selector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const first = panel.querySelector<HTMLElement>(selector)
    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(selector))
      if (focusables.length === 0) return
      const firstEl = focusables[0]!
      const lastEl = focusables[focusables.length - 1]!

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      id={id}
      ref={panelRef}
      className="border-t border-[var(--oz-outline-variant)] bg-surface-lowest lg:hidden"
    >
      <nav aria-label="Main" className="oz-container flex flex-col gap-1 py-4">
        {navigation.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className="oz-nav-link w-full"
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
            {'children' in item && item.children && (
              <ul className="m-0 list-none border-l-2 border-[var(--oz-gold-300)] pl-3">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block py-2 text-[0.9rem] text-ink-muted no-underline"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <Link href="/contact" className="oz-btn oz-btn-primary mt-2">
          Request Consultation
        </Link>
      </nav>
    </div>
  )
}
