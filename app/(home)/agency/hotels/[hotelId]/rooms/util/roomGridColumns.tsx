import { GridColDef } from '@mui/x-data-grid'
import { RoomStatusChip } from '../components/room/list/RoomStatusChip'
import { RoomQuickActions } from '../components/room/list/RoomQuickActions'
import type { TFunction } from 'i18next'

export const getRoomGridColumns = (
  t: TFunction,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void
): GridColDef[] => {
  return [
    {
      field: 'roomNumber',
      headerName: t('hotelRooms.grid.roomNumber', { defaultValue: 'Room #' }),
      flex: 0.8,
      minWidth: 80
    },
    {
      field: 'capacity',
      headerName: t('hotelRooms.grid.capacity', { defaultValue: 'Capacity' }),
      flex: 0.6,
      minWidth: 70
    },
    {
      field: 'roomType',
      headerName: t('hotelRooms.grid.type', { defaultValue: 'Type' }),
      flex: 1,
      minWidth: 120
    },
    {
      field: 'status',
      headerName: t('hotelRooms.grid.status', { defaultValue: 'Status' }),
      flex: 1.2,
      minWidth: 120,
      renderCell: params => <RoomStatusChip status={params.value} />
    },
    {
      field: 'actions',
      headerName: t('hotelRooms.grid.actions', { defaultValue: 'Actions' }),
      flex: 0.8,
      minWidth: 90,
      sortable: false,
      renderCell: params => <RoomQuickActions id={Number(params.row.roomId)} onEdit={onEdit} onDelete={onDelete} />
    }
  ]
}
