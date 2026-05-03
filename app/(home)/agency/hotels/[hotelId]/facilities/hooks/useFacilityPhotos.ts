import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { FacilityPhoto } from "../types/facility";
import {
  useDeleteFacilityPhoto,
  useDeleteAdminFacilityPhoto,
  useUploadFacilityPhoto,
  useUploadAdminFacilityPhoto,
} from "./mutations/facilityPhotosMutations";
import {
  mapFacilityPhoto,
  normalizeFacilityPhotos,
} from "../utils/facilityAdapters";
import { useFacilityScope } from "./useFacilityScope";
import { toNumericId } from "../utils/numericId";

export function useFacilityPhotos(
  facilityId: string,
  hotelId: string,
  agencyId: string | undefined,
  existingPhotos: FacilityPhoto[],
  onPhotosChange: (photos: FacilityPhoto[]) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<FacilityPhoto[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);
  const scope = useFacilityScope(hotelId, agencyId);
  const facilityIdNumber = toNumericId(facilityId);
  const { mutateAsync: uploadFacilityPhoto } = useUploadFacilityPhoto();
  const { mutateAsync: uploadAdminFacilityPhoto } =
    useUploadAdminFacilityPhoto();
  const { mutate: deleteFacilityPhoto, isPending: deleting } =
    useDeleteFacilityPhoto();
  const { mutate: deleteAdminFacilityPhoto, isPending: deletingAdmin } =
    useDeleteAdminFacilityPhoto();

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
    if (!scope.hotelId || !facilityIdNumber) return;
    const hotelIdNumber = scope.hotelId;

    setUploading(true);

    try {
      const uploadResults = await Promise.allSettled(
        files.map((file) =>
          scope.type === "admin"
            ? uploadAdminFacilityPhoto({
                agencyId: scope.agencyId,
                hotelId: hotelIdNumber,
                facilityId: facilityIdNumber,
                file,
              })
            : uploadFacilityPhoto({
                hotelId: hotelIdNumber,
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
    if (!scope.hotelId || !facilityIdNumber || !photoId) return;
    const hotelIdNumber = scope.hotelId;

    if (scope.type === "admin") {
      deleteAdminFacilityPhoto(
        {
          agencyId: scope.agencyId,
          hotelId: hotelIdNumber,
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
      return;
    }

    deleteFacilityPhoto(
      {
        hotelId: hotelIdNumber,
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
    uploading: uploading || deleting || deletingAdmin,
    facilityId,
    openFilePicker,
    handleFileChange,
    handleDelete,
    handleSetPrimary,
  };
}
