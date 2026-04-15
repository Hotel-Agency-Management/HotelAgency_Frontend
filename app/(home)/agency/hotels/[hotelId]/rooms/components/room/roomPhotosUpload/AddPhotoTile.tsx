import { Paper } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface AddPhotoTileProps {
  onActivate: () => void;
}

export function AddPhotoTile({ onActivate }: AddPhotoTileProps) {
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
      tabIndex={0}
      onKeyDown={handleKeyDown}
      sx={{ width: 120, height: 90 }}
    >
      <AddPhotoAlternateIcon sx={{ color: "text.disabled" }} />
    </Paper>
  );
}
