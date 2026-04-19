# Changelog

All notable changes to Оратория are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.1.1] — 2026-04-19

### Added
- **Dashboard — ближайшее мероприятие**: a new card below the stat grid shows the
  nearest upcoming published event (title, date/time, registration count with correct
  Russian plural forms). Clicking it navigates directly to that event's registrations.
  Displays a clean empty state when no upcoming published events exist.
- **Registrations index — event cards**: `/panel/registrations` now shows cards grouped
  into two sections ("Предстоящие" and "Прошедшие") instead of a flat all-registrations
  table. Each card shows the published badge, title, date/time, place and registration
  count.
- **Per-event registrations page** (`/panel/registrations/[eventId]`): new detail page
  showing a single event's info card (title, date/time, place, price, published badge)
  and a registrations table scoped to that event only. Columns: Дата записи, Телефон,
  Email, Рассылка, Статус.
- **Per-event CSV export** (`/panel/registrations/[eventId]/export`): session-protected
  GET route that exports only that event's registrations. BOM-prefixed UTF-8,
  semicolon-delimited. Filename includes a sanitized event title slug.

### Fixed
- **StatusSelector OK-button bug**: the status `<select>` was using `defaultValue`,
  which caused React to reset the dropdown to its initial value after the Server Action
  re-rendered the parent. Switched to a controlled component (`value` + `onChange` +
  `useState`). The parent sets `key={reg.id + reg.status}` so the component remounts
  with the DB-confirmed status after each save.

---

## [1.1.0] — 2026-04-18

### Added
- Full admin panel at `/panel` (dashboard, events CRUD, registrations, content,
  FAQ, subscribers).
- Event management: create / edit / delete events with Moscow-timezone datetime
  handling.
- Registration management: flat table with status selector and global CSV export.
- Content editor: save page texts with success redirect.
- FAQ editor: add / delete FAQ items.
- Subscribers list.

### Fixed
- Moscow timezone parsing: `datetime-local` input values are appended with `+03:00`
  before being stored, so all event times are correctly treated as MSK.
- Cascade delete: deleting an event now removes its registrations first (Prisma
  `onDelete: Cascade`).
- Price `NaN` guard: empty price field is stored as `0` instead of `NaN`.
- Content saved banner redirect: banner shown on correct page after save.
- Sidebar active state: extracted `SidebarNavLinks` as a Client Component using
  `usePathname()` so the active link highlights correctly on every navigation.
- Login redirect for logged-in users: `/panel/login` now redirects to `/panel` if
  the session cookie is already valid.
- Status whitelist validation: `updateRegistrationStatus` rejects unknown status
  values with a 400 error.

---

## [1.0.1] — 2026-04-17

### Fixed
- Minor type and lint corrections after initial release.

---

## [1.0.0] — 2026-04-17

### Added
- Public landing page: hero, about, schedule, FAQ, registration form.
- Registration form with phone, email, marketing consent, server-side validation.
- Prisma schema: `Event`, `Registration`, `SiteContent`, `FaqItem`, `Subscriber`.
- Next.js 15 App Router, TypeScript, Tailwind CSS v4.
- Session-based admin auth (HMAC-SHA256, HTTP-only cookie, no third-party auth).
- Seed script for demo content.
- Environment variables via `.env.local` (portable, no Replit-specific auth).
