import { formatPaymentDateTime } from './dateFormat'
import type { PaymentLogsGroup, PaymentLogExcelRow } from '../config/paymentLogsConfig'

export function toExcelRows(
  groups: PaymentLogsGroup[],
  direction: string
): PaymentLogExcelRow[] {
  return groups.flatMap((group) =>
    group.items.map((item) => ({
      direction,
      paymentType: item.paymentType,
      fromName: item.fromName,
      toName: item.toName,
      amount: item.amount,
      reservationReference: item.reservationReference,
      createdAt: formatPaymentDateTime(item.createdAt),
    }))
  )
}
