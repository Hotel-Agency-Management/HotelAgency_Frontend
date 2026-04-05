import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'

const select = () => {
  return {
    MuiSelect: {
      styleOverrides: {
        select: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: themeConfig.borderRadius,
          fontSize: '0.875rem',
          padding: '8.5px 14px',
          lineHeight: '1.4375em',
          minWidth: '6rem !important',
          '.MuiInputBase-sizeSmall &': {
            padding: '8.5px 14px'
          },
          '&.MuiTablePagination-select': {
            minWidth: '1.5rem !important'
          },
          '&.Mui-disabled ~ .MuiOutlinedInput-notchedOutline': {
            borderColor: `rgba(${theme.palette.primary.main}, 0.12)`
          }
        })
      }
    }
  }
}

export default select
