import { Paper, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ReactNode } from "react";

interface PhotoDropSurfaceProps {
  children?: ReactNode;
  onActivate: () => void;
}

export function PhotoDropSurface({
  children,
  onActivate,
}: PhotoDropSurfaceProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <Paper
      variant="dashed"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      sx={{
        p: 4,
        textAlign: "center",
      }}
    >
      {children ?? (
        <>
          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "text.disabled" }} />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Click to upload room photos
          </Typography>
        </>
      )}
    </Paper>
  );
}
