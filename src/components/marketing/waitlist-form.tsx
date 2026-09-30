"use client"

import { ArrowRight } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { teaser } from "@/content/teaser"
import { needOptions, waitlistSchema } from "@/schemas/waitlist"

type Status = "idle" | "sending" | "error" | "success"
type FieldName = "email" | "company" | "website"
type Errors = Partial<Record<FieldName, string>>

const { waitlist } = teaser

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  )
}

/**
 * Waitlist form for the static teaser. It posts straight from the browser to
 * Formspree (temporary; see docs/decisions/0004). With no endpoint configured
 * it shows "Signups open soon" instead of a form that cannot work.
 */
function WaitlistForm({ endpoint }: { endpoint?: string }) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [status, setStatus] = React.useState<Status>("idle")
  const [errors, setErrors] = React.useState<Errors>({})
  const [need, setNeed] = React.useState<string[]>([])
  const focusInvalid = React.useRef(false)

  // Move focus to the first invalid field once the error state has rendered.
  React.useEffect(() => {
    if (!focusInvalid.current) return
    focusInvalid.current = false
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus()
  }, [errors])

  async function submit(form: HTMLFormElement) {
    const data = new FormData(form)
    const value = (name: string) => String(data.get(name) ?? "")

    const parsed = waitlistSchema.safeParse({
      email: value("email"),
      company: value("company"),
      role: value("role"),
      website: value("website"),
      need: need[0] ?? "",
      details: value("details"),
    })

    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key === "email" || key === "company" || key === "website") {
          next[key] ??= waitlist.errors[key]
        }
      }
      focusInvalid.current = true
      setErrors(next)
      setStatus("idle")
      return
    }

    setErrors({})
    setStatus("sending")
    try {
      const response = await fetch(endpoint as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...parsed.data, _gotcha: value("_gotcha") }),
      })
      setStatus(response.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submit(event.currentTarget)
  }

  const isSuccess = status === "success"

  return (
    <Card id="waitlist" className="scroll-mt-6 bg-sidebar lg:min-h-148">
      {/* Polite live region: announces the thank-you message when it appears. */}
      <div role="status" aria-live="polite" className="contents">
        {isSuccess ? (
          <CardContent className="flex flex-1 items-center justify-center">
            <p className="text-center text-h4 text-sidebar-accent-foreground">
              {waitlist.success}
            </p>
          </CardContent>
        ) : null}
      </div>
      {!isSuccess ? (
        <CardContent className="flex flex-col gap-4">
          <div>
            <h3 className="text-base leading-6 font-bold tracking-normal text-sidebar-accent-foreground">
              {waitlist.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {waitlist.intro}
            </p>
          </div>
          {!endpoint ? (
            <p className="text-sm font-medium text-sidebar-accent-foreground">
              {waitlist.unavailable}
            </p>
          ) : (
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="waitlist-email" className="mb-1.5">
                    {waitlist.fields.email.label} *
                  </Label>
                  <Input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={waitlist.fields.email.placeholder}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={
                      errors.email ? "waitlist-email-error" : undefined
                    }
                  />
                  <FieldError
                    id="waitlist-email-error"
                    message={errors.email}
                  />
                </div>
                <div>
                  <Label htmlFor="waitlist-company" className="mb-1.5">
                    {waitlist.fields.company.label} *
                  </Label>
                  <Input
                    id="waitlist-company"
                    name="company"
                    autoComplete="organization"
                    required
                    placeholder={waitlist.fields.company.placeholder}
                    aria-invalid={errors.company ? true : undefined}
                    aria-describedby={
                      errors.company ? "waitlist-company-error" : undefined
                    }
                  />
                  <FieldError
                    id="waitlist-company-error"
                    message={errors.company}
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="waitlist-role" className="mb-1.5">
                    {waitlist.fields.role.label}
                  </Label>
                  <Input
                    id="waitlist-role"
                    name="role"
                    autoComplete="organization-title"
                    placeholder={waitlist.fields.role.placeholder}
                  />
                </div>
                <div>
                  <Label htmlFor="waitlist-website" className="mb-1.5">
                    {waitlist.fields.website.label}
                  </Label>
                  <Input
                    id="waitlist-website"
                    name="website"
                    inputMode="url"
                    autoComplete="url"
                    placeholder={waitlist.fields.website.placeholder}
                    aria-invalid={errors.website ? true : undefined}
                    aria-describedby={
                      errors.website ? "waitlist-website-error" : undefined
                    }
                  />
                  <FieldError
                    id="waitlist-website-error"
                    message={errors.website}
                  />
                </div>
              </div>
              <div>
                <span
                  id="waitlist-need-label"
                  className="mb-2 block text-sm leading-none font-medium"
                >
                  {waitlist.fields.need.label}
                </span>
                <ToggleGroup
                  aria-labelledby="waitlist-need-label"
                  variant="outline"
                  spacing={0}
                  value={need}
                  onValueChange={setNeed}
                  className="flex-wrap"
                >
                  {needOptions.map((option) => (
                    <ToggleGroupItem key={option} value={option}>
                      {option}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div>
                <Label htmlFor="waitlist-details" className="mb-1.5 flex-wrap">
                  <span>{waitlist.fields.details.label}</span>
                  <span className="text-muted-foreground">
                    {waitlist.fields.details.optional}
                  </span>
                </Label>
                <Textarea
                  id="waitlist-details"
                  name="details"
                  className="min-h-21"
                  placeholder={waitlist.fields.details.placeholder}
                />
              </div>
              {/* Formspree honeypot: hidden from people and screen readers. */}
              <div hidden aria-hidden="true">
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>
              {status === "error" ? (
                <div
                  role="alert"
                  className="flex flex-wrap items-center gap-3 text-sm text-destructive"
                >
                  <span>{waitlist.errors.submit}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      formRef.current && void submit(formRef.current)
                    }
                  >
                    {waitlist.retry}
                  </Button>
                </div>
              ) : null}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  waitlist.sending
                ) : (
                  <>
                    {waitlist.submit}
                    <ArrowRight aria-hidden="true" data-icon="inline-end" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {waitlist.reassurance}
              </p>
            </form>
          )}
        </CardContent>
      ) : null}
    </Card>
  )
}

export { WaitlistForm }
