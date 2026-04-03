import themeConfig from "@/core/configs/themeConfig";

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
      }
    ],
  },
};
