// ** React Imports
import { ReactNode, useMemo } from 'react'

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

// ** Type Imports
import { Settings } from '../context/SettingsContext'

// ** Direction component for LTR or RTL
import Direction from '../../components/common/Direction'

// ** Theme
import themeOptions from './ThemeOptions'

// ** Global Styles
import GlobalStyling from './globalStyles'
import themeConfig from '../configs/themeConfig'
import { useActiveBranding } from '../hooks/useActiveBranding'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
  settings: Settings
  children: ReactNode
}

const ThemeComponent = (props: Props) => {
  // ** Props
  const { settings, children } = props
  const { i18n } = useTranslation()
  const activeBranding = useActiveBranding()

  const themedSettings = useMemo(
    () => ({
      ...settings,
      branding: activeBranding
    }),
    [activeBranding, settings]
  )

  // ** Map custom mode to MUI PaletteMode
  const paletteMode: 'light' | 'dark' = themedSettings.mode === 'dark' ? 'dark' : 'light'
  const lang = i18n.language

  // ** Pass merged ThemeOptions (of core and user) to createTheme function
  let theme = createTheme(themeOptions(themedSettings, paletteMode, lang))

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <Direction direction={settings.direction}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme)} />
        {children}
      </Direction>
    </ThemeProvider>
  )
}

export default ThemeComponent
