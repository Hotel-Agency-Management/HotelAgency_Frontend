import { keyColumn, textColumn, floatColumn } from 'react-datasheet-grid'
import type { Column } from 'react-datasheet-grid'
import type { TFunction } from 'i18next'
import type { PaymentLogExcelRow } from '../config/paymentLogsConfig'

export function getExcelColumns(t: TFunction): Column<PaymentLogExcelRow>[] {
  return [
    {
      ...keyColumn<PaymentLogExcelRow, 'transactionType'>('transactionType', textColumn),
      title: t('hotelPaymentLogs.excel.direction', 'Direction'),
      disabled: true,
      minWidth: 110,
    },
    {
      ...keyColumn<PaymentLogExcelRow, 'paymentType'>('paymentType', textColumn),
      title: t('hotelPaymentLogs.excel.paymentType', 'Payment Type'),
      minWidth: 160,
    },
    {
      ...keyColumn<PaymentLogExcelRow, 'fromName'>('fromName', textColumn),
      title: t('hotelPaymentLogs.excel.from', 'From'),
      minWidth: 140,
    },
    {
      ...keyColumn<PaymentLogExcelRow, 'toName'>('toName', textColumn),
      title: t('hotelPaymentLogs.excel.to', 'To'),
      minWidth: 140,
    },
    {
      ...keyColumn<PaymentLogExcelRow, 'amount'>('amount', floatColumn),
      title: t('hotelPaymentLogs.excel.amount', 'Amount'),
      minWidth: 110,
    },
    {
      ...keyColumn<PaymentLogExcelRow, 'reservationReference'>('reservationReference', textColumn),
      title: t('hotelPaymentLogs.excel.reference', 'Reference'),
      minWidth: 130,
    },
    {
      ...keyColumn<PaymentLogExcelRow, 'createdAt'>('createdAt', textColumn),
      title: t('hotelPaymentLogs.excel.date', 'Date'),
      minWidth: 180,
    },
  ]
}
