import { HotelFormValues } from "../../types/hotel";

export interface HotelCardHotel extends HotelFormValues {
  id: string;
  agencyId?: number;
  isActive?: boolean;
}

export interface HotelCardProps {
  hotel: HotelCardHotel;
  onEdit?: (id: string) => void;
  onOpen?: (id: string) => void;
}
