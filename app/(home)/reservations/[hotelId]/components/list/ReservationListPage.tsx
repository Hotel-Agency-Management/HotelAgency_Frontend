'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Container, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import themeConfig from '@/core/configs/themeConfig'
import SearchInput from '@/components/common/SearchInput'
import { CancelReservationDialog } from '@/app/(home)/hotels/[hotelId]/components/CancelReservationDialog'
import { EditReservationDialog } from '@/app/(home)/hotels/[hotelId]/components/EditReservationDialog'
import { ExtendReservationDialog } from '@/app/(home)/hotels/[hotelId]/components/ExtendReservationDialog'
import { getReservationListColumns } from '../columns/columnRegistry'
import { useReservationListPage } from '../../hooks/useReservationListPage'
import { RESERVATION_STATUSES } from '../../constants/status'
import { RESERVATION_LIST_PAGE_SIZE_OPTIONS } from '../../constants/pagination'

export function ReservationListPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    hotelId,
    reservations,
    isLoading,
    totalCount,
    paginationModel,
    setPaginationModel,
    search,
    handleSearch,
    status,
    handleStatusChange,
    extendingReservation,
    extendCheckOut,
    setExtendCheckOut,
    extendPrice,
    isLoadingExtendPrice,
    extendHasValidRange,
    handleOpenExtend,
    handleCloseExtend,
    handleConfirmExtend,
    updatingReservation,
    editForm,
    editFormHasValidRange,
    handleEditFieldChange,
    handleOpenUpdate,
    handleCloseUpdate,
    handleConfirmUpdate,
    isLoadingUpdateDetails,
    cancellingReservation,
    handleOpenCancel,
    handleCloseCancel,
    handleConfirmCancel,
    isUpdating,
    isCancelling,
    handleUpdateStatus,
    statusUpdatingId
  } = useReservationListPage()

  const columns = useMemo(
    () =>
      getReservationListColumns({
        t,
        onExtend: handleOpenExtend,
        onUpdate: handleOpenUpdate,
        onCancel: handleOpenCancel,
        onUpdateStatus: handleUpdateStatus,
        statusUpdatingId
      }),
    [t, handleOpenExtend, handleOpenUpdate, handleOpenCancel, handleUpdateStatus, statusUpdatingId]
  )

  const editStayLength = useMemo(() => {
    if (!editForm.checkIn || !editForm.checkOut) return 0
    const diff = new Date(editForm.checkOut).getTime() - new Date(editForm.checkIn).getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }, [editForm.checkIn, editForm.checkOut])

  const roomOptions = useMemo(
    () =>
      (updatingReservation?.roomNumbers ?? []).map(r => ({
        id: r,
        label: `Room ${r}`,
        capacity: 999,
        nightlyRate: 0,
        extendPrice: 0,
        disabled: false
      })),
    [updatingReservation]
  )

  return (
    <Container maxWidth='xl'>
      <Stack gap={themeConfig.common.commonSpacing}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent='space-between'
          gap={2}
        >
          <Stack gap={0.75}>
            <Typography variant='h5' fontWeight={700}>
              {t('reservations.title', { defaultValue: 'Reservations' })}
            </Typography>
          </Stack>

          <Button
            variant='contained'
            disableElevation
            startIcon={<Plus size={16} />}
            onClick={() => router.push(`/reservations/${hotelId}/create`)}
          >
            {t('reservations.create', { defaultValue: 'Create Reservation' })}
          </Button>
        </Stack>

        <Paper variant='card'>
          <Stack gap={themeConfig.common.commonSpacing}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'stretch', md: 'center' }}
              justifyContent='space-between'
              gap={2}
            >
              <Stack gap={0.5}>
                <Typography variant='subtitle1' fontWeight={700}>
                  {t('reservations.allReservations', { defaultValue: 'All Reservations' })}
                </Typography>
                <Typography variant='body2'>
                  {t('reservations.viewManage', { defaultValue: 'View and manage guest reservations.' })}
                </Typography>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5}>
                <SearchInput
                  value={search}
                  placeholder={t('reservations.search', { defaultValue: 'Search by guest name…' })}
                  onChange={handleSearch}
                />
                <TextField
                  select
                  size='small'
                  value={status}
                  onChange={e => handleStatusChange(e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value=''>
                    {t('reservations.filters.allStatuses', { defaultValue: 'All Statuses' })}
                  </MenuItem>
                  {RESERVATION_STATUSES.map(s => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Stack>

            <DataGrid
              autoHeight
              rows={reservations}
              columns={columns}
              loading={isLoading}
              paginationMode='server'
              rowCount={totalCount}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowClick={({ row }) => router.push(`/reservations/${hotelId}/${row.id}`)}
              pageSizeOptions={RESERVATION_LIST_PAGE_SIZE_OPTIONS}
              disableRowSelectionOnClick
              rowHeight={64}
            />
          </Stack>
        </Paper>

        <ExtendReservationDialog
          open={!!extendingReservation}
          currentCheckOut={extendingReservation?.checkOutDate ?? ''}
          extendPrice={extendPrice}
          language='en'
          currency='USD'
          extendCheckOut={extendCheckOut}
          extendHasValidRange={extendHasValidRange}
          extendConflict={null}
          isBusy={isUpdating || isLoadingExtendPrice}
          onClose={handleCloseExtend}
          onConfirm={handleConfirmExtend}
          onCheckOutChange={setExtendCheckOut}
        />

        <EditReservationDialog
          open={!!updatingReservation}
          canModify
          roomCapacity={999}
          isBusy={isUpdating}
          currency='USD'
          language='en'
          nightlyRate={0}
          roomOptions={roomOptions}
          editForm={editForm}
          editFormHasValidRange={editFormHasValidRange}
          editStayLength={editStayLength}
          editConflict={null}
          isLoadingDetails={isLoadingUpdateDetails}
          showDirectReservationFields
          onClose={handleCloseUpdate}
          onSave={handleConfirmUpdate}
          onFieldChange={handleEditFieldChange}
        />

        <CancelReservationDialog
          open={!!cancellingReservation}
          freeCancellation
          freeCancellationDeadlineLabel='—'
          reservationTotalLabel={`$${Number(cancellingReservation?.totalAmount ?? 0).toLocaleString()}`}
          cancellationFeeRateLabel='0%'
          cancellationFeeLabel='$0'
          refundAmountLabel={`$${Number(cancellingReservation?.totalAmount ?? 0).toLocaleString()}`}
          isBusy={isCancelling}
          onClose={handleCloseCancel}
          onConfirm={handleConfirmCancel}
        />
      </Stack>
    </Container>
  )
}
