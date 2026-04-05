import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'
import { alpha } from '@mui/material/styles'

const Avatar = () => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: '14px'
        },
        colorDefault: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.customColors.avatarBg
        }),
        rounded: {
          borderRadius: themeConfig.borderRadius
        }
      },
      variants: [
        {
          props: { variant: 'profileLarge' },
          style: ({ theme }: OwnerStateThemeType) => ({
            width: 96,
            height: 96,
            backgroundColor: theme.palette.primary.main,
            fontSize: '1.75rem',
            fontWeight: 700,
            border: `4px solid ${theme.palette.background.paper}`
          })
        },
        {
          props: { variant: 'user' },
          style: ({ ownerState }: any) => ({
            width: 48,
            height: 48,
            fontWeight: 700,
            fontSize: '1rem',
            flexShrink: 0,
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            letterSpacing: '0.03em',
            backgroundColor: ownerState.color,
            boxShadow: `0 2px 8px ${ownerState.color}55`
          })
        },
        {
          props: { variant: 'soft' },
          style: ({ theme, ownerState }: any) => {
            const color = ownerState.color || 'primary'
            const palette = theme.palette[color]

            return {
              width: 40,
              height: 40,
              backgroundColor: alpha(palette.main, 0.1),
              border: `1px solid ${alpha(palette.main, 0.25)}`,
              color: palette.main
            }
          }
        },
        {
          props: { variant: 'brand' },
          style: ({ ownerState }: any) => ({
            width: 50,
            height: 50,
            fontWeight: 700,
            fontSize: '1.2rem',
            boxShadow: `0 4px 14px ${ownerState.color}55`,
            backgroundColor: ownerState.color,
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            letterSpacing: '0.03em'
          })
        }
      ]
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '&.pull-up': {
            '& .MuiAvatar-root': {
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              '&:hover': {
                zIndex: 2,
                boxShadow: theme.shadows[3],
                transform: 'translateY(-4px)'
              }
            }
          },
          justifyContent: 'flex-end',
          '.MuiCard-root & .MuiAvatar-root': {
            borderColor: theme.palette.background.paper
          }
        })
      }
    }
  }
}

export default Avatar