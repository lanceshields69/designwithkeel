import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full px-4 md:px-8", {
  variants: {
    // Widths come from the layout tokens in globals.css.
    size: {
      prose: "max-w-prose",
      content: "max-w-content",
      wide: "max-w-wide",
    },
  },
  defaultVariants: { size: "content" },
})

function Container({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props} />
  )
}

export { Container, containerVariants }
