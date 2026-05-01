import { useEffect, useRef, useState } from "react";
import { RoomPhotosUploadProps } from "../components/room/roomPhotosUpload/types";
import { RoomPhoto } from "../types/room";

export function useRoomPhotosUpload({
  roomId,
  existingPhotos,
  onPhotosChange,
}: RoomPhotosUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<RoomPhoto[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPhotos(existingPhotos);
  }, [existingPhotos]);

  useEffect(() => {
    onPhotosChange?.(photos);
  }, [photos, onPhotosChange]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setPhotos((prev) => {
      const newPhotos: RoomPhoto[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        isPrimary: prev.length === 0 && index === 0,
      }));
      return [...prev, ...newPhotos];
    });

    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = (id: RoomPhoto["id"]) => {
    setPhotos((prev) => {
      const filtered = prev.filter((photo) => photo.id !== id);
      const hasPrimary = filtered.some((photo) => photo.isPrimary);
      if (!hasPrimary && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isPrimary: true };
      }
      return filtered;
    });
  };

  const handleSetPrimary = (id: RoomPhoto["id"]) => {
    setPhotos((prev) =>
      prev.map((photo) => ({ ...photo, isPrimary: photo.id === id }))
    );
  };

  return {
    inputRef,
    photos,
    uploading,
    roomId,
    openFilePicker,
    handleFileChange,
    handleDelete,
    handleSetPrimary,
  };
}
