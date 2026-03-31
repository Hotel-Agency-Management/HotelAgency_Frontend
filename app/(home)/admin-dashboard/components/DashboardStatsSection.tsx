"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
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

export function DashboardStatsSection() {
  return (
    <>
      <Typography variant="h6" fontWeight={600} color="text.primary" mb={2}>
        Overview
      </Typography>
      <Grid container spacing={2.5}>
        {STAT_CARDS.map((card: StatCardProps, i) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryStatCard {...card} icon={CARD_ICONS[i]} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
