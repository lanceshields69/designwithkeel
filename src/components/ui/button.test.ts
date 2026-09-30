import { describe, expect, it } from "vitest"

import { buttonVariants } from "./button"

describe("buttonVariants", () => {
  it("lets a variant's border win over the base transparent border", () => {
    // Link-buttons (<a className={buttonVariants(...)}>) skip <Button>, so the
    // merge has to happen here or the border disappears.
    for (const variant of ["outline", "outline-inverse"] as const) {
      const classes = buttonVariants({ variant }).split(" ")
      expect(classes).toContain("border-border")
      expect(classes).not.toContain("border-transparent")
    }
  })

  it("keeps the transparent border for variants that have none", () => {
    expect(buttonVariants({ variant: "default" }).split(" ")).toContain(
      "border-transparent"
    )
  })
})
