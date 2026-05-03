import { StyleSheet } from '@react-pdf/renderer'
import { CustomerInvoiceTheme } from '../components/theme'

export const createCustomerInvoiceStyles = (theme: CustomerInvoiceTheme) =>
  StyleSheet.create({
    page: {
      padding: 28,
      fontFamily: 'Helvetica',
      fontSize: 8,
      lineHeight: 1.22,
      color: theme.text.primary,
      backgroundColor: theme.background.page,
    },
    content: {
      gap: 9,
      paddingBottom: 36,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingBottom: 12,
      borderBottom: `1 solid ${theme.border.default}`,
    },
    brandBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    logoFrame: {
      width: 42,
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    logo: {
      width: 34,
      height: 34,
      objectFit: 'contain',
    },
    logoFallback: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.brand.primary,
      color: theme.brand.contrast,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
    },
    eyebrow: {
      color: theme.brand.primary,
      fontSize: 7,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: 2,
      fontWeight: 700,
    },
    title: {
      fontFamily: 'Times-Italic',
      fontSize: 36,
      lineHeight: 1,
      color: theme.text.primary,
    },
    subtitle: {
      marginTop: 4,
      color: theme.text.secondary,
      fontSize: 8,
    },
    metaBox: {
      width: 190,
      padding: 10,
      backgroundColor: theme.background.panel,
      border: `1 solid ${theme.border.default}`,
      gap: 5,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    },
    metaLabel: {
      color: theme.text.secondary,
      fontSize: 6.5,
      textTransform: 'uppercase',
    },
    metaValue: {
      color: theme.text.primary,
      fontSize: 7.4,
      fontWeight: 700,
      textAlign: 'right',
    },
    section: {
      marginTop: 5,
    },
    sectionTitle: {
      color: theme.brand.primary,
      fontSize: 8,
      fontWeight: 700,
      marginBottom: 6,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    item: {
      width: '47%',
      paddingBottom: 4,
      borderBottom: `1 solid ${theme.border.default}`,
    },
    label: {
      color: theme.text.secondary,
      fontSize: 5.8,
      textTransform: 'uppercase',
      marginBottom: 1,
      letterSpacing: 0.45,
    },
    value: {
      color: theme.text.primary,
      fontSize: 7.4,
      fontWeight: 700,
    },
    totals: {
      width: '100%',
      gap: 6,
      padding: 12,
      backgroundColor: theme.background.panel,
      border: `1 solid ${theme.border.default}`,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    totalLabel: {
      color: theme.text.secondary,
      fontSize: 7,
    },
    totalValue: {
      color: theme.text.primary,
      fontSize: 7.6,
      fontWeight: 700,
    },
    grandTotal: {
      marginTop: 4,
      paddingTop: 8,
      borderTop: `1 solid ${theme.border.strong}`,
    },
    grandTotalLabel: {
      color: theme.text.primary,
      fontSize: 8.5,
      fontWeight: 700,
    },
    grandTotalValue: {
      color: theme.text.primary,
      fontSize: 11,
      fontWeight: 700,
    },
    footer: {
      position: 'absolute',
      left: 28,
      right: 28,
      bottom: 28,
      paddingVertical: 6,
      paddingHorizontal: 8,
      backgroundColor: theme.background.footer,
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: theme.text.inverse,
      fontSize: 6,
    },
  })

export type CustomerInvoicePdfStyles = ReturnType<typeof createCustomerInvoiceStyles>
