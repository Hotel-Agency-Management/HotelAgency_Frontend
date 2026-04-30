"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { ROOM_TYPES } from "../../../../../../room-types/constants/roomTypes";
import { useRoom, useDeleteRoom } from "../../hooks/useRoomStore";
import { useGetRoomTypes } from "../../../../../../room-types/hooks/queries/roomTypeQueries";
import { mapRoomToProfile } from "../../util/mapRoomToProfile";
import { RoomAmenitiesList } from "./RoomAmenitiesList";
import { RoomGallery } from "./RoomGallery";
import { RoomInfoCard } from "./RoomInfoCard";
import { RoomNotesSection } from "./RoomNotesSection";
import { RoomProfileHeader } from "./RoomProfileHeader";
import { RoomProfileError } from "./RoomProfileError";
import { RoomProfileSkeleton } from "./profileSkelton/RoomProfileSkeleton";
import { roomProfileStyles } from "../../styles/roomStyles";

export function RoomProfileView() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams<{ hotelId: string; roomId: string }>();
  const { hotelId, roomId } = params;

  const roomsListPath = `/agency/hotels/${hotelId}/rooms`;

  const { data: room, isLoading, isError, error } = useRoom(roomId);
  const { data: roomTypes = [] } = useGetRoomTypes();
  const { mutate: deleteRoom, isPending: isDeleting } = useDeleteRoom();

  const handleBack = () => router.push(roomsListPath);
  const handleEdit = () => router.push(roomsListPath);
  const handleDelete = () => {
    deleteRoom(roomId, { onSuccess: () => router.push(roomsListPath) });
  };

  const profile = useMemo(() => {
    if (!room) return null;
    const typeName = roomTypes.find((rt) => String(rt.id) === room.roomTypeId)?.name ?? "";
    return mapRoomToProfile(room, typeName);
  }, [room, roomTypes]);

  const title = useMemo(() => {
    if (!profile) return "";
    return t("hotelRooms.profile.roomHeading", {
      number: profile.roomNumber,
      type: ROOM_TYPES[profile.type].label,
    });
  }, [profile, t]);

  if (isLoading && !room) {
    return <RoomProfileSkeleton onBack={handleBack} onEdit={handleEdit} onDelete={handleDelete} />;
  }

  if (isError || !profile) {
    return <RoomProfileError error={error} />;
  }

  return (
    <Stack gap={2.5} sx={roomProfileStyles.container(isDeleting)}>
      <RoomProfileHeader title={title} status={profile.status} onBack={handleBack} loading={false} />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RoomGallery photos={profile.photos} loading={false} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RoomInfoCard room={profile} onEdit={handleEdit} onDelete={handleDelete} loading={false} />
        </Grid>
        <Grid size={12}>
          <RoomAmenitiesList amenities={profile.amenities} loading={false} />
        </Grid>
        <Grid size={12}>
          <RoomNotesSection description={profile.description} notes={profile.notes} loading={false} />
        </Grid>
      </Grid>
    </Stack>
  );
}
