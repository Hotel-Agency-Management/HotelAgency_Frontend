import { UseFormReturn } from "react-hook-form";
import { HotelFormValues } from "./hotel";

export interface UseHotelProfileOptions {
  defaultValues: HotelFormValues;
  onSave: (data: HotelFormValues) => Promise<void> | void;
}

export interface UseHotelProfileReturn {
  isEditing: boolean;
  isSaving: boolean;
  form: UseFormReturn<HotelFormValues>;
  handleEdit: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}
