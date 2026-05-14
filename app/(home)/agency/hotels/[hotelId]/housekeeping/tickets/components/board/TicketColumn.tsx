"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
  ColumnBody,
  ColumnCountBadge,
  ColumnDropZone,
  ColumnShell,
  ColumnStatusDot,
  DropIndicator,
  EmptyColumnState,
} from "../../styles/StyledComponents";
import type { BoardColumn } from "../../types/board";
import type { HousekeepingTicket } from "../../types/ticket";
import { TicketCard } from "./TicketCard";

interface TicketColumnProps {
  column: BoardColumn;
  tickets: HousekeepingTicket[];
  activeTicketId: string | null;
  overId: string | null;
  onEdit: (ticket: HousekeepingTicket) => void;
  onDelete: (ticket: HousekeepingTicket) => void;
  onReportDamage?: (ticket: HousekeepingTicket) => void;
  onOpenDetail: (ticket: HousekeepingTicket) => void;
}

export function TicketColumn({
  column,
  tickets,
  activeTicketId,
  overId,
  onEdit,
  onDelete,
  onReportDamage,
  onOpenDetail,
}: TicketColumnProps) {
  const theme = useTheme();
  const accentColor = theme.palette[column.colorKey].main;
  const shouldShowEndIndicator =
    Boolean(activeTicketId) && overId === column.id && tickets.length > 0;

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <Stack width={theme.spacing(37.5)} flexShrink={0}>
      <ColumnShell>
        <Stack direction="row" alignItems="center" justifyContent="space-between" padding={1.5}>
          <Stack direction="row" alignItems="center" gap={1}>
            <ColumnStatusDot $accentColor={accentColor} />
            <Typography
              variant="caption"
              fontWeight={700}
              textTransform="uppercase"
            >
              {column.label}
            </Typography>
          </Stack>
          <ColumnCountBadge $accentColor={accentColor}>
            <Typography variant="caption" fontWeight={800}>
              {tickets.length}
            </Typography>
          </ColumnCountBadge>
        </Stack>

        <ColumnDropZone ref={setNodeRef} elevation={0} isOver={isOver}>
          <ColumnBody>
            <SortableContext
              items={tickets.map((ticket) => ticket.id)}
              strategy={verticalListSortingStrategy}
            >
              {tickets.map((ticket) => (
                <Stack key={ticket.id} gap={1}>
                  {overId === ticket.id && activeTicketId !== ticket.id && (
                    <DropIndicator />
                  )}
                  <TicketCard
                    ticket={ticket}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReportDamage={onReportDamage}
                    onOpenDetail={onOpenDetail}
                  />
                </Stack>
              ))}
            </SortableContext>

            {shouldShowEndIndicator && <DropIndicator />}

            {tickets.length === 0 && (
              <EmptyColumnState isOver={isOver}>
                <Typography variant="caption" fontWeight={500} >
                  {isOver ? "Drop here" : "No tickets"}
                </Typography>
              </EmptyColumnState>
            )}
          </ColumnBody>
        </ColumnDropZone>
      </ColumnShell>
    </Stack>
  );
}
