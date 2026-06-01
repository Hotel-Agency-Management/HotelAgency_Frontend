"use client";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { ArrowDownUp } from "lucide-react";
import { EmptyColumnState } from "../styles/StyledComponents";
import type { AddCommentValues, TicketComment } from "../types/comment";
import { TicketCommentComposer } from "./TicketCommentComposer";
import { TicketCommentItem } from "./TicketCommentItem";

interface TicketCommentSectionProps {
  ticketId: string;
  comments: TicketComment[];
  onAddComment: (values: AddCommentValues) => void;
  onEditComment: (commentId: string, newBody: string) => void;
  onDeleteComment: (commentId: string) => void;
  canAddComment?: boolean;
  canEditComment?: boolean;
  canDeleteComment?: boolean;
}

export function TicketCommentSection({
  ticketId: _ticketId,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  canAddComment = true,
  canEditComment = true,
  canDeleteComment = true,
}: TicketCommentSectionProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [newestFirst, setNewestFirst] = useState(true);

  const sorted = newestFirst ? comments : [...comments].reverse();

  return (
    <Stack gap={1.5} pt={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" fontWeight={700} textTransform="uppercase">
          {t("housekeeping.tickets.comments.activity", "Activity")}
        </Typography>
        <Tooltip title={newestFirst ? t("housekeeping.tickets.comments.oldestFirst", "Oldest first") : t("housekeeping.tickets.comments.newestFirst", "Newest first")}>
          <IconButton size="small" onClick={() => setNewestFirst((p) => !p)}>
            <ArrowDownUp size={14} color={theme.palette.text.secondary} />
          </IconButton>
        </Tooltip>
      </Stack>

      {canAddComment && <TicketCommentComposer onSubmit={onAddComment} />}

      {sorted.length === 0 ? (
        <EmptyColumnState>
          <Typography variant="caption" color="text.disabled">
            {t("housekeeping.tickets.comments.noActivity", "No activity yet")}
          </Typography>
        </EmptyColumnState>
      ) : (
        <Stack>
          {sorted.map((comment) => (
            <TicketCommentItem
              key={comment.id}
              comment={comment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
              canEdit={canEditComment}
              canDelete={canDeleteComment}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
