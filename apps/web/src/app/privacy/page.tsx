import type { Metadata } from 'next'
import { Container, Section } from '@/components/layout/Container'
import { contact, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses, and protects your data.`,
}

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-[72ch] px-0">
        <p className="oz-kicker mb-4">Legal</p>
        <h1 className="oz-h1 text-ink">Privacy Policy</h1>
        <p className="oz-lead mt-4">
          This policy explains what information {site.name} collects when you
          use this site and how it is used.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          <section>
            <h2 className="oz-h3 text-ink">Information we collect</h2>
            <p className="mt-2 text-ink-muted">
              When you submit the consultation form, we collect your name,
              email address, optional phone number, the service you&rsquo;re
              enquiring about, and the message you send us. We don&rsquo;t
              collect payment or identity documents through this site.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">How we use it</h2>
            <p className="mt-2 text-ink-muted">
              Enquiry data is used solely to respond to your request and, if
              you become a client, to deliver the agreed work. We do not sell
              or share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Cookies</h2>
            <p className="mt-2 text-ink-muted">
              This site does not set non-essential cookies or use third-party
              tracking scripts. Any analytics or cookie use will be disclosed
              here before it is enabled, with a way to opt out.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Data retention</h2>
            <p className="mt-2 text-ink-muted">
              We keep consultation enquiries for as long as necessary to
              respond to your request and for a reasonable period afterward
              in case you follow up. You can ask us to delete your data at
              any time using the contact details below.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Your rights</h2>
            <p className="mt-2 text-ink-muted">
              You can ask what data we hold about you, request a correction,
              or ask us to delete it. Contact us using the details below and
              we&rsquo;ll respond within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="oz-h3 text-ink">Contact</h2>
            <p className="mt-2 text-ink-muted">
              Questions about this policy can be sent to{' '}
              <a href={`mailto:${contact.email}`} className="text-navy-700 font-semibold">
                {contact.email}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="oz-label mt-12 text-[var(--oz-warning)]">
          This policy will be finalised with our registered business details
          before launch.
        </p>
      </Container>
    </Section>
  )
}
