import Link from 'next/link'
import { contact, site } from '@/lib/site'
import { Logo } from '@/components/ui/Logo'

const pageLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Request Consultation', href: '/contact' },
]

export function Footer() {
  // Rendered on the server — the old site computed this in the browser.
  const year = new Date().getFullYear()

  return (
    <footer className="oz-footer-surface oz-on-inverse mt-auto">
      <div className="oz-container oz-section-tight">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center gap-3">
              <Logo className="h-10 w-10 flex-none" />
              <div>
                <div className="font-semibold">{site.name}</div>
                <div className="text-[0.875rem] opacity-85">
                  IT, consulting, development, training, networking, security,
                  renewable energy.
                </div>
              </div>
            </div>
            <p className="max-w-[48ch] opacity-[0.86]">
              A modern, trustworthy online presence built for performance and
              clarity.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-2 text-base font-semibold text-white">Pages</h2>
            <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[0.9rem]">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="oz-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-2 text-base font-semibold text-white">Contact</h2>
            <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[0.9rem] opacity-90">
              <li>
                <a href={`mailto:${contact.email}`} className="oz-footer-link">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneHref}`} className="oz-footer-link">
                  {contact.phone}
                </a>
              </li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(0,0,0,.22)]">
        <div className="oz-container flex flex-col justify-between gap-2 py-3 text-[0.875rem] opacity-90 md:flex-row">
          <span>
            © {year} {site.name}
          </span>
          <span className="flex gap-4">
            <Link href="/privacy" className="oz-footer-link">
              Privacy
            </Link>
            <Link href="/terms" className="oz-footer-link">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
