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
| `Registration` | id, phone (required), email, eventId, marketingConsent, status (default "new"), createdAt — unique(email, eventId) |
| `NewsletterSubscriber` | id, email, createdAt |
| `SiteContent` | id, key, title, body, updatedAt |
| `FaqItem` | id, question, answer, sortOrder, isPublished |

## Oratoria App Router Structure

```
app/
  layout.tsx                  ← root (html/body only)
  globals.css
  (public)/                   ← route group: Header + Footer via nested layout
    layout.tsx
    page.tsx                  ← landing page
    admin/page.tsx            ← placeholder
    legal/privacy/page.tsx
    legal/terms/page.tsx
  panel/                      ← admin panel (not obvious URL)
    layout.tsx                ← sidebar (shown only when session cookie valid)
    page.tsx                  ← dashboard
    login/page.tsx            ← login form (Client Component)
    actions.ts                ← all admin server actions
    events/page.tsx           ← events list
    events/new/page.tsx       ← create event
    events/[id]/page.tsx      ← edit event
    events/_components/       ← EventForm (client), DeleteEventButton (client)
    registrations/page.tsx    ← registrations table + status update
    registrations/export/route.ts  ← CSV download route
    content/page.tsx          ← SiteContent editor
    faq/page.tsx              ← FAQ editor
    subscribers/page.tsx      ← newsletter subscribers list
  actions.ts                  ← public server actions (registration, newsletter)
middleware.ts                 ← protects /panel/* → redirects to /panel/login
lib/admin-auth.ts             ← HMAC session token utilities
```

## Admin Panel Auth

- URL: `/panel` (non-obvious, not `/admin`)
- Session: HTTP-only cookie `ora_panel` = HMAC-SHA256(ADMIN_SECRET, "oratoria-admin-v1")
- Env vars: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`
- Middleware protects all `/panel/*` routes except `/panel/login`
- No DB users — stateless session token derived from ADMIN_SECRET
- Session duration: 30 days (cookie maxAge)

## Admin Panel Routes

| Route | Feature |
|-------|---------|
| `/panel/login` | Login form |
| `/panel` | Dashboard (event/registration/subscriber counts) |
| `/panel/events` | List all events with edit/delete |
| `/panel/events/new` | Create event form |
| `/panel/events/[id]` | Edit event form |
| `/panel/registrations` | Registrations table + status select + CSV export |
| `/panel/registrations/export` | CSV download (BOM-prefixed UTF-8) |
| `/panel/content` | Edit SiteContent records + add new keys |
| `/panel/faq` | Edit/add/delete FAQ items |
| `/panel/subscribers` | Newsletter subscribers list |

## Editable SiteContent Keys (Content Admin)

| Key | Description |
|-----|-------------|
| `hero_title` | Main H1 on landing page |
| `hero_subtitle` | Subtitle paragraph |
| `slogan` | Small uppercase tagline above H1 |
| `about_title` | "О клубе" section heading |
| `about_body` | "О клубе" section text |
| `for_whom_title` | "Для кого" section heading |
| `for_whom_body` | "Для кого" section text |

New keys can be added via the "Добавить новое поле" form in the content admin.

## Oratoria Landing Page Sections

`app/(public)/page.tsx` is an async Server Component. It fetches events, FAQ, and SiteContent from Prisma in parallel, then renders:

| Section | Component | Data source |
|---------|-----------|-------------|
| Hero | `HeroSection` | `SiteContent` keys: `hero_title`, `hero_subtitle`, `slogan` + next `Event` |
| Events | `EventsSection` + `EventCard` (Client) | `Event` model (isPublished=true, dateTime≥now, asc, take 4) + inline registration form |
| Benefits | `BenefitsSection` | Static (4 items hardcoded) |
| About | `AboutSection` | `SiteContent` keys: `about_title`, `about_body`, `for_whom_title`, `for_whom_body` |
| Testimonials | `TestimonialsSection` | Hardcoded placeholder quotes |
| FAQ | `FaqSection` | `FaqItem` model (isPublished=true, orderBy sortOrder) |
| Newsletter | `NewsletterSection` | Server Action → `NewsletterSubscriber` upsert |
| Footer | `Footer` (layout) | Static: SPb, +79941021321, Telegram, VK placeholder, legal links |

All DB-driven sections have inline fallbacks so the page renders if the DB is unavailable.

### Event Registration Flow

`EventCard` (`components/EventCard.tsx`) is a Client Component. State machine per card:
- **idle** — "Записаться" button visible
- **open** — inline form expanded (phone, email, marketingConsent checkbox, submit + cancel)
- **success** — green banner "Вы зарегистрированы!" replaces the form
- **duplicate** — teal banner "Вы уже зарегистрированы" (same email+eventId already in DB)
- **validation error** — field-level messages, form stays open

Server action: `registerForEvent` in `app/actions.ts`:
- Validates phone (10–12 digits), email (regex)
- Checks event exists, is published, and dateTime ≥ now
- Creates `Registration` with `status: "new"`
- Catches Prisma P2002 (unique constraint `@@unique([email, eventId])`) → returns `duplicate: true`

`EventsSection` (Server Component) serializes `Date` fields to strings before passing to `EventCard` props.

### Contact info
- City: Санкт-Петербург
- Phone: +79941021321
- Telegram: https://t.me/@mashaclubspb
- VK: placeholder (not yet active)

## Oratoria Public Routes

| Route | Description |
|-------|-------------|
| `/` | Full public landing page (8 sections) |
| `/admin` | Placeholder ("раздел в разработке") |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of service |

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
