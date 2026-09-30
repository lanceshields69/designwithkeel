/**
 * Health check. Returns a short commit identifier so a deploy can be
 * confirmed live, but never any secret or other environment detail.
 *
 * `VERCEL_GIT_COMMIT_SHA` is set automatically by Vercel at build time from
 * the deployed commit. It is not present in local dev, so this falls back
 * to the literal string "local" there.
 */
export async function GET() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA
  const commit = sha ? sha.slice(0, 7) : "local"

  return Response.json({ status: "ok", commit })
}
