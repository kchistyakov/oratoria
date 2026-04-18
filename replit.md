# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 (api-server artifact)
- **Database**: PostgreSQL + Drizzle ORM (existing lib/db) | PostgreSQL + Prisma (oratoria artifact)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle for api-server)

## Artifacts

### Оратория (`artifacts/oratoria`)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styles**: Tailwind CSS v4
- **ORM**: Prisma 6
- **Preview path**: `/`
- **Port**: 3000

### API Server (`artifacts/api-server`)
- **Framework**: Express 5
- **Preview path**: `/api`
- **Port**: 8080

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes for Drizzle (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/oratoria run dev` — run Oratoria Next.js site locally
- `pnpm --filter @workspace/oratoria run db:push` — push Prisma schema to DB
- `pnpm --filter @workspace/oratoria run db:seed` — seed demo content
- `pnpm --filter @workspace/oratoria run db:generate` — regenerate Prisma client

## Oratoria Prisma Models

| Model | Fields |
|-------|--------|
| `Event` | id, title, description, dateTime, place, price, isPublished, createdAt, updatedAt |
| `Registration` | id, phone, email, eventId, marketingConsent, status, createdAt |
| `NewsletterSubscriber` | id, email, createdAt |
| `SiteContent` | id, key, title, body, updatedAt |
| `FaqItem` | id, question, answer, sortOrder, isPublished |

## Oratoria Routes

| Route | Description |
|-------|-------------|
| `/` | Public home page (hero, events, FAQ) |
| `/admin` | Admin panel placeholder |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of service |

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
