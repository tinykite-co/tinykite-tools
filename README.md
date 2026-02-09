# Tinykite Tools

A monorepo for the public Tinykite tools site. Static output is deployed to GitHub Pages and served at `tools.tinykite.co`.

## Local development
1. `pnpm install`
2. `pnpm dev`

## Build
- `pnpm build`
- Output: `apps/web/dist`

## Registries and generators
Tool, flow, and template registries are generated from per-tool/flow definition files.
- Tools: `apps/web/src/registry/tools/defs/*` -> `apps/web/src/registry/tools/generated/tools.generated.ts`
- Flows: `apps/web/src/registry/flows/defs/*` + `apps/web/src/registry/flows/injected/*` -> `apps/web/src/registry/flows/generated/flows.generated.ts`
- Templates: `apps/web/src/registry/templates/base/*.json` + `apps/web/src/registry/templates/injected/*.json` -> `apps/web/src/registry/templates/generated/templates.generated.ts`

Run:
- `pnpm generate`

## Pro content injection (deploy-time)
The deploy workflow checks out `tinykite-tools-pro` into `_pro`, then copies:
- `_pro/pro/templates` -> `apps/web/src/registry/templates/injected`
- `_pro/pro/flows` -> `apps/web/src/registry/flows/injected`

### Setup
1. Create a fine-grained PAT with **read** access to `tinykite-tools-pro`.
2. Add it to the `tinykite-tools` repo secrets as `PRO_REPO_TOKEN`.

## GitHub Pages + Custom Domain
- `apps/web/public/CNAME` is set to `tools.tinykite.co`.
- Configure DNS with a CNAME record:
  - Host: `tools`
  - Target: `tinykite-co.github.io`

## Security notes
- Secrets are not available to workflows triggered by forked pull requests.
- Deploy runs only on `main` to avoid secret exposure.

## Feedback page
- Update `apps/web/src/pages/feedback.astro` with your Google Form ID and entry IDs.
