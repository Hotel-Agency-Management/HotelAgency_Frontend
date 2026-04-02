import { Control } from "react-hook-form";

export interface FileItem {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface AgencyProfile {
  name: string;
  phone: string;
  city: string;
  files: FileItem[];
}

export interface AgencyInfoFieldsProps {
  isEditing: boolean;
  isLoading?: boolean;
  control: Control<AgencyProfile>;
  currentValues: AgencyProfile;
}

export interface FieldRowProps {
  label: string;
  isEditing: boolean;
  isLoading?: boolean;
  viewContent: React.ReactNode;
  editContent: React.ReactNode;
}
