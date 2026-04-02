"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAgencyProfile } from "../../hooks/useAgencyProfile";
import { AgencyProfile } from "../../types/agencyProfile";
import { AgencyFileCards } from "./AgencyFileCards";
import { AgencyInfoFields } from "./AgencyInfoFields";



interface AgencyProfileTabProps {
  defaultValues: AgencyProfile;
  onSave: (data: AgencyProfile) => Promise<void> | void;
  isLoading?: boolean;
}

export function AgencyProfileTab({
  defaultValues,
  onSave,
  isLoading = false,
}: AgencyProfileTabProps) {
  const { isEditing, isLoading: isSaving, form, handleEdit, handleSave, handleCancel } =
    useAgencyProfile({ defaultValues, onSave });

  const currentValues = form.watch();

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          transition: "box-shadow 0.3s ease",
          "&:hover": { boxShadow: 2 },
        }}
      >
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Agency Information</Typography>
            <Stack direction="row" spacing={1}>
              {isEditing && (
                <Fade in={isEditing}>
                  <Tooltip title="Cancel">
                    <span>
                      <IconButton
                        size="small"
                        onClick={handleCancel}
                        disabled={isSaving}
                        color="default"
                      >
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Fade>
              )}
              <Tooltip title={isEditing ? "Save changes" : "Edit profile"}>
                <span>
                  <IconButton
                    size="small"
                    onClick={isEditing ? handleSave : handleEdit}
                    disabled={isSaving}
                    color={isEditing ? "primary" : "default"}
                    sx={{
                      transition: "transform 0.2s ease, color 0.2s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {isSaving ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : isEditing ? (
                      <SaveOutlinedIcon fontSize="small" />
                    ) : (
                      <EditOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          </Stack>

          <Divider />

          <AgencyInfoFields
            isEditing={isEditing}
            isLoading={isLoading}
            control={form.control}
            currentValues={currentValues}
          />
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          transition: "box-shadow 0.3s ease",
          "&:hover": { boxShadow: 2 },
        }}
      >
        <Stack spacing={3} sx={{ p: 3 }}>
          <Typography variant="h5">Uploaded Files</Typography>
          <Divider />
          <AgencyFileCards files={currentValues.files} isLoading={isLoading} />
        </Stack>
      </Paper>
    </Stack>
  );
}
