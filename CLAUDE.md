# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Project-X is a **static marketing website** for a developer platform — plain HTML,
CSS, and vanilla JavaScript with no framework, bundler, or build step. The three
source files are served as-is.

## Commands

```sh
# Serve locally (any static server works)
python3 -m http.server 8000      # http://localhost:8000

# Sanity-check the JavaScript
node --check script.js

# Query the installed design-intelligence skill
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <style|color|typography|landing|ux|chart|product>
```

There is nothing to compile. Open `index.html` directly for a quick look; use a
local server when testing anything origin-dependent.

## Architecture

Three files map cleanly to concerns:

- **`index.html`** — semantic markup. Sections are anchored by `id`
  (`#features`, `#metrics`, `#testimonials`, `#cta`) and linked from the nav.
- **`styles.css`** — the visual system. The `:root` block holds **design tokens**
  (color, type, radius, shadow, spacing, motion); `[data-theme="light"]` overrides
  the same tokens for the light variant. Everything else references them via
  `var(--…)`, so theming and visual changes happen in one place.
- **`script.js`** — progressive enhancement only (the page is readable without it).
  One IIFE wires up: theme toggle (persisted to `localStorage` as `px-theme`,
  dark default, falling back to `prefers-color-scheme`), mobile nav, the staggered
  hero/console load, `IntersectionObserver` scroll reveals and stat counters,
  client-side form validation, and the footer year.

## Design System (how the look was decided)

The aesthetic is **"engineering blueprint"** and is the product of two skills —
preserve both when editing:

1. **`ui-ux-pro-max`** (installed under `.claude/skills/`, data/scripts in
   `src/ui-ux-pro-max/`) defines the *structure and rules*: social-proof landing
   pattern, semantic SaaS token set, type scale, spacing, motion durations, and
   accessibility requirements.
2. **`frontend-design`** (system skill at `/mnt/skills/public/frontend-design`)
   defines the *bold direction*: committed dark blueprint theme, distinctive fonts
   (Bricolage Grotesque / IBM Plex Sans / JetBrains Mono), dominant color + sharp
   lime accent, grain + grid atmosphere, and the deploy-console signature element.

### Installed skill library

`.claude/skills/` also holds the official Anthropic skill set (from
[anthropics/skills](https://github.com/anthropics/skills)) — e.g. `frontend-design`,
`canvas-design`, `theme-factory`, `skill-creator`, `mcp-builder`, `webapp-testing`,
`web-artifacts-builder`, `claude-api`, plus the document skills `docx`, `pdf`,
`pptx`, `xlsx`. Most are Apache-2.0; the four document skills are source-available
(see each skill's `LICENSE.txt`). These are general-purpose tools, not specific to
this site's build.

### Conventions worth keeping

- **Theme** is driven by `data-theme` on `<html>` and the `px-theme` localStorage
  key. Add colors as tokens in both the `:root` and `[data-theme="light"]` blocks,
  never hard-coded.
- **Accessibility is load-bearing** (from `ui-ux-pro-max`): keep semantic markup,
  `aria-*`, the `.sr-only` and `.skip-link` patterns, visible `:focus-visible`
  rings, ≥44px touch targets, **SVG icons (never emoji)**, and the
  `prefers-reduced-motion` guard (it disables animation and forces revealed content
  visible — new motion must respect it).
- **No dependencies.** Keep it that way; if the stack changes, update this file and
  the README.
- **Previews** (`preview-*.png`) are rendered with Playwright at
  `/opt/pw-browsers`; regenerate them after notable visual changes.

## Git Workflow

- Active development branch: `claude/claude-md-docs-KYEbp`.
- Default branch: `main`.
- Push with `git push -u origin <branch-name>`. Do not open a pull request unless explicitly asked.
