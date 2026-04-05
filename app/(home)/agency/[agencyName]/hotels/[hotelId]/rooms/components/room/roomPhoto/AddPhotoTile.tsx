import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Paper } from "@mui/material";

export function AddPhotoTile({ onActivate }: { onActivate: () => void }) {
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
        width: 120,
        height: 90,
        borderStyle: "dashed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <AddPhotoAlternateIcon sx={{ color: "text.disabled" }} />
    </Paper>
  );
}
