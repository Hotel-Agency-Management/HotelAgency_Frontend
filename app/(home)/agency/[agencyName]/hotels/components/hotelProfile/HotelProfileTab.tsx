"use client";

import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Building2, CircleDollarSign, MapPin } from "lucide-react";
import { useHotelProfile } from "../../hooks/useHotelProfile";
import type { HotelFormValues } from "../../types/hotel";
import { HotelInfoFields } from "./HotelInfoFields";
import Box from "@mui/material/Box";

interface HotelProfileTabProps {
  defaultValues: HotelFormValues;
  onSave: (data: HotelFormValues) => Promise<void> | void;
  isLoading?: boolean;
  isActive?: boolean;
}

export function HotelProfileTab({
  defaultValues,
  onSave,
  isLoading = false,
  isActive = true,
}: HotelProfileTabProps) {
  const {
    isEditing,
    isSaving,
    form,
    handleEdit,
    handleSave,
    handleCancel,
  } = useHotelProfile({ defaultValues, onSave });

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
        <Stack
          spacing={3}
          sx={{
            p: 3,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
          >
            <Stack spacing={1.25}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Typography variant="h5">Hotel Information</Typography>
                <Chip
                  size="small"
                  color={isActive ? "success" : "default"}
                  label={isActive ? "Active" : "Inactive"}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Review and update the main details returned for this hotel.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<Building2 size={14} />}
                  label={currentValues.basicInfo.name || "Hotel"}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<MapPin size={14} />}
                  label={currentValues.basicInfo.city || "City not set"}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<CircleDollarSign size={14} />}
                  label={currentValues.basicInfo.currency || "Currency not set"}
                />
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1}>
              {isEditing && (
                <Fade in={isEditing}>
                  <Tooltip title="Cancel">
                    <Box component='span'>
                      <IconButton
                        size="small"
                        onClick={handleCancel}
                        disabled={isSaving}
                        color="default"
                      >
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Tooltip>
                </Fade>
              )}

              <Tooltip title={isEditing ? "Save changes" : "Edit hotel"}>
                <Box component='span'>
                  <IconButton
                    size="small"
                    onClick={isEditing ? handleSave : handleEdit}
                    disabled={isSaving}
                    color={isEditing ? "primary" : "default"}
                  >
                    {isSaving ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : isEditing ? (
                      <SaveOutlinedIcon fontSize="small" />
                    ) : (
                      <EditOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </Tooltip>
            </Stack>
          </Stack>

          <Divider />

          <HotelInfoFields
            isEditing={isEditing}
            isLoading={isLoading}
            control={form.control}
            currentValues={currentValues}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
