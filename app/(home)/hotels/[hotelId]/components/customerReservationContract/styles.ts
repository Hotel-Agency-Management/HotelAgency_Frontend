import { StyleSheet } from '@react-pdf/renderer'
import type { ReservationContractTheme } from './theme'

export const createReservationContractStyles = (theme: ReservationContractTheme) =>
  StyleSheet.create({
    page: {
      padding: 28,
      fontFamily: 'Helvetica',
      fontSize: 7.6,
      lineHeight: 1.18,
      color: theme.text.primary,
      backgroundColor: theme.background.page,
    },
    content: {
      gap: 7,
    },
    watermark: {
      position: 'absolute',
      top: 318,
      left: 105,
      color: theme.brand.watermark,
      fontSize: 36,
      fontWeight: 700,
      transform: 'rotate(-32deg)',
    },
    header: {
      alignItems: 'center',
      paddingBottom: 6,
    },
    brandBlock: {
      alignItems: 'center',
    },
    brandText: {
      alignItems: 'center',
    },
    logoFrame: {
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginBottom: 5,
    },
    logo: {
      width: 28,
      height: 28,
      objectFit: 'contain',
    },
    logoFallback: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.brand.primary,
      color: theme.brand.contrast,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 700,
    },
    eyebrow: {
      color: theme.brand.primary,
      fontSize: 6.5,
      textTransform: 'uppercase',
      letterSpacing: 1.4,
      marginBottom: 1,
      fontWeight: 700,
    },
    title: {
      fontFamily: 'Times-Italic',
      fontSize: 34,
      fontWeight: 400,
      color: theme.text.primary,
      letterSpacing: 0,
      lineHeight: 1,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 8,
      color: theme.text.secondary,
      letterSpacing: 1.2,
      lineHeight: 1.1,
    },
    metaBox: {
      marginTop: 7,
      paddingTop: 5,
      borderTop: `1 solid ${theme.border.default}`,
      borderBottom: `1 solid ${theme.border.default}`,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 30,
      width: '100%',
    },
    metaLabel: {
      color: theme.text.secondary,
      fontSize: 5.8,
      textTransform: 'uppercase',
      marginBottom: 1,
      textAlign: 'center',
    },
    metaValue: {
      fontSize: 7,
      fontWeight: 700,
      textAlign: 'center',
    },
    intro: {
      paddingHorizontal: 18,
      marginTop: 1,
      marginBottom: 1,
    },
    introText: {
      fontSize: 7.1,
      color: theme.text.secondary,
      textAlign: 'center',
    },
    section: {
      marginTop: 5,
    },
    sectionTitle: {
      color: theme.brand.primary,
      fontSize: 7.8,
      fontWeight: 700,
      marginBottom: 5,
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
      fontSize: 7.2,
      fontWeight: 700,
    },
    paragraph: {
      color: theme.text.primary,
      marginBottom: 3,
    },
    bulletRow: {
      flexDirection: 'row',
      gap: 4,
      marginBottom: 2,
    },
    bullet: {
      color: theme.brand.secondary,
      fontSize: 7,
      fontWeight: 700,
    },
    signatures: {
      marginTop: 8,
      alignItems: 'flex-end',
    },
    signatureBlock: {
      width: 190,
      alignItems: 'center',
    },
    signatureImage: {
      width: 145,
      height: 30,
      objectFit: 'contain',
      marginBottom: 3,
    },
    signatureLine: {
      width: 170,
      borderBottom: `1 solid ${theme.border.strong}`,
      marginBottom: 3,
    },
    signatureName: {
      color: theme.text.primary,
      fontSize: 7.4,
      fontWeight: 700,
      textAlign: 'center',
    },
    signatureCaption: {
      color: theme.text.secondary,
      fontSize: 5.8,
      textTransform: 'uppercase',
      textAlign: 'center',
      marginTop: 2,
    },
    footer: {
      marginTop: 8,
      paddingVertical: 5,
      paddingHorizontal: 8,
      backgroundColor: theme.background.footer,
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: theme.text.inverse,
      fontSize: 5.7,
    },
  })

export type ReservationContractPdfStyles = ReturnType<typeof createReservationContractStyles>
