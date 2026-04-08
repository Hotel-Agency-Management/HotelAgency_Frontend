'use client'

import { Alert, Avatar, Chip, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import VerifyEmailActions from './components/VerifyEmailActions'
import { useVerifyEmailViewModel } from './hooks/useVerifyEmailViewModel'
import type { VerifyEmailViewProps } from './types'

export default function VerifyEmailView({ userId, token }: VerifyEmailViewProps) {
  const { email, viewModel } = useVerifyEmailViewModel({ userId, token })

  return (
    <Container maxWidth='sm'>
      <Stack minHeight='100vh' justifyContent='center'>
        <Paper
          variant='outlined'
          sx={theme => ({
            bgcolor: 'background.paper',
            borderColor: theme.palette.divider,
            boxShadow: theme.shadows[2]
          })}
        >
          <Stack spacing={3} sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={1}>
              <Typography variant='h4' color='text.primary' fontWeight={700}>
                HotelAgency
              </Typography>
              <Chip label={viewModel.badge} color={viewModel.tone} variant='outlined' sx={{ alignSelf: 'flex-start' }} />
            </Stack>

            <Stack spacing={2}>
              <Avatar
                variant='rounded'
                sx={theme => ({
                  width: 56,
                  height: 56,
                  color: theme.palette[viewModel.tone].main,
                  bgcolor: alpha(theme.palette[viewModel.tone].main, 0.12)
                })}
              >
                {viewModel.isLoadingIcon ? (
                  <CircularProgress size={24} color='inherit' />
                ) : viewModel.icon ? (
                  <viewModel.icon size={28} />
                ) : null}
              </Avatar>

              <Stack spacing={1}>
                <Typography variant='h4' color='text.primary' fontWeight={700}>
                  {viewModel.title}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {viewModel.description}
                </Typography>
              </Stack>
            </Stack>

            <Alert severity={viewModel.severity}>{viewModel.message}</Alert>

            {email && (
              <Typography variant='body2'>
                Email:{' '}
                <Typography component='span' variant='body2' color='text.primary' fontWeight={600}>
                  {email}
                </Typography>
              </Typography>
            )}

            <VerifyEmailActions actions={viewModel.actions} />

            <Typography variant='body2'>
              If this account was not created by you, you can ignore the message and leave this page.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
