# Property Manager Executive Dashboard

## Context

Dedicated home dashboard for the `PROPERTY_MANAGER` role — scoped to a single hotel's operations. Wired into `homePageFactory.tsx`. Follows the same structure as the admin-dashboard pattern.

## Sections

**KPI Cards** — Occupancy Rate, Today's Check-ins, Today's Check-outs, Pending Maintenance

**Revenue & Finance**
- Revenue Overview (Bar Chart) — monthly hotel revenue
- Check-ins vs Check-outs (Line Chart) — 2 series across 12 months

**Rooms & Housekeeping**
- Room Status Distribution (Doughnut) — Available / Occupied / Maintenance / Housekeeping
- Housekeeping Tasks by Status (Horizontal Bar)

**Operations**
- Booking Types Distribution (Doughnut) — Walk-in / Phone / Online / OTA
- Maintenance by Category (Horizontal Bar)

## Rules

- Stack spacing for all alignment — no margin/padding
- Constants in `constants/statCards.ts`, never inline
- One component per file
