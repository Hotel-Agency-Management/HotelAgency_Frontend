// RoomGalleryThumb.tsx
import Box from "@mui/material/Box";

interface RoomGalleryThumbProps {
  url: string;
  active: boolean;
  onClick: () => void;
}

export function RoomGalleryThumb({ url, active, onClick }: RoomGalleryThumbProps) {
  return (
    <Box
      component="img"
      src={url}
      alt=""
      onClick={onClick}
      sx={(theme) => ({
        display: "block",
        width: 1,
        height: { xs: 64, sm: 72 },
        objectFit: "cover",
        borderRadius: 1,
        cursor: "pointer",
        outline: active ? `2px solid ${theme.palette.primary.main}` : "none",
        outlineOffset: 2,
      })}
    />
  );
}
