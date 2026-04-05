"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

interface ThemeFooterProps {
  isSaving: boolean;
  isDirty: boolean;
  isDefault: boolean;
  onDiscard: () => void;
  onRestoreDefaults: () => void;
  onApply: () => void;
}

export function ThemeFooter({
  isSaving,
  isDirty,
  isDefault,
  onDiscard,
  onRestoreDefaults,
  onApply,
}: ThemeFooterProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      spacing={1.5}
      flexWrap="wrap"
    >
      <Stack direction="row" spacing={1}>
        <Button size="small" color="inherit" onClick={onDiscard}
          sx={{ color: "text.secondary" }}>
          Discard
        </Button>
        <Button size="small" variant="outlined" color="inherit"
          startIcon={<RestartAltOutlinedIcon fontSize="small" />}
          disabled={isDefault}
          onClick={onRestoreDefaults}
          sx={{ borderColor: "divider" }}
        >
          Restore defaults
        </Button>
      </Stack>

      <Button size="small" variant="contained" disableElevation
        startIcon={
          isSaving
            ? <CircularProgress size={13} color="inherit" />
            : <SaveOutlinedIcon fontSize="small" />
        }
        disabled={isSaving || !isDirty}
        onClick={onApply}
      >
        Apply theme
      </Button>
    </Stack>
  );
}
