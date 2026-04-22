import { HOTEL_TERMS_STATUS_VALUES } from "../constants/status";

export type HotelTermsStatus = (typeof HOTEL_TERMS_STATUS_VALUES)[number];

export interface HotelTermsAndConditions {
  id: string;
  hotelId: string;
  title: string;
  content: string;
  status: HotelTermsStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SaveHotelTermsPayload {
  hotelId: string;
  title: string;
  content: string;
  status: HotelTermsStatus;
}
