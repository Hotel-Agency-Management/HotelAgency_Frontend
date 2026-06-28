"use client";

import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Eye, Plus, Search, X } from "lucide-react";
import { useTicketWatchListButton } from "../hooks/useTicketWatchListButton";
import {
  WatchListActionRow,
  WatchListEmptyLabel,
  WatchListPopoverContent,
  WatchListRemoveButton,
  WatchListSearchWrapper,
  WatchListSection,
  WatchListTriggerButton,
  WatchListWatcherAvatar,
} from "../styles/StyledComponents";

interface TicketWatchListButtonProps {
  ticketId: string;
}

export function TicketWatchListButton({ ticketId }: TicketWatchListButtonProps) {
  const { t } = useTranslation();
  const {
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
  } = useTicketWatchListButton({ ticketId });

  return (
    <>
      <WatchListTriggerButton
        variant="outlined"
        onClick={handleOpen}
        startIcon={<Eye size={16} />}
        $isWatching={isWatching}
      >
        {watchers.length}
      </WatchListTriggerButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        slotProps={{ paper: { sx: { width: 280, mt: 0.5 } } }}
      >
        {isAddingWatchers ? (
          <WatchListPopoverContent>
            <WatchListActionRow onClick={handleBackToList}>
              <ArrowLeft size={14} />
              <Typography variant="body2" fontWeight={600}>
                {t("housekeeping.tickets.watchList.addWatchers", "Add watchers")}
              </Typography>
            </WatchListActionRow>

            <WatchListSearchWrapper>
              <TextField
                size="small"
                autoFocus
                placeholder={t("housekeeping.tickets.watchList.searchUsers", "Search users…")}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={14} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </WatchListSearchWrapper>

            <Stack>
              {filteredAvailable.length === 0 ? (
                <WatchListEmptyLabel variant="caption" color="text.disabled">
                  {t("housekeeping.tickets.watchList.noWatchers", "No users found")}
                </WatchListEmptyLabel>
              ) : (
                filteredAvailable.map((user) => (
                  <WatchListActionRow key={user.id} onClick={() => handleAddWatcher(user)}>
                    <WatchListWatcherAvatar>{user.initials}</WatchListWatcherAvatar>
                    <Typography variant="body2">{user.name}</Typography>
                  </WatchListActionRow>
                ))
              )}
            </Stack>
          </WatchListPopoverContent>
        ) : (
          <WatchListPopoverContent>
            <WatchListActionRow onClick={handleToggleWatch}>
              <Eye size={14} />
              <Typography variant="body2" fontWeight={500}>
                {isWatching
                  ? t("housekeeping.tickets.watchList.stopWatching", "Stop watching")
                  : t("housekeeping.tickets.watchList.startWatching", "Start watching")}
              </Typography>
            </WatchListActionRow>

            <Divider />

            <WatchListSection>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {t("housekeeping.tickets.watchList.watchingThis", "Watching this Ticket")}
              </Typography>

              {watchers.length === 0 ? (
                <Typography variant="caption" color="text.disabled">
                  {t("housekeeping.tickets.watchList.noWatchers", "No watchers yet")}
                </Typography>
              ) : (
                <Stack>
                  {watchers.map((watcher) => (
                    <Stack key={watcher.id} direction="row" alignItems="center" gap={1.5}>
                      <WatchListWatcherAvatar>{watcher.initials}</WatchListWatcherAvatar>
                      <Typography variant="body2" flex={1}>{watcher.name}</Typography>
                      <Tooltip title={t("housekeeping.tickets.watchList.removeWatcher", "Remove")}>
                        <WatchListRemoveButton size="small" onClick={() => removeWatcher(watcher.id)}>
                          <X size={13} />
                        </WatchListRemoveButton>
                      </Tooltip>
                    </Stack>
                  ))}
                </Stack>
              )}
            </WatchListSection>

            <Divider />

            <WatchListActionRow onClick={handleShowAddWatchers}>
              <Plus size={14} />
              <Typography variant="body2" fontWeight={500}>
                {t("housekeeping.tickets.watchList.addWatchers", "Add watchers")}
              </Typography>
            </WatchListActionRow>
          </WatchListPopoverContent>
        )}
      </Popover>
    </>
  );
}
