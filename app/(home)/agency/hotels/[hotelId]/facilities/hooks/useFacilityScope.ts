import { useMemo } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { USER_ROLES } from "@/lib/abilities";
import type { FacilityEndpointScope } from "../configs/facilityConfig";
import { toNumericId } from "../utils/numericId";

export function useFacilityScope(
  hotelId?: string | number,
  agencyId?: string | number
) {
  const { user } = useAuth();

  return useMemo(
    (): FacilityEndpointScope => {
      const numericHotelId = toNumericId(hotelId);
      const numericAgencyId = toNumericId(agencyId);

      if (user?.role === USER_ROLES.SUPER_ADMIN && numericAgencyId) {
        return {
          type: "admin",
          agencyId: numericAgencyId,
          hotelId: numericHotelId,
        };
      }

      return {
        type: "hotel",
        hotelId: numericHotelId,
      };
    },
    [agencyId, hotelId, user?.role]
  );
}
