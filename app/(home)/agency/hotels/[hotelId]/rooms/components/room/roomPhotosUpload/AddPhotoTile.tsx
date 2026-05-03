import { AddPhotoTileIcon, AddPhotoTileRoot } from "../../../roomStyle";

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
    <AddPhotoTileRoot
      variant="dashed"
      onClick={onActivate}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <AddPhotoTileIcon />
    </AddPhotoTileRoot>
  );
}
