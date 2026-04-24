import { Text, View } from '@react-pdf/renderer'
import type { ReservationContractPdfStyles } from './styles'

interface ContractDetailItemProps {
  label: string
  value?: string | number
  styles: ReservationContractPdfStyles
}

export function ContractDetailItem({ label, value, styles }: ContractDetailItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  )
}
