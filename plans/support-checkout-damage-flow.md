# Post-Checkout Damage Reporting & Invoice Flow

## Context

After a guest checks out, Housekeeping Staff perform a CHECKOUT cleaning task. If they discover room damage, the system currently has no way to report it, escalate it, or charge the guest. This plan adds a full damage pipeline:

**Staff reports damage → Manager reviews & escalates → Front Desk decides (insured → covered | not insured → damage invoice)**

This integrates with the existing housekeeping task system, CASL authorization, and `@react-pdf/renderer` invoice pattern.

---

## Flow

```
[Checkout Task - HOUSEKEEPING_EMPLOYEE]
        |
        | finds damage
        v
[ReportDamageDialog] → DamageReport { status: REPORTED }
        |
        v
[HOUSEKEEPING_MANAGER reviews]
        |
        | escalates
        v
DamageReport { status: ESCALATED }
        |
        v
[FRONT_DESK_STAFF — ResolveDamageDialog]
        |
        |— hasInsurance: true  → Mark as INSURED (no charge)
        |— hasInsurance: false → GenerateDamageInvoiceDialog → PDF Invoice
```

---

## New CASL Subjects

Added to `lib/abilities/types.ts`:
- `DamageReports`
- `DamageInvoices`

### Role Permissions (`lib/abilities/roles.ts`)

| Role | Permission |
|---|---|
| `HOUSEKEEPING_EMPLOYEE` | `read Housekeeping`, `manage HousekeepingTasks`, `create DamageReports`, `read DamageReports` |
| `HOUSEKEEPING_MANAGER` | `read Agency/Hotels/Housekeeping`, `manage HousekeepingTasks`, `manage DamageReports` |
| `FRONT_DESK_STAFF` | `create Reservations`, `read DamageReports`, `manage DamageInvoices` |

---

## Data Models

### `DamageReport`
```ts
// app/(home)/agency/hotels/[hotelId]/damage-reports/types/damageReport.ts
status: REPORTED | PENDING_REVIEW | ESCALATED | INSURED | INVOICED
fields: id, hotelId, roomNumber, taskId, reservationId?, reportedBy,
        description, severity, estimatedCost, currency, hasInsurance?,
        createdAt, escalatedAt?, resolvedAt?
```

### `DamageInvoice`
```ts
// app/(home)/agency/hotels/[hotelId]/damage-reports/invoice/types/damageInvoice.ts
invoiceNumber: HOTEL-DMG-YEAR-SEQ
fields: reportId, reservationId?, customerName, customerEmail?,
        hotelName, hotelLogo?, hotelPrimaryColor?, hotelSecondaryColor?,
        roomNumber, damageDescription, damageAmount, currency,
        invoiceDate, invoiceStatus
```

### Extended `CustomerReservation`
```ts
// app/(home)/hotels/[hotelId]/types/customerReservation.ts
hasInsurance?: boolean  // added to CustomerReservation + CreateCustomerReservationInput
```

---

## New Module Structure

```
app/(home)/agency/hotels/[hotelId]/damage-reports/
├── page.tsx
├── types/damageReport.ts
├── constants/damageReport.ts
├── data/mockDamageReports.ts
├── hooks/useDamageReports.ts
├── styles/StyledComponents.tsx          ← MUI styled() components
├── components/
│   ├── DamageReportsPage.tsx
│   ├── ReportDamageDialog.tsx           ← Staff
│   ├── EscalateDamageDialog.tsx         ← Manager
│   ├── ResolveDamageDialog.tsx          ← Front Desk
│   ├── DamageStatusChip.tsx
│   └── GenerateDamageInvoiceDialog.tsx  ← Front Desk (no insurance path)
└── invoice/
    ├── types/damageInvoice.ts
    ├── components/
    │   ├── DamageInvoiceDocument.tsx
    │   ├── openDamageInvoicePdf.tsx
    │   └── theme.ts
    ├── styles/damageInvoiceStyle.ts
    └── utils/damageInvoice.ts
```

---

## Existing Files Modified

| File | Change |
|---|---|
| `lib/abilities/types.ts` | Add `DamageReports`, `DamageInvoices` |
| `lib/abilities/roles.ts` | Expand HK_EMPLOYEE, HK_MANAGER, FRONT_DESK_STAFF |
| `lib/abilities/routeMap.ts` | 2 new route entries |
| `navigation/sidebarRoutes.ts` | Add Damage Reports nav item |
| `app/(home)/hotels/[hotelId]/types/customerReservation.ts` | `hasInsurance?` field |
| `app/(home)/agency/hotels/[hotelId]/housekeeping/tasks/types/task.ts` | `reservationId?` field |
| `app/(home)/agency/hotels/[hotelId]/housekeeping/tasks/components/columns/definitions/actionsColumn.tsx` | Report Damage button on CHECKOUT tasks |

---

## Verification

1. HK Employee → Tasks → CHECKOUT task → Report Damage → status REPORTED
2. HK Manager → Damage Reports → Escalate → status ESCALATED
3. Front Desk → Damage Reports → insured reservation → Mark Insured → status INSURED
4. Front Desk → Damage Reports → uninsured reservation → Generate Invoice → PDF opens
5. CASL guards prevent wrong roles from seeing escalate/resolve buttons
6. Route `/agency/hotels/[hotelId]/damage-reports` protected by middleware
