"use client";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_BRANDING_COLORS,
  type BrandingColors,
} from "@/core/theme/palette/branding";
import { ColorField } from "./ColorField";
import { getColorFields } from "../../constants/colorField";

interface ColorsCardProps {
  namePrefix?: string;
  fallbackColors?: BrandingColors;
}

export function ColorsCard({ namePrefix, fallbackColors = DEFAULT_BRANDING_COLORS }: ColorsCardProps) {
  const { t } = useTranslation();
  const colorFields = getColorFields(t);
  return (
    <Paper elevation={0} variant="card">
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={500}>{t('agencySettings.theme.colorsTitle', 'Theme colors')}</Typography>
        <Typography variant="body2">
          {t('agencySettings.theme.colorsHint', 'Click any swatch to open the color picker.')}
        </Typography>
      </Stack>
      <Divider />
      <Grid container spacing={2.5}>
        {colorFields.map(({ name, label, hint }) => {
          const fullName = namePrefix ? `${namePrefix}.${name}` : name
          const colorKey = name.split(".")[1] as keyof BrandingColors

          return (
            <Grid key={fullName} size={{ xs: 12, md: 4 }}>
              <ColorField
                name={fullName}
                label={label}
                helperText={hint}
                fallbackColor={fallbackColors[colorKey]}
              />
            </Grid>
          )
        })}
      </Grid>
    </Paper>
  )
}

