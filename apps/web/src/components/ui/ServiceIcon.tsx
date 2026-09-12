import {
  Compass,
  Code,
  ShieldCheck,
  GraduationCap,
  Network,
  Sun,
  Circle,
  type LucideIcon,
} from 'lucide-react'

const registry: Record<string, LucideIcon> = {
  compass: Compass,
  code: Code,
  'shield-check': ShieldCheck,
  'graduation-cap': GraduationCap,
  network: Network,
  sun: Sun,
}

export function ServiceIcon({
  name,
  size = 24,
}: {
  name: string
  size?: number
}) {
  const Icon = registry[name] ?? Circle
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />
}
