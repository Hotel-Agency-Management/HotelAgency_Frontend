import { OwnerStateThemeType } from "."

const Badge = () => {
  return {
    MuiBadge: {
      styleOverrides: {
        badge: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiBadge-dot': {
            width: 10,
            height: 10,
            minWidth: 10,
            borderRadius: '50%'
          },

          '&.MuiBadge-dot.status-success': {
            backgroundColor: theme.palette.success.main
          },

          '&.MuiBadge-dot.status-warning': {
            backgroundColor: theme.palette.warning.main
          },

          '&.MuiBadge-dot.status-error': {
            backgroundColor: theme.palette.error.main
          }
        })
      }
    }
  }
}

export default Badge
