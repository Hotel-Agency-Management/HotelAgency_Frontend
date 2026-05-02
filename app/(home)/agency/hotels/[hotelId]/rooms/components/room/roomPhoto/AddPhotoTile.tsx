import { AddPhotoTileIcon, AddPhotoTileRoot } from "../../../StyledComponents";

export function AddPhotoTile({ onActivate }: { onActivate: () => void }) {
  return (
    <AddPhotoTileRoot
      onClick={onActivate}
      alignItems="center"
      justifyContent="center"
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
