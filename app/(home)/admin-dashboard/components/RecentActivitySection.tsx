"use client";

import { Box, Typography, useTheme } from "@mui/material"
import { SxProps, Theme } from '@mui/material'
import { useTranslation } from "react-i18next";
import Spinner from "@/components/loaders/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useAdminRecentLogs } from "../hooks/queries/useAdminStatistic";
import { ActivityItemRow } from "./ActivityItemRow";
import { LoadingBox } from "../styles/StyledComponents";

interface RecentActivitySectionProps {
  sx?: SxProps<Theme>
}
export function RecentActivitySection({ sx }: RecentActivitySectionProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useAdminRecentLogs();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        height: "100%",
        ...sx,
      }}
    >
      <Box sx={{ px: 2.5, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
          {t('dashboard.admin.recentActivity.title', { defaultValue: 'Recent Activity' })}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {t('dashboard.admin.recentActivity.subtitle', { defaultValue: 'Latest platform events' })}
        </Typography>
      </Box>

      {isLoading ? (
        <LoadingBox>
          <Spinner />
        </LoadingBox>
      ) : isError ? (
        <Box sx={{ px: 2.5, py: 1 }}>
          <ErrorMessage
            message={t('dashboard.admin.recentActivity.loadError', { defaultValue: 'Failed to load recent activity' })}
          />
        </Box>
      ) : (
        <Box sx={{ px: 2.5, py: 1 }}>
          {(data ?? []).map((item) => (
            <ActivityItemRow key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}
