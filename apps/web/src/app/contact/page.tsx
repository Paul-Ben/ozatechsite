import type { Metadata } from 'next'
import { Container, Section } from '@/components/layout/Container'
import { ContactForm } from '@/components/forms/ContactForm'
import { contact, isServiceSlug } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a consultation with Ozatech Services.',
}

// Dynamic: reads ?service= to prefill the form, same as the old site's
// query-param behaviour. See docs/04-architecture.md §3, `/contact` row.
export const dynamic = 'force-dynamic'

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const serviceParam = Array.isArray(params.service)
    ? params.service[0]
    : params.service
  const initialService = isServiceSlug(serviceParam) ? serviceParam : undefined

  return (
    <>
      <div className="oz-hero-surface oz-watermark">
        <Container className="py-[var(--oz-space-18)]">
          <p className="oz-kicker mb-4">Get in touch</p>
          <h1 className="oz-h1 text-ink max-w-[32ch]">Request a consultation.</h1>
          <p className="oz-lead mt-4 max-w-[60ch]">
            Tell us what you need and how you prefer to be contacted.
            We&rsquo;ll come back to you within one working day.
          </p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm initialService={initialService} />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="oz-h3 text-ink">Other ways to reach us</h2>
            <dl className="mt-6 grid gap-6">
              <div>
                <dt className="oz-kicker">Email</dt>
                <dd className="m-0 mt-1">
                  <a href={`mailto:${contact.email}`} className="text-navy-700 font-semibold">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <hr className="oz-hr" />
              <div>
                <dt className="oz-kicker">Phone</dt>
                <dd className="m-0 mt-1">
                  <a href={`tel:${contact.phoneHref}`} className="text-navy-700 font-semibold">
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <hr className="oz-hr" />
              <div>
                <dt className="oz-kicker">Hours</dt>
                <dd className="m-0 mt-1 text-ink-muted">{contact.hours}</dd>
              </div>
            </dl>
            {contact.isPlaceholder && (
              <p className="oz-label mt-8 text-[var(--oz-warning)]">
                Contact details above are placeholders pending real business
                information.
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
