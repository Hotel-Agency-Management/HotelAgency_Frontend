import { Stack } from "@mui/material";
import type { RoomType } from "../../../../../../../room-types/types/roomType";
import type { RoomPhoto, StepContentRenderer } from "../../../types/room";
import { RoomAmenitiesPicker } from "./RoomAmenitiesPicker";
import { RoomCreatePhotosUpload } from "./RoomCreatePhotosUpload";
import { RoomEditPhotosUpload } from "./RoomEditPhotosUpload";
import { RoomFormFields } from "./RoomFormFields";

export interface StepContentProps {
  isEdit: boolean;
  roomTypes: RoomType[];
  photos: File[];
  replacementCoverPhoto?: File | null;
  existingPhotos?: RoomPhoto[];
  onDeleteExistingPhoto?: (photo: RoomPhoto) => void;
  onPhotosChange: (photos: File[]) => void;
  onReplaceCoverPhoto?: (file: File | null) => void;
}

const photoUploadFactory = ({
  isEdit,
  photos,
  existingPhotos = [],
  replacementCoverPhoto = null,
  onPhotosChange,
  onReplaceCoverPhoto,
  onDeleteExistingPhoto,
}: StepContentProps) =>
  isEdit ? (
    <RoomEditPhotosUpload
      existingPhotos={existingPhotos}
      newFiles={photos}
      replacementCoverPhoto={replacementCoverPhoto}
      onNewFilesChange={onPhotosChange}
      onReplaceCoverPhoto={onReplaceCoverPhoto ?? (() => undefined)}
      onDeleteExistingPhoto={onDeleteExistingPhoto ?? (() => undefined)}
    />
  ) : (
    <RoomCreatePhotosUpload files={photos} onFilesChange={onPhotosChange} />
  );

const stepStrategies: Record<number, StepContentRenderer> = {
  0: ({ roomTypes }) => <RoomFormFields roomTypes={roomTypes} section="details" />,
  1: ({ roomTypes }) => <RoomFormFields roomTypes={roomTypes} section="pricing" />,
  2: ({ roomTypes }) => (
    <Stack spacing={3}>
      <RoomFormFields roomTypes={roomTypes} section="notes" />
      <RoomAmenitiesPicker />
    </Stack>
  ),
  3: (props) => photoUploadFactory(props),
};

export const renderRoomFormStep = (
  step: number,
  props: StepContentProps
): React.ReactNode => stepStrategies[step]?.(props) ?? null;
