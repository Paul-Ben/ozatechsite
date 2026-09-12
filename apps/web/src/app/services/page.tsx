import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Container, Section } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { services } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Six defined service areas: IT consultation, web development, security, training, networking, and renewable energy.',
}

export default function ServicesPage() {
  return (
    <>
      <div className="oz-hero-surface oz-watermark">
        <Container className="py-[var(--oz-space-18)]">
          <p className="oz-kicker mb-4">What we do</p>
          <h1 className="oz-h1 text-ink max-w-[38ch]">
            Six service areas. One consistent standard.
          </h1>
          <p className="oz-lead mt-4 max-w-[64ch]">
            Every engagement starts with a clear scope, runs to a defined
            standard, and ends with something you can act on.
          </p>
        </Container>
      </div>

      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          surface={index % 2 === 0 ? 'default' : 'low'}
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="oz-icon-tile mb-5">
                <ServiceIcon name={service.icon} size={28} />
              </span>
              <h2 className="oz-h2 text-ink">{service.title}</h2>
              <p className="oz-lead mt-3">{service.tagline}</p>
              <ButtonLink href="/contact" className="mt-6">
                Request Consultation
              </ButtonLink>
            </div>

            <div className="grid gap-6 lg:col-span-7 sm:grid-cols-2">
              <div className="oz-card bg-surface-lowest p-6">
                <h3 className="oz-h3 text-ink text-[1.0625rem]">
                  What&rsquo;s included
                </h3>
                <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                  {service.does.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="mt-0.5 flex-none text-navy-700"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] text-ink-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="oz-card bg-surface-lowest p-6">
                <h3 className="oz-h3 text-ink text-[1.0625rem]">
                  What to expect
                </h3>
                <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                  {service.expects.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="mt-0.5 flex-none text-navy-700"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] text-ink-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section surface="low">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="oz-h2 text-ink">Not sure which service fits?</h2>
            <p className="oz-lead mt-3 max-w-[52ch]">
              Tell us the problem and we&rsquo;ll tell you what it takes.
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
