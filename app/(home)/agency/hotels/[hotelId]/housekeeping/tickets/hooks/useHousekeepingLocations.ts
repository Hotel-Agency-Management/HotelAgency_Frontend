"use client";

import { useCallback, useMemo } from "react";
import { useGetFacilities } from "../../../facilities/hooks/queries/facilityQueries";
import type { FacilityResponse } from "../../../facilities/configs/facilityConfig";
import { useRoomsByHotel } from "../../../rooms/hooks/queries/roomQueries";
import type { RoomListItemResponse } from "../../../rooms/configs/roomConfig";
import { HOUSEKEEPING_LOCATION_TYPE } from "../constants/ticket";
import type { HousekeepingTicket } from "../types/ticket";

export interface HousekeepingRoomOption {
  id: string;
  roomNumber: string;
}

export interface HousekeepingFacilityOption {
  id: string;
  name: string;
  category?: string;
}

type PaginatedResponse<T> = {
  items?: T[];
};

type RoomLocationResponse = Partial<RoomListItemResponse> & {
  roomId?: number | string;
  roomType?: string;
};

type FacilityLocationResponse = Partial<FacilityResponse> & {
  facilityId?: number | string;
};

const getResponseItems = <T,>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[];

  if (data && typeof data === "object") {
    const items = (data as PaginatedResponse<T>).items;
    return Array.isArray(items) ? items : [];
  }

  return [];
};

const toRoomOption = (room: RoomLocationResponse): HousekeepingRoomOption => ({
  id: String(room.id ?? room.roomId),
  roomNumber: String(room.roomNumber ?? ""),
});

const toFacilityOption = (facility: FacilityLocationResponse): HousekeepingFacilityOption => ({
  id: String(facility.id ?? facility.facilityId),
  name: facility.name ?? "",
  category: facility.facilityType,
});

const getLegacyRoomNumber = (roomId?: string) => roomId?.replace(/^room-/, "");

const toTitle = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getLegacyFacilityName = (facilityId?: string) =>
  facilityId ? toTitle(facilityId.replace(/^facility-/, "")) : undefined;

export function useHousekeepingLocations(hotelId?: number) {
  const roomsQuery = useRoomsByHotel(hotelId);
  const facilitiesQuery = useGetFacilities(hotelId);

  const roomOptions = useMemo(
    () =>
      getResponseItems<RoomLocationResponse>(roomsQuery.data)
        .map(toRoomOption)
        .filter((room) => room.id !== "undefined" && room.roomNumber),
    [roomsQuery.data]
  );

  const facilityOptions = useMemo(
    () =>
      getResponseItems<FacilityLocationResponse>(facilitiesQuery.data)
        .map(toFacilityOption)
        .filter((facility) => facility.id !== "undefined" && facility.name),
    [facilitiesQuery.data]
  );

  const getRoomById = useCallback(
    (roomId?: string) => roomOptions.find((room) => room.id === roomId),
    [roomOptions]
  );

  const getFacilityById = useCallback(
    (facilityId?: string) =>
      facilityOptions.find((facility) => facility.id === facilityId),
    [facilityOptions]
  );

  const getTicketRoom = useCallback(
    (ticket: HousekeepingTicket) => {
      if (ticket.locationType !== HOUSEKEEPING_LOCATION_TYPE.ROOM) return undefined;

      const room = getRoomById(ticket.roomId);
      if (room) return room;

      const roomNumber = getLegacyRoomNumber(ticket.roomId);
      return roomNumber ? { id: ticket.roomId ?? "", roomNumber } : undefined;
    },
    [getRoomById]
  );

  const getTicketFacility = useCallback(
    (ticket: HousekeepingTicket) => {
      if (ticket.locationType !== HOUSEKEEPING_LOCATION_TYPE.FACILITY) {
        return undefined;
      }

      const facility = getFacilityById(ticket.facilityId);
      if (facility) return facility;

      const name = getLegacyFacilityName(ticket.facilityId);
      return name ? { id: ticket.facilityId ?? "", name } : undefined;
    },
    [getFacilityById]
  );

  const getTicketLocationLabel = useCallback(
    (ticket: HousekeepingTicket) => {
      const room = getTicketRoom(ticket);
      if (room) return `Room ${room.roomNumber}`;

      const facility = getTicketFacility(ticket);
      return facility?.name ?? ticket.locationType;
    },
    [getTicketFacility, getTicketRoom]
  );

  return {
    roomOptions,
    facilityOptions,
    isLoading: roomsQuery.isLoading || facilitiesQuery.isLoading,
    getRoomById,
    getFacilityById,
    getTicketRoom,
    getTicketFacility,
    getTicketLocationLabel,
  };
}
