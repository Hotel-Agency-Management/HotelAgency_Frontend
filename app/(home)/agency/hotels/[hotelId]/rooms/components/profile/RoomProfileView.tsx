"use client";

import { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { useRoomProfileController } from "../../hooks/useRoomProfileController";
import { ProfileShell } from "../../StyledComponents";
import type { RoomRouteScope } from "../../types/room";
import { DeleteRoomDialog } from "../room/DeleteRoomDialog";
import { RoomAmenitiesList } from "./RoomAmenitiesList";
import { RoomGallery } from "./RoomGallery";
import { RoomInfoCard } from "./RoomInfoCard";
import { RoomNotesSection } from "./RoomNotesSection";
import { RoomProfileHeader } from "./RoomProfileHeader";
import { RoomProfileError } from "./RoomProfileError";
import { RoomProfileSkeleton } from "./profileSkelton/RoomProfileSkeleton";

interface RoomProfileViewProps {
  scope: RoomRouteScope;
  roomId: number;
}

export function RoomProfileView({ scope, roomId }: RoomProfileViewProps) {
  const { t } = useTranslation();
  const controller = useRoomProfileController(scope, roomId);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { room } = controller;

  const title = useMemo(() => {
    if (!room) return "";
    return t("hotelRooms.profile.roomHeading", {
      number: room.roomNumber,
      type: room.roomTypeName,
    });
  }, [room, t]);

  if (controller.isLoading && !room) {
    return <RoomProfileSkeleton onBack={controller.handleBack} onEdit={controller.handleEdit} onDelete={() => setDeleteDialogOpen(true)} />;
  }

  if (controller.isError || !room) {
    return <RoomProfileError error={controller.error} />;
  }

  return (
    <ProfileShell
      gap={2.5}
      disabledState={controller.isDeleting}
    >
      <RoomProfileHeader title={title} status={room.status} onBack={controller.handleBack} loading={false} />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RoomGallery photos={controller.photos} loading={false} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RoomInfoCard room={room} onEdit={controller.handleEdit} onDelete={() => setDeleteDialogOpen(true)} loading={false} />
        </Grid>
        <Grid size={12}>
          <RoomAmenitiesList amenities={room.amenities} loading={false} />
        </Grid>
        <Grid size={12}>
          <RoomNotesSection description={room.description} notes={room.notes} loading={false} />
        </Grid>
      </Grid>

      <DeleteRoomDialog
        open={deleteDialogOpen}
        roomNumber={room.roomNumber}
        isDeleting={controller.isDeleting}
        onClose={() => {
          if (!controller.isDeleting) setDeleteDialogOpen(false);
        }}
        onConfirm={controller.handleDelete}
      />
    </ProfileShell>
  );
}
