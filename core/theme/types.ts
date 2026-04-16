import { DetailedHTMLProps } from 'react'

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      main: string
      light: string
      bodyBg: string
      darkBg: string
      lightBg: string
      trackBg: string
      avatarBg: string
      tooltipBg: string
      tableHeaderBg: string
      disabled: string
      planAvatar: string
      greenBackground: string
      blueBackground: string
      lightPurple: string
      lightAqua: string
      subscriptionBlue: string
      subscriptionPurple: string
    }
    brand: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
    tertiary: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
  }
  interface PaletteOptions {
    customColors?: Palette['customColors']
    brand?: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
    tertiary?: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    hotel: true
  }
}

declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    profileLarge: true
    user: true
    soft: true
    brand: true
  }
}

declare module '@mui/material/Paper' {  interface PaperPropsVariantOverrides {
    dashed: true
    photoThumb: true
    photoBadge: true
    card: true
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsVariantOverrides {
    amenity: true
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    'status-available': true
    'status-occupied': true
    'status-maintenance': true
    'status-reserved': true
    'status-blocked': true
    'live-alert': true
    'dot': true
  }
}
declare module '@mui/material/MenuItem' {
  interface MenuItemPropsVariantOverrides {
    default: true
    danger: true
  }
}
export {}
