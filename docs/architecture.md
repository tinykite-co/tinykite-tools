# Architecture

## Overview
- Monorepo with `pnpm` workspaces.
- `apps/web` is an Astro static site with React islands for interactive runners.
- `packages/*` contain shared, DOM-free logic (enforced by ESLint).
- Pro content is injected at deploy time and merged with base registries.

## Registries
- Tool definitions live in `apps/web/src/registry/tools/defs`.
- Flow definitions live in `apps/web/src/registry/flows/defs` and injected flows in `apps/web/src/registry/flows/injected`.
- Template JSON lives in `apps/web/src/registry/templates/base` and injected templates in `apps/web/src/registry/templates/injected`.
- Generator scripts emit `apps/web/src/registry/**/generated/*.generated.ts`.

## Workers
- Worker RPC utilities live in `apps/web/src/workers/rpc`.
- Task handlers live in `apps/web/src/workers/tasks`.
- Worker entries live in `apps/web/src/workers/entry`.

## Testing
- Unit tests: `vitest` in packages.
- E2E: Playwright in `apps/web/tests/e2e`.
