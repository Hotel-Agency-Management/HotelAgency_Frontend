export type ColorFieldName =
  | "colors.primary"
  | "colors.secondary"
  | "colors.tertiary";

export interface ColorFieldProps {
  name: ColorFieldName;
  label: string;
  helperText: string;
  fallbackColor: string;
}
