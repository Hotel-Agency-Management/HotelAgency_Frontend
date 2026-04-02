import { ColorFieldName } from "../types/colorTheme";

export const COLOR_FIELDS: { name: ColorFieldName; label: string; hint: string }[] = [
  { name: "colors.primary", label: "Primary", hint: "Main CTA and highlight." },
  { name: "colors.secondary", label: "Secondary", hint: "Supporting accents." },
  { name: "colors.tertiary", label: "Tertiary", hint: "States and chart tones." },
];
