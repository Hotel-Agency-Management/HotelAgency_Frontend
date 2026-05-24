"use client";

import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { fromNow } from "@/core/utils/Dateutils";
import { getCommentActionTypeConfig } from "../constants/comments";
import { CommentActionBadge, CommentItemRoot, TicketCardAssigneeAvatar } from "../styles/StyledComponents";
import type { TicketComment } from "../types/comment";

interface TicketCommentItemProps {
  comment: TicketComment;
  onEdit: (commentId: string, newBody: string) => void;
  onDelete: (commentId: string) => void;
}

export function TicketCommentItem({ comment, onEdit, onDelete }: TicketCommentItemProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const config = getCommentActionTypeConfig(t)[comment.actionType];
  const badgeColor = theme.palette[config.paletteKey].main;

  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const authorInitials = comment.author
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSaveEdit = useCallback(() => {
    if (!editBody.trim()) return;
    onEdit(comment.id, editBody.trim());
    setIsEditing(false);
  }, [comment.id, editBody, onEdit]);

  const handleCancelEdit = useCallback(() => {
    setEditBody(comment.body);
    setIsEditing(false);
  }, [comment.body]);

  const handleDelete = useCallback(() => {
    setMenuAnchor(null);
    onDelete(comment.id);
  }, [comment.id, onDelete]);

  return (
    <CommentItemRoot direction="row" gap={1.25}>
      <TicketCardAssigneeAvatar>
        {authorInitials}
      </TicketCardAssigneeAvatar>

      <Stack flex={1} gap={0.5} minWidth={0}>
        <Stack direction="row" alignItems="center" gap={0.75} flexWrap="wrap">
          <Typography variant="body1" fontWeight={500}>
            {comment.author}
          </Typography>
          <CommentActionBadge size="small" label={config.label} badgeColor={badgeColor} />
          <Typography variant="caption" color="text.disabled">
            {fromNow(comment.createdAt)}
          </Typography>
        </Stack>

        {isEditing ? (
          <Stack gap={1}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              size="small"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              autoFocus
            />
            <Stack direction="row" justifyContent="flex-end" gap={1}>
              <Button size="small" color="inherit" onClick={handleCancelEdit}>
                {t("common.cancel", "Cancel")}
              </Button>
              <Button
                size="small"
                variant="contained"
                disableElevation
                disabled={!editBody.trim()}
                onClick={handleSaveEdit}
              >
                {t("housekeeping.tickets.comments.save", "Save")}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body2">
            {comment.body}
          </Typography>
        )}

        {!isEditing && (
          <Stack direction="row" alignItems="center" gap={0.25} mt={0.25}>
            <Tooltip title={t("housekeeping.tickets.comments.edit", "Edit")}>
              <IconButton
                size="small"
                onClick={() => setIsEditing(true)}
                sx={{ color: alpha(theme.palette.text.secondary, 0.5), padding: theme.spacing(0.375) }}
              >
                <Pencil size={13} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("housekeeping.tickets.comments.more", "More")}>
              <IconButton
                size="small"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
                sx={{ color: alpha(theme.palette.text.secondary, 0.5), padding: theme.spacing(0.375) }}
              >
                <MoreHorizontal size={13} />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem dense onClick={handleDelete} sx={{ color: theme.palette.error.main }}>
                <Stack direction="row" gap={1.5} alignItems="center">
                  <Trash2 size={14} />
                  <Typography variant="body2" color="inherit">{t("housekeeping.tickets.comments.delete", "Delete")}</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Stack>
        )}
      </Stack>
    </CommentItemRoot>
  );
}
