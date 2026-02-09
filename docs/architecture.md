# Architecture

## Overview
- Monorepo with `pnpm` workspaces.
- `apps/web` is an Astro static site with React islands for interactive runners.
- `packages/*` contain shared, DOM-free logic (enforced by ESLint).
- Pro content is injected at deploy time and merged with base registries.

## Registries
- `apps/web/src/registry/tools.ts` defines tools and build-time paths.
- `apps/web/src/registry/flows-base.ts` + `apps/web/src/registry/flows-pro/index.ts` merge in `apps/web/src/registry/flows.ts`.
- `apps/web/src/registry/templates/index.ts` + `apps/web/src/registry/templates-pro/index.ts` merge in `apps/web/src/registry/templates-registry.ts`.

## Workers
- Web worker scaffolds live in `apps/web/src/workers` and can be wired to packages later.

## Testing
- Unit tests: `vitest` in packages.
- E2E: Playwright in `apps/web/tests/e2e`.
