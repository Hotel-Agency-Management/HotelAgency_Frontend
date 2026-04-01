import { OwnerStateThemeType } from './'

const Drawer = () => {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          width: 440,
          border: 'none',
          borderLeft: `1px solid ${theme.palette.divider}`,
          [theme.breakpoints.down('sm')]: {
            width: '100vw',
          },
        }),
      },
    },
  }
}

export default Drawer
