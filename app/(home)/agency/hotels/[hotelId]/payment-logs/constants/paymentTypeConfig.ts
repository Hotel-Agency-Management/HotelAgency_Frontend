import type { PaymentType } from '../config/paymentLogsConfig'

type PaletteColor = 'success' | 'error' | 'info' | 'primary' | 'warning' | 'secondary'

export interface PaymentTypeConfig {
  label: string
  icon: string
  color: PaletteColor
}

export const PAYMENT_TYPE_CONFIG: Record<PaymentType, PaymentTypeConfig> = {
  Booking: {
    label: 'Booking',
    icon: 'lucide:calendar-check',
    color: 'success',
  },
  Cancellation: {
    label: 'Cancellation',
    icon: 'lucide:calendar-x',
    color: 'error',
  },
  ReservationInsurance: {
    label: 'Reservation Insurance',
    icon: 'lucide:shield-check',
    color: 'info',
  },
  YearlyInsurance: {
    label: 'Yearly Insurance',
    icon: 'lucide:shield',
    color: 'primary',
  },
  Extend: {
    label: 'Extension',
    icon: 'lucide:calendar-plus',
    color: 'warning',
  },
  Damage: {
    label: 'Damage',
    icon: 'lucide:alert-triangle',
    color: 'error',
  },
  Refund: {
    label: 'Refund',
    icon: 'lucide:corner-up-left',
    color: 'warning',
  },
}
