import { AgencyStatus } from "@/components/auth/types/authType";

interface RevenueItem {
  month: string;
  amount: number;
}
export interface RevenueResponse {
  revenue: RevenueItem[];
}

export interface AdminOverviewStats {
  totalAgencies: number;
  pendingApprovals: number;
  activeSubscriptions: number;
  totalRevenue: number;
}

interface AgencyStatusBreakdownItem {
  status: AgencyStatus;
  count: number;
}

export interface AgencyStatusBreakdownResponse {
  total: number;
  breakdown: AgencyStatusBreakdownItem[];
}

interface PlanBreakdownItem {
  planName: string;
  count: number;
}

export interface PlanBreakdownResponse {
  total: number;
  breakdown: PlanBreakdownItem[];
}

interface GrowthItem {
  month: string;
  count: number;
}

export interface GrowthResponse {
  growth: GrowthItem[];
}

export interface AgencyItem {
  id: number;
  ownerId: number;
  name: string;
  phone: string;
  country: string;
  city: string;
  logoUrl: string | null;
  createdAt: string;
  email: string;
  planName: string;
  status: AgencyStatus;
  emailVerified: boolean;
}

export interface PaginatedAgenciesResponse {
  items: AgencyItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
