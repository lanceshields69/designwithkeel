import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import Page from "./page"

describe("Home page", () => {
  it("renders the Keel heading and coming-soon line", () => {
    render(<Page />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Keel" })
    ).toBeInTheDocument()
    expect(screen.getByText("Coming soon.")).toBeInTheDocument()
  })
})
