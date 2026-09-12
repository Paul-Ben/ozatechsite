import type { Metadata } from 'next'
import { Container, Section } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { services } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Case studies and delivered work from Ozatech Services.',
}

export default function PortfolioPage() {
  return (
    <>
      <div className="oz-hero-surface oz-watermark">
        <Container className="py-[var(--oz-space-18)]">
          <p className="oz-kicker mb-4">Portfolio</p>
          <h1 className="oz-h1 text-ink max-w-[36ch]">Case studies are on the way.</h1>
          <p className="oz-lead mt-4 max-w-[64ch]">
            We&rsquo;re preparing detailed write-ups of delivered work,
            client names, and outcomes. Until then, here&rsquo;s the kind of
            engagement each service area typically involves.
          </p>
        </Container>
      </div>

      <Section>
        <ul className="grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <article className="oz-card h-full bg-surface-lowest p-6 lg:p-8">
                <span className="oz-icon-tile mb-5">
                  <ServiceIcon name={service.icon} />
                </span>
                <h2 className="oz-h3 text-[1.0625rem] text-ink">
                  {service.title}
                </h2>
                <p className="mt-2 text-[0.9375rem] text-ink-muted">
                  {service.tagline}
                </p>
                <p className="oz-label mt-5 text-navy-700">Case study soon</p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="low">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="oz-h2 text-ink">Have a project in mind?</h2>
            <p className="oz-lead mt-3 max-w-[52ch]">
              We&rsquo;ll be the first case study for the right engagement.
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
