import apiClient from "@/core/clients/apiClient";
import { AdminOverviewStats, AgencyStatusBreakdownResponse, GrowthResponse, PaginatedAgenciesResponse, PlanBreakdownResponse, RevenueResponse } from "../config/adminStatisticConfig";
import { SystemLogItem } from "@/app/(home)/system-logs/types/systemLog";

export async function getAdminRevenue() : Promise<RevenueResponse> {
    const response = await apiClient.get <RevenueResponse>('admin/dashboard/revenue');
    return response.data;
}

export async function getAdminOverviewStats() : Promise<AdminOverviewStats> {
    const response = await apiClient.get <AdminOverviewStats>('admin/dashboard/summary');
    return response.data;
}

export async function getAdminAgencyStatusBreakdown() : Promise<AgencyStatusBreakdownResponse> {
    const response = await apiClient.get <AgencyStatusBreakdownResponse>('admin/dashboard/agency-status');
    return response.data;
}

export async function getAdminPlanDistribution() : Promise<PlanBreakdownResponse> {
    const response = await apiClient.get <PlanBreakdownResponse>('admin/dashboard/subscription-distribution');
    return response.data;
}

export async function getAdminGrowthData() : Promise<GrowthResponse> {
    const response = await apiClient.get <GrowthResponse>('admin/dashboard/agency-growth');
    return response.data;
}

export async function getAdminRecentAgencies() : Promise<PaginatedAgenciesResponse> {
    const response = await apiClient.get <PaginatedAgenciesResponse>('admin/dashboard/latest-agencies');
    return response.data;
}

export async function getAdminRecentLogs() : Promise<SystemLogItem[]> {
    const response = await apiClient.get <SystemLogItem[]>('admin/dashboard/recent-logs');
    return response.data;
}
