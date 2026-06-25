import { AgencyStatus } from "@/components/auth/types/authType";

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


export interface LatestAgency {
  id: string;
  name: string;
  status: AgencyStatus;
  plan: string;
  createdAt: string;
  country?: string;
}

