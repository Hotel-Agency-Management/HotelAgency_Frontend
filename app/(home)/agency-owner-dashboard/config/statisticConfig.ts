interface RevenueByMonth {
  month: string;
  year: number;
  revenue: number;
}

export type RevenueTrendsResponse = RevenueByMonth[];

export interface OverviewStatsResponse {
  totalRevenue: number;
  totalBookings: number;
  pendingReservations: number;
  averageBookingValue: number;
}

interface ProfitExpenseByMonth {
  month: string;
  year: number;
  profit: number;
  expenses: number;
}

export type ProfitExpenseResponse = ProfitExpenseByMonth[];

type BookingSourceType =
  | "Online"
  | "OTA"
  | "Phone"
  | "Walk-in";

interface BookingSource {
  type: BookingSourceType;
  count: number;
  percentage: number;
}

export type BookingSourcesResponse = BookingSource[];

interface RevenueByHotel {
  hotelId: number;
  hotelName: string;
  revenue: number;
}

export type RevenueByHotelResponse = RevenueByHotel[];
type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "CheckedIn"
  | "CheckedOut"
  | "Cancelled";

interface BookingStatusDistribution {
  status: BookingStatus;
  count: number;
  percentage: number;
}

export type BookingStatusDistributionResponse = BookingStatusDistribution[];

interface RoomTypeStats {
  roomTypeId: number;
  roomTypeName: string;
  reservationsCount: number;
}

export type RoomTypeStatsResponse = RoomTypeStats[];
