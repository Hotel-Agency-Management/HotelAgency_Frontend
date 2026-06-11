import type { OwnerStateThemeType } from '.'

const Autocomplete = () => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[6]
        }),
        listbox: {
          fontSize: '0.8rem'
        },
        input: ({ ownerState }: OwnerStateThemeType) => ({
          ...(ownerState.size === 'small' && {
            fontSize: '0.8rem'
          })
        })
      }
    }
  }
}

export default Autocomplete
