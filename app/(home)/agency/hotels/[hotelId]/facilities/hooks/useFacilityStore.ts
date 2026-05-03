import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getFacilityPhotos } from "../clients/facilityPhotoClient";
import { getAdminFacilityPhotos } from "../clients/adminFacilityPhotoClient";
import { mapFacilityResponse } from "../utils/facilityAdapters";
import {
  useGetFacilities,
  useGetFacilityById,
  useGetAdminFacilities,
  useGetAdminFacilityById,
} from "./queries/facilityQueries";
import {
  useGetFacilityPhotos,
  useGetAdminFacilityPhotos,
} from "./queries/facilityPhotosQueries";
import { facilityPhotoQueryKeys } from "../constants/facilityPhotoQueryKeys";
import { useFacilityScope } from "./useFacilityScope";
import { toNumericId } from "../utils/numericId";

export const useFacilities = (hotelId: string, agencyId?: string) => {
  const scope = useFacilityScope(hotelId, agencyId);
  const regularFacilitiesQuery = useGetFacilities(
    scope.type === "hotel" ? scope.hotelId : undefined
  );
  const adminFacilitiesQuery = useGetAdminFacilities(
    scope.type === "admin" ? scope.agencyId : undefined,
    scope.type === "admin" ? scope.hotelId : undefined
  );
  const facilitiesQuery =
    scope.type === "admin" ? adminFacilitiesQuery : regularFacilitiesQuery;
  const rawFacilities = facilitiesQuery.data ?? [];

  const photoQueries = useQueries({
    queries: rawFacilities.map((facility) => ({
      queryKey:
        scope.type === "admin"
          ? facilityPhotoQueryKeys.adminList(
              scope.agencyId,
              scope.hotelId,
              facility.id
            )
          : facilityPhotoQueryKeys.list(scope.hotelId, facility.id),
      queryFn: () =>
        scope.type === "admin"
          ? getAdminFacilityPhotos(
              scope.agencyId as number,
              scope.hotelId as number,
              facility.id
            )
          : getFacilityPhotos(scope.hotelId as number, facility.id),
      enabled:
        Number.isFinite(scope.hotelId) &&
        (scope.type === "hotel" || Number.isFinite(scope.agencyId)) &&
        Number.isFinite(facility.id),
    })),
  });

  const facilities = useMemo(
    () =>
      rawFacilities.map((facility, index) =>
        mapFacilityResponse(facility, photoQueries[index]?.data ?? [])
      ),
    [photoQueries, rawFacilities]
  );

  const arePhotosLoading = photoQueries.some((query) => query.isLoading);

  return {
    ...facilitiesQuery,
    data: facilities,
    isLoading: facilitiesQuery.isLoading || arePhotosLoading,
  };
};

export const useFacility = (id: string, hotelId: string, agencyId?: string) => {
  const scope = useFacilityScope(hotelId, agencyId);
  const facilityId = toNumericId(id);
  const regularFacilityQuery = useGetFacilityById(
    scope.type === "hotel" ? scope.hotelId : undefined,
    scope.type === "hotel" ? facilityId : undefined
  );
  const adminFacilityQuery = useGetAdminFacilityById(
    scope.type === "admin" ? scope.agencyId : undefined,
    scope.type === "admin" ? scope.hotelId : undefined,
    scope.type === "admin" ? facilityId : undefined
  );
  const facilityQuery =
    scope.type === "admin" ? adminFacilityQuery : regularFacilityQuery;
  const regularPhotosQuery = useGetFacilityPhotos(
    scope.type === "hotel" ? scope.hotelId : undefined,
    scope.type === "hotel" ? facilityId : undefined
  );
  const adminPhotosQuery = useGetAdminFacilityPhotos(
    scope.type === "admin" ? scope.agencyId : undefined,
    scope.type === "admin" ? scope.hotelId : undefined,
    scope.type === "admin" ? facilityId : undefined
  );
  const photosQuery = scope.type === "admin" ? adminPhotosQuery : regularPhotosQuery;

  const facility = useMemo(() => {
    if (!facilityQuery.data) return undefined;

    return mapFacilityResponse(facilityQuery.data, photosQuery.data ?? []);
  }, [facilityQuery.data, photosQuery.data]);

  return {
    ...facilityQuery,
    data: facility,
    isLoading: facilityQuery.isLoading || photosQuery.isLoading,
  };
};
