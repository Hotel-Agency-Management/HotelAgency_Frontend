import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { FacilityPhoto } from "../types/facility";
import {
  useDeleteFacilityPhoto,
  useUploadFacilityPhoto,
} from "./mutations/facilityPhotosMutations";
import {
  mapFacilityPhoto,
  normalizeFacilityPhotos,
} from "../utils/facilityAdapters";
import { toNumericId, useFacilityScope } from "./useFacilityScope";

export function useFacilityPhotos(
  facilityId: string,
  hotelId: string,
  existingPhotos: FacilityPhoto[],
  onPhotosChange: (photos: FacilityPhoto[]) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<FacilityPhoto[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);
  const { agencyId, hotelId: numericHotelId } = useFacilityScope(hotelId);
  const facilityIdNumber = toNumericId(facilityId);
  const { mutateAsync: uploadFacilityPhoto } = useUploadFacilityPhoto();
  const { mutate: deleteFacilityPhoto, isPending: deleting } =
    useDeleteFacilityPhoto();

  useEffect(() => {
    setPhotos(existingPhotos);
  }, [existingPhotos]);

  useEffect(() => {
    onPhotosChange(photos);
  }, [onPhotosChange, photos]);

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    if (!agencyId || !numericHotelId || !facilityIdNumber) return;

    setUploading(true);

    try {
      const uploadResults = await Promise.allSettled(
        files.map((file) =>
          uploadFacilityPhoto({
            agencyId,
            hotelId: numericHotelId,
            facilityId: facilityIdNumber,
            file,
          })
        )
      );
      const uploadedPhotos = uploadResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      if (uploadedPhotos.length === 0) return;

      setPhotos((prev) =>
        normalizeFacilityPhotos([
          ...prev,
          ...uploadedPhotos.map((photo, index) =>
            mapFacilityPhoto(photo, prev.length + index)
          ),
        ])
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = (id: string) => {
    const photoId = toNumericId(id);
    if (!agencyId || !numericHotelId || !facilityIdNumber || !photoId) return;

    deleteFacilityPhoto(
      {
        agencyId,
        hotelId: numericHotelId,
        facilityId: facilityIdNumber,
        photoId,
      },
      {
        onSuccess: () => {
          setPhotos((prev) =>
            normalizeFacilityPhotos(prev.filter((p) => p.id !== id))
          );
        },
      }
    );
  };

  const handleSetPrimary = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => ({ ...p, isPrimary: p.id === id }))
    );
  };

  return {
    inputRef,
    photos,
    uploading: uploading || deleting,
    facilityId,
    openFilePicker,
    handleFileChange,
    handleDelete,
    handleSetPrimary,
  };
}
