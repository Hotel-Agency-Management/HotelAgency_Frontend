"use client";
import { Controller, useFormContext } from "react-hook-form";
import "react-color-palette/css";
import { isHexColor } from "@/core/theme/palette/branding";
import { ColorFieldProps } from "../../types/colorTheme";
import { ColorFieldInner } from "./ColorFieldInner";

export function ColorField({ name, label, helperText, fallbackColor }: ColorFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: `${label} is required`,
        validate: (v) => isHexColor(v) || "Use a valid HEX color",
      }}
      render={({ field, fieldState }) => (
        <ColorFieldInner
          field={field}
          fieldState={fieldState}
          fallbackColor={fallbackColor}
          label={label}
          helperText={helperText}
        />
      )}
    />
  );
}
