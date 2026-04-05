"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { ROOM_TYPES } from "../../constants/roomTypes";
import { useRoom, useDeleteRoom } from "../../hooks/useRoomStore";
import { useRoomTypes } from "../../hooks/uesRoomType";
import { mapRoomToProfile } from "../../util/mapRoomToProfile";
import { RoomAmenitiesList } from "./RoomAmenitiesList";
import { RoomGallery } from "./RoomGallery";
import { RoomInfoCard } from "./RoomInfoCard";
import { RoomNotesSection } from "./RoomNotesSection";
import { RoomProfileHeader } from "./RoomProfileHeader";
import { RoomProfileError } from "./RoomProfileError";
import { RoomProfileSkeleton } from "./profileSkelton/RoomProfileSkeleton";

export function RoomProfileView() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams<{ agencyName: string; hotelId: string; roomId: string }>();
  const { agencyName, hotelId, roomId } = params;

  const roomsListPath = `/agency/${agencyName}/hotels/${hotelId}/rooms`;

  const { data: room, isLoading, isError, error } = useRoom(roomId);
  const { data: roomTypes = [] } = useRoomTypes(hotelId);
  const { mutate: deleteRoom, isPending: isDeleting } = useDeleteRoom();

  const handleBack = () => router.push(roomsListPath);
  const handleEdit = () => router.push(roomsListPath);
  const handleDelete = () => {
    deleteRoom(roomId, { onSuccess: () => router.push(roomsListPath) });
  };

  const profile = useMemo(() => {
    if (!room) return null;
    const typeName = roomTypes.find((rt) => rt.id === room.roomTypeId)?.name ?? "";
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
    <Stack
      gap={2.5}
      sx={{
        width: 1,
        maxWidth: 1120,
        mx: "auto",
        opacity: isDeleting ? 0.6 : 1,
        pointerEvents: isDeleting ? "none" : "auto",
      }}
    >
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
