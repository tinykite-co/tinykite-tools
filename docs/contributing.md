# Contributing

## Principles
- Keep packages DOM-free.
- Favor SOLID/DRY, readable modules.
- Each tool ships with lib + page + unit + E2E.
- Tool changes should be confined to tool-specific folders.

## Local Development
1. `pnpm install`
2. `pnpm dev`

## Generators
- `pnpm generate` to refresh registries and sitemap.

## Testing
- Unit: `pnpm test`
- E2E (after build): `pnpm build` then `pnpm test:e2e`
