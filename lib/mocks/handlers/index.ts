/**
 * MSW Handlers Index
 *
 * Combines all mock API handlers.
 * Add new handler modules here as your app grows.
 */

import { authHandlers } from './auth'
import { hotelHandlers } from './hotels'
import { paymentLogHandlers } from './paymentLogs'

export const handlers = [
  ...authHandlers,
  ...hotelHandlers,
  ...paymentLogHandlers,
]
