import { Control, UseFormSetValue } from "react-hook-form";
import type { DocumentType } from "../constants/documentTypes";

export interface FileItem {
  id: string;
  name: string;
  documentType: DocumentType;
  url: string;
  type: string;
}

export interface AgencyProfile {
  name: string;
  phone: string;
  country: string;
  city: string;
  files: FileItem[];
  planId?: number;
}

export interface AgencyInfoFieldsProps {
  isEditing: boolean;
  isLoading?: boolean;
  control: Control<AgencyProfile>;
  setValue: UseFormSetValue<AgencyProfile>;
  currentValues: AgencyProfile;
}

export interface FieldRowProps {
  label: React.ReactNode;
  isEditing: boolean;
  isLoading?: boolean;
  viewContent: React.ReactNode;
  editContent: React.ReactNode;
}
