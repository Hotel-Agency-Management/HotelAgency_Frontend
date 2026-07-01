"use client";

import { useState } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { MOCK_AVAILABLE_USERS, MOCK_TICKET_WATCHERS } from "../constants/watchlist";
import type { TicketWatcher } from "../types/ticket";

interface UseTicketWatchlistProps {
  ticketId: string;
}

export function useTicketWatchList({ ticketId: _ticketId }: UseTicketWatchlistProps) {
  const { user } = useAuth();

  // TODO: Replace with useQuery({ queryKey: ['ticket-watchers', ticketId], queryFn: () => apiClient.get(`/api/tickets/${ticketId}/watchers`).then(r => r.data) }) when endpoint is ready
  const [watchers, setWatchers] = useState<TicketWatcher[]>(MOCK_TICKET_WATCHERS);

  const isWatching = watchers.some((w) => w.id === user?.id);

  const toggleWatch = () => {
    if (!user) return;
    if (isWatching) {
      // TODO: Replace with useMutation calling DELETE /api/tickets/:id/watchers/:userId
      setWatchers((prev) => prev.filter((w) => w.id !== user.id));
    } else {
      // TODO: Replace with useMutation calling POST /api/tickets/:id/watchers
      const initials =
        `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "?";
      setWatchers((prev) => [
        ...prev,
        { id: user.id, name: `${user.firstName} ${user.lastName}`, initials },
      ]);
    }
  };

  const addWatcher = (watcher: TicketWatcher) => {
    if (watchers.some((w) => w.id === watcher.id)) return;
    // TODO: Replace with useMutation calling POST /api/tickets/:id/watchers
    setWatchers((prev) => [...prev, watcher]);
  };

  const removeWatcher = (watcherId: string) => {
    // TODO: Replace with useMutation calling DELETE /api/tickets/:id/watchers/:watcherId
    setWatchers((prev) => prev.filter((w) => w.id !== watcherId));
  };

  const availableToAdd = MOCK_AVAILABLE_USERS.filter(
    (u) => !watchers.some((w) => w.id === u.id)
  );

  return { watchers, isWatching, toggleWatch, addWatcher, removeWatcher, availableToAdd };
}
