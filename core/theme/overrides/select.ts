import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'

const select = () => {
  return {
    MuiSelect: {
      styleOverrides: {
        select: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: themeConfig.borderRadius,
          fontSize: '0.875rem',
          paddingTop: '16.5px',
          paddingBottom: '16.5px',
          paddingLeft: '14px !important',
          paddingRight: '32px !important',
          lineHeight: '1.4375em',
          minWidth: '6rem !important',
          '.MuiInputBase-sizeSmall &': {
            paddingTop: '8.5px',
            paddingBottom: '8.5px',
            paddingLeft: '14px !important',
            paddingRight: '32px !important'
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
