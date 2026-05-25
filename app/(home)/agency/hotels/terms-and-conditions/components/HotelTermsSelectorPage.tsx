'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Icon from '@/components/icon/Icon'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import Can from '@/components/ability/Can'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import { USER_ROLES } from '@/lib/abilities'
import { useGetHotels } from '../../hooks/queries/useHotelQueries'
import { getHotelTermsRoute } from '../utils/routes'
import { getFeatureCards } from '../constants/selectorPage'

export function HotelTermsSelectorPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { t } = useTranslation()
  const featureCards = getFeatureCards(t)
  const { data: hotelData, isLoading, error } = useGetHotels()
  const hotels = hotelData?.items ?? []
  const [selectedHotelId, setSelectedHotelId] = useState('')
  const assignedHotelId = typeof user?.hotelId === 'string' && user.hotelId.length > 0 ? user.hotelId : null
  const shouldRedirectToAssignedHotel = user?.role === USER_ROLES.PROPERTY_MANAGER && assignedHotelId != null

  useEffect(() => {
    if (shouldRedirectToAssignedHotel && assignedHotelId) {
      router.replace(getHotelTermsRoute(assignedHotelId))
    }
  }, [assignedHotelId, router, shouldRedirectToAssignedHotel])

  const selectionDisabled = useMemo(() => isLoading || hotels.length === 0, [hotels.length, isLoading])

  if (shouldRedirectToAssignedHotel) {
    return (
      <Container maxWidth='lg'>
        <Paper variant='card'>
          <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Avatar variant='soft' color='primary' sx={{ width: 48, height: 48 }}>
                <Icon icon='tabler:license' fontSize={24} />
              </Avatar>
              <Stack spacing={0.5}>
                <Typography variant='h6' fontWeight={700}>
                  {t('terms.title', { defaultValue: 'Terms & Conditions' })}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {t('terms.redirecting', { defaultValue: 'Redirecting to your assigned hotel.' })}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Alert severity='info'>
              {t('terms.redirecting', { defaultValue: 'Redirecting to your assigned hotel.' })}
            </Alert>
          </Stack>
        </Paper>
      </Container>
    )
  }

  return (
    <>
      <Can do='manage' this='HotelTerms'>
        <Container maxWidth='lg'>
          <Stack spacing={3}>
            <Typography variant='h5' fontWeight={700}>
              {t('terms.policiesTitle', { defaultValue: 'Hotel Policies & Agreements' })}
            </Typography>
            <Paper variant='card'>
              <Stack spacing={3}>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Avatar variant='soft' color='primary' sx={{ width: 48, height: 48 }}>
                    <Icon icon='tabler:license' fontSize={24} />
                  </Avatar>
                  <Stack spacing={0.5}>
                    <Typography variant='h6' fontWeight={700}>
                      {t('terms.title', { defaultValue: 'Terms & Conditions' })}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {t('terms.selectHotelHint', {
                        defaultValue: 'Select a hotel to manage its Terms & Conditions settings.'
                      })}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider />

                {error ? (
                  <Alert severity='error'>
                    {t('terms.loadError', { defaultValue: 'Failed to load hotels for this agency.' })}
                  </Alert>
                ) : null}

                {!error && !isLoading && hotels.length === 0 ? (
                  <Alert severity='info'>
                    {t('terms.noHotels', {
                      defaultValue: 'No hotels are available yet. Add a hotel first to manage its Terms & Conditions.'
                    })}
                  </Alert>
                ) : null}

                <FormControl fullWidth disabled={selectionDisabled}>
                  <Select
                    value={selectedHotelId}
                    displayEmpty
                    onChange={event => setSelectedHotelId(event.target.value)}
                    renderValue={selected =>
                      selected
                        ? (hotels.find(h => h.id === selected)?.basicInfo.name ?? '')
                        : t('terms.selectHotel', { defaultValue: 'Select a hotel' })
                    }
                  >
                    {hotels.map(hotel => (
                      <MenuItem key={hotel.id} value={hotel.id}>
                        {hotel.basicInfo.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {t('terms.agencyOwnerHint', {
                      defaultValue: 'Agency owners can manage Terms & Conditions for any hotel under the agency.'
                    })}
                  </FormHelperText>
                </FormControl>

                <Stack direction='row' justifyContent='flex-end'>
                  <Button
                    variant='contained'
                    size='small'
                    disabled={!selectedHotelId || selectionDisabled}
                    onClick={() => router.push(getHotelTermsRoute(selectedHotelId))}
                    startIcon={isLoading ? <CircularProgress size={16} color='inherit' /> : null}
                    endIcon={!isLoading ? <DirectionalIcon icon='tabler:arrow-right' fontSize={16} /> : null}
                  >
                    {t('terms.openSettings', { defaultValue: 'Open settings' })}
                  </Button>
                </Stack>
              </Stack>
            </Paper>

            <Stack spacing={0.5}>
              <Typography variant='subtitle1' fontWeight={700}>
                {t('terms.whyItMatters', { defaultValue: 'Why it matters' })}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {t('terms.whyItMattersDesc', {
                  defaultValue: 'Clear terms and policies help protect your hotels and set guest expectations.'
                })}
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {featureCards.map(card => (
                <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper variant='card'>
                    <Stack spacing={2}>
                      <Avatar variant='soft' color={card.color} sx={{ width: 40, height: 40 }}>
                        <Icon icon={card.icon} fontSize={20} />
                      </Avatar>
                      <Stack spacing={0.5}>
                        <Typography variant='subtitle1' fontWeight={700}>
                          {card.title}
                        </Typography>
                        <Typography variant='body2'>{card.description}</Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Can>

      <Can do='manage' this='HotelTerms' not>
        <Container maxWidth='sm'>
          <Paper variant='card'>
            <Stack spacing={2}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Avatar variant='soft' color='error' sx={{ width: 48, height: 48 }}>
                  <Icon icon='tabler:lock' fontSize={24} />
                </Avatar>
                <Stack spacing={0.5}>
                  <Typography variant='h6' fontWeight={700}>
                    {t('terms.accessRestricted', { defaultValue: 'Access Restricted' })}
                  </Typography>
                  <Typography variant='body2'>
                    {t('terms.noPermission', {
                      defaultValue: 'You do not have permission to manage hotel Terms & Conditions.'
                    })}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Can>
    </>
  )
}
