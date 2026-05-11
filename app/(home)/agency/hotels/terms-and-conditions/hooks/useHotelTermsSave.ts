"use client";

import type { HotelTermsFormValues } from "../schema/hotelTermsSchema";
import type { TermsEndpointScope, TermsResponse } from "../types/terms";
import {
  useAdminCreateHotelTerms,
  useAdminUpdateHotelTerms,
  useCreateHotelTerms,
  useUpdateHotelTerms,
} from "./useHotelTermsMutations";

export function useHotelTermsSave(scope: TermsEndpointScope, terms: TermsResponse | null) {
  const create = useCreateHotelTerms();
  const update = useUpdateHotelTerms();
  const adminCreate = useAdminCreateHotelTerms();
  const adminUpdate = useAdminUpdateHotelTerms();

  return async (values: HotelTermsFormValues): Promise<void> => {
    if (scope.type === "admin") {
      const { agencyId, hotelId } = scope;
      if (terms?.id !== undefined) {
        await adminUpdate.mutateAsync({ agencyId, hotelId, id: terms.id, data: values });
      } else {
        await adminCreate.mutateAsync({ agencyId, hotelId, data: values });
      }
    } else {
      const { hotelId } = scope;
      if (terms?.id !== undefined) {
        await update.mutateAsync({ hotelId, id: terms.id, data: values });
      } else {
        await create.mutateAsync({ hotelId, data: values });
      }
    }
  };
}
