import themeConfig from "@/core/configs/themeConfig";
import { alpha } from "@mui/material/styles";
import { OwnerStateThemeType } from "./";

export default {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        borderRadius: themeConfig.borderRadius,
      },
    },

    variants: [
      {
        props: { variant: "dashed" },
        style: {
          borderStyle: "dashed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "border-color 0.2s ease",

          "&:hover": {
            borderColor: "var(--mui-palette-primary-main)",
          },
        },
      },
      {
        props: { variant: "photoThumb" },
        style: {
          position: "relative",
          width: 120,
          height: 90,
          overflow: "hidden",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "var(--mui-palette-divider)",
        },
      },
      {
        props: { variant: "photoBadge" },
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "var(--mui-palette-primary-main)",
          paddingTop: 2,
          paddingBottom: 2,
          textAlign: "center",
          borderRadius: 0,
        },
      },
      {
        props: { variant: "card" },
        style: {
          padding: 20,
          borderRadius: themeConfig.borderRadius,
          boxShadow: "none",
          borderWidth: 1,
        },
      },
      {
        props: { variant: "customerHotelHero" },
        style: ({ theme }: OwnerStateThemeType) => ({
          minHeight: 340,
          overflow: "hidden",
          backgroundImage: `linear-gradient(90deg, ${alpha(theme.palette.common.black, 0.78)}, ${alpha(theme.palette.common.black, 0.2)}), var(--customer-hotel-hero-image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: Number(theme.shape.borderRadius) * 2,

          [theme.breakpoints.up("md")]: {
            minHeight: 430,
          },

          "& > .MuiStack-root": {
            minHeight: 340,
            justifyContent: "center",
            maxWidth: 720,
            padding: theme.spacing(5, 3),
            color: theme.palette.common.white,

            [theme.breakpoints.up("sm")]: {
              padding: theme.spacing(5, 5),
            },

            [theme.breakpoints.up("md")]: {
              minHeight: 430,
              padding: theme.spacing(8),
            },

            "& .MuiTypography-root": {
              color: "inherit",
            },
          },
        }),
      },
      {
        props: { variant: "customerHotelSearch" },
        style: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(2),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          boxShadow: `0 18px 40px ${alpha(theme.palette.common.black, 0.12)}`,

          [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2.5),
          },
          "& .MuiFormControl-root": {
            [theme.breakpoints.up("md")]: {
              minWidth: 180,
            },
          },

          "& .MuiInputBase-root": {
            minHeight: 46,
            alignItems: "center",
          },

          "& .MuiInputBase-input, & .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            paddingTop: 0,
            paddingBottom: 0,
          },
        }),
      },
      {
        props: { variant: "customerHotelEmpty" },
        style: ({ theme }: OwnerStateThemeType) => ({
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          padding: theme.spacing(8, 3),
          textAlign: "center",
        }),
      },
      {
        props: { variant: "customerHotelSkeleton" },
        style: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(2),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: Number(theme.shape.borderRadius) * 2,
        }),
      }
    ],
  },
};
