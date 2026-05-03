# Room Insurance — Full Implementation Plan

## Context
A monthly insurance fee needs to be captured per room during creation/editing. It is entered manually by staff (not calculated) and must be a required positive number. This follows the same pattern as the existing price fields (dailyPrice, weeklyPrice, monthlyPrice, extendPrice).

---

## Files to Modify (in order)

### 1. `configs/roomConfig.ts`
Add `insurance: number` to both `CreateRoomRequest` and `RoomResponse`.

```ts
// In CreateRoomRequest
insurance: number

// In RoomResponse
insurance: number
```

`UpdateRoomRequest extends CreateRoomRequest`, so it picks it up automatically.

---

### 2. `schema/roomSchema.ts`
Add the `insurance` field with required + positive validation (no default — forces the user to enter a value):

```ts
insurance: z
  .number({ invalid_type_error: "Insurance fee must be a number" })
  .positive("Insurance fee must be a positive number"),
```

Unlike the price fields which default to 0, `insurance` is **required and positive** (> 0), so no `.default()`.

---

### 3. `constants/roomFormValues.ts`
Add `insurance: 0` to `defaultFormValues`. The schema's `.positive()` constraint will catch this on submit, prompting the user to fill it in.

```ts
insurance: 0,
```

---

### 4. `util/roomFormData.ts`
Append the field to FormData alongside the other numeric fields:

```ts
formData.append('insurance', String(data.insurance))
```

---

### 5. `components/room/form/RoomFormFields.tsx`
Add a new `<Grid>` + `<TextField>` block following the exact pattern of the price fields. Place it after `extendPrice` and before `description`:

```tsx
<Grid size={{ xs: 12, sm: 6, md: 4 }}>
  <TextField
    label="Monthly Insurance"
    type="number"
    fullWidth
    size="small"
    {...register("insurance", { valueAsNumber: true })}
    error={!!errors.insurance}
    helperText={errors.insurance?.message}
  />
</Grid>
```

---

### 6. `hooks/useRoomFormDialog.ts`
Add `insurance: room.insurance` inside `getRoomValues()` so the field is pre-populated in edit mode:

```ts
function getRoomValues(room: RoomResponse): RoomFormValues {
  return {
    ...
    insurance: room.insurance,
    ...
  }
}
```

---

## Files NOT changed
- `types/room.ts` — only re-exports from `configs/roomConfig.ts`; no changes needed.
- `profile/types.ts` — legacy display-only `RoomProfile` interface, not part of the create/edit flow.
- Mutation hooks and API clients — they pass `CreateRoomRequest` / `UpdateRoomRequest` through to `buildRoomFormData`, which handles serialization; no changes needed there.

---

## Verification — Part 1
1. Open the room create dialog — confirm "Monthly Insurance" field appears after Extend Price.
2. Submit without filling it in — expect "Insurance fee must be a positive number" error.
3. Enter `0` — expect the same positive-number error.
4. Enter a valid positive value (e.g. `50`) — expect the form to proceed to step 2 (photos).
5. Complete the flow — verify the `insurance` key appears in the FormData sent to the API (check Network tab → POST `/hotels/{id}/rooms` → payload).
6. Open edit dialog for an existing room — confirm `insurance` is pre-populated from `RoomResponse`.
7. Run `npm run typecheck` — confirm no TypeScript errors.

---

---

# Part 2 — Display Insurance on Room Details & Customer Booking Choice

## Context
With `insurance` now stored per room, two follow-up features are needed:
1. **Agency room details page** — show the monthly insurance fee alongside the other pricing rows.
2. **Customer booking flow** — on the Booking Details step, let the customer opt in or out of insurance. Store their choice as `includeInsurance: boolean` in the reservation payload.

---

## Part 2A: Agency Room Details Page

### 1. `components/profile/roomInfoRows.ts`
Add `insurance` to the `Pick` and append a formatted row:
```ts
room: Pick<RoomResponse, "floorNumber" | "capacity" | "dailyPrice" | "weeklyPrice" | "monthlyPrice" | "extendPrice" | "insurance">

// New row:
[t("hotelRooms.profile.insurance", "Monthly insurance"), formatPrice(room.insurance)]
```

### 2. `components/profile/RoomInfoCard.tsx`
Add `insurance` to the `RoomInfoCardProps` Pick to satisfy the updated `buildRoomInfoRows` signature.

### 3. `components/profile/profileSkelton/RoomProfileSkeleton.tsx`
Add `insurance: 0` to the skeleton placeholder object passed to `<RoomInfoCard>`.

---

## Part 2B: Customer Booking Flow

### Data propagation chain
```
roomApi.ts (mock Room)
  → getCustomerHotelRooms (customerHotelRooms.ts)
    → mapRoomToProfile (mapRoomToProfile.ts)
      → RoomProfile
        → CustomerRoomBookingCard / CustomerReservationConfirmationModal
          → useCustomerReservationConfirmationModal
            → BookingDetailsStep (UI toggle)
              → CustomerReservationConfirmationPayload
                → useCustomerRoomBookingCard.handleConfirmReservation
                  → createReservation (customerReservationsApi.ts)
```

### 4. `types/room.ts` — legacy `Room` interface
Add `insurance?: number` so the field flows from the mock API through to `mapRoomToProfile`.

### 5. `components/profile/types.ts` — `RoomProfile`
Add `insurance?: number`.

### 6. `api/roomApi.ts` — mock data
Add `insurance` to all three seed rooms (25, 40, 75).

### 7. `util/mapRoomToProfile.ts`
Pass `insurance: room.insurance` into the returned `RoomProfile`.

### 8. `types/customerReservationConfirmation.ts`
Add `includeInsurance: boolean` to `CustomerReservationConfirmationPayload`.

### 9. `types/customerReservation.ts`
- Add `includeInsurance: boolean` to `CreateCustomerReservationInput`.
- Add `includeInsurance: boolean` to `CustomerReservation`.
- Add `includeInsurance: false` to the two seed reservations in `customerReservationsApi.ts`.

### 10. `hooks/useCustomerReservationConfirmationModal.ts`
- Expand `room` Pick to include `'insurance'`.
- Add `const [includeInsurance, setIncludeInsurance] = useState(false)`.
- Reset it in the `useEffect` on modal close.
- Include `includeInsurance` in the `onConfirm(...)` payload.
- Compute and expose `hasInsurance` and `insuranceFeeLabel` in the hook return.

### 11. `components/CustomerReservationConfirmationModal.tsx`
Add `'insurance'` to the `room` Pick in the props interface.

### 12. `components/CustomerRoomBookingCard.tsx`
Add `'insurance'` to the `room` Pick in the props interface.

### 13. `hooks/useCustomerRoomBookingCard.ts`
- Add `'insurance'` to the `room` Pick.
- Destructure `includeInsurance` from `CustomerReservationConfirmationPayload`.
- Pass `includeInsurance` to `createReservation(...)`.

### 14. `components/customerReservationConfirmation/BookingDetailsStep.tsx`
Add four new props: `hasInsurance`, `insuranceFeeLabel`, `includeInsurance`, `onIncludeInsuranceChange`.
Render an insurance `<SectionPanel>` with a `<FormControlLabel>` + `<Checkbox>` only when `hasInsurance` is true. Show the fee as a caption below the label.

### 15. `strategies/bookingDetailsStrategy.tsx`
Pass the four new insurance props from `modalState` to `<BookingDetailsStep>`.

---

## Verification — Part 2
1. **Agency details page** — open any room detail; confirm "Monthly insurance" row appears in the info card with a formatted currency value.
2. **Customer booking — no insurance room** — if a room has `insurance: 0` or undefined, the insurance section must not appear on the Booking Details step.
3. **Customer booking — with insurance room** — if a room has `insurance > 0`, an "Add monthly insurance" checkbox appears showing the fee per month.
4. **Opt in** — check the box → `includeInsurance: true` is included in the payload logged/stored.
5. **Opt out** — leave unchecked → `includeInsurance: false` is stored.
6. **Reset** — close and reopen the modal; the checkbox resets to unchecked.
7. Run `npm run typecheck` — only the pre-existing `.next/types/validator.ts` error remains.
