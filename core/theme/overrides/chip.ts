import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'
import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import { alpha } from '@mui/material/styles'

const Chip = () => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '10px',
          '&.MuiChip-rounded': {
            borderRadius: themeConfig.borderRadius
          }
        },
        outlined: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-colorDefault': {
            borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`
          }
        }),
        avatar: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary
        }),
        deletableColorPrimary: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.primary.main, 0.7),
            '&:hover': { color: theme.palette.primary.main }
          }
        }),
        deletableColorSecondary: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.secondary.main, 0.7),
            '&:hover': { color: theme.palette.secondary.main }
          }
        }),
        deletableColorSuccess: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.success.main, 0.7),
            '&:hover': { color: theme.palette.success.main }
          }
        }),
        deletableColorError: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.error.main, 0.7),
            '&:hover': { color: theme.palette.error.main }
          }
        }),
        deletableColorWarning: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.warning.main, 0.7),
            '&:hover': { color: theme.palette.warning.main }
          }
        }),
        deletableColorInfo: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.info.main, 0.7),
            '&:hover': { color: theme.palette.info.main }
          }
        }),
      },
      variants: [
        {
          props: { variant: 'status-available' },
          style: ({ theme }: OwnerStateThemeType) => ({
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            borderColor: alpha(theme.palette.primary.main, 0.35),
          }),
        },
        {
          props: { variant: 'status-occupied' },
          style: ({ theme }: OwnerStateThemeType) => ({
            color: theme.palette.secondary.main,
            backgroundColor: alpha(theme.palette.secondary.main, 0.12),
            borderColor: alpha(theme.palette.secondary.main, 0.35),
          }),
        },
        {
          props: { variant: 'status-maintenance' },
          style: ({ theme }: OwnerStateThemeType) => ({
            color: theme.palette.text.secondary,
            backgroundColor: alpha(theme.palette.text.secondary, 0.1),
            borderColor: alpha(theme.palette.text.secondary, 0.3),
          }),
        },
        {
          props: { variant: 'status-reserved' },
          style: ({ theme }: OwnerStateThemeType) => ({
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            borderColor: alpha(theme.palette.primary.main, 0.25),
          }),
        },
        {
          props: { variant: 'status-blocked' },
          style: ({ theme }: OwnerStateThemeType) => ({
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.background.paper,
            borderColor: alpha(theme.palette.text.disabled, 0.45),
          }),
        },
        {
        props: { variant: 'live-alert' },
        style: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: 8,
          fontWeight: 700,
          color: theme.palette.error.main,
          backgroundColor: alpha(theme.palette.error.main, 0.1),

          '& .MuiChip-icon': {
            color: theme.palette.error.main
          }
        }),
      },
      {
        props: { variant: 'dot' },
        style: () => ({
          width: 8,
          height: 8,
          minWidth: 8,
          borderRadius: '50%',
          padding: 0,
          backgroundColor: 'currentColor',
        }),
      }
      ],
    },
  }
}

export default Chip
