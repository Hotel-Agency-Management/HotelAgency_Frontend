"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import BusinessIcon from "@mui/icons-material/Business";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import VerifiedIcon from "@mui/icons-material/Verified";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { SummaryStatCard } from "./SummaryStatCard";
import { STAT_CARDS } from "../data/dashboardMock";
import { StatCardProps } from "../types/dashboardTypes";

const CARD_ICONS: React.ReactNode[] = [
  <BusinessIcon fontSize="small" />,
  <HourglassTopIcon fontSize="small" />,
  <VerifiedIcon fontSize="small" />,
  <AttachMoneyIcon fontSize="small" />,
];

const CARD_TRANSLATION_KEYS = [
  "totalAgencies",
  "pendingApprovals",
  "activeSubscriptions",
  "totalRevenue",
] as const;

export function DashboardStatsSection() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" fontWeight={600} color="text.primary" >
        {t('dashboard.admin.overview', { defaultValue: 'Overview' })}
      </Typography>
      <Grid container spacing={2.5}>
        {STAT_CARDS.map((card: StatCardProps, i) => {
          const translationKey = CARD_TRANSLATION_KEYS[i];
          const translatedCard: StatCardProps = {
            ...card,
            title: t(`dashboard.admin.stats.${translationKey}.title`, { defaultValue: card.title }),
            subtitle: t(`dashboard.admin.stats.${translationKey}.subtitle`, { defaultValue: card.subtitle }),
            trend: card.trend
              ? {
                  ...card.trend,
                  value: t(`dashboard.admin.stats.${translationKey}.trend`, { defaultValue: card.trend.value }),
                }
              : undefined,
          };

          return (
            <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <SummaryStatCard {...translatedCard} icon={CARD_ICONS[i]} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
