import { Divider, Stack, Typography } from '@mui/material'
import { User, CalendarDays, BedDouble, DollarSign } from 'lucide-react'
import dayjs from 'dayjs'
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
  hasInvoice,
}: ReservationConfirmationSectionProps) {
  const nights = Math.max(0, dayjs(checkOutDate).diff(dayjs(checkInDate), 'day'))
  const stayValue =
    checkInDate && checkOutDate
      ? `${dayjs(checkInDate).format('D MMM')} – ${dayjs(checkOutDate).format('D MMM YYYY')} · ${nights} night${nights !== 1 ? 's' : ''}`
      : '—'

  return (
    <FormSection
      title='Confirm Reservation'
      description='Review the details below, then click "Create Reservation" to complete.'
    >
      <Stack spacing={3}>
        <Stack spacing={1.5}>
          <Typography variant='subtitle2' fontWeight={800}>
            Reservation Summary
          </Typography>
          <Stack spacing={1.5}>
            <SummaryRow icon={User} label='Guest' value={guestFullName} />
            <SummaryRow icon={CalendarDays} label='Stay' value={stayValue} />
            <SummaryRow
              icon={BedDouble}
              label='Rooms'
              value={roomNumbers.length > 0 ? roomNumbers.join(', ') : '—'}
            />
            <SummaryRow
              icon={DollarSign}
              label='Total'
              value={`$${totalAmount.toFixed(2)}`}
            />
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={1.5}>
          <Typography variant='subtitle2' fontWeight={700}>
            Generated Documents
          </Typography>
          <DocumentStatusRow label='Reservation Contract (PDF)' ready={hasContract} />
          <DocumentStatusRow label='Invoice (PDF)' ready={hasInvoice} />
        </Stack>
      </Stack>
    </FormSection>
  )
}
