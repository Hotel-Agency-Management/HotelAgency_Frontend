import { useMemo } from "react"
import { useAuth } from "@/core/context/AuthContext"
import { USER_ROLES } from "@/lib/abilities"
import type { TicketEndpointScope } from "../configs/ticketConfig"
import { toNumericId } from "../../../facilities/utils/numericId"

export function useTicketScope(
  hotelId: string | number,
  agencyId?: string | number
): TicketEndpointScope {
  const { user } = useAuth()

  return useMemo((): TicketEndpointScope => {
    const numericHotelId = toNumericId(hotelId)!
    const numericAgencyId = toNumericId(agencyId)

    if (user?.role === USER_ROLES.SUPER_ADMIN && numericAgencyId) {
      return {
        type: "admin",
        agencyId: numericAgencyId,
        hotelId: numericHotelId,
      }
    }

    return {
      type: "hotel",
      hotelId: numericHotelId,
    }
  }, [agencyId, hotelId, user?.role])
}
