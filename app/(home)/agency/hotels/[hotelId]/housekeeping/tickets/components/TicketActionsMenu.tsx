"use client";

import { useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { AlertTriangle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useCan } from "@/core/hooks/useAbility";
import { HOUSEKEEPING_LOCATION_TYPE } from "../constants/ticket";
import type { HousekeepingTicket } from "../types/ticket";

interface TicketActionsMenuProps {
  ticket: HousekeepingTicket;
  onEdit: (ticket: HousekeepingTicket) => void;
  onDelete: (ticket: HousekeepingTicket) => void;
  onReportDamage?: (ticket: HousekeepingTicket) => void;
}

export function TicketActionsMenu({
  ticket,
  onEdit,
  onDelete,
  onReportDamage,
}: TicketActionsMenuProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const canReportDamage = useCan("create", "DamageReports");
  const isRoom = ticket.locationType === HOUSEKEEPING_LOCATION_TYPE.ROOM;
  const showReportDamage = canReportDamage && isRoom && Boolean(onReportDamage);

  const close = () => setMenuAnchor(null);

  const handleEdit = () => { close(); onEdit(ticket); };
  const handleDelete = () => { close(); onDelete(ticket); };
  const handleReportDamage = () => { close(); onReportDamage?.(ticket); };

  return (
    <>
      <Tooltip title={t("housekeeping.tickets.actions.moreActions", "More actions")}>
        <IconButton
          size="small"
          onClick={(e) => { e.stopPropagation(); setMenuAnchor(e.currentTarget); }}
        >
          <MoreHorizontal size={16} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={close}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem dense onClick={handleEdit}>
          <Stack direction="row" gap={1.5} alignItems="center">
            <Pencil size={14} color={theme.palette.text.secondary} />
            <Typography variant="body2">{t("housekeeping.tickets.actions.editTicket", "Edit ticket")}</Typography>
          </Stack>
        </MenuItem>

        {showReportDamage && (
          <MenuItem dense onClick={handleReportDamage}>
            <Stack direction="row" gap={1.5} alignItems="center">
              <AlertTriangle size={14} color={theme.palette.warning.main} />
              <Typography variant="body2" color="warning.main">{t("housekeeping.tickets.actions.reportDamage", "Report damage")}</Typography>
            </Stack>
          </MenuItem>
        )}
        <Divider />

        <MenuItem dense onClick={handleDelete} sx={{ color: theme.palette.error.main }}>
          <Stack direction="row" gap={1.5} alignItems="center">
            <Trash2 size={14} />
            <Typography variant="body2" color="inherit">{t("housekeeping.tickets.actions.deleteTicket", "Delete ticket")}</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}
