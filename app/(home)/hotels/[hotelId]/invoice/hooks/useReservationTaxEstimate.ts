'use client'

import { useEffect, useState } from 'react'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { TAX_DATA_DEFAULT_PRODUCT_TYPE } from '../constants/taxData'
import { lookupTaxDataPrice } from '../data/taxDataClient'

interface UseReservationTaxEstimateOptions {
  open: boolean
  hotel: CustomerHotel | null
  subtotal: number
}

export function useReservationTaxEstimate({
  open,
  hotel,
  subtotal,
}: UseReservationTaxEstimateOptions) {
  const [taxAmount, setTaxAmount] = useState<number | null>(null)
  const [taxLoading, setTaxLoading] = useState(false)
  const [taxPostalCode, setTaxPostalCode] = useState('')
  const [taxRequiresPostalCode, setTaxRequiresPostalCode] = useState(false)

  useEffect(() => {
    if (!open) {
      setTaxAmount(null)
      setTaxLoading(false)
      setTaxPostalCode('')
      setTaxRequiresPostalCode(false)
    }
  }, [open])

  useEffect(() => {
    let ignore = false

    if (!open || subtotal <= 0) {
      setTaxAmount(null)
      setTaxLoading(false)
      setTaxRequiresPostalCode(false)
      return
    }

    setTaxLoading(true)

    lookupTaxDataPrice({
      amount: subtotal,
      country: hotel?.country,
      city: hotel?.city,
      street: hotel?.address,
      zip: hotel?.hotelZip ?? taxPostalCode,
      type: TAX_DATA_DEFAULT_PRODUCT_TYPE,
    })
      .then(taxResult => {
        if (!ignore) {
          setTaxRequiresPostalCode(taxResult.status === 'requiresPostalCode')
          setTaxAmount(taxResult.status === 'success' ? taxResult.taxAmount : null)
        }
      })
      .finally(() => {
        if (!ignore) {
          setTaxLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [hotel?.address, hotel?.city, hotel?.country, hotel?.hotelZip, open, subtotal, taxPostalCode])

  return {
    taxAmount,
    taxLoading,
    taxPostalCode,
    taxRequiresPostalCode,
    setTaxPostalCode,
    resolvedTaxPostalCode: hotel?.hotelZip ?? taxPostalCode,
  }
}
