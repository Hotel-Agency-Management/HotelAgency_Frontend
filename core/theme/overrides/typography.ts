import { OwnerStateThemeType } from './'

const typography = {
  MuiTypography: {
    styleOverrides: {
      gutterBottom: ({ theme }: OwnerStateThemeType) => ({
        marginBottom: theme.spacing(2)
      })
    },
    variants: [
      {
        props: { variant: 'h1' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.1
        })
      },
      {
        props: { variant: 'h2' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.15
        })
      },
      {
        props: { variant: 'h3' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.2
        })
      },
      {
        props: { variant: 'h4' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.25
        })
      },
      {
        props: { variant: 'h5' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.2
        })
      },
      {
        props: { variant: 'h6' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.3
        })
      },
      {
        props: { variant: 'subtitle1' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          fontSize: '0.95rem',
          lineHeight: 1.4
        })
      },
      {
        props: { variant: 'subtitle2' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.secondary,
          lineHeight: 1.4
        })
      },
      {
        props: { variant: 'body1' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.6
        })
      },
      {
        props: { variant: 'body2' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.secondary,
          fontSize: '0.85rem',
          lineHeight: 1.5
        })
      },
      {
        props: { variant: 'button' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          lineHeight: 1.2
        })
      },
      {
        props: { variant: 'caption' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.secondary,
          fontSize: '0.7rem',
          lineHeight: 1.4
        })
      },
      {
        props: { variant: 'overline' },
        style: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.secondary,
          fontSize: '0.65rem',
          lineHeight: 1.4
        })
      }
    ]
  }
}

export default typography
