import React from "react";
import { RoomDetailsFields } from "./RoomDetailsFields";
import { RoomNotesFields } from "./RoomNotesFields";
import { RoomPricingFields } from "./RoomPricingFields";

export interface RoomTypeOption {
  id: number | string;
  name: string;
}

type Section = "details" | "pricing" | "notes";

interface Props {
  roomTypes: RoomTypeOption[];
  section: Section;
}

const sectionStrategies: Record<Section, React.FC<{ roomTypes: RoomTypeOption[] }>> = {
  details: RoomDetailsFields,
  pricing: RoomPricingFields,
  notes: RoomNotesFields,
};

export const RoomFormFields = ({ roomTypes, section }: Props) => {
  const SectionFields = sectionStrategies[section];
  return <SectionFields roomTypes={roomTypes} />;
};
