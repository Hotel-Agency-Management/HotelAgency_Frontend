
export const TICKET_COMMENT_ACTION_TYPE = {
  FEEDBACK: "FEEDBACK",
  RESOLVED: "RESOLVED",
  DAMAGE_REPORTED: "DAMAGE_REPORTED",
} as const;

export const COMMENT_ACTION_TYPE_CONFIG: Record<
  string,
  { label: string; paletteKey: "info" | "success" | "error"; icon: string }
> = {
  [TICKET_COMMENT_ACTION_TYPE.FEEDBACK]: {
    label: "Feedback",
    paletteKey: "info",
    icon: "MessageSquare",
  },
  [TICKET_COMMENT_ACTION_TYPE.RESOLVED]: {
    label: "Resolved",
    paletteKey: "success",
    icon: "CheckCircle2",
  },
  [TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED]: {
    label: "Damage Reported",
    paletteKey: "error",
    icon: "AlertTriangle",
  },
};

export const COMMENT_QUICK_ACTIONS = [
  { label: "Looks good!",        text: "Looks good! ✅" },
  { label: "Need help?",         text: "Need help? 👋"  },
  { label: "This is blocked...", text: "This is blocked 🛑" },
] as const;
