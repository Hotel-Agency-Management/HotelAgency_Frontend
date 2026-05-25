import { Theme, alpha } from '@mui/material/styles'

const GlobalStyles = (theme: Theme) => {
  const perfectScrollbarThumbBgColor = () =>
    theme.palette.mode === 'light' ? '#BFBFD5 !important' : '#57596C !important'

  return {
    '.demo-space-x > *': {
      marginTop: '1rem !important',
      marginRight: '1rem !important',
      'body[dir="rtl"] &': {
        marginRight: '0 !important',
        marginLeft: '1rem !important'
      }
    },
    '.demo-space-y > *:not(:last-of-type)': {
      marginBottom: '1rem'
    },
    '.MuiGrid-container.match-height .MuiCard-root': {
      height: '100%'
    },
    '.ps__rail-y': {
      zIndex: 1,
      right: '0 !important',
      left: 'auto !important',
      '&:hover, &:focus, &.ps--clicking': {
        backgroundColor: theme.palette.mode === 'light' ? '#F3F3F8 !important' : '#393B51 !important'
      },
      '& .ps__thumb-y': {
        right: '3px !important',
        left: 'auto !important',
        backgroundColor: theme.palette.mode === 'light' ? '#BFBFD5 !important' : '#57596C !important'
      },
      '.layout-vertical-nav &': {
        '& .ps__thumb-y': {
          width: 4,
          backgroundColor: perfectScrollbarThumbBgColor()
        },
        '&:hover, &:focus, &.ps--clicking': {
          backgroundColor: 'transparent !important',
          '& .ps__thumb-y': {
            width: 6
          }
        }
      }
    },

    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        left: 0,
        top: 0,
        height: 3,
        width: '100%',
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main
      }
    },

    // react-datasheet-grid dark-mode overrides
    // CSS variables for elements that use them (sourced from docs/styling)
    '.dsg-container': {
      '--dsg-border-color': theme.palette.divider,
      '--dsg-cell-background-color': theme.palette.background.paper,
      '--dsg-cell-disabled-background-color': theme.palette.action.hover,
      '--dsg-header-text-color': theme.palette.text.secondary,
      '--dsg-header-active-text-color': theme.palette.text.primary,
      '--dsg-selection-border-color': theme.palette.primary.main,
      '--dsg-selection-background-color': alpha(theme.palette.primary.main, 0.08),
      '--dsg-selection-disabled-border-color': theme.palette.divider,
      '--dsg-selection-disabled-background-color': theme.palette.action.disabledBackground,
      '--dsg-scroll-shadow-color': alpha(theme.palette.common.black, 0.08),
      // library hardcodes color:black and background:white — must override directly
      color: `${theme.palette.text.primary} !important`,
      background: `${theme.palette.background.paper} !important`,
    } as object,

    // "Add N rows" bar — hardcoded #fafafa / black in library CSS
    '.dsg-add-row': {
      background: `${theme.palette.background.default} !important`,
      color: `${theme.palette.text.primary} !important`,
      borderColor: `${theme.palette.divider} !important`,
    } as object,

    // Add-row button + number input — hardcoded white / #dcdcdc
    '.dsg-add-row-btn, .dsg-add-row-input': {
      background: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
      borderColor: `${theme.palette.divider} !important`,
    } as object,

    // "+" icon lines inside button — hardcoded #9da6ab
    '.dsg-add-row-btn:before, .dsg-add-row-btn:after': {
      background: `${theme.palette.text.secondary} !important`,
    } as object,

    // Cell input — browser UA stylesheet resets color on <input>, breaking inheritance
    '.dsg-input': {
      color: `${theme.palette.text.primary} !important`,
    } as object,

    // Context menu — hardcoded white / black
    '.dsg-context-menu': {
      background: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
    } as object,

    '.dsg-context-menu-item:hover': {
      background: `${theme.palette.action.hover} !important`,
    } as object,
  }
}

export default GlobalStyles
