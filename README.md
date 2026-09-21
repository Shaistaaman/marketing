# Skylife — Marketing Site

The public-facing marketing site for [Skylife Luxury Management & Concierge Services](https://skylifemanagement.com): the property collection, curated experiences, travel packages, and the property-owner offering.

Built as a **React SPA with Vite**, ported from an earlier Next.js implementation. It is a pure static build — no server runtime — so it deploys to S3 + CloudFront as plain files.

---

## Quick start

```bash
# Node 22 LTS (see .nvmrc)
nvm use

npm install
npm run dev          # http://localhost:5173
```

### Scripts

| Command           | What it does                               |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Dev server with HMR                        |
| `npm run build`   | Typecheck (`tsc -b`) then produce `dist/`  |
| `npm run preview` | Serve the built `dist/` locally on `:4173` |
| `npm run lint`    | ESLint across the project                  |

`npm run build` fails on any type or unused-symbol error — it is the gate to trust before deploying.

---

## Stack

| Concern   | Choice                            | Notes                                                                             |
| --------- | --------------------------------- | --------------------------------------------------------------------------------- |
| Build     | **Vite 8**                        | Outputs static assets; no Node server needed                                      |
| UI        | **React 19** + TypeScript         | `strict` and `noUncheckedIndexedAccess` both on                                   |
| Styling   | **Tailwind CSS v4**               | Via `@tailwindcss/vite`; no `tailwind.config.js` — theme lives in `src/index.css` |
| Routing   | **React Router 7**                | 10 lazy route chunks; landing stays in main bundle                                |
| Animation | **motion**                        | `motion/react`                                                                    |
| Icons     | **lucide-react**, **react-icons** | lucide for UI, react-icons for brand/social marks                                 |

**Node:** pinned to 22 LTS via `.nvmrc` and `engines.node`. Odd-numbered Node releases are not LTS and AWS build images standardise on LTS — keep CI on 22.

---

## Project structure

```
src/
├── App.tsx                      Route table (React Router + lazy/Suspense)
├── main.tsx                     Entry point
├── index.css                    Tailwind import, font theme, shared utilities
│
├── layout/                      Persistent app shell
│   ├── RootLayout.tsx           Header + <Outlet/> + Footer
│   ├── NavigationHeader.tsx     Dual dark/light header with mobile drawer
│   ├── NavLinks.tsx             Nav links (desktop + mobile variants)
│   ├── Footer.tsx
│   └── FooterLinkGroup.tsx
│
├── components/
│   ├── common/                  Cross-page building blocks
│   │   ├── PageHero.tsx         Shared hero: media bg + tabs + search
│   │   ├── CategoryFilterTabs.tsx
│   │   ├── FilterStepperDropdown.tsx
│   │   ├── Pagination.tsx
│   │   ├── ElegantArrow.tsx
│   │   └── LanguageSelector.tsx
│   ├── search/                  Capsule search widget
│   │   ├── PropertySearch.tsx   Location / dates / guests + 3 popovers
│   │   ├── CalendarMonthGrid.tsx
│   │   ├── GuestCounterRow.tsx
│   │   ├── SearchCapsuleField.tsx
│   │   └── FieldDivider.tsx
│   └── sections/                Sections reused across several pages
│       ├── ExperienceVideoSection.tsx
│       └── CTAGetPro.tsx
│
├── data/                        Mock content (see "Data layer")
│   ├── imageMap.ts              Single source of truth for image paths
│   ├── properties.ts            28 properties
│   ├── experiences.ts           8 featured + 12 collection experiences
│   └── packages.ts              4 travel packages
│
├── lib/
│   ├── constants.ts             ROUTES map + S3 media URLs
│   ├── types.ts                 Language, Guests, ActiveTab, Translation
│   ├── translations.ts          EN / IT copy
│   ├── formatDate.ts
│   └── dateRangeUtils.ts
│
└── pages/
    ├── landing/                 LandingPage + 11 sections
    ├── collections/             List, property detail, 3 sections
    ├── experiences/             List, collection, detail, 5 sections
    ├── packages/                List, detail, GalleryPkg
    ├── owner/                   OwnerPage + 6 sections
    ├── PagePlaceholder.tsx      Stub for unbuilt legal pages
    └── NotFound.tsx             404
```

**Convention:** a folder under `pages/` owns one route group. Components used by exactly one page live in that page's `sections/`; anything shared by two or more moves up to `components/`.

---

## Routes

| Path                                   | Page                                                      |
| -------------------------------------- | --------------------------------------------------------- |
| `/`                                    | Landing                                                   |
| `/collections`                         | Property collection with filters + pagination             |
| `/collections/:propertyId`             | Property detail (gallery, availability calendar, pricing) |
| `/experiences`                         | Experiences overview                                      |
| `/experiences/collection`              | Full experience catalogue                                 |
| `/experiences/:experienceId`           | Experience detail                                         |
| `/packages`                            | Travel packages                                           |
| `/packages/:packageId`                 | Package detail                                            |
| `/owner`                               | Property-owner offering                                   |
| `/company` `/blog` `/terms` `/privacy` | Placeholders (not yet built)                              |
| `*`                                    | 404                                                       |

Paths are defined once in `src/lib/constants.ts` as `ROUTES` — import from there rather than hardcoding strings, so links can't drift.

`/experiences/collection` is declared before `/experiences/:experienceId`. React Router 7 ranks by specificity rather than declaration order, so the static segment always wins.

---

## Styling

Tailwind v4 is configured **without a config file**. The theme lives in `src/index.css`:

```css
@theme {
  --font-sans: "Public Sans", …; /* body */
  --font-serif: "Cinzel", …; /* all headings */
}
```

Two conventions carried over from the original design:

- **All `h1`–`h6` use Cinzel** via a global rule. Use `font-sans` explicitly when a heading-level element should not be serif.
- Fonts load from Google Fonts in `index.css`. The build machine needs network access.

Shared utilities in `index.css`:

| Class                    | Purpose                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| `.scrollbar-none`        | Hides scrollbars on horizontal carousels (incl. WebKit)                  |
| `.carousel-edge-padding` | Responsive edge padding so full-bleed carousels centre their active card |

---

## Data layer

There is **no backend yet**. All content is typed mock data under `src/data/`, each module exporting its records plus a `find*` lookup that falls back to a default record, so detail routes never render empty on an unknown id.

### `imageMap.ts` — read this before touching images

Every image path resolves through one `IMG` object. This exists because the original Next.js app referenced 13 paths under `/src/assets/images/…` that **never existed** in `public/` and rendered as broken images. Those are remapped onto real files here.

When the final photography arrives, update `imageMap.ts` only — every page picks it up.

### Media from S3

Large media is **not** bundled. `src/lib/constants.ts` holds the S3 URLs:

```ts
export const S3_BASE = "https://skylife-test.s3.us-east-1.amazonaws.com";
export const VIDEO = { homepageHero: `${S3_BASE}/HomepageSL.mp4` };
```

---

## Before deploying

Two items are outstanding and both will bite in production.

### 1. Compress `public/images` (currently ~170 MB)

These are uncompressed originals. Several are full-screen heroes:

| File                   | Size   |
| ---------------------- | ------ |
| `exp/2.jpg`            | 21 MB  |
| `experiencebanner.jpg` | 19 MB  |
| `exp/5.jpg`            | 19 MB  |
| `exp/3.jpg`            | 19 MB  |
| `scenic-view.jpg`      | 10 MB  |
| `packagebanner.jpg`    | 9.2 MB |

Converting to AVIF/WebP at sensible dimensions should bring these to a few hundred KB each. Until that happens, page loads are slow on real connections and CloudFront egress is the dominant hosting cost.

### 2. Configure SPA fallback on CloudFront

This is a client-side SPA: only `/index.html` physically exists. Deep links like `/collections/tiber-luxury` work locally because the dev server falls back to it, but on S3 + CloudFront they return 404 unless you add **custom error responses mapping both 403 and 404 → `/index.html` with response code 200**.

Miss this and every shared property link breaks in production.

### Deploy outline

```bash
npm ci
npm run build          # → dist/
aws s3 sync dist/ s3://<bucket> --delete
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

Serve `dist/assets/*` with long-lived immutable cache headers (filenames are content-hashed) and `index.html` with `no-cache`.

---

## Notes and known gaps

- **Request flows are UI-only.** The five enquiry modals — property stay request, experience request, package dream-journey, owner application, owner valuation — validate required fields and show a confirmation state, but **nothing is submitted anywhere**. Four of them display a generated reference code (`SKYLIFE-EXP-`, `-PKG-`, `-OWN-`, `-VAL-`); the property stay request confirms without one. Wire all five to a real API before launch.
- **i18n is partially wired.** `lib/translations.ts` holds EN and IT copy and components accept a `language` prop, but there is no language persistence or routing — the selector is presentational.
- **SEO is unaddressed.** As a client-rendered SPA there is one static `<title>` and no per-route metadata or Open Graph tags. Crawlers and link-preview bots (WhatsApp, iMessage, LinkedIn) do not execute JavaScript, so shared property links currently have no preview. Worth resolving given organic search is a large share of traffic.
- **Unused legal pages** (`/company`, `/blog`, `/terms`, `/privacy`) render a placeholder so footer links never dead-end.

---

## Relationship to the Next.js app

`apps/marketing/` in this repo is the original Next.js implementation this app was ported from. It remains as reference only; this app is the one to develop against. Several bugs present in the Next version — non-functional CTAs, broken image paths, invalid Tailwind classes — were fixed during the port and are not worth back-porting.
