export interface ReservationsSummary {
  totalReservations: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  pendingReservations: number;
}

interface RoomStatusItem {
  status: string;
  count: number;
  percentage: number;
}

export interface RoomStatusSummaryResponse {
  totalRooms: number;
  items: RoomStatusItem[];
}

type ReservationStatus =
  | "Pending"
  | "Confirmed"
  | "CheckedIn"
  | "CheckedOut"
  | "Cancelled";

interface ReservationStatusItem {
  status: ReservationStatus;
  count: number;
  percentage: number;
}

export interface ReservationStatusSummaryResponse {
  totalReservations: number;
  items: ReservationStatusItem[];
}

type ReservationType =
  | "Online"
  | "OTA"
  | "Phone"
  | "Walk-in";

interface ReservationTypeItem {
  type: ReservationType;
  count: number;
  percentage: number;
}

export interface ReservationTypeSummaryResponse {
  totalReservations: number;
  items: ReservationTypeItem[];
}

type RevenueGroupBy = "daily" | "weekly" | "monthly" | "yearly";

interface RevenueTrendItem {
  label: string;
  revenue: number;
}

export interface RevenueTrendResponse {
  groupBy: RevenueGroupBy;
  items: RevenueTrendItem[];
}

export interface InsuranceIncomeTrendItem {
  month: string;
  value: number;
}

export interface TicketCompletionRateResponse {
  value: number;
}
