"use client";
import { useRef, useState, type ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import type { BrandingSettings } from "@/core/theme/palette/branding";
import { MAX_LOGO_SIZE } from "../../constants/logoDetails";
import { readFileAsDataUrl } from "../../util/fileUtils";

export function LogoCard() {
  const { watch, setValue } = useFormContext<BrandingSettings>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const logo = watch("logo");

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      setUploadError("Logo must be 2 MB or less.");
      e.target.value = "";
      return;
    }

    try {
      setValue("logo", await readFileAsDataUrl(file), { shouldDirty: true });
      setUploadError(null);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <Paper elevation={0} sx={cardSx}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={500}>Brand identity</Typography>
        <Typography variant="body2">
          Upload a custom logo — stored per browser until a backend save endpoint is wired.
        </Typography>
      </Stack>

      <Divider />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ xs: "stretch", sm: "center" }}>
        <Avatar src={logo ?? undefined} variant="circular" sx={{ width: 96, height: 96, borderRadius: 3 }}>
          <Stack spacing={0.75} alignItems="center">
            <ImageIcon size={20} />
            <Typography variant="caption" color="text.disabled">No logo</Typography>
          </Stack>
        </Avatar>

        <Stack spacing={1.5} flex={1}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button
              size="small"
              variant="contained"
              disableElevation
              startIcon={<Upload size={15} />}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              startIcon={<Trash2 size={15} />}
              disabled={!logo}
              onClick={() => setValue("logo", null, { shouldDirty: true })}
              sx={{ borderColor: "divider" }}
            >
              Remove
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            PNG, JPG, SVG or WEBP · max 2 MB
          </Typography>

          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            onChange={handleUpload}
          />

          {uploadError && (
            <Alert severity="error" sx={{ py: 0.25 }}>{uploadError}</Alert>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

const cardSx = {
  borderRadius: 3,
  border: "0.5px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  boxShadow: "none",
  p: 3,
};
