import { http, HttpResponse, delay } from 'msw'
import { CUSTOMER_HOTELS_MOCK } from '@/app/(home)/hotels/data/customerHotelsMock'

const API_BASE = '/api'
const SIMULATED_DELAY = 350

export const hotelHandlers = [
  http.get(`${API_BASE}/hotels`, async () => {
    await delay(SIMULATED_DELAY)
    return HttpResponse.json({ hotels: CUSTOMER_HOTELS_MOCK })
  }),
]
