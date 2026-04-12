import Skeleton from "@mui/material/Skeleton";
import { InfoCard } from "./InfoCard";
import { FieldHeader } from "./FieldHeader";
import Typography from "@mui/material/Typography";

interface FormFieldProps {
  icon: React.ReactNode;
  label: string;
  isEditing: boolean;
  isLoading?: boolean;
  value?: string | null;
  fullHeight?: boolean;
  children: React.ReactNode;
}

export function FormField({
  icon,
  label,
  isEditing,
  isLoading = false,
  value,
  fullHeight = true,
  children,
}: FormFieldProps) {
  return (
    <InfoCard fullHeight={fullHeight}>
      <FieldHeader icon={icon} label={label} />
      {isLoading ? (
        <Skeleton variant="text" width="70%" height={38} />
      ) : isEditing ? (
        children
      ) : (
        <Typography variant="h6" fontWeight={600}>
          {value || "—"}
        </Typography>
      )}
    </InfoCard>
  );
}
