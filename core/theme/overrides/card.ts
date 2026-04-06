import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    hotel: true
  }
}

type CardOwnerState = OwnerStateThemeType & {
  ownerState: { variant?: string }
}

const Card = () => {
  return {
    MuiCard: {
      styleOverrides: {
        root: ({ theme, ownerState }: CardOwnerState) => ({
          border: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(
            ['box-shadow', 'border-color', 'transform'],
            {
              duration: theme.transitions.duration.short
            }
          ),
          overflow: 'visible',
          position: 'relative',
          borderRadius: themeConfig.borderRadius,
          '& .card-more-options': {
            marginTop: theme.spacing(-1),
            marginRight: theme.spacing(-3)
          },
          '& .MuiTableContainer-root, & .MuiDataGrid-root, & .MuiDataGrid-columnHeaders': {
            borderRadius: 0,
          },

          ...(ownerState.variant !== 'hotel' && {
            transform: 'translateY(0)',
            transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: theme.shadows[4],
              borderColor: theme.palette.primary.light,
            },
          }),

          ...(ownerState.variant === 'hotel' && {
            borderRadius: Number(theme.shape.borderRadius) * 3,
            border: '0.5px solid',
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
            overflow: 'hidden',
            position: 'relative' as const,
            cursor: 'pointer',
            height: 280,
            transform: 'translateY(0)',
            transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease',

            '& .base-gradient': {
              position: 'absolute' as const,
              inset: 0,
              background:
                theme.palette.mode === 'light'
                  ? 'linear-gradient(to top, rgba(0,0,0,0.45) 40%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.72) 40%, transparent 100%)',
              transition: 'opacity 0.35s ease',
            },

            '& .base-info': {
              position: 'absolute' as const,
              bottom: 0,
              left: 0,
              right: 0,
              padding: theme.spacing(2),
              zIndex: 2,
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            },

            '& .hover-overlay': {
              position: 'absolute' as const,
              inset: 0,
              background:
                theme.palette.mode === 'light'
                  ? 'linear-gradient(to top, rgba(0,0,0,0.82) 55%, rgba(0,0,0,0.35) 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.45) 100%)',
              backdropFilter: theme.palette.mode === 'light' ? 'blur(2px)' : 'none',
              '& *': {
                color: `${theme.palette.common.white} !important`,
              },
              opacity: 0,
              transform: 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column' as const,
              justifyContent: 'flex-end',
              padding: theme.spacing(2),
            },

            '&:hover': {
              transform: 'translateY(-8px) scale(1.01)',
              boxShadow: theme.shadows[8],
              '& .hover-overlay': { opacity: 1, transform: 'translateY(0)' },
              '& .base-info': { opacity: 0, transform: 'translateY(6px)' },
              '& .base-gradient': { opacity: 0 },
            },
          }),
        }),
      },
      defaultProps: {
        elevation: 0
      }
    },

    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          '& + .MuiCardContent-root, & + .MuiCardActions-root, & + .MuiCollapse-root .MuiCardContent-root': {
            paddingTop: 0
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.875rem',
            color: theme.palette.text.secondary
          }
        }),
        title: {
          lineHeight: 1.6,
          fontWeight: 500,
          fontSize: '1.125rem',
          letterSpacing: '0.15px',
          '@media (min-width: 600px)': {
            fontSize: '1.25rem'
          }
        },
        action: {
          marginTop: 0,
          marginRight: 0
        }
      }
    },

    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
            paddingTop: 0
          },
          '&:last-of-type': {
            paddingBottom: theme.spacing(5)
          }
        })
      }
    },

    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          '& .MuiButton-text': {
            paddingLeft: theme.spacing(2.5),
            paddingRight: theme.spacing(2.5)
          },
          '&.card-action-dense': {
            padding: theme.spacing(0, 2.5, 2.5),
            '.MuiCard-root .MuiCardMedia-root + &': {
              paddingTop: theme.spacing(2.5)
            }
          },
          '.MuiCard-root &:first-of-type': {
            paddingTop: theme.spacing(2.5),
            '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
              paddingTop: 0
            }
          }
        })
      }
    }
  }
}

export default Card
