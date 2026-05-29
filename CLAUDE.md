# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current State

This repository is an empty scaffold. As of this writing it contains only:

- `README.md` — a single title line (`# Project-X`)
- `CLAUDE.md` — this file

There is no source code, build system, dependency manifest, test suite, or CI configuration yet. The git history consists of a single initial commit.

## Implications for Working Here

Because the project has not been established, there are no build, lint, or test commands to document, and no architecture to describe. When the codebase is bootstrapped, this file should be updated to capture:

- **Commands**: how to install dependencies, build, run, lint, and run the test suite (including how to run a single test).
- **Architecture**: the big-picture structure and the cross-file relationships that aren't obvious from reading any single file.
- **Conventions**: project-specific patterns and workflows that future instances should follow.

When adding the first real code, choose the stack and tooling deliberately, then document those choices here so this file stays accurate.

## Git Workflow

- Active development branch: `claude/claude-md-docs-KYEbp`.
- Default branch: `main`.
- Push with `git push -u origin <branch-name>`. Do not open a pull request unless explicitly asked.
