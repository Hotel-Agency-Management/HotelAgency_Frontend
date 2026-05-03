import { AgencyFiltersState } from "../types/agency";

export const DEFAULT_FILTERS: AgencyFiltersState = {
  country: '',
}

export const PLAN_NAMES: Record<number, string> = {
  1: 'Basic',
  2: 'Pro',
  3: 'Enterprise'
}
