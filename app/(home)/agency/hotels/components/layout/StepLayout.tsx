"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

interface StepLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting?: boolean;
  mode?: 'add' | 'edit'
  onBack: () => void;
  onNext: () => void;
}

export function StepLayout({
  title,
  subtitle,
  children,
  isFirst,
  isLast,
  isSubmitting,
  mode = 'add',
  onBack,
  onNext,
}: StepLayoutProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="subtitle1" fontWeight={500}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Stack>
        {children}
        <Stack direction="row" justifyContent="space-between">
          <Button
            size="small"
            color="inherit"
            startIcon={<ArrowLeft size={15} />}
            disabled={isFirst}
            onClick={onBack}
            sx={{ color: "text.secondary" }}
          >
            Back
          </Button>
          <Button
            size="small"
            variant="contained"
            disableElevation
            endIcon={isLast ? <Save size={15} /> : <ArrowRight size={15} />}
            disabled={isSubmitting}
            onClick={onNext}
          >
            {isLast ? (mode === 'edit' ? "Save changes" : "Create hotel") : "Continue"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
