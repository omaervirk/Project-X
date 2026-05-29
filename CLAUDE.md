# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Project-X is a **static website** — a single-page landing page built with plain HTML,
CSS, and vanilla JavaScript. There is intentionally no framework, bundler, package
manager, or build step. The three source files are served as-is.

## Commands

There is nothing to build or compile. To work on the site:

```sh
# Serve locally (any static server works)
python3 -m http.server 8000      # http://localhost:8000

# Sanity-check the JavaScript syntax
node --check script.js
```

Open `index.html` directly in a browser for a quick look; use a local server when
testing anything that depends on a real origin.

## Architecture

The site is three files that map cleanly to concerns:

- **`index.html`** — semantic markup and all page content. Sections are anchored by
  `id` (`#features`, `#showcase`, `#faq`, `#cta`) and linked from the nav.
- **`styles.css`** — the visual system. The top `:root` block defines **design
  tokens** (colors, radius, shadow, spacing, easing). The `[data-theme="dark"]` block
  overrides those same tokens for dark mode. Everything else references the tokens via
  `var(--…)`, so theming and visual tweaks happen in one place rather than scattered
  across rules.
- **`script.js`** — progressive enhancement only; the page is fully readable without
  it. A single IIFE wires up: theme toggle (persisted to `localStorage` under
  `px-theme`, falling back to the OS `prefers-color-scheme`), the mobile nav,
  `IntersectionObserver`-driven scroll reveals and stat counters, client-side CTA form
  validation, and the footer year.

### Conventions worth keeping

- **Theme is driven by `data-theme` on `<html>`** and the `px-theme` localStorage key.
  Add new colors as tokens in both the `:root` and dark blocks rather than hard-coding.
- **Accessibility is load-bearing**: keep semantic elements, `aria-*` attributes, the
  `.sr-only` pattern, and the `prefers-reduced-motion` guard (it disables animations
  and reveals — make sure new motion respects it).
- **No dependencies.** Keep it that way unless there's a deliberate reason to change
  the stack; if you do, update this file and the README.

## Git Workflow

- Active development branch: `claude/claude-md-docs-KYEbp`.
- Default branch: `main`.
- Push with `git push -u origin <branch-name>`. Do not open a pull request unless explicitly asked.
