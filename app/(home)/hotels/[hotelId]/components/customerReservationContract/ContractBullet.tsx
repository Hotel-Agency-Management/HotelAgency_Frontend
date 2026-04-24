import { Text, View } from '@react-pdf/renderer'
import type { ReservationContractPdfStyles } from './styles'

interface ContractBulletProps {
  children: string
  styles: ReservationContractPdfStyles
}

export function ContractBullet({ children, styles }: ContractBulletProps) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bullet}>-</Text>
      <Text style={styles.paragraph}>{children}</Text>
    </View>
  )
}
