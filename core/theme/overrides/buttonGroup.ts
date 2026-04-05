import { buttonGroupClasses } from "@mui/material/ButtonGroup";
import themeConfig from "@/core/configs/themeConfig";
import { OwnerStateThemeType } from "./";

/**
 * Use on `<ButtonGroup variant="contained" size="small" className={BUTTON_GROUP_COMPACT_SPLIT_CLASS}>`:
 * compact padding, tight dropdown segment, sentence case label.
 */
export const BUTTON_GROUP_COMPACT_SPLIT_CLASS = "MuiButtonGroup-compactSplit";

export default {
  MuiButtonGroup: {
    styleOverrides: {
      root: ({ theme }: OwnerStateThemeType) => ({
        borderRadius: themeConfig.borderRadius,
        [`&.${BUTTON_GROUP_COMPACT_SPLIT_CLASS}`]: {
          [`& .${buttonGroupClasses.firstButton}`]: {
            textTransform: "none",
            padding: theme.spacing(0.65, 1.25),
            gap: theme.spacing(0.5),
          },
          [`& .${buttonGroupClasses.lastButton}`]: {
            textTransform: "none",
            minWidth: 0,
            padding: theme.spacing(0.65),
          },
        },
      }),
    },
  },
};
