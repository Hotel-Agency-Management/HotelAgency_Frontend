import { Grid, Divider, Stack, Typography, useTheme } from '@mui/material'
import { SpotlightCard } from '@/components/animation'

interface DetailItem {
  label: string
  value: string
  icon: React.ReactNode
}

interface ProfileDetailsCardProps {
  title: string
  items: DetailItem[]
  children?: React.ReactNode
}

export function ProfileDetailsCard({ title, items, children }: ProfileDetailsCardProps) {
  const theme = useTheme()

  return (
    <SpotlightCard
      spotlightSize={240}
      style={{
        height: '100%',
        borderRadius: Number(theme.shape.borderRadius) * 2,
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
      }}
    >
      <Stack spacing={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='h6' fontWeight={700}>
          {title}
        </Typography>

        <Divider />

        <Grid container spacing={2.5}>
          {items.map((item) => (
            <Grid key={`${title}-${item.label}`} size={{ xs: 12, md: 6 }}>
              <Stack direction='row' spacing={1.25} alignItems='flex-start'>
                <Stack
                  sx={{
                    color: theme.palette.primary.main,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Stack>

                <Stack spacing={0.35}>
                  <Typography variant='caption'>
                    {item.label}
                  </Typography>

                  <Typography variant='body1' fontWeight={500}>
                    {item.value || '—'}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>

        {children ? (
          <>
            <Divider />
            {children}
          </>
        ) : null}
      </Stack>
    </SpotlightCard>
  )
}
