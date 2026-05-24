"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import useLanguage from "@/core/hooks/useLanguage";

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
  const { t } = useTranslation();
  const { language } = useLanguage();
  const rtlFlip: React.CSSProperties = language === 'ar' ? { transform: 'scaleX(-1)' } : {};
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
            startIcon={<ArrowLeft size={15} style={rtlFlip} />}
            disabled={isFirst}
            onClick={onBack}
            sx={{ color: "text.secondary" }}
          >
            {t('agencyHotels.actions.back', 'Back')}
          </Button>
          <Button
            size="small"
            variant="contained"
            disableElevation
            endIcon={isLast ? <Save size={15} /> : <ArrowRight size={15} style={rtlFlip} />}
            disabled={isSubmitting}
            onClick={onNext}
          >
            {isLast
              ? (mode === 'edit'
                  ? t('agencyHotels.actions.saveChanges', 'Save changes')
                  : t('agencyHotels.actions.createHotel', 'Create hotel'))
              : t('agencyHotels.actions.continue', 'Continue')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
