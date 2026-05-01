import { useState } from "react";
import Stack from "@mui/material/Stack";
import type { RoomRouteScope } from "../../types/room";
import { RoomFormDialog } from "./form/RoomFormDialog";
import { RoomsPageHeader } from "./RoomsPageHeader";
import { RoomCardsView } from "./list/RoomCardsView";

interface RoomsPageProps {
  scope: RoomRouteScope;
}

export default function RoomsPage({ scope }: RoomsPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const openAddDialog = () => {
    setSelectedRoomId(null);
    setDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    setSelectedRoomId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRoomId(null);
  };

  return (
    <Stack spacing={3}>
      <RoomsPageHeader onOpenAddDialog={openAddDialog} />

      <RoomCardsView scope={scope} onAddRoom={openAddDialog} onEditRoom={handleEdit} />

      <RoomFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        roomId={selectedRoomId}
        scope={scope}
      />
    </Stack>
  );
}
