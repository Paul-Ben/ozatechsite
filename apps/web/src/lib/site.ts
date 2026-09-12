/**
 * Site content and configuration.
 *
 * PHASE 1: this file is the source of truth so the frontend can be built and
 * reviewed before the Laravel API exists. Once the API is live these become the
 * build-time fallback snapshots described in docs/04-architecture.md §3.3, and
 * `lib/api.ts` fetches the same shapes from `/api/v1/*`.
 *
 * Copy is taken from docs/01-content-inventory.md. Where that document marks a
 * string FIX or REMOVE, the corrected version is used here — the leaked-brief
 * copy ("Built for GitHub Pages", the "Objectives" section, "The PRD assumes…")
 * is deliberately NOT reproduced.
 */

export const site = {
  name: 'Ozatech Services',
  strapline: 'Founded 2024',
  foundedYear: '2024',
  description:
    'Ozatech Services delivers IT consulting, web application development, web strengthening (security), training, networking, and renewable energy solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ozatech.example',
} as const

/**
 * PLACEHOLDERS — blocking launch. See docs/00-executive-summary.md, Q1–Q3.
 * `isPlaceholder` suppresses LocalBusiness structured data and the map embed so
 * we never publish fake contact data.
 */
export const contact = {
  email: 'info@ozatech.example',
  phone: '+0 000 000 000',
  phoneHref: '+0000000000',
  hours: 'Mon–Fri · 09:00–17:00',
  address: null as string | null,
  addressIsPublic: false,
  isPlaceholder: true,
} as const

export type ServiceSlug =
  | 'consulting'
  | 'development'
  | 'security'
  | 'training'
  | 'networking'
  | 'renewable'

export type Service = {
  slug: ServiceSlug
  title: string
  /** Home page card copy */
  shortDescription: string
  /** Services page sub-line */
  tagline: string
  /** Lucide icon name */
  icon: string
  does: string[]
  expects: string[]
}

export const services: Service[] = [
  {
    slug: 'consulting',
    title: 'IT Consultation & Strategy',
    shortDescription:
      'Architecture, roadmaps, and practical guidance for growth.',
    tagline: 'Assessment, roadmaps, and guidance for decision-makers.',
    icon: 'compass',
    does: [
      'IT assessment and gap analysis',
      'Roadmaps and prioritization',
      'Vendor and tooling selection support',
    ],
    expects: [
      'Clear direction and scope',
      'Reduced operational risk',
      'Actionable next steps',
    ],
  },
  {
    slug: 'development',
    title: 'Web Application Development',
    shortDescription:
      'Modern web apps built to be fast, secure, and maintainable.',
    tagline: 'Design, build, and iterate with maintainable foundations.',
    icon: 'code',
    does: [
      'Web apps and internal tools',
      'Performance-focused UI',
      'Clean, documented handoff',
    ],
    expects: [
      'Security-first implementation',
      'Accessible, mobile-first layouts',
      'Maintainable architecture',
    ],
  },
  {
    slug: 'security',
    title: 'Web Strengthening (Security)',
    shortDescription: 'Assessments and hardening to reduce real-world risk.',
    tagline: 'Hardening, reviews, and risk reduction aligned to your context.',
    icon: 'shield-check',
    does: [
      'Security review and recommendations',
      'Hardening guidance',
      'Training-aligned best practices',
    ],
    expects: [
      'Clear findings and priorities',
      'Practical remediation steps',
      'Improved security posture',
    ],
  },
  {
    slug: 'training',
    title: 'Training Programs',
    shortDescription: 'Upskill teams with structured, outcome-based learning.',
    tagline: 'Structured sessions for teams and individuals.',
    icon: 'graduation-cap',
    does: [
      'Workshops and guided sessions',
      'Team training and enablement',
      'Hands-on exercises',
    ],
    expects: [
      'Higher confidence and capability',
      'Reduced operational errors',
      'Shared standards across teams',
    ],
  },
  {
    slug: 'networking',
    title: 'Managed Networking',
    shortDescription: 'Reliable connectivity, monitoring, and network hygiene.',
    tagline: 'Network planning, setup, monitoring, and ongoing support.',
    icon: 'network',
    does: [
      'Network planning and setup',
      'Monitoring and performance tuning',
      'Security-conscious configuration',
    ],
    expects: [
      'Improved reliability and uptime',
      'Reduced complexity for teams',
      'Safer connectivity patterns',
    ],
  },
  {
    slug: 'renewable',
    title: 'Renewable Energy Solutions',
    shortDescription:
      'Sustainable installations aligned with real operational needs.',
    tagline: 'Sustainable energy installation for long-term resilience.',
    icon: 'sun',
    does: [
      'Renewable energy installation support',
      'Site-ready planning and coordination',
      'Operational alignment and handoff',
    ],
    expects: [
      'More resilient energy strategy',
      'Reduced long-term operating costs',
      'Sustainable infrastructure pathway',
    ],
  },
]

export const serviceSlugs = services.map((s) => s.slug)

export function isServiceSlug(value: unknown): value is ServiceSlug {
  return typeof value === 'string' && serviceSlugs.includes(value as ServiceSlug)
}

export const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: services.map((s) => ({
      label: s.title,
      href: `/services#${s.slug}`,
    })),
  },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
] as const
