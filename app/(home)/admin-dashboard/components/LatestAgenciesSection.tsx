"use client";
import {
  Stack, Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, useTheme,
} from "@mui/material";
import { SxProps, Theme } from '@mui/material'
import { useTranslation } from "react-i18next";
import Spinner from "@/components/loaders/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { AgencyRow } from "./AgencyRow";
import { useAdminRecentAgencies } from "../hooks/queries/useAdminStatistic";
import { mapAgencyItemToLatestAgency } from "../utils/mapAgencyItem";
import { LoadingBox } from "../styles/StyledComponents";

interface LatestAgenciesSectionProps {
  sx?: SxProps<Theme>
}

export function LatestAgenciesSection({ sx }: LatestAgenciesSectionProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useAdminRecentAgencies();

  const agencies = data?.items.map(mapAgencyItemToLatestAgency) ?? [];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: "hidden",
        ...sx,
      }}
    >
      <Stack sx={{ px: 2.5, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
          {t('dashboard.admin.latestAgencies.title', { defaultValue: 'Latest Agencies' })}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {t('dashboard.admin.latestAgencies.subtitle', { defaultValue: 'Most recently registered agencies' })}
        </Typography>
      </Stack>

      {isLoading && (
        <LoadingBox>
          <Spinner />
        </LoadingBox>
      )}

      {isError && (
        <Box>
          <ErrorMessage message={t('dashboard.admin.latestAgencies.loadError', { defaultValue: 'Failed to load latest agencies' })} />
        </Box>
      )}

      {!isLoading && !isError && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {[
                  t('dashboard.admin.latestAgencies.colAgency', { defaultValue: 'Agency' }),
                  t('dashboard.admin.latestAgencies.colStatus', { defaultValue: 'Status' }),
                  t('dashboard.admin.latestAgencies.colPlan', { defaultValue: 'Plan' }),
                  t('dashboard.admin.latestAgencies.colRegistered', { defaultValue: 'Registered' }),
                ].map(header => (
                  <TableCell key={header}>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      fontWeight={600}
                      textTransform="uppercase"
                      letterSpacing={0.5}
                    >
                      {header}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ "& tr:last-of-type td": { border: 0 } }}>
              {agencies.map(agency => (
                <AgencyRow key={agency.id} agency={agency} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
