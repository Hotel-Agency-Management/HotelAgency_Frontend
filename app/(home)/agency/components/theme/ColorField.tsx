"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ColorPicker, useColor, type IColor } from "react-color-palette";
import "react-color-palette/css";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { normalizeHexColor, isHexColor } from "@/core/theme/palette/branding";
import { ColorFieldProps } from "../../types/colorTheme";
import { ColorSwatch } from "./ColorSwatch";

export function ColorField({ name, label, helperText, fallbackColor }: ColorFieldProps) {
  const { control } = useFormContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: `${label} is required`,
        validate: (v) => isHexColor(v) || "Use a valid HEX color",
      }}
      render={({ field, fieldState }) => {
        const preview = normalizeHexColor(field.value, fallbackColor);
        const [pickerColor, setPickerColor] = useColor(preview);

        const handlePickerChange = (color: IColor) => {
          setPickerColor(color);
          field.onChange(color.hex);
        };

        return (
          <Stack spacing={1.25}>
            <Typography
              variant="overline"
              sx={{ color: "text.disabled" }}
            >
              {label}
            </Typography>

            <Stack direction="row" spacing={1.25} alignItems="flex-start">
              <ColorSwatch
                color={preview}
                onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
                aria-label={`Pick ${label} color`}
              />

              <Box sx={{ flex: 1 }}>
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? helperText}
                  onBlur={(e) => {
                    field.onBlur();
                    field.onChange(normalizeHexColor(e.target.value, fallbackColor));
                  }}
                />
              </Box>
            </Stack>

            <Popper open={open} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 1300 }}>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <Box>
                  <ColorPicker
                    color={pickerColor}
                    onChange={handlePickerChange}
                    hideAlpha
                    hideInput={["rgb", "hsv"]}
                  />
                </Box>
              </ClickAwayListener>
            </Popper>
          </Stack>
        );
      }}
    />
  );
}
