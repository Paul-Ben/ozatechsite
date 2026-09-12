import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Section } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { services, site } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <div className="oz-hero-surface oz-watermark">
        <Container className="py-[var(--oz-space-24)]">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="oz-kicker mb-4">The Digital Architect</p>
              <h1 className="oz-display text-ink">
                Expert IT Solutions, Strengthened Web Applications, and
                Sustainable Energy for Everyone.
              </h1>
              <p className="oz-lead mt-6 max-w-[60ch]">
                Ozatech Services is your trusted partner for consultation,
                development, security, training, networking, and renewable
                energy installation.
              </p>

              {/*
                The old hero carried three chips, one of which read
                "Built for GitHub Pages" — a hosting detail sold as a benefit.
                Replaced with claims about the business.
                See docs/01-content-inventory.md §2.1.
              */}
              <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
                <li className="oz-chip">Six service areas</li>
                <li className="oz-chip">Security-minded</li>
                <li className="oz-chip">Founded {site.foundedYear}</li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Request Consultation</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore Services
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="p-8"
                style={{
                  background: 'rgba(255,255,255,.70)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  borderRadius: 'var(--oz-radius-xl)',
                  boxShadow: 'var(--oz-elev-3)',
                }}
              >
                <dl className="m-0 grid gap-6">
                  <div>
                    <dt className="oz-kicker">Founded</dt>
                    <dd className="oz-h3 m-0 mt-1 text-ink">
                      {site.foundedYear}
                    </dd>
                  </div>
                  <hr className="oz-hr" />
                  <div>
                    <dt className="oz-kicker">Focus</dt>
                    <dd className="oz-h3 m-0 mt-1 text-ink">
                      Professional Services
                    </dd>
                  </div>
                  <hr className="oz-hr" />
                  <div>
                    <dt className="oz-kicker">What you get</dt>
                    <dd className="m-0 mt-1 text-ink-muted">
                      Clear scope, strong delivery, and outcomes that hold up
                      under scrutiny.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ---------------- Services overview ---------------- */}
      <Section surface="low">
        <p className="oz-kicker">Capabilities</p>
        <h2 className="oz-h2 mt-2 text-ink">
          Six service areas. One consistent standard.
        </h2>
        <p className="oz-lead mt-4 max-w-[68ch]">
          Dedicated, detailed coverage across consulting, development, web
          strengthening (security), training, networking, and renewable energy.
        </p>

        <ul className="mt-10 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <article className="oz-card relative h-full bg-surface-lowest p-6 lg:p-8">
                <span className="oz-icon-tile mb-5">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="oz-h3 text-ink">
                  {/* Stretched link: the accessible name is the title, not the card */}
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-ink no-underline after:absolute after:inset-0 after:content-['']"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.9375rem] text-ink-muted">
                  {service.shortDescription}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-semibold text-navy-700"
          >
            View all services
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </p>
      </Section>

      {/* ---------------- Why Ozatech ----------------
          Replaces the old "Objectives" section, which published the project
          brief as marketing copy. See docs/01-content-inventory.md §2.3. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="oz-kicker">Why Ozatech</p>
            <h2 className="oz-h2 mt-2 text-ink">
              Clear scope, strong delivery, outcomes that hold up.
            </h2>
            <p className="oz-lead mt-4">
              Six defined service areas, one standard of delivery. You&rsquo;ll
              know what you&rsquo;re buying, what you&rsquo;ll get, and when.
            </p>

            <dl className="mt-8 grid gap-6">
              <div>
                <dt className="oz-h3 text-ink">Decision-ready</dt>
                <dd className="m-0 mt-1 text-ink-muted">
                  Findings, priorities and next steps you can act on — not a
                  report that sits unread.
                </dd>
              </div>
              <div>
                <dt className="oz-h3 text-ink">One conversation to start</dt>
                <dd className="m-0 mt-1 text-ink-muted">
                  Tell us the problem; we&rsquo;ll tell you what it takes.
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="oz-form-card p-8">
              <p className="oz-kicker">Quick start</p>
              <h2 className="oz-h3 mt-2 text-ink">Request a consultation</h2>
              <p className="mt-2 text-ink-muted">
                Tell us what you need and how you prefer to be contacted.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Open Booking Form</ButtonLink>
                <ButtonLink href="/portfolio" variant="secondary">
                  Browse Portfolio
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Closing CTA ---------------- */}
      <Section surface="low">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="oz-h2 text-ink">Ready to get started?</h2>
            <p className="oz-lead mt-3 max-w-[52ch]">
              Tell us what you need and we&rsquo;ll come back to you within one
              working day.
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
