# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This project is a **Hotel Agency Management Platform** — a multi-tenant SaaS where agency owners manage hotels, staff handle operations, and customers browse/book rooms. It was scaffolded with [create-shortcut-next](https://github.com/Hadi87s/shortcut-next). Every infrastructure system below is **already built and wired up**.

---

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint with auto-fix
npm run typecheck  # TypeScript validation (no emit)
npm run format     # Prettier format
```

**Environment setup** — create `.env.local`:
```env
NEXT_PUBLIC_URL=http://localhost:3000   # Public base URL
BACKEND_URL=http://localhost:8000       # Backend API (server-side only, proxied via next.config.ts)
TAX_DATA_API_KEY=...                    # Optional: TaxData API for invoice tax estimates
```

All `/api/*` requests are proxied to `BACKEND_URL` via `next.config.ts`. The frontend never exposes the backend origin to the browser.

---

## Golden Rules

- **Never** create a custom Axios instance, auth context, permission guard, sidebar, or i18n setup — they already exist.
- **Never** install `axios`, `i18next`, `react-hook-form`, `yup`, or `@casl/ability` — they are already in `package.json`.
- **Always** check `core/hooks/`, `core/context/`, `components/ability/`, and `components/common/` before writing something new.

---

## Application Architecture

### Route Groups & Layouts

- `app/(home)/` — all authenticated pages. The layout (`app/(home)/layout.tsx`) fetches dynamic nav items server-side and passes them to `HomeSidebarShell` (a client component that handles hotel-context-aware branding and navigation).
- `app/login/`, `app/verify-email/`, `app/unauthorized/` — public routes.
- `app/api/tax-data/price/` — internal Next.js API route that proxies TaxData API calls (keeps the API key server-side).

### Role Hierarchy

Roles are defined in `lib/abilities/types.ts` and permissions in `lib/abilities/roles.ts`:

| Role | Access |
|------|--------|
| `SUPER_ADMIN` | Everything except `AgencySettings` |
| `AGENCY_OWNER` | Agency, Hotels, RoomTypes, Reservations, AgencySettings |
| `PROPERTY_MANAGER` | Hotel operations, rooms, housekeeping, maintenance, finance, bookings |
| `FRONT_DESK_STAFF` | Create reservations only |
| `CUSTOMER` | Read `AllHotels` (customer booking portal) |
| `HOUSEKEEPING_MANAGER/EMPLOYEE`, `ACCOUNTANT` | Read agency/hotels |

### The `/home` Page — Role-Based Factory

`app/(home)/home/factories/homePageFactory.tsx` maps roles to home page components. `CUSTOMER` sees `CustomerHotelsPage`; all other authenticated roles see the admin dashboard. Add new role → home page mappings here.

### Feature Module Pattern

Every domain feature follows this structure (example: `app/(home)/agency/hotels/`):
```
types/          # TypeScript interfaces
api/ or data/   # apiClient calls
hooks/
  queries/      # useQuery wrappers
  mutations/    # useMutation wrappers
  use*.ts       # Composite hooks that combine queries + mutations
components/     # UI components
constants/      # Static data, column configs, default values
schema/         # Yup validation schemas
utils/          # Pure transformation/formatting functions
```

### Dynamic Sidebar Branding

`useActiveBranding()` (`core/hooks/useActiveBranding.ts`) detects whether the user is on a customer hotel page or an agency hotel page and applies the correct hotel's branding colors/logo to the sidebar. It is already wired into `HomeSidebarShell`.

### Hotel-Contextual Navigation

`navigation/sidebarRoutes.ts` exports `navigation(hotelId?: string)`. When a `hotelId` is active in the sidebar shell, hotel-specific sections (Rooms, Housekeeping, Operations, Finance, Bookings) are included. Always pass `hotelId` when constructing hotel-scoped nav items.

### PDF Generation

Invoices and reservation contracts are generated client-side using `@react-pdf/renderer`. Key files:
- `app/(home)/hotels/[hotelId]/invoice/` — customer invoice PDF
- `app/(home)/hotels/[hotelId]/components/customerReservationContract/` — reservation contract PDF

PDF documents use strategy patterns for step rendering; see `customerReservationConfirmation/strategies/` and `factory.ts`.

### Global State (Zustand)

Used for cross-component state that doesn't belong in URL or server state. See `useHotelStore` in `app/(home)/agency/hotels/hooks/` as the reference pattern — it wraps TanStack Query hooks into a single store-like interface.

---

## 1. Authentication

Already available — do not reimplement.

**Hook:** `useAuth()` from `@/core/context/AuthContext`

```tsx
import { useAuth } from '@/core/context/AuthContext'

const { user, isAuthenticated, isLoading, login, signup, logout } = useAuth()

await login({ email: 'user@example.com', password: 'secret' }, (err) => {
  console.error(err)
})
```

**HTTP Client:** `apiClient` from `@/core/clients/apiClient`

```tsx
import apiClient from '@/core/clients/apiClient'

// Bearer token is injected automatically
const { data } = await apiClient.get('/api/users')
await apiClient.post('/api/users', { name: 'Alice' })
```

- Token refresh on 401 (with request queuing) is handled automatically.
- Auto-logout on 403 is handled automatically.
- Base URL is `/api` (proxied to `BACKEND_URL`). Configured in `core/configs/clientConfig.ts`.

> **Never** use `fetch()` or create a new Axios instance. Always use `apiClient`.

---

## 2. Authorization (CASL)

Already available — do not reimplement.

**Hooks:**

```tsx
import { useAbility, useCan } from '@/core/hooks/useAbility'

const ability = useAbility()
if (ability.can('read', 'AllHotels')) { /* ... */ }

const canCreate = useCan('create', 'Reservations')
```

**Conditional rendering:**

```tsx
import Can from '@/components/ability/Can'

<Can do="manage" this="Hotels">
  <HotelManagementPanel />
</Can>
```

**Protect a new route** — add one entry to `lib/abilities/routeMap.ts`:

```ts
{ pattern: '/agency/hotels/[hotelId]/my-feature', action: 'manage', subject: 'Hotels' },
```

The middleware enforces this automatically.

**Add a new subject** — add to the `Subjects` union in `lib/abilities/types.ts`, then add `can(...)` calls in `lib/abilities/roles.ts` for the relevant roles.

> **Never** write custom middleware or manual permission checks.

---

## 3. Sidebar Layout

Already available — do not build a custom sidebar.

**Add a nav item** — edit `navigation/sidebarRoutes.ts`. Items without `action`/`subject` are always shown; items with them are filtered by CASL automatically.

**Programmatic control:**

```tsx
import { useSidebar } from '@/core/layouts/SidebarLayout/SidebarContext'
const { isCollapsed, toggleCollapsed, setIsMobileOpen } = useSidebar()
```

> **Never** create a custom drawer or navigation component.

---

## 4. Theme & Settings

Already available.

**Toggle dark/light mode:**

```tsx
import { useToggleMode } from '@/core/hooks/useToggleMode'
const { mode, toggleMode } = useToggleMode()
```

**Customize a MUI component** — edit the relevant file in `core/theme/overrides/`.

**Change the color palette** — edit `core/theme/palette/index.ts`.

**Hex utility:**

```tsx
import { hexToRGBA } from '@/core/utils/hex-to-rgba'
const color = hexToRGBA('#5B74FF', 0.2)
```

> **Never** override MUI components with inline `sx` hacks for global styling.

---

## 5. Internationalization (i18n)

Already available — do not install or configure i18next.

```tsx
import { useTranslation } from 'react-i18next'
const { t } = useTranslation()
<Typography>{t('common.welcome', 'Welcome')}</Typography>
```

**Add translations** — add keys to both `public/locales/en/` and `public/locales/ar/`.

> **Never** hardcode user-visible strings.

---

## 6. Data Fetching (TanStack Query)

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/core/clients/apiClient'

const { data, isLoading } = useQuery({
  queryKey: ['hotels', agencyId],
  queryFn: () => apiClient.get(`/api/agencies/${agencyId}/hotels`).then(r => r.data),
})

const queryClient = useQueryClient()
const { mutate } = useMutation({
  mutationFn: (payload) => apiClient.post('/api/hotels', payload),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['hotels'] }),
})
```

> **Never** use raw `fetch()` or a new Axios instance.

---

## 7. Forms (React Hook Form + Yup)

```tsx
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({ name: yup.string().required() })
const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
```

Use `<FormFieldWrapper>` from `@/components/ui/FormFieldWrapper` for consistent label + input layout.

---

## 8. Icons

```tsx
import Icon from '@/components/icon/Icon'
<Icon icon="tabler:home" />
<Icon icon="lucide:building-2" fontSize={24} />
```

Uses [Iconify](https://icon-sets.iconify.design/) — any Iconify icon name works. Both `tabler:` and `lucide:` prefixes are used throughout the codebase.

---

## 9. Charts

Use `ChartFactory` from `@/components/charts/ChartFactory` — it accepts a discriminated union type prop and renders the correct MUI X chart variant. Available types: `bar`, `horizontal-bar`, `stacked-bar`, `clustered-bar`, `pie`, `doughnut`, `line`, `area`, `gauge`, `bubble`, `sparkline`, `heatmap`.

---

## 10. Shared Components & Utilities

| Component / Utility | Import | Purpose |
|---|---|---|
| `<Spinner />` | `@/components/loaders/Spinner` | Loading indicator |
| `<HydrationGate>` | `@/components/wrappers/HydrationGate` | Prevent SSR/client hydration mismatch |
| `<GradientText>` | `@/components/ui/GradientText` | Gradient-styled text |
| `<ErrorMessage>` | `@/components/ui/ErrorMessage` | Inline error alert |
| `hexToRGBA` | `@/core/utils/hex-to-rgba` | Convert hex color to rgba |

Animation primitives (GSAP/Framer Motion wrappers) are in `components/animation/`.

---

## 11. Mock API (MSW)

Development mock handlers live in `lib/mocks/handlers/`. To add a new mock endpoint:

```ts
import { http, HttpResponse } from 'msw'
export const myHandlers = [
  http.get('/api/items', () => HttpResponse.json({ items: [] })),
]
```

Then register it in `lib/mocks/browser.ts`.

---

## File Structure Reference

```
app/
  (home)/
    agency/         # Agency owner + staff management routes
      hotels/       # Hotel CRUD, rooms, housekeeping, settings
      settings/     # Agency profile & custom theme
      users/        # User management
    hotels/         # Customer hotel browsing + booking portal
      [hotelId]/
        invoice/    # PDF invoice generation
        components/customerReservationConfirmation/  # Multi-step booking modal
        components/customerReservationContract/      # PDF contract generation
    reservations/[hotelId]/create/  # Direct reservation creation (staff)
    admin-dashboard/  # Super admin overview
    agencies/         # Agency list (super admin)
    room-types/       # Global room type catalog
    room-amenities/   # Global room amenity catalog
  api/
    tax-data/price/   # Server-side proxy for TaxData API
components/
  animation/          # GSAP/Framer Motion wrappers
  charts/             # MUI X chart wrappers + ChartFactory
  landing/            # Landing page sections
core/
  clients/apiClient.ts
  configs/            # authConfig, themeConfig, i18n, clientConfig
  context/            # AuthContext, SettingsContext
  hooks/              # useAbility, useLanguage, useToggleMode, useActiveBranding
  layouts/SidebarLayout/
  theme/overrides/    # 30+ MUI component overrides
lib/
  abilities/
    roles.ts          # Role → CASL abilities mapping
    routeMap.ts       # Route → permission mapping
    types.ts          # UserRole, Subjects, Actions
  mocks/              # MSW mock setup
navigation/
  sidebarRoutes.ts    # navigation(hotelId?) — hotel-contextual nav
  dynamicRoutes.ts    # Server-side dynamic nav (wire up to API here)
providers/
  AppProviders.tsx
public/locales/       # en/, ar/ translation JSON files
```
