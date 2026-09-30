import { defineConfig } from "@playwright/test"

// PORT lets you run the e2e suite while something else already uses 3000.
const port = Number(process.env.PORT ?? 3000)

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${port}`,
  },
  // Runs against a production build (`next start`), not `next dev` — this
  // is what actually gets deployed, and `next dev`'s slower first-compile
  // makes CI flaky in ways a production build isn't.
  //
  // The build sets two variables so the tests can cover everything:
  // - NEXT_PUBLIC_FORMSPREE_ENDPOINT points at a fake address. Tests intercept
  //   every request to it, so nothing ever reaches the real Formspree form.
  // - SHOW_DESIGN_SYSTEM=true turns on the /design-system reference page.
  webServer: {
    command: `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/e2e-test SHOW_DESIGN_SYSTEM=true pnpm build && PORT=${port} pnpm start`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
