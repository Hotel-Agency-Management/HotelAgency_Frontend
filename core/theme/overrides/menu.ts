import themeConfig from '@/core/configs/themeConfig'
import { alpha } from '@mui/material/styles'
import { OwnerStateThemeType } from './'

const Menu = () => {
  const boxShadow = (theme: OwnerStateThemeType['theme']) => {
    if (theme.palette.mode === 'light') {
      return theme.shadows[8]
    } else return theme.shadows[9]
  }

  return {
    MuiMenu: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: 1,
          marginTop: theme.spacing(0.5),
          '& .MuiMenu-paper': {
            borderRadius: themeConfig.borderRadius,
            boxShadow: `0 0 0 5px ${theme.palette.primary.dark}20`,
            padding: theme.spacing(1),
            backgroundColor: `${theme.palette.background.paper}99`,
            backdropFilter: 'blur(6px)'
          }
        }),
        paper: ({ theme }: OwnerStateThemeType) => ({
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: boxShadow(theme),
          marginTop: theme.spacing(0.5),
          minWidth: 140
        })
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          fontSize: 14,
          borderRadius: theme.shape.borderRadius,
          transition: 'all 0.1s ease-in-out',
          '&.Mui-selected': {
            borderRadius: theme.shape.borderRadius,
            margin: theme.spacing(1, 0),
            backgroundColor: theme.palette.action.selected
          },
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        })
      },
      variants: [
        {
          props: { variant: 'default' },
          style: {
            fontSize: 13,
            fontWeight: 500,
            marginLeft: 4,
            marginRight: 4
          }
        },
        {
          props: { variant: 'danger' },
          style: ({ theme }: OwnerStateThemeType) => ({
            fontSize: 13,
            fontWeight: 500,
            marginLeft: 4,
            marginRight: 4,
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.08)
            }
          })
        }
      ]
    }
  }
}

export default Menu
