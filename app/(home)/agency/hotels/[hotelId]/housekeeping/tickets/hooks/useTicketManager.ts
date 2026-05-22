import { useState } from "react";
import type { HousekeepingTicket, HousekeepingTicketValues } from "../types/ticket";
import { useHousekeepingTicketStore } from "./useHousekeepingTicketStore";

export function useTicketManager() {
  const tickets = useHousekeepingTicketStore((state) => state.tickets);
  const createTicket = useHousekeepingTicketStore((state) => state.createTicket);
  const moveTicket = useHousekeepingTicketStore((state) => state.moveTicket);
  const updateStoredTicket = useHousekeepingTicketStore((state) => state.updateTicket);
  const deleteStoredTicket = useHousekeepingTicketStore((state) => state.deleteTicket);

  const [editingTicket, setEditingTicket] = useState<HousekeepingTicket | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<HousekeepingTicket | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const updateTicket = (values: HousekeepingTicketValues) => {
    if (!editingTicket) return;
    updateStoredTicket(editingTicket.id, values);
    setEditingTicket(null);
  };

  const deleteTicket = () => {
    if (!deletingTicket) return;
    deleteStoredTicket(deletingTicket.id);
    setDeletingTicket(null);
  };

  const handleSave = (values: HousekeepingTicketValues) => {
    editingTicket ? updateTicket(values) : createTicket(values);
  };

  const handleOpenEdit = (ticket: HousekeepingTicket) => {
    setEditingTicket(ticket);
    setIsCreateDialogOpen(true);
  };

  const handleOpenDelete = (ticket: HousekeepingTicket) => {
    setDeletingTicket(ticket);
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingTicket(null);
  };

  const handleCloseDelete = () => {
    setDeletingTicket(null);
  };

  return {
    tickets,
    editingTicket,
    deletingTicket,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleSave,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseDialog,
    handleCloseDelete,
    deleteTicket,
    moveTicket,
  };
}
