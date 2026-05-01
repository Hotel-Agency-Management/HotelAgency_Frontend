import type { SxProps, Theme } from "@mui/material/styles";

export const addTeamDrawerStyles = {
  paper: {
    width: { xs: "100%", sm: 440 },
  },
  form: {
    display: "flex",
    minHeight: "100%",
    flexDirection: "column",
  },
  contentStack: {
    flex: 1,
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentBody: {
    flex: 1,
    justifyContent: "space-between",
  },
  actions: {
    justifyContent: "flex-end",
  },
} satisfies Record<string, SxProps<Theme>>;
