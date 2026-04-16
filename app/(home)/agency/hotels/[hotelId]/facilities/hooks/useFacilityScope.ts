import { useMemo } from "react";
import { useAuth } from "@/core/context/AuthContext";

export function toNumericId(value: unknown): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

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
