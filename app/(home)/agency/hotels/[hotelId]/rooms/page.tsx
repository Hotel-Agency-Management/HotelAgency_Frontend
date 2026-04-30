"use client";
import { HotelResourcesTabs } from "../components/HotelResourcesTabs";
import RoomsPage from "./components/room/RoomsPage";

export default function HotelRoomsPage() {
  return (
    <HotelResourcesTabs>
      <RoomsPage />
    </HotelResourcesTabs>
  );
}
