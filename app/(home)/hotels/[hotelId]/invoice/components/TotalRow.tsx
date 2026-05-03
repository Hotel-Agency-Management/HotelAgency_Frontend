import { Text, View } from '@react-pdf/renderer'
import { createCustomerInvoiceStyles } from '../styles/invoiceStyle'

export const TotalRow = ({
  label,
  value,
  styles,
  emphasis = false,
}: {
  label: string
  value: string
  styles: ReturnType<typeof createCustomerInvoiceStyles>
  emphasis?: boolean
}) => (
  <View style={emphasis ? [styles.totalRow, styles.grandTotal] : styles.totalRow}>
    <Text style={emphasis ? styles.grandTotalLabel : styles.totalLabel}>{label}</Text>
    <Text style={emphasis ? styles.grandTotalValue : styles.totalValue}>{value}</Text>
  </View>
)
