import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { type GridColDef } from '@mui/x-data-grid'
import { Pencil, UserPen } from 'lucide-react'
import { TFunction } from 'i18next'
import type { Hotel } from '@/app/(home)/agency/hotels/types/hotel'
import {
  getAgencyTeamMemberInitials,
  getAgencyTeamMemberName,
  getRoleLabel,
  type AgencyTeamMember
} from '../config/teamMemberConfig'
import { MemberAvatar, RoleChip, HotelManagerChip } from './teamMemberGridColumnStyles'

interface TeamMemberGridColumnsOptions {
  onEditRole: (member: AgencyTeamMember) => void
  onEditMember: (member: AgencyTeamMember) => void
  hotels: Hotel[]
  t: TFunction
}

export const getTeamMemberGridColumns = ({
  onEditRole,
  onEditMember,
  hotels,
  t
}: TeamMemberGridColumnsOptions): GridColDef<AgencyTeamMember>[] => [
  {
    field: 'name',
    headerName: t('users.table.member', { defaultValue: 'Team member' }),
    flex: 1.2,
    minWidth: 240,
    sortable: false,
    renderCell: ({ row }) => (
      <Stack direction='row' spacing={1.5} alignItems='center' sx={{ minWidth: 0 }}>
        <MemberAvatar>{getAgencyTeamMemberInitials(row)}</MemberAvatar>
        <Stack minWidth={0}>
          <Typography variant='body2' fontWeight={600} noWrap>
            {getAgencyTeamMemberName(row)}
          </Typography>
          <Typography variant='caption' color='text.secondary' noWrap>
            {row.email}
          </Typography>
        </Stack>
      </Stack>
    )
  },
  {
    field: 'phoneNumber',
    headerName: t('users.table.phone', { defaultValue: 'Phone' }),
    flex: 0.9,
    minWidth: 160,
    renderCell: ({ value }) => (
      <Typography variant='body2' dir='ltr' sx={{ unicodeBidi: 'isolate', width: '100%' }}>
        {value}
      </Typography>
    )
  },
  {
    field: 'role',
    headerName: t('users.table.role', { defaultValue: 'Role' }),
    flex: 0.7,
    minWidth: 140,
    renderCell: ({ row }) => <RoleChip size='small' label={getRoleLabel(row.role)} />
  },
  {
    field: 'hotelId',
    headerName: t('users.table.hotel', { defaultValue: 'Hotel' }),
    flex: 0.9,
    minWidth: 160,
    sortable: false,
    renderCell: ({ row }) => {
      const hotel = hotels.find(h => Number(h.id) === row.hotelId)
      return (
        <Typography variant='body2' color={hotel ? 'text.primary' : 'text.secondary'} noWrap>
          {hotel ? hotel.basicInfo.name : t('users.table.noHotel', { defaultValue: 'Unassigned' })}
        </Typography>
      )
    }
  },
  {
    field: 'hotelManager',
    headerName: t('users.table.hotelManager', { defaultValue: 'Hotel manager' }),
    flex: 0.8,
    minWidth: 150,
    sortable: false,
    renderCell: ({ row }) =>
      row.canBeHotelManager ? (
        <HotelManagerChip
          size='small'
          label={t('users.table.available', { defaultValue: 'Available' })}
          variant='outlined'
        />
      ) : (
        <Typography variant='caption' color='text.secondary'>
          {t('users.table.notEligible', { defaultValue: 'Not eligible' })}
        </Typography>
      )
  },
  {
    field: 'actions',
    headerName: t('users.table.actions', { defaultValue: 'Actions' }),
    width: 120,
    sortable: false,
    filterable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => (
      <Stack direction='row' spacing={0.5} alignItems='center' justifyContent='center'>
        <Tooltip title={t('users.table.editMember', { defaultValue: 'Edit details' })}>
          <IconButton
            size='small'
            aria-label={t('users.table.editMemberFor', {
              defaultValue: 'Edit details for {{name}}',
              name: getAgencyTeamMemberName(row)
            })}
            onClick={() => onEditMember(row)}
          >
            <UserPen size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('users.table.assignRole', { defaultValue: 'Assign role' })}>
          <IconButton
            size='small'
            aria-label={t('users.table.assignRoleFor', {
              defaultValue: 'Assign role for {{name}}',
              name: getAgencyTeamMemberName(row)
            })}
            onClick={() => onEditRole(row)}
          >
            <Pencil size={16} />
          </IconButton>
        </Tooltip>
      </Stack>
    )
  }
]
