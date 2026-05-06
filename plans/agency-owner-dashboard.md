# Agency Owner Executive Dashboard

## Context

The `AGENCY_OWNER` role currently falls through to `SuperAdminDashboardPage` in `homePageFactory.tsx` because no dedicated component exists for that role. The super-admin dashboard shows platform-wide metrics (total agencies, approvals, subscriptions) that are irrelevant to an agency owner. This plan adds a clean executive dashboard tailored to the agency owner's concerns: hotel portfolio revenue, occupancy, bookings, and per-hotel performance.

The implementation mirrors the admin-dashboard structure exactly — same file layout, same card/chart patterns, same reused components.

---

## Files Created

```
app/(home)/agency-owner-dashboard/
├── page.tsx
├── types/
│   └── agencyOwnerDashboardTypes.ts
├── data/
│   └── agencyOwnerDashboardMock.ts
└── components/
    ├── AgencyOwnerStatsSection.tsx
    ├── RevenueFinanceSection.tsx
    ├── OccupancyBookingSection.tsx
    └── HotelPerformanceSection.tsx
```

## Files Modified

- `app/(home)/home/factories/homePageFactory.tsx` — added `AGENCY_OWNER` → `AgencyOwnerDashboardPage` mapping

---

## Dashboard Sections

### KPI Summary Cards (4)
- Total Revenue: $284,500 (success, up)
- Occupancy Rate: 73% (primary, up)
- Total Bookings: 1,847 (info, up)
- Active Hotels: 5 (warning, neutral)

### Section 1: Revenue & Financial Overview
- Revenue Trend — Line chart, 2 series (Revenue + Target), 12 months
- Profit vs Expenses — ClusteredBar, 2 series, 12 months

### Section 2: Occupancy & Booking Analytics
- Occupancy Rate per Hotel — Bar chart, 5 hotels
- Booking Trends — Area chart, 2 series (Online + Direct), 12 months

### Section 3: Hotels Performance
- Revenue per Hotel — HorizontalBar, 5 hotels
- Occupancy vs Revenue — Bubble chart, 5 hotels (x=occupancy%, y=revenue$K, z=bookings)

---

## Reused Existing Components

| Component | Source |
|-----------|--------|
| `SummaryStatCard` | `app/(home)/admin-dashboard/components/SummaryStatCard.tsx` |
| `StatCardProps` | `app/(home)/admin-dashboard/types/dashboardTypes.ts` |
| Chart types (`MultiSeriesItem`, `BubbleSeriesItem`) | `components/charts/types.ts` |
| `Icon` | `components/icon/Icon` |
| All 6 chart components | `components/charts/*.tsx` |

---

## Verification

1. `npm run typecheck` — zero new errors
2. Sign in as `AGENCY_OWNER` → `/` renders "Agency Overview" with 4 KPI cards and 6 charts
3. `SUPER_ADMIN` still sees `SuperAdminDashboardPage`
4. `CUSTOMER` still sees `CustomerHotelsPage`
5. Mobile: half-width chart cards stack to full width
6. Dark mode: charts re-render with dark palette
