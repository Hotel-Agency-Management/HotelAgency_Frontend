
export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  color?: "primary" | "success" | "warning" | "error" | "info";
}


export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface BarChartProps {
  title: string;
  labels: string[];
  datasets: ChartDataset[];
  height?: number;
}

export interface LineChartProps {
  title: string;
  labels: string[];
  datasets: ChartDataset[];
  height?: number;
}

export interface PieChartProps {
  title: string;
  labels: string[];
  data: number[];
  colors?: string[];
  height?: number;
  donut?: boolean;
}


export type AgencyStatus = "Active" | "Pending" | "Rejected";
export type AgencyPlan = "Basic" | "Pro" | "Enterprise";

export interface LatestAgency {
  id: string;
  name: string;
  status: AgencyStatus;
  plan: AgencyPlan;
  createdAt: string;
  country?: string;
}


export type ActivityType =
  | "approval_submitted"
  | "agency_approved"
  | "agency_rejected"
  | "subscription_updated"
  | "plan_created"
  | "agency_suspended";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  actor?: string;
  timestamp: string;
}
