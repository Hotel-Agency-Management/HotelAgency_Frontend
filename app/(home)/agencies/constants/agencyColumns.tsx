import { fromNow } from '@/core/utils/Dateutils'
import { Stack, Avatar, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { TFunction } from 'i18next'
import AgencyActionsCell from '../components/AgencyActionsCell'
import { Agency } from '../types/agency'

export const columns = (onSettingsClick: (agencyId: number) => void, t: TFunction): GridColDef<Agency>[] => [
  {
    field: 'name',
    headerName: t('agencies.table.agency', { defaultValue: 'Agency' }),
    flex: 1.5,
    minWidth: 200,
    renderCell: ({ row }) => (
      <Stack direction='row' alignItems='center' gap={1.5} sx={{ height: '100%' }}>
        <Avatar src={row.logoUrl ?? undefined} alt={row.name} sx={{ width: 32, height: 32 }}>
          {row.name[0].toUpperCase()}
        </Avatar>
        <Stack>
          <Typography variant='body2' fontWeight={600}>
            {row.name}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {row.email}
          </Typography>
        </Stack>
      </Stack>
    )
  },
  {
    field: 'phone',
    headerName: t('agencies.table.phone', { defaultValue: 'Phone' }),
    flex: 1,
    minWidth: 140
  },
  {
    field: 'country',
    headerName: t('agencies.table.location', { defaultValue: 'Location' }),
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => (
      <Typography variant='body2'>
        {row.city}, {row.country}
      </Typography>
    )
  },
  {
    field: 'createdAt',
    headerName: t('agencies.table.created', { defaultValue: 'Created' }),
    flex: 1,
    minWidth: 120,
    renderCell: ({ row }) => <Typography variant='body2'>{fromNow(row.createdAt)}</Typography>
  },
  {
    field: 'actions',
    headerName: '',
    sortable: false,
    width: 60,
    renderCell: ({ row }) => <AgencyActionsCell agencyId={row.id} onSettingsClick={onSettingsClick} />
  }
]
