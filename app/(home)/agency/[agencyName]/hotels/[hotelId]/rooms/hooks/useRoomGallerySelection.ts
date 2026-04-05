import { useEffect, useMemo, useState } from "react";
import type { RoomPhoto } from "../types/room";

/** Orders primary-first photos and tracks the selected gallery index safely. */
export function useRoomGallerySelection(photos: RoomPhoto[]) {
  const ordered = useMemo(
    () => [...photos.filter((p) => p.isPrimary), ...photos.filter((p) => !p.isPrimary)],
    [photos],
  );
  const [active, setActive] = useState(0);
  useEffect(() => setActive((a) => (ordered.length ? Math.min(a, ordered.length - 1) : 0)), [ordered.length]);
  const idx = ordered.length ? Math.min(active, ordered.length - 1) : 0;
  return { ordered, idx, setActive };
}
