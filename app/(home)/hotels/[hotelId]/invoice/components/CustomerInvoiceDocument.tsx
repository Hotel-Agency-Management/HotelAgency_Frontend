import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import type { CustomerInvoiceDocumentProps } from '../types/customerInvoice'
import { formatInvoiceCurrency, formatInvoiceDate } from '../utils/invoiceFormatters'
import { InvoiceDetailItem } from './InvoiceDetailItem'
import { createCustomerInvoiceTheme } from './theme'
import { TotalRow } from './TotalRow'
import { createCustomerInvoiceStyles } from '../styles/invoiceStyle'

export function CustomerInvoiceDocument({ invoice }: CustomerInvoiceDocumentProps) {
  const invoiceTheme = createCustomerInvoiceTheme({
    primaryColor: invoice.hotelPrimaryColor,
    secondaryColor: invoice.hotelSecondaryColor,
  })
  const styles = createCustomerInvoiceStyles(invoiceTheme)
  const currency = invoice.currency
  const hotelInitials = invoice.hotelName
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Document
      title={`${invoice.invoiceNumber} Invoice`}
      author={invoice.hotelName}
      subject="Hotel reservation invoice"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.brandBlock}>
              <View style={styles.logoFrame}>
                {invoice.hotelLogo ? (
                  <Image src={invoice.hotelLogo} style={styles.logo} />
                ) : (
                  <View style={styles.logoFallback}>
                    <Text>{hotelInitials || 'H'}</Text>
                  </View>
                )}
              </View>
              <View>
                <Text style={styles.eyebrow}>Hotel Invoice</Text>
                <Text style={styles.title}>Invoice</Text>
                <Text style={styles.subtitle}>{invoice.hotelName}</Text>
              </View>
            </View>

            <View style={styles.metaBox}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Invoice No.</Text>
                <Text style={styles.metaValue}>{invoice.invoiceNumber}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Reservation</Text>
                <Text style={styles.metaValue}>{invoice.reservationId}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Issued</Text>
                <Text style={styles.metaValue}>{formatInvoiceDate(invoice.invoiceDate)}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Status</Text>
                <Text style={styles.metaValue}>{invoice.invoiceStatus.toUpperCase()}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer</Text>
            <View style={styles.grid}>
              <InvoiceDetailItem label="Name" value={invoice.customerName} styles={styles} />
              <InvoiceDetailItem label="Email" value={invoice.customerEmail} styles={styles} />
              <InvoiceDetailItem label="Payment" value={invoice.paymentMethod} styles={styles} />
              <InvoiceDetailItem label="Booking Source" value={invoice.bookingSource} styles={styles} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reservation Details</Text>
            <View style={styles.grid}>
              <InvoiceDetailItem label="Hotel" value={invoice.hotelName} styles={styles} />
              <InvoiceDetailItem label="Room" value={invoice.roomName} styles={styles} />
              <InvoiceDetailItem label="Room Type" value={invoice.roomType} styles={styles} />
              <InvoiceDetailItem
                label="Check-in"
                value={formatInvoiceDate(invoice.checkInDate)}
                styles={styles}
              />
              <InvoiceDetailItem
                label="Check-out"
                value={formatInvoiceDate(invoice.checkOutDate)}
                styles={styles}
              />
              <InvoiceDetailItem label="Nights" value={invoice.nights} styles={styles} />
              <InvoiceDetailItem label="Rooms" value={invoice.numberOfRooms} styles={styles} />
              <InvoiceDetailItem
                label="Price Per Night"
                value={formatInvoiceCurrency(invoice.pricePerNight, currency)}
                styles={styles}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Totals</Text>
            <View style={styles.totals}>
              <TotalRow
                label="Subtotal"
                value={formatInvoiceCurrency(invoice.subtotal, currency)}
                styles={styles}
              />
              <TotalRow
                label="Taxes"
                value={formatInvoiceCurrency(invoice.taxes, currency)}
                styles={styles}
              />
              <TotalRow
                label="Discount"
                value={formatInvoiceCurrency(invoice.discount, currency)}
                styles={styles}
              />
              <TotalRow
                label="Total Amount"
                value={formatInvoiceCurrency(invoice.totalAmount, currency)}
                styles={styles}
                emphasis
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>{invoice.hotelName} invoice</Text>
          <Text>Generated by Hotel Agency</Text>
        </View>
      </Page>
    </Document>
  )
}
