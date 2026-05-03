import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import type { ReservationContractDocumentProps } from '../../types/customerReservationContract'
import { ContractBullet } from './ContractBullet'
import { ContractDetailItem } from './ContractDetailItem'
import { createReservationContractStyles } from './styles'
import { createReservationContractTheme } from './theme'
import {
  buildContractLocation,
  formatContractDate,
  getContractTermsPreview,
  getHotelInitials,
} from '../../utils/reservationContractHelpers'

export function ReservationContractDocument({ contract }: ReservationContractDocumentProps) {
  const contractTheme = createReservationContractTheme({
    primaryColor: contract.hotel.primaryColor,
    secondaryColor: contract.hotel.secondaryColor,
  })
  const styles = createReservationContractStyles(contractTheme)
  const location = buildContractLocation(contract)
  const termsContent = getContractTermsPreview(contract.terms.content)
  const hotelInitials = getHotelInitials(contract.hotel.name)

  return (
    <Document
      title={`${contract.hotel.name} Reservation Contract`}
      author={contract.hotel.name}
      subject="Hotel reservation contract"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text style={styles.watermark}>RESERVATION CONTRACT</Text>

          <View style={styles.header}>
            <View style={styles.brandBlock}>
              <View style={styles.logoFrame}>
                {contract.hotel.logo ? (
                  <Image src={contract.hotel.logo} style={styles.logo} />
                ) : (
                  <View style={styles.logoFallback}>
                    <Text>{hotelInitials || 'H'}</Text>
                  </View>
                )}
              </View>
              <View style={styles.brandText}>
                <Text style={styles.eyebrow}>Hotel Agreement</Text>
                <Text style={styles.title}>Contract</Text>
                <Text style={styles.subtitle}>{contract.hotel.name}</Text>
              </View>
            </View>

            <View style={styles.metaBox}>
              <View>
                <Text style={styles.metaLabel}>Contract ID</Text>
                <Text style={styles.metaValue}>{contract.stay.reservationId}</Text>
              </View>
              <View>
                <Text style={styles.metaLabel}>Issued</Text>
                <Text style={styles.metaValue}>{formatContractDate(contract.issuedAt)}</Text>
              </View>
              <View>
                <Text style={styles.metaLabel}>Agency</Text>
                <Text style={styles.metaValue}>{contract.hotel.agencyName || 'Hotel Agency'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.intro}>
            <Text style={styles.introText}>
              This agreement documents the confirmed stay between the hotel and the guest listed
              below. Commercial pricing, rates, taxes, and payment values are intentionally excluded
              from this contract copy.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hotel Information</Text>
            <View style={styles.grid}>
              <ContractDetailItem label="Hotel Name" value={contract.hotel.name} styles={styles} />
              <ContractDetailItem label="Agency" value={contract.hotel.agencyName} styles={styles} />
              <ContractDetailItem label="Phone" value={contract.hotel.phone} styles={styles} />
              <ContractDetailItem label="Location" value={location} styles={styles} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guest Information</Text>
            <View style={styles.grid}>
              <ContractDetailItem label="Guest Name" value={contract.guest.name} styles={styles} />
              <ContractDetailItem label="Email" value={contract.guest.email} styles={styles} />
              <ContractDetailItem label="Phone" value={contract.guest.phone} styles={styles} />
              <ContractDetailItem
                label="Party Size"
                value={`${contract.stay.guests} guests`}
                styles={styles}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stay Details</Text>
            <View style={styles.grid}>
              <ContractDetailItem label="Room" value={contract.stay.roomNumber} styles={styles} />
              <ContractDetailItem label="Room Type" value={contract.stay.roomType} styles={styles} />
              <ContractDetailItem label="Check-in" value={contract.stay.checkIn} styles={styles} />
              <ContractDetailItem label="Check-out" value={contract.stay.checkOut} styles={styles} />
              <ContractDetailItem
                label="Stay Length"
                value={contract.stay.stayLength}
                styles={styles}
              />
              <ContractDetailItem label="Rooms" value={contract.stay.rooms} styles={styles} />
              <ContractDetailItem label="Capacity" value={contract.stay.capacity} styles={styles} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            <Text style={styles.paragraph}>{contract.terms.title}</Text>
            <Text style={styles.paragraph}>
              {termsContent ||
                'The guest agrees to comply with the hotel reservation terms, property policies, check-in requirements, and stay rules shared during the reservation flow.'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Liability Agreement</Text>
            <ContractBullet styles={styles}>
              The guest is responsible for accurate guest information and for following hotel policies
              throughout the stay.
            </ContractBullet>
            <ContractBullet styles={styles}>
              The hotel is responsible for honoring the confirmed room assignment or providing a
              reasonable operational alternative when required.
            </ContractBullet>
            <ContractBullet styles={styles}>
              The guest accepts responsibility for damage, misuse, or policy violations caused during
              the confirmed stay.
            </ContractBullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acceptance</Text>
            <Text style={styles.paragraph}>
              By confirming this reservation, the guest acknowledges that the stay details are
              correct, the applicable terms were reviewed, and the electronic signature below
              represents acceptance of this reservation contract.
            </Text>
            <Text style={styles.paragraph}>
              Accepted at: {formatContractDate(contract.terms.acceptedAt)}
            </Text>
          </View>

          <View style={styles.signatures}>
            <View style={styles.signatureBlock} wrap={false}>
              {contract.customerSignatureDataUrl ? (
                <Image src={contract.customerSignatureDataUrl} style={styles.signatureImage} />
              ) : (
                <View style={styles.signaturePlaceholder}>
                  <Text>Signature will be added after approval</Text>
                </View>
              )}
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>{contract.guest.name}</Text>
              <Text style={styles.signatureCaption}>Customer Signature</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text>{contract.hotel.name} reservation contract</Text>
            <Text>Generated by Hotel Agency</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
