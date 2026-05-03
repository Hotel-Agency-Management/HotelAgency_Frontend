import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { EmptyPhotoIcon, PhotoDropSurfaceRoot } from "../../../roomStyle";

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
    <PhotoDropSurfaceRoot
      variant="dashed"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children ?? (
        <>
          <EmptyPhotoIcon />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Click to upload room photos
          </Typography>
        </>
      )}
    </PhotoDropSurfaceRoot>
  );
}
