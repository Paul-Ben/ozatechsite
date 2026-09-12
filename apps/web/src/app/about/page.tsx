import type { Metadata } from 'next'
import { Container, Section } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${site.name} — who we are and how we work.`,
}

// Team roster is not yet supplied by the client (see docs/00-executive-summary.md, Q7).
// Shown honestly as "team profiles in progress" rather than inventing names or photos.
const roles = [
  'Consulting & Strategy',
  'Engineering',
  'Security',
  'Renewable Energy',
]

export default function AboutPage() {
  return (
    <>
      <div className="oz-hero-surface oz-watermark">
        <Container className="py-[var(--oz-space-18)]">
          <p className="oz-kicker mb-4">About Ozatech</p>
          <h1 className="oz-h1 text-ink max-w-[36ch]">
            Founded {site.foundedYear}, built around clear scope and steady
            delivery.
          </h1>
          <p className="oz-lead mt-4 max-w-[64ch]">{site.description}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="oz-kicker">How we work</p>
            <h2 className="oz-h2 mt-2 text-ink">
              A consultancy that scopes before it builds.
            </h2>
            <p className="oz-lead mt-4">
              Every engagement starts with a short consultation to establish
              what success looks like, then a written scope before any work
              begins. No surprise invoices, no undefined deliverables.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <dl className="m-0 grid gap-6">
              <div>
                <dt className="oz-kicker">Founded</dt>
                <dd className="oz-h3 m-0 mt-1 text-ink">{site.foundedYear}</dd>
              </div>
              <hr className="oz-hr" />
              <div>
                <dt className="oz-kicker">Service areas</dt>
                <dd className="oz-h3 m-0 mt-1 text-ink">Six, one standard</dd>
              </div>
              <hr className="oz-hr" />
              <div>
                <dt className="oz-kicker">Engagement model</dt>
                <dd className="m-0 mt-1 text-ink-muted">
                  Scoped consultations, fixed deliverables, clear timelines.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section surface="low">
        <p className="oz-kicker">Team</p>
        <h2 className="oz-h2 mt-2 text-ink">Profiles in progress</h2>
        <p className="oz-lead mt-4 max-w-[64ch]">
          We&rsquo;re putting together individual bios and photos for the team
          below. In the meantime, here&rsquo;s the coverage across the
          practice.
        </p>

        <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <li key={role}>
              <div className="oz-card h-full bg-surface-lowest p-6 text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: 'var(--oz-icon-tile-bg)' }}
                  aria-hidden="true"
                >
                  <span className="oz-kicker text-navy-700">Oz</span>
                </div>
                <h3 className="oz-h3 text-[1rem] text-ink">{role}</h3>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="oz-h2 text-ink">Want to work with us?</h2>
            <p className="oz-lead mt-3 max-w-[52ch]">
              Tell us what you need and we&rsquo;ll come back to you within
              one working day.
            </p>
          </div>
          <ButtonLink href="/contact" className="flex-none">
            Request Consultation
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
