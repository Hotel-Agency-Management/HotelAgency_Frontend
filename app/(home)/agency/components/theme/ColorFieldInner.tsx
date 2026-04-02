import { normalizeHexColor } from "@/core/theme/palette/branding";
import { Stack, Typography, TextField, Popper, ClickAwayListener, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useColor, IColor, ColorPicker } from "react-color-palette";
import { ControllerRenderProps, ControllerFieldState } from "react-hook-form";
import { ColorSwatch } from "./ColorSwatch";

interface InnerProps {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  fallbackColor: string;
  label: string;
  helperText: string;
}

export function ColorFieldInner({ field, fieldState, fallbackColor, label, helperText }: InnerProps) {
  const preview = normalizeHexColor(field.value, fallbackColor);
  const [pickerColor, setPickerColor] = useColor(preview);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setPickerColor((prev) => ({ ...prev, hex: preview }));
  }, [preview]);

  const handlePickerChange = (color: IColor) => {
    setPickerColor(color);
    field.onChange(color.hex);
  };

  return (
    <Stack spacing={1.25}>
      <Typography variant="overline" sx={{ color: "text.disabled" }}>
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
}
