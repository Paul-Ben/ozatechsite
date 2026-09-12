'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { services, type ServiceSlug } from '@/lib/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({
  initialService,
}: {
  initialService?: ServiceSlug
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // Rendered once, on mount — used as a cheap "too fast to be human" spam signal.
  const [startedAt] = useState(() => Date.now())

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage(null)

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      service: String(data.get('service') ?? ''),
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? ''), // honeypot
      elapsedMs: Date.now() - startedAt,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="oz-form-card flex items-start gap-3 p-8"
      >
        <CheckCircle2
          size={24}
          className="mt-0.5 flex-none text-[var(--oz-success)]"
          aria-hidden="true"
        />
        <div>
          <h2 className="oz-h3 text-ink">Request received</h2>
          <p className="mt-2 text-ink-muted">
            Thanks — we&rsquo;ve got your request and will come back to you
            within one working day.
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={() => setStatus('idle')}
          >
            Send another request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="oz-form-card p-8" noValidate>
      {status === 'error' && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2 rounded-[var(--oz-radius-md)] p-4"
          style={{
            background: 'var(--oz-danger-container)',
            color: 'var(--oz-danger)',
          }}
        >
          <AlertCircle size={20} className="mt-0.5 flex-none" aria-hidden="true" />
          <p className="m-0 text-[0.9375rem]">{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="oz-field"
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="oz-field"
          />
        </Field>

        <Field label="Phone (optional)" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="oz-field"
          />
        </Field>

        <Field label="Service" htmlFor="service">
          <select
            id="service"
            name="service"
            defaultValue={initialService ?? ''}
            className="oz-field"
          >
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Message" htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="oz-field"
            style={{ resize: 'vertical' }}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from sighted users and keyboard/tab order, ignored by
          the vast majority of screen readers because it's removed from the a11y
          tree. A filled value means a bot filled every field it could find. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        className="mt-8"
        loading={status === 'submitting'}
      >
        Send Request
      </Button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="oz-label block mb-1">
        {label}
      </label>
      {children}
    </div>
  )
}
