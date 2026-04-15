import { useEffect, useRef, useState } from "react";
import { FacilityPhoto } from "../types/facility";

export function useFacilityPhotos(
  facilityId: string,
  existingPhotos: FacilityPhoto[],
  onPhotosChange: (photos: FacilityPhoto[]) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<FacilityPhoto[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPhotos(existingPhotos);
  }, [existingPhotos]);

  useEffect(() => {
    onPhotosChange(photos);
  }, [onPhotosChange, photos]);

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newPhotos: FacilityPhoto[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      isPrimary: photos.length === 0 && index === 0,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    setUploading(false);
    event.target.value = "";
  };

  const handleDelete = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      const hasPrimary = filtered.some((p) => p.isPrimary);
      if (!hasPrimary && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isPrimary: true };
      }
      return filtered;
    });
  };

  const handleSetPrimary = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => ({ ...p, isPrimary: p.id === id }))
    );
  };

  return {
    inputRef,
    photos,
    uploading,
    facilityId,
    openFilePicker,
    handleFileChange,
    handleDelete,
    handleSetPrimary,
  };
}
