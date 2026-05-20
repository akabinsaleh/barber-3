# NORTH&HALE — Barber Prototype

A static multi-page prototype for a six-chair Riyadh barbershop. Editorial
landing site, four-step booking flow, and an admin reservations dashboard.
Built with vanilla HTML/CSS/JS plus a Tailwind CDN — no build step.

Live preview: open `index.html` in a browser, or `python -m http.server` from
the repo root.

## Pages

| File                 | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `index.html`         | Landing: hero, signature services grid, featured barbers, reviews marquee |
| `services.html`      | Full service catalogue                                         |
| `barbers.html`       | Full barber roster                                             |
| `book.html`          | Four-step reservation flow (barber → service → when → details) |
| `confirmation.html`  | Post-booking receipt with order code                           |
| `admin.html`         | Reservations dashboard (KPIs, filters, table on desktop / card list on mobile) |

## Assets

| File                  | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| `assets/styles.css`   | Shared marketing-site styles (design tokens, components)       |
| `assets/data.js`      | Barbers, services, reviews, helpers (`BP3` global)             |
| `assets/i18n.js`      | EN/AR translation strings + language switching                 |
| `assets/ui.js`        | Reveal animations, nav, language toggle wiring                 |
| `assets/booking.js`   | Booking flow state machine                                     |

## Localization

EN/AR with full RTL support. Language toggle persists to `localStorage`
(`bp3.lang`). Strings live in `assets/i18n.js`; static markup uses
`data-i18n="key"` and `data-i18n-attr="attr:key"`.

## Booking flow

`book.html` runs a 4-step state machine; state persists to `localStorage`
(`bp3.booking`) so a refresh resumes where you left off. On submit a
confirmation code is generated and stored under `bp3.confirmed`, then the
user is redirected to `confirmation.html`.

## Admin

`admin.html` is a self-contained dashboard. Orders are seeded into
`localStorage` (`bp3.orders.v3`) on first load — 16 fake reservations across
past/today/upcoming. Re-seed and Clear actions live in the `⋯` menu on the
filter row.

**Responsive behavior:**
- **Desktop (>768px):** sidebar nav, dense table view, full filter row
- **Mobile (≤768px):** collapsed top strip, 2×2 KPI grid, card list per
  reservation, scrollable filter chips, kebab-menu for utility actions

## Repo layout

```
.
├── *.html              # Pages
├── assets/             # CSS, JS, data
├── .gitignore
└── README.md
```

## Conventions

- No build step. Drop in a browser or serve statically.
- Tailwind via CDN for utility classes; custom components in `styles.css`.
- All money is SAR. Times are 12-hour with AM/PM.
- Data lives in `assets/data.js`; markup pulls from it via the `BP3` global.

## Status

Prototype. Not wired to any backend — all state is `localStorage`.
