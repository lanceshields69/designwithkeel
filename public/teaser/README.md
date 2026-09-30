# Teaser assets

Everything the teaser page (`/`) loads from `public/teaser/`. Source is the
Figma file "Keel" (`LSGH1UYTD1IWPKkkFjxApl`). Images were exported from Figma
and converted to WebP for size; nothing was generated or invented.

| File                         | Used for                                     | Figma source node              | Size (px)   | Notes                                                                          |
| ---------------------------- | -------------------------------------------- | ------------------------------ | ----------- | ------------------------------------------------------------------------------ |
| `keel-logo.svg`              | Header logo                                  | `43:11034` (Logo)              | 85 x 23     | Vector.                                                                        |
| `footer-keel-logo.png`       | Footer logo                                  | `42:11015` (Image (Keel))      | 212 x 58    | Raster in Figma too, shown at 88 x 24, 70% opacity.                            |
| `raft-design-mark.svg`       | Footer Raft "r" mark                         | `47:12563` (Logo-icon)         | 34 x 34     | Vector. Decorative.                                                            |
| `hero-water.webp`            | Hero background photo                        | `50:12609` (water)             | 1920 x 1280 | Shown at 60% opacity. Decorative.                                              |
| `hero-water.mp4`             | Hero background video, plays over the photo  | `assets/brand/water.mp4`       | 5.2 MB      | From the design owner. Muted, looping, skipped for reduced motion. Decorative. |
| `keel-symbol.svg`            | Keel symbol on the water, used as a CSS mask | `51:12667` (keel-symbol)       | 104 x 106   | Vector alpha mask, filled with green 500 at 50% opacity in code. Decorative.   |
| `hero-workspace.webp`        | Hero slide 1: workspace preview, scrolls     | `assets/brand/Workspace.jpg`   | 1359 x 888  | Full-height workspace screenshot from the design owner.                        |
| `hero-brand-guide.webp`      | Hero slide 2: brand guide, scrolls           | `assets/brand/Brand-Guide.png` | 1359 x 1545 | From the design owner, not exported from Figma.                                |
| `founder-lance-shields.webp` | Founder portrait                             | `42:10920` (Container)         | 260 x 260   | Shown at 65 x 65 (2x).                                                         |
| `share-card.jpg`             | Social share image (Open Graph and Twitter)  | none (from the design owner)   | 1200 x 627  | From `assets/brand/ShareCard.jpg`.                                             |

Not images (built as real components with real text): the three product tab
mockups (Living guide, Workspace, Assistant), and all icons (lucide).

## Still missing or worth a look

- **A destination URL for "Learn about Raft Design" and the footer's "Raft
  Design" link.** Figma shows no link. The code uses `https://raftdesign.studio`,
  taken from the Raft Design site named inside the hero mockup. Confirm it in
  `src/content/teaser.ts`.
- **Social/app icons beyond the favicon** (Apple touch icon, PWA icons).
  The favicon is `src/app/icon.svg`, copied from `assets/brand/keel-favicon.svg`.
