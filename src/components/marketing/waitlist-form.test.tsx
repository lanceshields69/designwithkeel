import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { teaser } from "@/content/teaser"

import { WaitlistForm } from "./waitlist-form"

const { waitlist } = teaser
const endpoint = "https://formspree.io/f/test"

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function fill(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: waitlist.submit }))
}

describe("WaitlistForm", () => {
  it("shows 'Signups open soon' and no form when there is no endpoint", () => {
    render(<WaitlistForm />)
    expect(screen.getByText(waitlist.unavailable)).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: waitlist.submit })).toBeNull()
  })

  it("validates, links errors to fields and focuses the first invalid one", async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
    render(<WaitlistForm endpoint={endpoint} />)

    submit()

    const email = screen.getByLabelText(/Work email/)
    await waitFor(() => expect(email).toHaveFocus())
    expect(email).toHaveAttribute("aria-invalid", "true")
    const describedBy = email.getAttribute("aria-describedby")
    expect(describedBy).toBeTruthy()
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      waitlist.errors.email
    )
    expect(screen.getByLabelText(/Company/)).toHaveAttribute(
      "aria-invalid",
      "true"
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("has a honeypot that people and screen readers cannot reach", () => {
    render(<WaitlistForm endpoint={endpoint} />)
    const honeypot = document.querySelector<HTMLInputElement>(
      'input[name="_gotcha"]'
    )
    expect(honeypot).not.toBeNull()
    expect(honeypot!.tabIndex).toBe(-1)
    expect(honeypot!.closest("[hidden]")).not.toBeNull()
    expect(honeypot!.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it("sends normalized data, shows a loading state, then the thank-you message", async () => {
    let resolve!: (r: Response) => void
    const fetchMock = vi.fn(() => new Promise<Response>((r) => (resolve = r)))
    vi.stubGlobal("fetch", fetchMock)
    render(<WaitlistForm endpoint={endpoint} />)

    fill(/Work email/, "ada@example.com")
    fill(/Company/, "Acme Inc.")
    fill(/Website/, "acme.com")
    fireEvent.click(screen.getByRole("button", { name: "Both" }))
    submit()

    const sending = await screen.findByRole("button", {
      name: waitlist.sending,
    })
    expect(sending).toBeDisabled()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ]
    expect(url).toBe(endpoint)
    expect(JSON.parse(init.body as string)).toMatchObject({
      email: "ada@example.com",
      company: "Acme Inc.",
      website: "https://acme.com",
      need: "Both",
      _gotcha: "",
    })

    resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }))

    expect(await screen.findByText(waitlist.success)).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: waitlist.submit })).toBeNull()
    // The message sits inside a polite live region.
    expect(
      screen.getByText(waitlist.success).closest("[aria-live]")
    ).toHaveAttribute("aria-live", "polite")
  })

  it("shows an inline error with a retry when sending fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("{}", { status: 500 }))
      .mockResolvedValueOnce(new Response("{}", { status: 200 }))
    vi.stubGlobal("fetch", fetchMock)
    render(<WaitlistForm endpoint={endpoint} />)

    fill(/Work email/, "ada@example.com")
    fill(/Company/, "Acme Inc.")
    submit()

    const alert = await screen.findByRole("alert")
    expect(alert).toHaveTextContent(waitlist.errors.submit)

    fireEvent.click(screen.getByRole("button", { name: waitlist.retry }))
    expect(await screen.findByText(waitlist.success)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
