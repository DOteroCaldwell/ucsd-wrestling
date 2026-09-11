# Dependency Reduction Roadmap

Current state: every page loads 3 external CDN resources on every visit (Tailwind, Lucide, Google Fonts), plus two embedded third-party scripts. This creates render-blocking network requests, potential privacy concerns, and a hard dependency on uptime of external services.

---

## Priority 1 — Self-host assets (high impact, low effort)

### Google Fonts → local font files
- Download the Inter font files from Google Fonts (woff2 format).
- Place them in a `/fonts` directory and replace the `<link>` tag with a `@font-face` rule in a shared CSS file.
- Eliminates a DNS lookup + request to `fonts.googleapis.com` on every page load.

### Lucide Icons → inline SVGs or local sprite
- Replace the `https://unpkg.com/lucide@latest` script tag with locally bundled SVGs.
- Option A (simple): download each used SVG from the Lucide repo and inline them directly in the HTML.
- Option B (cleaner): create a single `/icons/sprite.svg` file and reference symbols via `<use href="/icons/sprite.svg#icon-name">`.
- Only a small subset of icons is used; the full library loaded from unpkg is wasteful.

---

## Priority 2 — Bundle Tailwind CSS (medium effort, high impact)

Currently Tailwind is loaded via the CDN play script, which ships the entire ~350 KB framework and processes classes at runtime in the browser.

Steps:
1. Add Node.js tooling: `npm init`, install `tailwindcss` as a dev dependency.
2. Create `tailwind.config.js` pointed at all HTML files for content purging.
3. Create an `input.css` with `@tailwind base/components/utilities`.
4. Add an npm build script: `tailwindcss -i input.css -o dist/styles.css --minify`.
5. Replace the CDN `<script>` tag in every HTML file with `<link rel="stylesheet" href="/dist/styles.css">`.

The resulting file will be ~5–15 KB (only classes actually used), compared to the full CDN download.

---

## Priority 3 — Remove Instagram embed script (low effort)

`connect.html` loads `//www.instagram.com/embed.js` to render an embedded post. This script runs third-party code and makes several additional network requests.

Options:
- Replace the blockquote embed with a static screenshot image linking to the Instagram profile.
- Or remove the embedded post entirely and keep only the direct profile link, which already exists on the page.

---

## Non-actionable dependencies (keep as-is)

These are inherently external and cannot or should not be replaced:

| Dependency | Reason to keep |
|---|---|
| Google Calendar embed | Live calendar data; no self-hosted equivalent without a backend |
| Google Maps links | Navigation links to a real physical location |
| UCSD Recreation links | External registration system, not ours to host |
| GroupMe links | Team communication platform |
| Instagram profile link | Social media presence, just a link |

---

## Summary

| Item | Effort | Removes CDN request? |
|---|---|---|
| Self-host Inter font | Low | Yes |
| Inline Lucide SVGs | Low | Yes |
| Build Tailwind locally | Medium | Yes |
| Remove Instagram embed | Low | Yes (partial) |

Completing Priority 1 and 3 alone removes 3 of 4 runtime CDN dependencies with minimal tooling changes. Priority 2 is the most impactful for performance but requires adding a build step.
