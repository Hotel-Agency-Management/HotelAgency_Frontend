import { resolveBlobUrl } from '@/core/constant/blobStorage'

const STORAGE_PREFIX = 'customer-reservation-documents'

export interface CustomerReservationDocumentUrls {
  contractUrl: string | null
  invoiceUrl: string | null
}

const getStorageKey = (reservationId: string | number) => `${STORAGE_PREFIX}:${reservationId}`
const isTemporaryObjectUrl = (value: string | null | undefined) => value?.startsWith('blob:') ?? false

export const saveCustomerReservationDocumentUrls = (
  reservationId: string | number,
  urls: CustomerReservationDocumentUrls
) => {
  if (typeof window === 'undefined') return

  const persistentUrls = {
    contractUrl: isTemporaryObjectUrl(urls.contractUrl) ? null : urls.contractUrl,
    invoiceUrl: isTemporaryObjectUrl(urls.invoiceUrl) ? null : urls.invoiceUrl,
  }

  if (!persistentUrls.contractUrl && !persistentUrls.invoiceUrl) {
    window.sessionStorage.removeItem(getStorageKey(reservationId))
    return
  }

  window.sessionStorage.setItem(getStorageKey(reservationId), JSON.stringify(persistentUrls))
}

export const getSavedCustomerReservationDocumentUrls = (
  reservationId: string | number
): CustomerReservationDocumentUrls | null => {
  if (typeof window === 'undefined') return null

  const value = window.sessionStorage.getItem(getStorageKey(reservationId))

  if (!value) return null

  try {
    return JSON.parse(value) as CustomerReservationDocumentUrls
  } catch {
    return null
  }
}

export const resolveCustomerReservationDocumentUrl = (value?: string | null) => {
  if (!value) return null

  return resolveBlobUrl(value) || null
}
