import { useState, useCallback } from "react";
import { HousekeepingTicket } from "../types/ticket";

interface UseTicketCardMenuProps {
  ticket: HousekeepingTicket;
  onEdit: (ticket: HousekeepingTicket) => void;
  onDelete: (ticket: HousekeepingTicket) => void;
  onReportDamage?: (ticket: HousekeepingTicket) => void;
}

export function useTicketCardMenu({
  ticket,
  onEdit,
  onDelete,
  onReportDamage,
}: UseTicketCardMenuProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => setMenuAnchor(null), []);

  const handleEdit = useCallback(() => {
    handleMenuClose();
    onEdit(ticket);
  }, [handleMenuClose, onEdit, ticket]);

  const handleDelete = useCallback(() => {
    handleMenuClose();
    onDelete(ticket);
  }, [handleMenuClose, onDelete, ticket]);

  const handleReportDamage = useCallback(() => {
    handleMenuClose();
    onReportDamage?.(ticket);
  }, [handleMenuClose, onReportDamage, ticket]);

  return {
    menuAnchor,
    isMenuOpen: Boolean(menuAnchor),
    handleMenuOpen,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleReportDamage,
  };
}
