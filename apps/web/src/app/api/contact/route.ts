import { NextResponse } from 'next/server'
import { mkdir, appendFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'
import { isServiceSlug } from '@/lib/site'

// TEMPORARY: until the Laravel API exists (docs/04-architecture.md §2.1), this
// route is the whole pipeline — validate, spam-check, persist. Once `api` is
// live, replace the `persist()` call below with a server-side POST to
// `${API_URL}/api/v1/consultations` and leave the honeypot/shape checks here,
// per the architecture doc's "browser never talks to Laravel directly" rule.

const consultationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Enter a valid email address').max(320),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  service: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || isServiceSlug(v), 'Unknown service'),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  website: z.string().optional().or(z.literal('')), // honeypot
  elapsedMs: z.number().optional(),
})

const dataDir = path.join(process.cwd(), '.data')
const leadsFile = path.join(dataDir, 'consultations.jsonl')

async function persist(record: Record<string, unknown>) {
  await mkdir(dataDir, { recursive: true })
  await appendFile(leadsFile, JSON.stringify(record) + '\n', 'utf8')
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = consultationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid submission' },
      { status: 422 },
    )
  }

  const { name, email, phone, service, message, website, elapsedMs } = parsed.data

  // Honeypot tripped: pretend success, discard silently. Never tip off a bot.
  if (website) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  // Under 3 seconds end-to-end is very unlikely to be a human. Flag, don't drop —
  // see docs/04-architecture.md §5.3: "the single worst outcome is a real
  // enquiry vanishing."
  const isSpam = typeof elapsedMs === 'number' && elapsedMs < 3000

  try {
    await persist({
      name,
      email,
      phone: phone || null,
      service: service || null,
      message,
      is_spam: isSpam,
      created_at: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[contact] failed to persist submission', err)
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again shortly.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
