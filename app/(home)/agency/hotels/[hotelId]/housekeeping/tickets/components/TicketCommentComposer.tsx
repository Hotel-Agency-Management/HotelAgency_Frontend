"use client";

import { useCallback, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTranslation } from "react-i18next";
import { getCommentQuickActions, TICKET_COMMENT_ACTION_TYPE } from "../constants/comments";
import type { AddCommentValues, TicketCommentActionType } from "../types/comment";

interface TicketCommentComposerProps {
  onSubmit: (values: AddCommentValues) => void;
}

export function TicketCommentComposer({ onSubmit }: TicketCommentComposerProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [body, setBody] = useState("");
  const [actionType, setActionType] = useState<TicketCommentActionType>(
    TICKET_COMMENT_ACTION_TYPE.FEEDBACK
  );
  const [damageCost, setDamageCost] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isDamageComment = actionType === TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED;

  const handleCancel = useCallback(() => {
    setBody("");
    setDamageCost("");
    setActionType(TICKET_COMMENT_ACTION_TYPE.FEEDBACK);
    setIsFocused(false);
    inputRef.current?.blur();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!body.trim()) return;
    const parsedDamageCost = Number(damageCost);
    onSubmit({
      actionType,
      body: body.trim(),
      ...(isDamageComment &&
      damageCost.trim() &&
      Number.isFinite(parsedDamageCost)
        ? { damageCost: parsedDamageCost }
        : {}),
    });
    setBody("");
    setDamageCost("");
    setActionType(TICKET_COMMENT_ACTION_TYPE.FEEDBACK);
    setIsFocused(false);
  }, [actionType, body, damageCost, isDamageComment, onSubmit]);

  const handleQuickAction = useCallback((text: string) => {
    setBody(text);
    setIsFocused(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  return (
    <Stack gap={1}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={actionType}
        onChange={(_, value: TicketCommentActionType | null) => {
          if (!value) return;
          setActionType(value);
          setIsFocused(true);
        }}
      >
        <ToggleButton value={TICKET_COMMENT_ACTION_TYPE.FEEDBACK}>
          {t("housekeeping.tickets.comments.types.general", "General")}
        </ToggleButton>
        <ToggleButton value={TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED}>
          {t("housekeeping.tickets.comments.types.damage", "Damage")}
        </ToggleButton>
      </ToggleButtonGroup>

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

      {isDamageComment && (
        <TextField
          fullWidth
          size="small"
          type="number"
          label={t("housekeeping.tickets.comments.damageCost", "Damage cost")}
          value={damageCost}
          onChange={(e) => setDamageCost(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      )}

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
