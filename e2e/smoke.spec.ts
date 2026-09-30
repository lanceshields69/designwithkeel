import { expect, test } from "@playwright/test"

test("home page loads", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.getByRole("heading", { level: 1, name: "Keel" })
  ).toBeVisible()
  await expect(page.getByText("Coming soon.")).toBeVisible()
})

test("/api/health returns ok", async ({ request }) => {
  const res = await request.get("/api/health")
  expect(res.ok()).toBe(true)

  const body = await res.json()
  expect(body.status).toBe("ok")
  expect(typeof body.commit).toBe("string")
})
