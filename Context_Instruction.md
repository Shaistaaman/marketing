# Context & Instructions — Skylife Serverless Backend

**Audience:** a coding agent picking up this project to build the backend.
**Goal:** stand up a serverless backend (AWS SAM) behind the existing marketing SPA — API Gateway + Lambda + Cognito + RDS PostgreSQL + EventBridge + SQS + SNS + SES, fronted by CloudFront.

Read this whole file before writing code. It tells you what already exists, what does **not**, the traps specific to this codebase, and the order to build in.

---

## 0. Toolchain & versions (frontend, verified from `package.json` + lockfile)

Match the backend to these so both halves share one Node/TS baseline.

| Tool                     | Version in use                                             | Notes                                                                                                                                                                                                                                                     |
| ------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Node.js**              | **22 LTS** (`.nvmrc` = `22`; `engines.node` = `>=20.19.0`) | Run `nvm use` in `marketing/`. The dev machine happens to run Node 23, but **CI and the backend must use 22 LTS** — AWS build/Lambda runtimes standardise on LTS, and odd-numbered Node releases are not LTS. Target the **`nodejs22.x`** Lambda runtime. |
| **npm**                  | 10.x                                                       | Ships with Node 22.                                                                                                                                                                                                                                       |
| **React**                | **19.3.0**                                                 | `react` + `react-dom`.                                                                                                                                                                                                                                    |
| **react-router-dom**     | **7.18.4**                                                 | Routes rank by specificity, not declaration order.                                                                                                                                                                                                        |
| **Vite**                 | **8.3.0**                                                  | Build tool; outputs static `dist/`.                                                                                                                                                                                                                       |
| **TypeScript**           | **6.0.3**                                                  | `strict` **and** `noUncheckedIndexedAccess` are on — array/record access is `T                                                                                                                                                                            | undefined`. Keep both on in the backend. |
| **Tailwind CSS**         | **4.3.3**                                                  | Config-less (`@tailwindcss/vite`); theme in `src/index.css`.                                                                                                                                                                                              |
| **motion**               | **13.4.0**                                                 | Imported as `motion/react`.                                                                                                                                                                                                                               |
| **i18next**              | **26.4.2**                                                 | Internationalization framework. See §13 for UI chrome translation setup.                                                                                                                                                                                  |
| **react-i18next**        | **17.0.15**                                                | React bindings for i18next. All components use `useTranslation()` → `t("key")`. See §13.                                                                                                                                                                  |
| **lucide-react**         | **1.47.0**                                                 | UI icons.                                                                                                                                                                                                                                                 |
| **react-icons**          | **5.7.0**                                                  | Brand/social marks.                                                                                                                                                                                                                                       |
| **@vitejs/plugin-react** | **6.1.1**                                                  |                                                                                                                                                                                                                                                           |
| **ESLint**               | **10.11.0**                                                | Flat config; `react-refresh/only-export-components` is enforced (don't mix component + non-component exports in one file).                                                                                                                                |
| **AWS SAM CLI**          | **1.141.0** (installed on this machine)                    | Use for the backend in `backend/`.                                                                                                                                                                                                                        |

> Versions above are what is **currently resolved** in `node_modules`. If you upgrade, re-verify with `npm ls <pkg>` and update this table — do not guess.

---

## 1. Where you are

```
skylife/
├── marketing/          ← THIS folder. React SPA (Vite). The frontend. Done.
└── apps/marketing/     ← Original Next.js version. Reference only. Do not build on it.
```

You are working in `marketing/`. See `marketing/README.md` for the frontend in detail. This document is about everything the SPA talks to, which today is **nothing**.

### Current state of the frontend — verified facts

- **Zero network calls.** No `fetch`, no `axios`, no `import.meta.env`, no `process.env` anywhere in `src/`. Confirm with:
  ```bash
  grep -rn "fetch(\|axios\|import.meta.env\|process.env" src/    # returns nothing today
  ```
- **All content is typed mock data** under `src/data/` (`properties.ts`, `experiences.ts`, `packages.ts`, `imageMap.ts`), each with a `find*` lookup that falls back to a default record.
- **Six form handlers are the only integration points.** They validate input and show a success state but submit nowhere. These are the exact files you will wire to the API:

  | File                                             | Flow                  | Becomes                        |
  | ------------------------------------------------ | --------------------- | ------------------------------ |
  | `src/pages/collections/PropertyDetailPage.tsx`   | Property stay request | `POST /v1/booking-requests`    |
  | `src/pages/experiences/ExperienceDetailPage.tsx` | Experience request    | `POST /v1/experience-requests` |
  | `src/pages/packages/PackagesPage.tsx`            | Package dream-journey | `POST /v1/package-inquiries`   |
  | `src/pages/owner/OwnerPage.tsx`                  | Owner application     | `POST /v1/owner-applications`  |
  | `src/pages/owner/sections/OwnerBenefits.tsx`     | Owner valuation       | `POST /v1/valuation-requests`  |
  | `src/pages/owner/sections/OwnerCTA1.tsx`         | Newsletter subscribe  | `POST /v1/subscriptions`       |

- **Search + availability is UI-only.** `CollectionsSection.tsx` filters a static array client-side. Real availability search is a backend endpoint you will build.
- **Media (video) already comes from S3.** `src/lib/constants.ts` → `S3_BASE` + `VIDEO.homepageHero`. Images are still bundled in `public/images` (~170 MB, uncompressed — a known cleanup item, see README).

**Do not rip out the mock data.** Keep it as the fallback/seed while the API comes online. Introduce a data-access layer so pages can switch from mock to API behind one interface.

---

## 2. Business rules that drive the design

These come from earlier product decisions and are non-negotiable constraints:

1. **Request-to-book, not instant-book.** A guest submits a _request_; the admin team responds within ~2 hours and confirms manually. No payment moves at request time. This is why the frontend modals say "responds within 2 hours" and generate reference codes rather than confirming a booking.
2. **Two property sources.** Some properties are internal (availability lives in our DB); some are managed via **Krossbooking** (availability comes from their API). A `source` discriminator column must exist on properties.
3. **iCal availability.** Properties expose iCal feeds that must be refreshed on a schedule so search shows only genuinely-available listings. **Never fetch iCals inside a search request** — search reads the DB; a background job writes the DB.
4. **Double-booking prevention** happens at the DB level (exclusion constraint) plus a row lock at the moment of admin approval — not in application code alone.
5. **Roles:** `admin`, `owner`, `agent`, `client`. These map to Cognito groups. `admin` reviews/approves; `owner` sees their properties and financials; `agent` browses and books for clients; `client` searches and requests.

---

## 3. Target architecture

![Skylife Serverless Target Architecture](kiro-artifact://29d88c0a-eb0c-42a0-a9af-25b9758ef5f5)

### Component responsibilities

| Component                  | Role                                                                                                                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CloudFront + WAF**       | Single entry. Serves the SPA and media from S3, proxies `/v1/*` to API Gateway. WAF for rate-limiting login/enquiry paths. **Must** map 403/404 → `/index.html` (200) for SPA deep links. |
| **S3 (site)**              | `dist/` static build output.                                                                                                                                                              |
| **S3 (media)**             | Images and video. Origin Access Control, not public. Presigned PUT for future admin uploads.                                                                                              |
| **API Gateway (HTTP API)** | `/v1/*` routes. JWT authorizer backed by Cognito for protected routes; public routes for search + enquiry submission.                                                                     |
| **Cognito User Pool**      | Auth. Groups `admin`/`owner`/`agent`/`client`. Pre-token-generation trigger injects role claims.                                                                                          |
| **Lambda (SAM)**           | See function list below.                                                                                                                                                                  |
| **RDS PostgreSQL**         | System of record. **Behind RDS Proxy** (mandatory with Lambda — connection pooling). `db.t4g.micro` to start.                                                                             |
| **EventBridge Scheduler**  | Cron that triggers the iCal refresh fan-out (every 15–30 min).                                                                                                                            |
| **SQS + DLQ**              | One message per feed to sync; decouples the schedule from the workers; DLQ for poison messages.                                                                                           |
| **SNS**                    | SES bounce/complaint notifications; internal fan-out for new-request alerts.                                                                                                              |
| **SES**                    | Transactional email (request confirmations, admin alerts). Domain-verified, DKIM, production access (out of sandbox).                                                                     |

### Lambda functions

| Function           | Trigger          | Does                                                                                                                                                                         |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search-fn`        | API GET          | Availability search — reads `property_availability` in the DB only. Fast, public.                                                                                            |
| `requests-fn`      | API POST         | Handles the 6 enquiry/booking-request submissions; writes rows, emits SNS.                                                                                                   |
| `admin-fn`         | API (JWT, admin) | Property/experience/package CRUD; **booking approval** (row lock + live re-check + confirm).                                                                                 |
| `ical-fanout`      | EventBridge      | Enqueues one SQS message per active iCal feed (with jitter).                                                                                                                 |
| `ical-sync-worker` | SQS              | Fetches + parses one feed (conditional request via stored ETag), upserts `property_availability`, records a `sync_runs` row. Also handles Krossbooking-sourced availability. |
| `notify-fn`        | SNS / API        | Sends SES email; writes in-app notification rows.                                                                                                                            |

---

## 4. Data model (starting point)

Design real migrations; this is the shape, not final DDL.

- `users` — mirrors Cognito sub; role, profile.
- `properties` — includes `source` (`internal` | `krossbooking`), `max_guests`, region, specs.
- `property_images` — **child rows, not columns** (variable image counts; one row per photo, `position`, `status`).
- `property_availability` — `(property_id, date, is_available, source, synced_at)`, PK `(property_id, date)`. Written idempotently via `UPSERT ON CONFLICT`, never delete-then-insert.
- `ical_feeds` — feed URL per property, stored `etag`/`last_modified` for conditional requests.
- `sync_runs` — one row per sync attempt (observability).
- `booking_requests` — `status` (`pending`/`approved`/`rejected`/`expired`), dates, guests.
- `bookings` — confirmed. Add the overlap guard:
  ```sql
  CREATE EXTENSION IF NOT EXISTS btree_gist;
  ALTER TABLE bookings ADD CONSTRAINT no_overlap
    EXCLUDE USING gist (
      property_id WITH =,
      daterange(check_in, check_out, '[)') WITH &&
    );
  ```
- `enquiries` — experience/package/owner/valuation/newsletter submissions (or split per type).
- `notifications` — in-app notification feed (poll from the portal; no WebSockets initially).

**Availability search query** (the shape `search-fn` runs):

```sql
SELECT p.* FROM properties p
WHERE p.max_guests >= :guests
  AND NOT EXISTS (
    SELECT 1 FROM property_availability a
    WHERE a.property_id = p.id
      AND a.date >= :check_in AND a.date < :check_out
      AND a.is_available = false
  );
```

---

## 5. Booking approval — the one flow to get exactly right

Search may be up to ~30 min stale (fine — a stale hit just becomes a request the admin declines). Correctness lives at **approval**, in `admin-fn`:

1. Open a transaction.
2. `SELECT ... FOR UPDATE` on the property's availability for the requested range.
3. **Live re-check:** re-fetch that one property's iCal (or call Krossbooking's confirm endpoint). One property, one fetch — never all properties, never during search.
4. Verify still free; insert the `bookings` row (the exclusion constraint is the backstop).
5. Auto-reject any other overlapping `pending` requests, surfacing that to the admin.
6. Commit; emit confirmation email via `notify-fn`.

Wrap Krossbooking calls in timeout + retry-with-backoff + circuit breaker so their outage degrades to "call to confirm," not a broken flow.

---

## 6. SAM project layout to create

Build alongside, not inside, the SPA:

```
skylife/
├── marketing/          ← SPA (this folder)
└── backend/            ← NEW: SAM app
    ├── template.yaml   ← SAM: API, functions, Cognito, RDS Proxy, EventBridge, SQS, SNS, SES, IAM
    ├── samconfig.toml  ← per-env (staging/prod) deploy config
    ├── src/
    │   ├── handlers/   ← search-fn, requests-fn, admin-fn, ical-fanout, ical-sync-worker, notify-fn
    │   ├── lib/        ← db client (pooled, RDS Proxy), cognito verify, ses client, krossbooking client
    │   └── db/         ← migrations + seed (seed from marketing/src/data as fixtures)
    └── events/         ← sample event JSON for `sam local invoke`
```

### Conventions

- **TypeScript + Node 22** — match the frontend baseline in §0. Target the `nodejs22.x` Lambda runtime, keep `strict` + `noUncheckedIndexedAccess` on, and bundle with `esbuild` via SAM `Metadata.BuildMethod: esbuild`.
- **RDS Proxy is mandatory.** Lambda + Postgres exhausts connections without it. Keep pool size tiny per container.
- **Secrets in SSM Parameter Store SecureString** (DB creds, Krossbooking key) until rotation is actually needed; then Secrets Manager.
- **CloudWatch log retention set at creation** (14–30 days) on every function — the default is "never expire" and leaks cost.
- **Least-privilege IAM per function.** `search-fn` reads; `ical-sync-worker` writes availability; only `notify-fn` calls SES; etc.
- **Migrations run as a one-off gated step** in the pipeline, never on container start.
- Region **eu-west-1** (traffic is Europe-weighted; cheapest full-featured EU region).

---

## 7. Wiring the SPA to the API

> Locale-aware content responses (§11.2) apply to every `GET` endpoint below that returns property/experience/package data — accept `?locale=` and join the relevant `*_translations` table.

1. Add a typed API client in `src/lib/api.ts`. Base URL from `import.meta.env.VITE_API_BASE_URL` (Vite exposes only `VITE_`-prefixed vars to the client). Add `.env.example`.
2. Introduce a data-access seam: pages import from a service module, not from `src/data/*` directly. The service returns mock data when no API URL is set, real data otherwise. This keeps the site buildable/demoable without a backend and makes the cutover incremental.
3. Wire the six form handlers (table in §1) to their `POST` endpoints. Keep the existing success states and reference codes; the server should return the reference id.
4. Replace `CollectionsSection` client-side filtering with a call to `search-fn` once it exists.
5. Store Cognito tokens in **httpOnly Secure SameSite cookies** for the portal; the marketing site is mostly public and needs auth only for owner/agent areas (which live in the separate portal app, not here).

---

## 8. Build order (each step deployable)

1. **DB + migrations.** RDS + Proxy in SAM; schema + exclusion constraint; seed from mock data.
2. **Public read path.** `search-fn` + `GET /v1/properties`, `/v1/experiences`, `/v1/packages`. Point the SPA's read layer at it behind the env flag.
3. **Enquiry writes.** `requests-fn` + the 6 `POST` routes + SES confirmations + SNS admin alert. Wire the six modals.
4. **Auth.** Cognito user pool, groups, JWT authorizer, pre-token trigger. Protect admin routes.
5. **iCal sync.** EventBridge → `ical-fanout` → SQS → `ical-sync-worker` writing `property_availability`. DLQ + alarm.
6. **Booking approval.** `admin-fn` approval transaction (§5) + Krossbooking client.
7. **Observability + hardening.** WAF rules, CloudWatch alarms (5xx, DLQ depth, SES bounce rate, RDS storage), log retention, cost tags.

---

## 9. Guardrails / do-nots

- **Do not** fetch iCals or call Krossbooking inside a search request.
- **Do not** connect Lambda directly to RDS without RDS Proxy.
- **Do not** delete-then-reinsert availability rows; upsert idempotently.
- **Do not** move 20 MB images through Lambda; uploads use presigned S3 PUT.
- **Do not** trust client-side role checks; re-verify the Cognito claim server-side on every protected route.
- **Do not** commit secrets; use SSM/Secrets Manager, `.env` stays gitignored.
- **Do not** skip the CloudFront 403/404 → `/index.html` mapping, or SPA deep links 404 in prod.
- **Do not** build on `apps/marketing/` (the old Next.js app); it is reference only.

---

## 11. Internationalization — UI chrome vs. content, and how they differ

The site supports English and Italian today, with more languages possible later. **This is implemented in two separate systems that must not be conflated.**

### 11.1 UI chrome (buttons, nav, labels, form fields) — already implemented, frontend-only

Static interface strings are handled entirely client-side via **`react-i18next`**:

- Resource files: `src/i18n/locales/en.json`, `src/i18n/locales/it.json`. Flat/nested key structure, e.g. `nav.stay`, `search.checkIn`.
- Single shared language state via the i18next instance — **do not** reintroduce a local `useState<Language>` in any component. The bug this replaced was exactly that: `NavigationHeader` and `ExperiencesPage` each held their own independent language state, so switching language in the header did nothing anywhere else.
- Persisted to `localStorage`; default is English on first visit (no browser-detection auto-switch).
- `<html lang>` is kept in sync with the active language.
- Components read strings via `useTranslation()` → `t("key")`. Never hardcode new UI copy directly in JSX going forward — add a key to both locale files instead.
- Italian strings were **AI-drafted and are pending native review** before this is treated as launch-ready. Check with the team before shipping the Italian UI to production; do not assume the `it.json` copy is final.

This system has **no backend dependency**. It ships from the SPA alone. Do not build an API for UI chrome strings.

### 11.2 Property / experience / package content — backend work, not yet built

Content (property titles, descriptions, experience highlights, package details) currently lives in `src/data/*` as **English-only mock data**. Translating this requires the database, which does not exist yet. When you build it (§4), do **not** use per-language columns.

**Rejected approach — columns per language:**

```sql
title_en VARCHAR, title_it VARCHAR, title_fr VARCHAR, ...
```

Adding a language means `ALTER TABLE` across every translatable table and field. With ~5–8 translatable fields per entity × 3 entity types, each new language is 15–25 new columns. Rejected — does not scale.

**Chosen approach — translations table per entity (Pattern 3, the standard i18n pattern):**

```sql
-- Language-neutral facts stay on the base table
properties (
  id, source, max_guests, beds, baths, price_per_night, region, ...
)

-- Everything that varies by language lives here
property_translations (
  property_id  BIGINT REFERENCES properties(id),
  locale       VARCHAR(5),       -- 'en', 'it', 'fr', ...
  title        VARCHAR,
  description  TEXT,
  inside_details       TEXT,
  terrace_details      TEXT,
  neighborhood_details TEXT,
  highlights   JSONB,            -- short string arrays: OK as JSONB inside a translations row
  PRIMARY KEY (property_id, locale)
);
```

Same shape for `experience_translations` and `package_translations`, keyed by their respective entity id + `locale`.

**Why this pattern specifically:**

- Adding a language is a data-seeding task (translate + `INSERT`), never a migration. This is the direct answer to "how does the schema grow with more languages" — it doesn't; only row count in the `*_translations` tables grows.
- Locale is filterable and indexable as a real column (`WHERE locale = 'it'`), unlike JSONB-per-field (`title->>'it'`), and per-language full-text search (`tsvector`) works cleanly.
- Matches how the API should respond: `GET /v1/properties?locale=it` joins `properties` to `property_translations WHERE locale = :locale`. **Fall back to `en` when the requested locale row doesn't exist yet** — never return a blank field because a translation hasn't been done.
- The response shape the API returns is the same flat `{ title, description, ... }` object the frontend already expects from `src/data/*` — the frontend does not need to know a translations table exists.

**JSONB is acceptable only for one thing:** short string arrays inside a translation row that are never searched individually (e.g. `highlights: string[]`). Do not use JSONB for the entity's core translatable fields (title, description) — those get real columns in the translations table for indexing and search.

### 11.3 Do not confuse the two systems

- UI chrome → `i18next` resource JSON, ships today, no backend.
- Entity content → `*_translations` tables, ships when the backend/DB is built, keyed by `locale`.
- Both use the same two-letter `locale` values (`en`, `it`) so the frontend's active i18next language can be passed straight through as the API's `?locale=` param with no translation layer of its own.

---

## 12. Verify before calling any step done

- `sam validate` and `sam build` pass.
- New endpoints return expected shapes (`sam local invoke` with `events/` fixtures, or deployed smoke tests).
- Availability search returns fast and touches no external system.
- The booking-approval transaction is covered by a concurrency test proving two overlapping approvals cannot both succeed.
- The SPA still builds (`npm run build` in `marketing/`) and works with the API URL unset (mock fallback) and set (live).
- CloudWatch log retention is finite on every new log group.

---

## 13. Frontend internationalization implementation (completed)

### 13.1 i18next setup

- **Library:** `react-i18next` v17.0.15 (UI strings only, no backend).
- **Locales:** English (`en`) and Italian (`it`), stored in `src/i18n/locales/en.json` and `src/i18n/locales/it.json`.
- **Initialization:** `src/i18n/index.ts` configures i18next with browser language detection and localStorage persistence.
- **HTML sync:** Active language is synced to `<html lang>` attribute in real time.

### 13.2 Adding UI chrome translations

**Pattern:** Every new UI string must:

1. Be added to both `en.json` and `it.json` with the same key structure.
2. Be read via `const { t } = useTranslation()` in the component.
3. Be called as `t("namespace.key")` in JSX — never hardcode strings.

**Example:** To add a new button:

```tsx
// ❌ Wrong
<button>Click Me</button>;

// ✅ Correct
const { t } = useTranslation();
<button>{t("common.clickMe")}</button>;

// Then add to both JSON files:
// en.json: "common": { "clickMe": "Click Me" }
// it.json: "common": { "clickMe": "Clicca Su Di Me" }
```

### 13.3 Recent translation fixes (session update)

The following components were missing translations and have been fixed:

| Component                    | Files Updated                                        | Keys Added                                                              | Notes                                                                    |
| ---------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **CTAGetPro**                | `src/components/sections/CTAGetPro.tsx`              | `collectionsPage.ctaGetPro`, `collectionsPage.addProperty`              | Editorial paragraph + "ADD PROPERTY" button now use i18next.             |
| **ExperienceCollectionPage** | `src/pages/experiences/ExperienceCollectionPage.tsx` | `experiencesPage.collection.heading`, `experiencesPage.collection.body` | Hero section heading and body now use i18next.                           |
| **PageHero**                 | (no changes)                                         | (no changes)                                                            | Already using i18next correctly with `titleKey` and `subtitleKey` props. |

**Translations added to `en.json` and `it.json`:**

- `collectionsPage.ctaGetPro`: Editorial text about property transformation (English and Italian).
- `collectionsPage.addProperty`: "ADD PROPERTY" button (English) / "AGGIUNGI PROPRIETÀ" (Italian).
- `experiencesPage.collection.heading`: "Craft Your Skylife Experience" / "Crea la Tua Esperienza Skylife".
- `experiencesPage.collection.body`: Descriptive text about the platform.

### 13.4 Important: Italian translations are AI-drafted

All Italian translations were generated by AI and are **pending native Italian speaker review** before production launch. Do not assume `it.json` copy is final. Coordinate with the product team before shipping the Italian UI to production.

---

## 14. Favicon setup (session update)

### 14.1 Problem solved

Initially, the favicon (favicon.ico) was not appearing on the S3-hosted marketing site, though it worked on localhost. Root causes were:

- Absolute path references (`/favicon.ico`) didn't work when deployed to S3.
- Favicon wasn't guaranteed to be copied to `dist/` on every clean build.

### 14.2 Solution implemented

1. **Created `favicon.png`** from the Skylife logo (black variant).
2. **Updated `index.html`:** Changed favicon link from absolute to relative path:

   ```html
   <!-- Before -->
   <link rel="icon" type="image/x-icon" href="/favicon.ico" />

   <!-- After -->
   <link rel="icon" type="image/png" href="./favicon.png" />
   ```

3. **Enhanced `vite.config.ts`:** Added custom `copy-favicon` plugin that:
   - Runs during the build process (`apply: "build"`).
   - Explicitly copies `public/favicon.png` → `dist/favicon.png` after bundle generation.
   - Ensures favicon is present even if `dist/` is deleted before build.

### 14.3 Build verification

To verify the favicon is included on every build:

```bash
rm -rf dist && npm run build
ls dist/favicon.png  # Should exist
grep 'href="./favicon.png"' dist/index.html  # Should find it
```

### 14.4 Deployment

- The `dist/` folder now always contains `favicon.png`.
- Upload entire `dist/` to S3 (including favicon).
- Relative path ensures favicon loads on localhost and S3-hosted deployments alike.
- Clear browser cache (Cmd+Shift+R on macOS) if favicon doesn't update immediately after deployment.
