/**
 * MSW Handlers Index
 *
 * Combines all mock API handlers.
 * Add new handler modules here as your app grows.
 */

import { authHandlers } from './auth'
import { hotelHandlers } from './hotels'

export const handlers = [
  ...authHandlers,
  ...hotelHandlers
  // Add more handlers here as needed:
  // ...userHandlers,
  // ...ticketHandlers,
  // etc.
]
