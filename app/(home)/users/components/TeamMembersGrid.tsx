'use client'

import { DataGrid } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import type { Hotel } from '@/app/(home)/agency/hotels/types/hotel'
import { getTeamMemberGridColumns } from '../constants/teamMemberGridColumns'
import type { AgencyTeamMember } from '../config/teamMemberConfig'

interface TeamMembersGridProps {
  members: AgencyTeamMember[]
  hotels: Hotel[]
  onEditRole: (member: AgencyTeamMember) => void
  onEditMember: (member: AgencyTeamMember) => void
}

export function TeamMembersGrid({ members, hotels, onEditRole, onEditMember }: TeamMembersGridProps) {
  const { t } = useTranslation()
  const columns = getTeamMemberGridColumns({ onEditRole, onEditMember, hotels, t })

  return (
    <DataGrid
      autoHeight
      rows={members}
      columns={columns}
      disableRowSelectionOnClick
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 }
        }
      }}
      localeText={{
        paginationRowsPerPage: t('users.table.rowsPerPage', { defaultValue: 'Rows per page' }),
        paginationDisplayedRows: ({ from, to, count }) =>
          t('users.table.displayedRows', { defaultValue: '{{from}}-{{to}} of {{count}}', from, to, count })
      }}
      rowHeight={74}
    />
  )
}
