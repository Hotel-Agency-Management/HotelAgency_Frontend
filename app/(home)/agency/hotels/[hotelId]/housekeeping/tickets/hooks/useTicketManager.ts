import { useState, useEffect, useMemo } from "react";
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

  const [userOrderedIds, setUserOrderedIds] = useState<string[] | null>(null);
  const [pendingStatus, setPendingStatus] = useState<{
    id: string;
    status: HousekeepingTicketStatus;
  } | null>(null);

  useEffect(() => {
    if (!pendingStatus) return;
    const confirmed = tickets.find(
      (t) => t.id === pendingStatus.id && t.status === pendingStatus.status
    );
    if (confirmed) setPendingStatus(null);
  }, [tickets, pendingStatus]);

  const optimisticTickets = useMemo(() => {
    const withStatus = pendingStatus
      ? tickets.map((t) => (t.id === pendingStatus.id ? { ...t, status: pendingStatus.status } : t))
      : tickets;

    if (!userOrderedIds) return withStatus;
    const positionMap = new Map(userOrderedIds.map((id, i) => [id, i]));
    return [...withStatus].sort((a, b) => {
      const posA = positionMap.get(a.id) ?? Infinity;
      const posB = positionMap.get(b.id) ?? Infinity;
      return posA - posB;
    });
  }, [tickets, userOrderedIds, pendingStatus]);

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

  const moveTicket = (ticketId: string, newStatus: HousekeepingTicketStatus, targetTicketId?: string) => {
    const numericTicketId = Number(ticketId);

    const movedTicket = optimisticTickets.find((t) => t.id === ticketId);
    if (movedTicket) {
      const updated = { ...movedTicket, status: newStatus };
      const rest = optimisticTickets.filter((t) => t.id !== ticketId);
      const targetIdx = targetTicketId ? rest.findIndex((t) => t.id === targetTicketId) : -1;
      const newOrder = targetIdx !== -1
        ? [...rest.slice(0, targetIdx), updated, ...rest.slice(targetIdx)]
        : [...rest, updated];

      const prevOrderedIds = userOrderedIds;
      setUserOrderedIds(newOrder.map((t) => t.id));
      setPendingStatus({ id: ticketId, status: newStatus });

      const revert = () => {
        setUserOrderedIds(prevOrderedIds);
        setPendingStatus(null);
      };

      if (scope.type === "admin") {
        statusAdminMutation.mutate(
          { agencyId: scope.agencyId, hotelId: scope.hotelId, ticketId: numericTicketId, data: { status: newStatus } },
          { onError: revert }
        );
      } else {
        statusHotelMutation.mutate(
          { hotelId: scope.hotelId, ticketId: numericTicketId, data: { status: newStatus } },
          { onError: revert }
        );
      }
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
    tickets: optimisticTickets,
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
