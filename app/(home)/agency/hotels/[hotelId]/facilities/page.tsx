import { HotelResourcesTabs } from "../components/HotelResourcesTabs";
import { FacilitiesPage } from "./components/FacilitiesPage";

export default function HotelFacilitiesPage() {
  return (
    <HotelResourcesTabs>
      <FacilitiesPage />
    </HotelResourcesTabs>
  );
}
