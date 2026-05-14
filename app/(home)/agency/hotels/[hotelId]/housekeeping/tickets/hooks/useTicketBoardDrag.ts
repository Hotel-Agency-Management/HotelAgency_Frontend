"use client";

import { useState } from "react";
import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { BOARD_COLUMNS } from "../constants/board";
import type { UseTicketBoardDragOptions } from "../types/board";
import type { HousekeepingTicket, HousekeepingTicketStatus } from "../types/ticket";

export function useTicketBoardDrag({
  tickets,
  onMoveTicket,
}: UseTicketBoardDragOptions) {
  const [activeTicket, setActiveTicket] = useState<HousekeepingTicket | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTicket(tickets.find((ticket) => ticket.id === active.id) ?? null);
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverId(over ? String(over.id) : null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTicket(null);
    setOverId(null);
    if (!over) return;

    const draggedTicket = tickets.find((ticket) => ticket.id === active.id);
    if (!draggedTicket) return;

    const overTicket = tickets.find((ticket) => ticket.id === over.id);
    const targetColumnId = overTicket
      ? overTicket.status
      : (over.id as HousekeepingTicketStatus);

    const isValidColumn = BOARD_COLUMNS.some(
      (column) => column.id === targetColumnId
    );
    if (!isValidColumn) return;

    onMoveTicket(draggedTicket.id, targetColumnId, overTicket?.id);
  };

  const handleDragCancel = () => {
    setActiveTicket(null);
    setOverId(null);
  };

  return {
    activeTicket,
    overId,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}
