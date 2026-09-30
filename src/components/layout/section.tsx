import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Vertical rhythm and background band for a page section. Widths are handled
// by <Container>. Colors come from semantic tokens only.
const sectionVariants = cva("py-16 md:py-24", {
  variants: {
    tone: {
      default: "bg-popover",
      surface: "bg-sidebar",
      inverse: "bg-sidebar-accent-foreground text-primary-foreground",
    },
    border: {
      none: "",
      bottom: "border-b border-border",
      top: "border-t border-border",
    },
  },
  defaultVariants: { tone: "default", border: "none" },
})

function Section({
  className,
  tone,
  border,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      className={cn(sectionVariants({ tone, border }), className)}
      {...props}
    />
  )
}

export { Section, sectionVariants }
