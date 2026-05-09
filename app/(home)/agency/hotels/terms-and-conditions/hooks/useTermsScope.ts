import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/core/context/AuthContext";
import { USER_ROLES } from "@/lib/abilities";
import type { TermsEndpointScope } from "../types/terms";
import { toNumericId } from "../../[hotelId]/facilities/utils/numericId";

export function useTermsScope(): TermsEndpointScope {
  const { hotelId, agencyId: agencyIdParam } = useParams<{ hotelId?: string; agencyId?: string }>();
  const { user } = useAuth();

  return useMemo((): TermsEndpointScope => {
    const numericHotelId = toNumericId(hotelId)!;
    const numericAgencyId = toNumericId(agencyIdParam) ?? toNumericId(user?.agencyId);

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
  }, [hotelId, agencyIdParam, user?.agencyId, user?.role]);
}
