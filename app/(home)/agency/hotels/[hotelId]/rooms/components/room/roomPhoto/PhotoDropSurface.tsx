import { PhotoDropSurfaceRoot } from "../../../roomStyle";

export function PhotoDropSurface({
  children,
  onActivate,
}: {
  children: React.ReactNode;
  onActivate: () => void;
}) {
  return (
    <PhotoDropSurfaceRoot
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
      {children}
    </PhotoDropSurfaceRoot>
  );
}
