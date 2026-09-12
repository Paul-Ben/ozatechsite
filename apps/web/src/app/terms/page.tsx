import type { Metadata } from 'next'
import { Container, Section } from '@/components/layout/Container'
import { contact, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that govern use of ${site.name}'s website and services.`,
}

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-[72ch] px-0">
        <p className="oz-kicker mb-4">Legal</p>
        <h1 className="oz-h1 text-ink">Terms of Service</h1>
        <p className="oz-lead mt-4">
          These terms govern your use of this website and your engagement
          with {site.name} for consulting and delivery work.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          <section>
            <h2 className="oz-h3 text-ink">Using this site</h2>
            <p className="mt-2 text-ink-muted">
              This website is provided to describe our services and to let
              you request a consultation. You agree not to misuse the site,
              including attempting to disrupt it or submit false or malicious
              information through our forms.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Consultations and quotes</h2>
            <p className="mt-2 text-ink-muted">
              Submitting the consultation form is a request for contact, not
              a contract. Scope, pricing, and timelines for any engagement
              are agreed separately and in writing before work begins.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Intellectual property</h2>
            <p className="mt-2 text-ink-muted">
              The content, design, and branding on this site belong to{' '}
              {site.name} unless stated otherwise, and may not be reproduced
              without permission.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Liability</h2>
            <p className="mt-2 text-ink-muted">
              Information on this site is provided in good faith for general
              guidance and does not replace a scoped consultation specific to
              your circumstances.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Changes to these terms</h2>
            <p className="mt-2 text-ink-muted">
              We may update these terms from time to time. Material changes
              will be reflected with an updated date on this page.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Contact</h2>
            <p className="mt-2 text-ink-muted">
              Questions about these terms can be sent to{' '}
              <a href={`mailto:${contact.email}`} className="text-navy-700 font-semibold">
                {contact.email}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="oz-label mt-12 text-[var(--oz-warning)]">
          These terms will be finalised with our registered business details
          before launch.
        </p>
      </Container>
    </Section>
  )
}
