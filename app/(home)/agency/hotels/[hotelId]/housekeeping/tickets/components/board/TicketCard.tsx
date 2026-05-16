"use client";

import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertTriangle,
  GripVertical,
  MoreHorizontal,
  Pencil,
  Ticket,
  Trash2,
} from "lucide-react";
import Can from "@/components/ability/Can";
import { HOUSEKEEPING_LOCATION_TYPE } from "../../constants/ticket";
import {
  DragHandle,
  PriorityChip,
  StyledCardContent,
  TicketCardAssigneeAvatar,
  TicketCardMenuButton,
  TicketCardRoot,
  TicketTypeChip,
} from "../../styles/StyledComponents";
import { HousekeepingTicket } from "../../types/ticket";
import { useTicketCardMenu } from "../../hooks/useTicketCardMenu";
import { useTicketDisplay } from "../../hooks/useTicketDisplay";

interface TicketCardProps {
  ticket: HousekeepingTicket;
  isOverlay?: boolean;
  onEdit: (ticket: HousekeepingTicket) => void;
  onDelete: (ticket: HousekeepingTicket) => void;
  onReportDamage?: (ticket: HousekeepingTicket) => void;
  onOpenDetail: (ticket: HousekeepingTicket) => void;
}

export function TicketCard({
  ticket,
  isOverlay,
  onEdit,
  onDelete,
  onReportDamage,
  onOpenDetail,
}: TicketCardProps) {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: ticket.id,
    disabled: isOverlay,
  });

  const {
  menuAnchor,
  isMenuOpen,
  handleMenuOpen,
  handleMenuClose,
  handleEdit,
  handleDelete,
  handleReportDamage,
} = useTicketCardMenu({ ticket, onEdit, onDelete, onReportDamage })

  const { priorityColor, ticketTypeColor, priorityLabel, ticketTypeLabel, locationLabel, initials } =
    useTicketDisplay(ticket);

  const style = transform
    ? { transform: CSS.Transform.toString(transform), transition }
    : undefined;

  return (
    <>
      <TicketCardRoot
        ref={setNodeRef}
        style={style}
        isDragging={isDragging}
        isOverlay={isOverlay}
        elevation={0}
        {...attributes}
        {...listeners}
        onClick={() => !isDragging && onOpenDetail(ticket)}
      >
        <StyledCardContent>
          <Stack gap={1.25}>
            <Stack direction="row" alignItems="flex-start" gap={0.75}>
              <DragHandle onClick={(e) => e.stopPropagation()}>
                <GripVertical size={13} />
              </DragHandle>

              <Stack gap={0.4} flex={1} minWidth={0}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  noWrap
                >
                  {ticket.title}
                </Typography>
                <Typography variant="caption" noWrap>
                  {locationLabel}
                </Typography>
              </Stack>

              <TicketCardMenuButton
                size="small"
                onClick={handleMenuOpen}
              >
                <MoreHorizontal size={14} />
              </TicketCardMenuButton>
            </Stack>

            <Divider />

            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
              <Stack direction="row" alignItems="center" gap={0.75} minWidth={0}>
                <Ticket size={14} color={theme.palette.text.secondary} />
                <Typography variant="caption" fontWeight={700} noWrap>
                  {ticket.ticketKey}
                </Typography>
              </Stack>
              <TicketTypeChip
                size="small"
                label={ticketTypeLabel}
                ticketColor={ticketTypeColor}
              />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <PriorityChip
                size="small"
                label={priorityLabel}
                priorityColor={priorityColor}
              />
              <TicketCardAssigneeAvatar>
                {initials}
              </TicketCardAssigneeAvatar>
            </Stack>
          </Stack>
        </StyledCardContent>
      </TicketCardRoot>

      <Menu
        anchorEl={menuAnchor}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEdit} dense>
          <Stack direction="row" gap={1.5} alignItems="center">
            <Pencil size={14} color={theme.palette.text.secondary} />
            <Typography variant="body2">Edit ticket</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleDelete} dense sx={{ color: theme.palette.error.main }}>
          <Stack direction="row" gap={1.5} alignItems="center">
            <Trash2 size={14} />
            <Typography variant="body2" color="inherit">Delete ticket</Typography>
          </Stack>
        </MenuItem>
        {ticket.locationType === HOUSEKEEPING_LOCATION_TYPE.ROOM && onReportDamage && (
          <Can do="create" this="DamageReports">
            <Divider />
            <MenuItem onClick={handleReportDamage} dense>
              <Stack direction="row" gap={1.5} alignItems="center">
                <AlertTriangle size={14} color={theme.palette.warning.main} />
                <Typography variant="body2" color="warning.main">Report damage</Typography>
              </Stack>
            </MenuItem>
          </Can>
        )}
      </Menu>
    </>
  );
}
