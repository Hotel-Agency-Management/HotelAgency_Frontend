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
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { FileText } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { HotelTermsAndConditions } from "../types/terms";
import type { HotelTermsFormValues } from "../schema/hotelTermsSchema";
import { HotelTermsForm } from "./HotelTermsForm";

interface HotelTermsFormCardProps {
  form: UseFormReturn<HotelTermsFormValues>;
  terms: HotelTermsAndConditions | null;
  isEditing: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const getStatusLabel = (status: HotelTermsFormValues["status"]) =>
  status === "ACTIVE" ? "Active" : "Draft";

export function HotelTermsFormCard({
  form,
  terms,
  isEditing,
  isSaving,
  isDeleting,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: HotelTermsFormCardProps) {
  const {
    formState: { isDirty, isValid },
  } = form;
  const currentValues = form.watch();
  const isExistingTerms = Boolean(terms);
  const isReadOnly = isExistingTerms && !isEditing;
  const isBusy = isSaving || isDeleting;

  return (
    <Paper variant="card">
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Stack spacing={1.25}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography variant="h5">
                {isExistingTerms ? "Terms & Conditions" : "Create Terms & Conditions"}
              </Typography>
              <Chip
                size="small"
                color={currentValues.status === "ACTIVE" ? "success" : "default"}
                label={getStatusLabel(currentValues.status)}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Keep the hotel’s booking terms scoped to this property and ready for
              future contract flows.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                size="small"
                variant="outlined"
                icon={<FileText size={14} />}
                label={currentValues.title || "Untitled terms"}
              />
            </Stack>
          </Stack>

          {isExistingTerms ? (
            <Stack direction="row" spacing={1}>
              {isEditing ? (
                <Fade in={isEditing}>
                  <Tooltip title="Cancel">
                    <Box component="span">
                      <IconButton
                        size="small"
                        onClick={onCancel}
                        disabled={isBusy}
                        color="default"
                      >
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Tooltip>
                </Fade>
              ) : null}

              <Tooltip title="Delete terms">
                <Box component="span">
                  <IconButton
                    size="small"
                    onClick={onDelete}
                    disabled={isBusy}
                    color="error"
                  >
                    {isDeleting ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </Tooltip>

              <Tooltip title={isEditing ? "Save changes" : "Edit terms"}>
                <Box component="span">
                  <IconButton
                    size="small"
                    onClick={isEditing ? onSave : onEdit}
                    disabled={isBusy || (isEditing && (!isDirty || !isValid))}
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
          ) : null}
        </Stack>

        <Divider />

        <HotelTermsForm
          form={form}
          isExistingTerms={isExistingTerms}
          isReadOnly={isReadOnly}
          isBusy={isBusy}
          isSaving={isSaving}
          onSave={onSave}
        />
      </Stack>
    </Paper>
  );
}
