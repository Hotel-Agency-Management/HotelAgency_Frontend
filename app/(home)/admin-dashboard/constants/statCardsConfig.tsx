import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import VerifiedIcon from "@mui/icons-material/Verified";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { StatCardProps } from "../types/dashboardTypes";
import { AdminOverviewStats } from "../config/adminStatisticConfig";

export type StatCardConfig = Pick<StatCardProps, "title" | "subtitle" | "color"> & {
  key: keyof AdminOverviewStats;
  icon: React.ReactNode;
};

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    key: "totalAgencies",
    title: "Total Agencies",
    subtitle: "Registered on platform",
    color: "primary",
    icon: <BusinessIcon fontSize="small" />,
  },
  {
    key: "pendingApprovals",
    title: "Pending Approvals",
    subtitle: "Awaiting review",
    color: "warning",
    icon: <HourglassTopIcon fontSize="small" />,
  },
  {
    key: "activeSubscriptions",
    title: "Active Subscriptions",
    subtitle: "Currently active plans",
    color: "success",
    icon: <VerifiedIcon fontSize="small" />,
  },
  {
    key: "totalRevenue",
    title: "Total Revenue",
    subtitle: "All time",
    color: "info",
    icon: <AttachMoneyIcon fontSize="small" />,
  },
];
