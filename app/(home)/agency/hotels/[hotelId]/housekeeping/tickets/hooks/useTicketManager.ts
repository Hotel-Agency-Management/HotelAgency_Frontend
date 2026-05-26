import { useState } from "react";
import type { HousekeepingTicket, HousekeepingTicketStatus, HousekeepingTicketValues } from "../types/ticket";
import type { TicketEndpointScope } from "../configs/ticketConfig";
import { buildCreatePayload } from "../utils/ticketMappers";
import {
  useCreateTicket,
  useCreateAdminTicket,
  useUpdateTicket,
  useUpdateAdminTicket,
  useUpdateTicketStatus,
  useUpdateAdminTicketStatus,
  useDeleteTicket,
  useDeleteAdminTicket,
} from "./mutations/ticketMutations";

interface UseTicketManagerProps {
  scope: TicketEndpointScope;
  tickets: HousekeepingTicket[];
}

export function useTicketManager({ scope, tickets }: UseTicketManagerProps) {
  const createHotelTicket = useCreateTicket();
  const createAdminTicket = useCreateAdminTicket();
  const updateHotelTicket = useUpdateTicket();
  const updateAdminTicket = useUpdateAdminTicket();
  const statusHotelMutation = useUpdateTicketStatus();
  const statusAdminMutation = useUpdateAdminTicketStatus();
  const deleteHotelTicket = useDeleteTicket();
  const deleteAdminTicket = useDeleteAdminTicket();

  const [editingTicket, setEditingTicket] = useState<HousekeepingTicket | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<HousekeepingTicket | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const createTicket = (values: HousekeepingTicketValues) => {
    const data = buildCreatePayload(values);
    if (scope.type === "admin") {
      createAdminTicket.mutate({ agencyId: scope.agencyId, hotelId: scope.hotelId, data });
    } else {
      createHotelTicket.mutate({ hotelId: scope.hotelId, data });
    }
  };

  const updateTicketById = (ticketId: string, values: HousekeepingTicketValues) => {
    const numericTicketId = Number(ticketId);
    const data = buildCreatePayload(values);
    if (scope.type === "admin") {
      updateAdminTicket.mutate({ agencyId: scope.agencyId, hotelId: scope.hotelId, ticketId: numericTicketId, data });
    } else {
      updateHotelTicket.mutate({ hotelId: scope.hotelId, ticketId: numericTicketId, data });
    }
  };

  const moveTicket = (ticketId: string, newStatus: HousekeepingTicketStatus, _targetTicketId?: string) => {
    const numericTicketId = Number(ticketId);
    if (scope.type === "admin") {
      statusAdminMutation.mutate({ agencyId: scope.agencyId, hotelId: scope.hotelId, ticketId: numericTicketId, data: { status: newStatus } });
    } else {
      statusHotelMutation.mutate({ hotelId: scope.hotelId, ticketId: numericTicketId, data: { status: newStatus } });
    }
  };

  const deleteTicketById = (ticketId: string) => {
    const numericTicketId = Number(ticketId);
    if (scope.type === "admin") {
      deleteAdminTicket.mutate({ agencyId: scope.agencyId, hotelId: scope.hotelId, ticketId: numericTicketId });
    } else {
      deleteHotelTicket.mutate({ hotelId: scope.hotelId, ticketId: numericTicketId });
    }
  };

  const updateTicket = (values: HousekeepingTicketValues) => {
    if (!editingTicket) return;
    updateTicketById(editingTicket.id, values);
    setEditingTicket(null);
  };

  const deleteTicket = () => {
    if (!deletingTicket) return;
    deleteTicketById(deletingTicket.id);
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
