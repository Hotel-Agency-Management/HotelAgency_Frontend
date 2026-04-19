import { useMemo } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { toNumericId } from "../utils/numericId";

export function useFacilityScope(hotelId?: string | number) {
  const { user } = useAuth();

  return useMemo(
    () => ({
      agencyId: toNumericId(user?.agencyId),
      hotelId: toNumericId(hotelId),
    }),
    [hotelId, user?.agencyId]
  );
}
