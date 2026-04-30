import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getFacilityPhotos } from "../clients/facilityPhotoClient";
import { mapFacilityResponse } from "../utils/facilityAdapters";
import {
  useGetFacilities,
  useGetFacilityById,
} from "./queries/facilityQueries";
import {
  facilityPhotoQueryKeys,
  useGetFacilityPhotos,
} from "./queries/facilityPhotosQueries";
import { useFacilityScope } from "./useFacilityScope";
import { toNumericId } from "../utils/numericId";

export const useFacilities = (hotelId: string) => {
  const { agencyId, hotelId: numericHotelId } = useFacilityScope(hotelId);
  const facilitiesQuery = useGetFacilities(agencyId, numericHotelId);
  const rawFacilities = facilitiesQuery.data ?? [];

  const photoQueries = useQueries({
    queries: rawFacilities.map((facility) => ({
      queryKey: facilityPhotoQueryKeys.list(
        agencyId,
        numericHotelId,
        facility.id
      ),
      queryFn: () =>
        getFacilityPhotos(
          agencyId as number,
          numericHotelId as number,
          facility.id
        ),
      enabled:
        Number.isFinite(agencyId) &&
        Number.isFinite(numericHotelId) &&
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

export const useFacility = (id: string, hotelId?: string) => {
  const { agencyId, hotelId: numericHotelId } = useFacilityScope(hotelId);
  const facilityId = toNumericId(id);
  const facilityQuery = useGetFacilityById(agencyId, numericHotelId, facilityId);
  const photosQuery = useGetFacilityPhotos(agencyId, numericHotelId, facilityId);

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
