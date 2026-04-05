import ButtonBase, { type ButtonBaseProps } from "@mui/material/ButtonBase";

interface ColorSwatchProps extends ButtonBaseProps {
  color: string;
}

export function ColorSwatch({ color, sx, ...props }: ColorSwatchProps) {
  return (
    <ButtonBase
      {...props}
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1.5,
        bgcolor: color,
        flexShrink: 0,
        border: "0.5px solid",
        borderColor: "divider",
        ...sx,
      }}
    />
  );
}
