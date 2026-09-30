/**
 * Fails the build if UI code reaches around the design tokens.
 *
 * Keel's colors live in src/styles/tokens.css and are used through semantic
 * classes such as `bg-primary`. Files under src/components and src/app must
 * not contain raw color values (hex, rgb(), hsl(), oklch()), arbitrary Tailwind
 * color values (`bg-[#22c55e]`), or raw palette classes (`bg-green-500`,
 * `text-white`). Raw colors are allowed only in src/styles and test files.
 *
 * Run with `pnpm check:tokens`.
 */
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export type Violation = { line: number; rule: string; match: string }

const palette =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone|mist|taupe|olive|mauve"
const colorUtility =
  "bg|text|border|ring|fill|stroke|from|via|to|outline|decoration|divide|shadow|caret|accent"

const rules: { rule: string; pattern: RegExp }[] = [
  {
    rule: "raw hex color",
    pattern: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g,
  },
  {
    rule: "raw color function",
    pattern: /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/g,
  },
  {
    rule: "arbitrary Tailwind color value",
    pattern: /\b[a-z][a-z-]*-\[(?:color:|#|rgb|hsl|oklch)/g,
  },
  {
    rule: "raw Tailwind palette class",
    pattern: new RegExp(
      `\\b(?:${colorUtility})-(?:(?:${palette})-\\d{2,3}|white|black)\\b`,
      "g"
    ),
  },
]

/** Returns every token-bypassing color in `source`, with 1-based line numbers. */
export function findTokenViolations(source: string): Violation[] {
  const violations: Violation[] = []
  source.split("\n").forEach((text, index) => {
    for (const { rule, pattern } of rules) {
      pattern.lastIndex = 0
      for (const match of text.matchAll(pattern)) {
        violations.push({ line: index + 1, rule, match: match[0] })
      }
    }
  })
  return violations
}

const SCAN_DIRS = ["src/components", "src/app"]
const SCAN_FILE = /\.(?:tsx?|css|mdx?)$/
const EXEMPT_FILE = /\.(?:test|spec)\.[tj]sx?$/

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (SCAN_FILE.test(entry.name) && !EXEMPT_FILE.test(entry.name)) {
      yield full
    }
  }
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
  let failures = 0
  for (const dir of SCAN_DIRS) {
    for (const file of walk(path.join(root, dir))) {
      for (const v of findTokenViolations(readFileSync(file, "utf8"))) {
        failures++
        console.error(
          `${path.relative(root, file)}:${v.line}  ${v.rule}: ${v.match}`
        )
      }
    }
  }
  if (failures > 0) {
    console.error(
      `\ncheck:tokens found ${failures} raw color value(s). Use a semantic token (for example bg-primary) or add a token in src/styles/tokens.css.`
    )
    process.exit(1)
  }
  console.log("check:tokens: no raw colors in src/components or src/app.")
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main()
