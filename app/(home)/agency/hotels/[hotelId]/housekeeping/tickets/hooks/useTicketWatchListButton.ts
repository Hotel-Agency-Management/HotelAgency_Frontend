"use client";

import { useState } from "react";
import type { TicketWatcher } from "../types/ticket";
import { useTicketWatchList } from "./useTicketWatchlist";

interface UseTicketWatchListButtonProps {
  ticketId: string;
}

export function useTicketWatchListButton({ ticketId }: UseTicketWatchListButtonProps) {
  const { watchers, isWatching, toggleWatch, addWatcher, removeWatcher, availableToAdd } =
    useTicketWatchList({ ticketId });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isAddingWatchers, setIsAddingWatchers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
    setIsAddingWatchers(false);
    setSearchQuery("");
  };

  const handleToggleWatch = () => toggleWatch();

  const handleAddWatcher = (watcher: TicketWatcher) => {
    addWatcher(watcher);
    setSearchQuery("");
    setIsAddingWatchers(false);
  };

  const handleShowAddWatchers = () => setIsAddingWatchers(true);

  const handleBackToList = () => {
    setIsAddingWatchers(false);
    setSearchQuery("");
  };

  const handleSearchChange = (query: string) => setSearchQuery(query);

  const filteredAvailable = availableToAdd.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    watchers,
    isWatching,
    removeWatcher,
    anchorEl,
    open,
    isAddingWatchers,
    searchQuery,
    filteredAvailable,
    handleOpen,
    handleClose,
    handleToggleWatch,
    handleAddWatcher,
    handleShowAddWatchers,
    handleBackToList,
    handleSearchChange,
  };
}
