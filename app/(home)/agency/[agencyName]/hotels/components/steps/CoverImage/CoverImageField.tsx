"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { HotelFormValues } from "../../../types/hotel";
import { MAX_COVER_SIZE, readFileAsDataUrl } from "@/app/(home)/agency/constants/logoDetails";
import { CoverUploadBox } from "./CoverUploadBox";
import { CoverImagePlaceholder } from "./CoverImagePlaceholder";
import { CoverImagePreview } from "./CoverImagePreview";

export function CoverImageField() {
  const { watch, setValue } = useFormContext<HotelFormValues>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const coverImage = watch("basicInfo.coverImage");

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_COVER_SIZE) {
      setError("Image must be 5 MB or less.");
      e.target.value = "";
      return;
    }

    try {
      setValue("basicInfo.coverImage", await readFileAsDataUrl(file), { shouldDirty: true });
      setError(null);
    } catch {
      setError("Upload failed.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="overline">Cover image</Typography>

      <CoverUploadBox
        hasImage={!!coverImage}
        onClick={() => !coverImage && fileInputRef.current?.click()}
      >
        {coverImage ? (
          <CoverImagePreview
            src={coverImage}
            onChange={() => fileInputRef.current?.click()}
            onRemove={() => setValue("basicInfo.coverImage", null, { shouldDirty: true })}
          />
        ) : (
          <CoverImagePlaceholder />
        )}
      </CoverUploadBox>

      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleUpload}
      />

      {error && <Alert severity="error" sx={{ py: 0.25 }}>{error}</Alert>}
    </Stack>
  );
}
