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
          borderRadius: 8,
        }),
      },
      {
        props: { variant: "customerHotelDetailHero" },
        style: ({ theme }: OwnerStateThemeType) => ({
          minHeight: 420,
          overflow: "hidden",
          borderRadius: 8,
          backgroundImage: `linear-gradient(90deg, ${alpha(theme.palette.common.black, 0.82)}, ${alpha(theme.palette.primary.dark, 0.38)}), var(--customer-hotel-detail-hero-image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: theme.palette.common.white,

          [theme.breakpoints.up("md")]: {
            minHeight: 480,
          },

          "& .hotel-detail-hero-content": {
            minHeight: 420,
            justifyContent: "center",
            maxWidth: 980,
            padding: theme.spacing(3),

            [theme.breakpoints.up("sm")]: {
              padding: theme.spacing(4),
            },

            [theme.breakpoints.up("md")]: {
              minHeight: 480,
              padding: theme.spacing(5),
            },
          },

          "& .hotel-detail-back": {
            width: "fit-content",
            color: theme.palette.common.white,
          },

          "& .MuiTypography-root": {
            color: "inherit",
          },

          "& .MuiChip-root": {
            borderRadius: 8,
            color: theme.palette.common.white,
            borderColor: alpha(theme.palette.common.white, 0.45),
            backgroundColor: alpha(theme.palette.common.white, 0.16),
            backdropFilter: "blur(8px)",
          },

          "& .hotel-detail-meta": {
            color: alpha(theme.palette.common.white, 0.88),
          },
        }),
      },
      {
        props: { variant: "customerHotelRoomSearch" },
        style: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(2),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          borderRadius: 8,
          boxShadow: `0 16px 34px ${alpha(theme.palette.common.black, 0.1)}`,

          [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2.5),
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
        props: { variant: "customerHotelRoomEmpty" },
        style: ({ theme }: OwnerStateThemeType) => ({
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.35)}`,
          borderRadius: 8,
          padding: theme.spacing(7, 3),
          textAlign: "center",
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.04),
        }),
      },
      {
        props: { variant: "customerReservationConfirmationModal" },
        style: ({ theme }: OwnerStateThemeType) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxHeight: "calc(100vh - 48px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 8,
          outline: "none",

          [theme.breakpoints.up("sm")]: {
            width: 720,
          },

          [theme.breakpoints.up("md")]: {
            width: 840,
          },

          "& .customer-reservation-confirmation-header": {
            padding: theme.spacing(2.5, 3),
          },

          "& .customer-reservation-confirmation-body": {
            padding: theme.spacing(3),
            overflow: "auto",
          },

          "& .customer-reservation-confirmation-actions": {
            padding: theme.spacing(2, 3),
          },

          "& .customer-reservation-confirmation-spacer": {
            flex: 1,
          },

          "& .customer-reservation-signature-pad > .MuiPaper-root": {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
          },

          "& .customer-reservation-signature-preview": {
            width: "100%",
            maxHeight: 110,
            objectFit: "contain",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
            backgroundColor: theme.palette.common.white,
            padding: theme.spacing(1),
          },
        }),
      },
      {
        props: { variant: "customerReservationConfirmationPanel" },
        style: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(2),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 8,
        }),
      },
      {
        props: { variant: "customerReservationTermsContent" },
        style: ({ theme }: OwnerStateThemeType) => ({
          maxHeight: 240,
          overflow: "auto",
          padding: theme.spacing(2),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 8,
          backgroundColor: theme.palette.background.default,
        }),
      },
      {
        props: { variant: "customerReservationContractPreview" },
        style: ({ theme }: OwnerStateThemeType) => ({
          width: "100%",
          maxWidth: 560,
          padding: theme.spacing(3),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 8,
          backgroundColor: theme.palette.background.default,
        }),
      },
    ],
  },
};
