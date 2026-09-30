import { expect, test } from "@playwright/test"

test("home page loads", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "The brand and design system you never had time to build.",
    })
  ).toBeVisible()
})

test("/api/health returns ok", async ({ request }) => {
  const res = await request.get("/api/health")
  expect(res.ok()).toBe(true)

  const body = await res.json()
  expect(body.status).toBe("ok")
  expect(typeof body.commit).toBe("string")
})
