'use client'
import { DataGrid, type GridRowParams } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { Agency } from '../types/agency'
import FadeIn from '@/components/animation/FadeIn'
import { columns } from '../constants/agencyColumns'

interface Props {
  agencies: Agency[]
  onAgencyClick: (agencyId: number) => void
  onSettingsClick: (agencyId: number) => void
}

export default function AgencyListView({ agencies, onAgencyClick, onSettingsClick }: Props) {
  const { t } = useTranslation()
  return (
    <FadeIn direction='up' distance={16}>
      <DataGrid
        rows={agencies}
        columns={columns(onSettingsClick, t)}
        onRowClick={({ row }: GridRowParams<Agency>) => onAgencyClick(row.id)}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }
        }}
        disableRowSelectionOnClick
        sx={{ cursor: 'pointer' }}
      />
    </FadeIn>
  )
}
