# My Bookings Feature

## Overview
Customer-facing pages that list and detail all reservations made by the authenticated user for a given hotel.

## Routes
- `/hotels/[hotelId]/my-bookings` — list of the customer's bookings
- `/hotels/[hotelId]/my-bookings/[reservationId]` — full detail of a single booking

## Data Layer
Mock in-memory data (`data/myBookingsMock.ts`). Replace with real `apiClient` calls to:
- `GET /api/hotels/{hotelId}/reservations`
- `GET /api/hotels/{hotelId}/reservations/{id}`

## Permissions
Both routes: `action: 'read', subject: 'AllHotels'` (same as other customer routes).
