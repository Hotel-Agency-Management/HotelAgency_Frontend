import { AgencyItem } from "../config/adminStatisticConfig";
import { LatestAgency } from "../types/dashboardTypes";

export function mapAgencyItemToLatestAgency(item: AgencyItem): LatestAgency {
  return {
    id: String(item.id),
    name: item.name,
    status: item.status,
    plan: item.planName,
    createdAt: item.createdAt,
    country: item.country,
  };
}
