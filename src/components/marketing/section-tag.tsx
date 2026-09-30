import { Badge } from "@/components/ui/badge"

// The small uppercase pill above a section heading (Figma "Tag" / "DarkTag").
function SectionTag({
  children,
  inverse = false,
}: {
  children: React.ReactNode
  inverse?: boolean
}) {
  return (
    <Badge
      variant={inverse ? "outline-inverse" : "outline"}
      className="text-eyebrow"
    >
      {children}
    </Badge>
  )
}

export { SectionTag }
