"use client";

import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/loaders/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { SummaryStatCard } from "./SummaryStatCard";
import { STAT_CARDS_CONFIG } from "../constants/statCardsConfig";
import { StatCardProps } from "../types/dashboardTypes";
import { useAdminOverviewStats } from "../hooks/queries/useAdminStatistic";
import { LoadingBox } from "../styles/StyledComponents";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function DashboardStatsSection() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useAdminOverviewStats();

  return (
    <>
      <Typography variant="h6" fontWeight={600} color="text.primary" >
        {t('dashboard.admin.overview', { defaultValue: 'Overview' })}
      </Typography>

      {isLoading && (
        <LoadingBox>
          <Spinner />
        </LoadingBox>
      )}

      {isError && <ErrorMessage message={t('dashboard.admin.stats.loadError', { defaultValue: 'Failed to load overview statistics' })} />}

      {!isLoading && !isError && (
        <Grid container spacing={2.5}>
          {STAT_CARDS_CONFIG.map(({ key, icon, ...card }) => {
            const value = key === 'totalRevenue'
              ? currencyFormatter.format(data?.[key] ?? 0)
              : (data?.[key] ?? 0);

            const translatedCard: StatCardProps = {
              ...card,
              value,
              title: t(`dashboard.admin.stats.${key}.title`, { defaultValue: card.title }),
              subtitle: t(`dashboard.admin.stats.${key}.subtitle`, { defaultValue: card.subtitle }),
            };

            return (
              <Grid key={key} size={{ xs: 12, sm: 6, md: 3 }}>
                <SummaryStatCard {...translatedCard} icon={icon} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
