"use client";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DEFAULT_BRANDING_COLORS } from "@/core/theme/palette/branding";
import { ColorField } from "./ColorField";
import { COLOR_FIELDS } from "../../constants/colorField";


export function ColorsCard() {
  return (
    <Paper elevation={0} sx={cardSx}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={500}>Theme colors</Typography>
        <Typography variant="body2">
          Click any swatch to open the color picker.
        </Typography>
      </Stack>

      <Divider />

      <Grid container spacing={2.5}>
        {COLOR_FIELDS.map(({ name, label, hint }) => (
          <Grid key={name} size={{ xs: 12, md: 4 }}>
            <ColorField
              name={name}
              label={label}
              helperText={hint}
              fallbackColor={DEFAULT_BRANDING_COLORS[name.split(".")[1] as keyof typeof DEFAULT_BRANDING_COLORS]}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

const cardSx = {
  borderRadius: 3,
  border: "0.5px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  boxShadow: "none",
  p: 3,
};
