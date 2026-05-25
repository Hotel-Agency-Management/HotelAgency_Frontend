import { Divider, Stack, Typography } from '@mui/material'
import { User, CalendarDays, BedDouble, DollarSign } from 'lucide-react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { DocumentStatusRow } from './DocumentStatusRow'
import { FormSection } from './FormSection'
import { SummaryRow } from './SummaryRow'

interface ReservationConfirmationSectionProps {
  guestFullName: string
  checkInDate: string
  checkOutDate: string
  roomNumbers: string[]
  totalAmount: number
  hasContract: boolean
  hasInvoice: boolean
}

export function ReservationConfirmationSection({
  guestFullName,
  checkInDate,
  checkOutDate,
  roomNumbers,
  totalAmount,
  hasContract,
  hasInvoice
}: ReservationConfirmationSectionProps) {
  const { t } = useTranslation()
  const nights = Math.max(0, dayjs(checkOutDate).diff(dayjs(checkInDate), 'day'))
  const stayValue =
    checkInDate && checkOutDate
      ? `${dayjs(checkInDate).format('D MMM')} – ${dayjs(checkOutDate).format('D MMM YYYY')} · ${t('reservations.form.confirm.nightCount', { count: nights })}`
      : '—'

  return (
    <FormSection
      title={t('reservations.form.confirm.title', { defaultValue: 'Confirm Reservation' })}
      description={t('reservations.form.confirm.description', {
        defaultValue: 'Review the details below, then click "Create Reservation" to complete.'
      })}
    >
      <Stack spacing={3}>
        <Stack spacing={1.5}>
          <Typography variant='subtitle2' fontWeight={800}>
            {t('reservations.form.confirm.summary', { defaultValue: 'Reservation Summary' })}
          </Typography>
          <Stack spacing={1.5}>
            <SummaryRow
              icon={User}
              label={t('reservations.form.confirm.guest', { defaultValue: 'Guest' })}
              value={guestFullName}
            />
            <SummaryRow
              icon={CalendarDays}
              label={t('reservations.form.confirm.stay', { defaultValue: 'Stay' })}
              value={stayValue}
            />
            <SummaryRow
              icon={BedDouble}
              label={t('reservations.form.confirm.rooms', { defaultValue: 'Rooms' })}
              value={roomNumbers.length > 0 ? roomNumbers.join(', ') : '—'}
            />
            <SummaryRow
              icon={DollarSign}
              label={t('reservations.form.confirm.total', { defaultValue: 'Total' })}
              value={`$${totalAmount.toFixed(2)}`}
            />
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={1.5}>
          <Typography variant='subtitle2' fontWeight={700}>
            {t('reservations.form.confirm.generatedDocuments', { defaultValue: 'Generated Documents' })}
          </Typography>
          <DocumentStatusRow
            label={t('reservations.form.confirm.contract', { defaultValue: 'Reservation Contract (PDF)' })}
            ready={hasContract}
          />
          <DocumentStatusRow
            label={t('reservations.form.confirm.invoice', { defaultValue: 'Invoice (PDF)' })}
            ready={hasInvoice}
          />
        </Stack>
      </Stack>
    </FormSection>
  )
}
