import { Paper } from "@mui/material";

export function PhotoDropSurface({
  children,
  onActivate,
}: {
  children: React.ReactNode;
  onActivate: () => void;
}) {
  return (
    <Paper
      variant="outlined"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      sx={{
        borderStyle: "dashed",
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      {children}
    </Paper>
  );
}
