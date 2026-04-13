"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import { MAX_LOGO_SIZE } from "../../constants/logoDetails";
import { readFileAsDataUrl } from "../../util/fileUtils";

interface LogoCardProps {
  namePrefix?: string;
  displayLogo?: string | null;
  onLogoUpload?: (file: File, previewUrl: string) => Promise<void> | void;
  isUploading?: boolean;
}

export function LogoCard({
  namePrefix,
  displayLogo,
  onLogoUpload,
  isUploading = false,
}: LogoCardProps) {
  const { watch, setValue } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);
  const logoFieldName = namePrefix ? `${namePrefix}.logo` : "logo";
  const formLogo = watch(logoFieldName) as string | null | undefined;
  const logo = formLogo || displayLogo || null;

  useEffect(() => {
    setLogoLoadFailed(false);
  }, [logo]);

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
      const previousLogo = formLogo ?? displayLogo ?? null;
      const previewUrl = await readFileAsDataUrl(file);
      setValue(logoFieldName, previewUrl, { shouldDirty: !onLogoUpload });
      if (onLogoUpload) {
        try {
          await onLogoUpload(file, previewUrl);
        } catch (err) {
          setValue(logoFieldName, previousLogo ?? null, { shouldDirty: false });
          throw err;
        }
      }
      setUploadError(null);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <Paper elevation={0} variant="card">
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={500}>Brand identity</Typography>
        <Typography variant="body2">
          Upload a custom logo for your agency.
        </Typography>
      </Stack>

      <Divider />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ xs: "stretch", sm: "center" }}>
        <Avatar
          src={logoLoadFailed ? undefined : (logo ?? undefined)}
          variant="square"
          sx={{ width: 96, height: 96, borderRadius: 3 }}
          imgProps={{
            onError: () => setLogoLoadFailed(true),
            style: { objectFit: 'contain' },
          }}
        >
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
              disabled={isUploading}
              startIcon={isUploading ? <CircularProgress size={13} color="inherit" /> : <Upload size={15} />}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              startIcon={<Trash2 size={15} />}
              disabled={!logo || isUploading || Boolean(onLogoUpload)}
              onClick={() => setValue(logoFieldName, null, { shouldDirty: true })}
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
