import themeConfig from '@/core/configs/themeConfig'

export default {
  MuiButtonGroup: {
    styleOverrides: {
      root: {
        borderRadius: themeConfig.borderRadius
      }
    }
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 999,
        padding: theme.spacing(0.5),
        overflow: 'hidden',
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : 'rgba(255,255,255,0.04)',
        '& .MuiToggleButton-root': {
          flex: 1,
          border: 0,
          borderRadius: '999px !important',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
          gap: theme.spacing(1),
          textTransform: 'none',
          fontWeight: 600,
          color: theme.palette.text.secondary,
        },
        '& .MuiToggleButton-root.Mui-selected': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          boxShadow: theme.shadows[2],
        },
        '& .MuiToggleButton-root.Mui-selected:hover': {
          backgroundColor: theme.palette.background.paper,
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: themeConfig.borderRadius
      }
    }
  }
}
