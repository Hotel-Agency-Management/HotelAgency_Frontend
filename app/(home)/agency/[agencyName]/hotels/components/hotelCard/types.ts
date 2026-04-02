import { HotelFormValues } from "../../types/hotel";

export interface HotelCardHotel extends HotelFormValues {
  id: string;
  isActive?: boolean;
}

export interface HotelCardProps {
  hotel: HotelCardHotel;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
