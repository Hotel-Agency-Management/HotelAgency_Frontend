import { PaymentDirection } from "../types/payment"

type PaletteColor = 'success' | 'error' | 'info' | 'primary' | 'warning' | 'secondary'

export interface PaymentDirectionConfig {
  label: string
  icon: string
  color: PaletteColor
}

export const PAYMENT_DIRECTION_CONFIG: Record<PaymentDirection, PaymentDirectionConfig> = {
  Incoming: {
    label: 'Incoming',
    icon: 'lucide:arrow-down-circle',
    color: 'success',
  },
  Outgoing: {
    label: 'Outgoing',
    icon: 'lucide:arrow-up-circle',
    color: 'error',
  },
}

export const DEFAULT_PAYMENT_DIRECTION_CONFIG: PaymentDirectionConfig = {
  label: 'Unknown',
  icon: 'lucide:circle-help',
  color: 'secondary',
}
