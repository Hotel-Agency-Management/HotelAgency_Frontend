import { Text, View } from '@react-pdf/renderer'
import { CustomerInvoicePdfStyles } from '../styles/invoiceStyle'

interface InvoiceDetailItemProps {
  label: string
  value?: string | number
  styles: CustomerInvoicePdfStyles
}

export function InvoiceDetailItem({ label, value, styles }: InvoiceDetailItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  )
}
