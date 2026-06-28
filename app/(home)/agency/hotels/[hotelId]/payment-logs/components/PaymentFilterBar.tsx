'use client'

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import SearchInput from '@/components/common/SearchInput'
import { PAYMENT_TYPE_OPTIONS } from '../constants/paymentLogsConstants'
import { PAYMENT_DIRECTION_CONFIG } from '../constants/paymentDirectionConfig'
import { PAYMENT_TYPE_CONFIG } from '../constants/paymentTypeConfig'
import {
  PAYMENT_DIRECTION_FILTER_MD_WIDTH,
  PAYMENT_TYPE_FILTER_MD_WIDTH,
} from '@/app/(home)/payment-logs/constants/adminPaymentLogsConstants'
import type { PaymentDirection, PaymentType, PaymentLogsFilters } from '../types/payment'

interface PaymentFilterBarProps {
  filters: PaymentLogsFilters
  updateFilter: <K extends keyof PaymentLogsFilters>(key: K, value: PaymentLogsFilters[K]) => void
  resetFilters: () => void
  hasActiveFilters: boolean
  directionLabelId?: string
  typeLabelId?: string
}

export function PaymentFilterBar({
  filters,
  updateFilter,
  resetFilters,
  hasActiveFilters,
  directionLabelId = 'payment-filter-direction-label',
  typeLabelId = 'payment-filter-type-label',
}: PaymentFilterBarProps) {
  const { t } = useTranslation()

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5} alignItems={{ md: 'center' }}>
      <SearchInput
        value={filters.search}
        placeholder={t('hotelPaymentLogs.filters.search', { defaultValue: 'Search by name or reference...' })}
        onChange={(value) => updateFilter('search', value)}
        sx={{ flex: 1, minWidth: 220 }}
      />
      <FormControl size="small" sx={{ width: { xs: '100%', md: PAYMENT_DIRECTION_FILTER_MD_WIDTH } }}>
        <InputLabel id={directionLabelId}>
          {t('hotelPaymentLogs.filters.direction', { defaultValue: 'Direction' })}
        </InputLabel>
        <Select
          labelId={directionLabelId}
          label={t('hotelPaymentLogs.filters.direction', { defaultValue: 'Direction' })}
          value={filters.transactionType}
          onChange={(e) => updateFilter('transactionType', e.target.value as PaymentDirection | '')}
        >
          <MenuItem value="">{t('hotelPaymentLogs.filters.all', { defaultValue: 'All' })}</MenuItem>
          {(Object.keys(PAYMENT_DIRECTION_CONFIG) as PaymentDirection[]).map((direction) => (
            <MenuItem key={direction} value={direction}>
              {t(`hotelPaymentLogs.directions.${direction}`, { defaultValue: PAYMENT_DIRECTION_CONFIG[direction].label })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: { xs: '100%', md: PAYMENT_TYPE_FILTER_MD_WIDTH } }}>
        <InputLabel id={typeLabelId}>
          {t('hotelPaymentLogs.filters.type', { defaultValue: 'Payment Type' })}
        </InputLabel>
        <Select
          labelId={typeLabelId}
          label={t('hotelPaymentLogs.filters.type', { defaultValue: 'Payment Type' })}
          value={filters.type}
          onChange={(e) => updateFilter('type', e.target.value as PaymentType | '')}
        >
          <MenuItem value="">{t('hotelPaymentLogs.filters.all', { defaultValue: 'All' })}</MenuItem>
          {PAYMENT_TYPE_OPTIONS.map((type) => (
            <MenuItem key={type} value={type}>
              {t(`hotelPaymentLogs.paymentTypes.${type}`, { defaultValue: PAYMENT_TYPE_CONFIG[type].label })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {hasActiveFilters && (
        <Button
          size="small"
          color="inherit"
          onClick={resetFilters}
          startIcon={<Icon icon="lucide:x" fontSize={16} />}
        >
          {t('hotelPaymentLogs.filters.clear', { defaultValue: 'Clear filters' })}
        </Button>
      )}
    </Stack>
  )
}
