import { RoomPhoto } from "../../../types/room";

export interface RoomPhotosUploadProps {
  roomId: string;
  existingPhotos: RoomPhoto[];
  onPhotosChange?: (photos: RoomPhoto[]) => void;
}

export interface PhotoActionProps {
  onActivate: () => void;
}
