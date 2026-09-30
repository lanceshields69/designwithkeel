import {
  Anchor,
  Bot,
  Building2,
  Code,
  FileText,
  GitBranch,
  Globe,
  Layers,
  MessageCircle,
  Palette,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

import type { IconName } from "@/content/teaser"

const icons: Record<IconName, LucideIcon> = {
  anchor: Anchor,
  bot: Bot,
  building: Building2,
  code: Code,
  "file-text": FileText,
  "git-branch": GitBranch,
  globe: Globe,
  layers: Layers,
  "message-circle": MessageCircle,
  palette: Palette,
  sparkles: Sparkles,
  users: Users,
  zap: Zap,
}

// Decorative icon from the lucide set that the shadcn preset uses.
function TeaserIcon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" className={className} />
}

export { TeaserIcon }
