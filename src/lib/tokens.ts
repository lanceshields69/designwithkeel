import { oklchToRgb, parseOklch, rgbToHex, type Rgb } from "@/lib/color"

/**
 * Reads the light-theme color tokens out of src/styles/tokens.css text.
 * The `.dark` block is ignored. Values written as `var(--other)` are followed.
 * Used by the /design-system page and by tests that keep the hex comments in
 * tokens.css honest.
 */
export type ColorToken = {
  name: string // without the leading --
  rgb: Rgb
  hex: string // computed from the OKLCH value
  commentHex?: string // the hex written in the CSS comment, when there is one
}

export function parseColorTokens(css: string): ColorToken[] {
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/)
  if (!rootMatch) return []

  const raw = new Map<string, { value: string; commentHex?: string }>()
  for (const line of rootMatch[1].split("\n")) {
    const decl = line.match(
      /^\s*--([\w-]+):\s*([^;]+);(?:\s*\/\*\s*(#[0-9a-fA-F]{3,8})\b)?/
    )
    if (decl) {
      raw.set(decl[1], { value: decl[2].trim(), commentHex: decl[3] })
    }
  }

  const resolve = (name: string, depth = 0): Rgb | null => {
    const entry = raw.get(name)
    if (!entry || depth > 5) return null
    const ref = entry.value.match(/^var\(--([\w-]+)\)$/)
    if (ref) return resolve(ref[1], depth + 1)
    const oklch = parseOklch(entry.value)
    return oklch ? oklchToRgb(oklch.l, oklch.c, oklch.h) : null
  }

  const tokens: ColorToken[] = []
  for (const [name, entry] of raw) {
    const rgb = resolve(name)
    if (!rgb) continue
    tokens.push({
      name,
      rgb,
      hex: rgbToHex(rgb),
      commentHex: entry.commentHex?.toLowerCase(),
    })
  }
  return tokens
}
