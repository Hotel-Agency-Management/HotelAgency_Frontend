"use client";

import { useCallback, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { getCommentQuickActions, TICKET_COMMENT_ACTION_TYPE } from "../constants/comments";
import type { AddCommentValues } from "../types/comment";

interface TicketCommentComposerProps {
  onSubmit: (values: AddCommentValues) => void;
}

export function TicketCommentComposer({ onSubmit }: TicketCommentComposerProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [body, setBody] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = useCallback(() => {
    setBody("");
    setIsFocused(false);
    inputRef.current?.blur();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!body.trim()) return;
    onSubmit({ actionType: TICKET_COMMENT_ACTION_TYPE.FEEDBACK, body: body.trim() });
    setBody("");
    setIsFocused(false);
  }, [body, onSubmit]);

  const handleQuickAction = useCallback((text: string) => {
    setBody(text);
    setIsFocused(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  return (
    <Stack gap={1}>
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        minRows={isFocused ? 3 : 1}
        maxRows={8}
        size="small"
        placeholder={t("housekeeping.tickets.comments.addComment", "Add a comment...")}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />

      <Stack direction="row" alignItems="center" gap={0.75} flexWrap="wrap">
        {getCommentQuickActions(t).map((action) => (
          <Chip
            key={action.label}
            label={action.label}
            size="small"
            onClick={() => handleQuickAction(action.text)}
          />
        ))}
      </Stack>

      {isFocused && (
        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <Button size="small" color="inherit" onClick={handleCancel}>
            {t("common.cancel", "Cancel")}
          </Button>
          <Button
            size="small"
            variant="contained"
            disableElevation
            disabled={!body.trim()}
            onClick={handleSubmit}
          >
            {t("housekeeping.tickets.comments.save", "Save")}
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
