'use client'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import { USER_ROLES } from '@/lib/abilities'
import { useAdminAgencies } from '@/app/(home)/agencies/hooks/queries/useAdminAgencies'
import { useAdminGetHotels } from '@/app/(home)/agency/hotels/hooks/queries/useAdminHotelQueries'
import { useGetHotels } from '@/app/(home)/agency/hotels/hooks/queries/useHotelQueries'
import Icon from '@/components/icon/Icon'

interface DashboardContextBarProps {
  contextNeeds: 'agency' | 'hotel'
  selectedAgencyId?: number
  selectedHotelId?: number
  onAgencyChange: (id: number) => void
  onHotelChange: (id: number) => void
}

export default function DashboardContextBar({
  contextNeeds,
  selectedAgencyId,
  selectedHotelId,
  onAgencyChange,
  onHotelChange,
}: DashboardContextBarProps) {
  const { t } = useTranslation()
  const { user } = useAuth()

  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN
  const isAgencyOwner = user?.role === USER_ROLES.AGENCY_OWNER

  const showAgencySelector = isSuperAdmin
  const showHotelSelector = contextNeeds === 'hotel' && (isSuperAdmin || isAgencyOwner)

  // Agency list — only fetched for SUPER_ADMIN
  const { data: agenciesData } = useAdminAgencies()
  const agencies = agenciesData?.items ?? []

  // Hotel list — SUPER_ADMIN: from selected agency; AGENCY_OWNER: from their own agency
  const adminHotelsQuery = useAdminGetHotels(isSuperAdmin ? selectedAgencyId : undefined)
  const ownerHotelsQuery = useGetHotels(undefined, isAgencyOwner)
  const hotels = isSuperAdmin
    ? (adminHotelsQuery.data?.items ?? [])
    : (ownerHotelsQuery.data?.items ?? [])

  if (!showAgencySelector && !showHotelSelector) return null

  const selectedAgency = agencies.find(a => a.id === selectedAgencyId) ?? null
  const selectedHotel = hotels.find(h => Number(h.id) === selectedHotelId) ?? null
  const hotelDisabled = isSuperAdmin && !selectedAgencyId

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <Icon icon="lucide:eye" fontSize={16} />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {t('dashboard.contextBar.viewingAs', { defaultValue: 'Viewing as:' })}
          </Typography>
        </Stack>

        {showAgencySelector && (
          <Autocomplete
            size="small"
            sx={{ minWidth: 260 }}
            options={agencies}
            getOptionLabel={opt => opt.name}
            value={selectedAgency}
            onChange={(_, val) => {
              if (val) onAgencyChange(val.id)
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={t('dashboard.contextBar.selectAgency', { defaultValue: 'Select Agency' })}
                placeholder={t('dashboard.contextBar.searchAgencies', { defaultValue: 'Search agencies...' })}
              />
            )}
          />
        )}

        {showHotelSelector && (
          <Autocomplete
            size="small"
            sx={{ minWidth: 260 }}
            options={hotels}
            getOptionLabel={opt => opt.basicInfo.name}
            value={selectedHotel}
            disabled={hotelDisabled}
            onChange={(_, val) => {
              if (val) onHotelChange(Number(val.id))
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={t('dashboard.contextBar.selectHotel', { defaultValue: 'Select Hotel' })}
                placeholder={
                  hotelDisabled
                    ? t('dashboard.contextBar.selectAgencyFirst', { defaultValue: 'Select an agency first' })
                    : t('dashboard.contextBar.searchHotels', { defaultValue: 'Search hotels...' })
                }
              />
            )}
          />
        )}
      </Stack>
    </Paper>
  )
}
