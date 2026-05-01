import { AddPhotoTileIcon, AddPhotoTileRoot } from "../../../roomStyle";

export function AddPhotoTile({ onActivate }: { onActivate: () => void }) {
  return (
    <AddPhotoTileRoot
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
    >
      <AddPhotoTileIcon />
    </AddPhotoTileRoot>
  );
}
