"use client";

import {
  DndContext,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { useTranslation } from "react-i18next";
import { getBoardColumns, DROP_ANIMATION } from "../../constants/board";
import { useTicketBoardDrag } from "../../hooks/useTicketBoardDrag";
import { BoardScrollContainer } from "../../styles/StyledComponents";
import { type HousekeepingTicket, type HousekeepingTicketStatus } from "../../types/ticket";
import { TicketCard } from "./TicketCard";
import { TicketColumn } from "./TicketColumn";

interface TicketBoardProps {
  tickets: HousekeepingTicket[];
  commentCounts: Record<string, number>;
  onMoveTicket: (
    ticketId: string,
    newStatus: HousekeepingTicketStatus,
    targetTicketId?: string
  ) => void;
  onEdit: (ticket: HousekeepingTicket) => void;
  onDelete: (ticket: HousekeepingTicket) => void;
  onReportDamage?: (ticket: HousekeepingTicket) => void;
  onOpenDetail: (ticket: HousekeepingTicket) => void;
}

export function TicketBoard({
  tickets,
  commentCounts,
  onMoveTicket,
  onEdit,
  onDelete,
  onReportDamage,
  onOpenDetail,
}: TicketBoardProps) {
  const { t } = useTranslation();
  const boardColumns = getBoardColumns(t);
  const {
    activeTicket,
    overId,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useTicketBoardDrag({ tickets, onMoveTicket });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <BoardScrollContainer direction="row" spacing={1.5}>
        {boardColumns.map((column) => (
          <TicketColumn
            key={column.id}
            column={column}
            tickets={tickets.filter((t) => t.status === column.id)}
            commentCounts={commentCounts}
            activeTicketId={activeTicket?.id ?? null}
            overId={overId}
            onEdit={onEdit}
            onDelete={onDelete}
            onReportDamage={onReportDamage}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </BoardScrollContainer>

      <DragOverlay dropAnimation={DROP_ANIMATION}>
        {activeTicket ? (
          <TicketCard
            ticket={activeTicket}
            commentCount={commentCounts[activeTicket.id] ?? 0}
            isOverlay
            onEdit={onEdit}
            onDelete={onDelete}
            onReportDamage={onReportDamage}
            onOpenDetail={onOpenDetail}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
