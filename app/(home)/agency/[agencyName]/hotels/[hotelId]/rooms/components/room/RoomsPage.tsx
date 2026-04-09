import { useState } from "react";
import Stack from "@mui/material/Stack";
import { useParams } from "next/navigation";
import { useRoom } from "../../hooks/useRoomStore";
import { RoomFormDialog } from "./form/RoomFormDialog";
import { RoomsPageHeader } from "./RoomsPageHeader";
import { RoomCardsView } from "./list/RoomCardsView";

export default function RoomsPage() {
  const params = useParams();
  const hotelId = params.hotelId as string;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const { data: selectedRoom } = useRoom(selectedRoomId ?? "");

  const openAddDialog = () => {
    setSelectedRoomId(null);
    setDialogOpen(true);
  };

  const handleEdit = (id: string) => {
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

      <RoomCardsView onAddRoom={openAddDialog} onEditRoom={handleEdit} />

      <RoomFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        room={selectedRoom ?? null}
        hotelId={hotelId}
      />
    </Stack>
  );
}
