'use client'

import { Autocomplete, Box, Button, MenuItem, Pagination, Select, Stack, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import themeConfig from '@/core/configs/themeConfig'
import SearchInput from '@/components/common/SearchInput'
import { SystemLogsFeed } from './SystemLogsFeed'
import { ACTION_OPTIONS, ENTITY_TYPE_OPTIONS, PAGE_SIZE_OPTIONS } from '../constants/systemLogsConstants'
import { useSystemLogs } from '../hooks/useSystemLogs'
import { FiltersCard } from '../styles/StyledComponents'

export function SystemLogsPage() {
  const { t } = useTranslation()
  const {
    logs,
    totalCount,
    totalPages,
    isLoading,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters
  } = useSystemLogs()

  return (
    <Stack gap={themeConfig.common.commonSpacing}>
      <Stack direction='row' alignItems='center' gap={1.5}>
        <Icon icon='lucide:scroll-text' fontSize={28} />
        <Stack gap={0.5}>
          <Typography variant='h5' fontWeight={700}>
            {t('systemLogs.title', { defaultValue: 'System Logs' })}
          </Typography>
          <Typography variant='body2'>
            {t('systemLogs.subtitle', { defaultValue: 'Audit trail of actions performed across the platform.' })}
          </Typography>
        </Stack>
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FiltersCard variant='outlined'>
          <Stack gap={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5}>
              <SearchInput
                value={filters.search}
                placeholder={t('systemLogs.filters.search', { defaultValue: 'Search by description or actor…' })}
                onChange={value => updateFilter('search', value)}
                sx={{ flex: 1, minWidth: 220 }}
              />
              <Autocomplete
                freeSolo
                size='small'
                options={ACTION_OPTIONS}
                value={filters.action || null}
                onInputChange={(_, value) => updateFilter('action', value)}
                renderInput={params => (
                  <TextField {...params} label={t('systemLogs.filters.action', { defaultValue: 'Action' })} />
                )}
                sx={{ width: { xs: '100%', md: 200 } }}
              />
              <Autocomplete
                freeSolo
                size='small'
                options={ENTITY_TYPE_OPTIONS}
                value={filters.entityType || null}
                onInputChange={(_, value) => updateFilter('entityType', value)}
                renderInput={params => (
                  <TextField {...params} label={t('systemLogs.filters.entityType', { defaultValue: 'Entity Type' })} />
                )}
                sx={{ width: { xs: '100%', md: 180 } }}
              />
              <TextField
                size='small'
                type='number'
                label={t('systemLogs.filters.actorId', { defaultValue: 'Actor ID' })}
                value={filters.actorId}
                onChange={e => updateFilter('actorId', e.target.value)}
                sx={{ width: { xs: '100%', md: 120 } }}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={1.5}
              alignItems={{ sm: 'center' }}
              justifyContent='space-between'
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5}>
                <DatePicker
                  label={t('systemLogs.filters.from', { defaultValue: 'From' })}
                  value={filters.from ? dayjs(filters.from) : null}
                  onChange={value => updateFilter('from', value ? value.toDate() : null)}
                  slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
                />
                <DatePicker
                  label={t('systemLogs.filters.to', { defaultValue: 'To' })}
                  value={filters.to ? dayjs(filters.to) : null}
                  onChange={value => updateFilter('to', value ? value.toDate() : null)}
                  slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
                />
              </Stack>

              {hasActiveFilters && (
                <Button
                  size='small'
                  color='inherit'
                  onClick={resetFilters}
                  startIcon={<Icon icon='lucide:x' fontSize={16} />}
                >
                  {t('systemLogs.filters.clear', { defaultValue: 'Clear filters' })}
                </Button>
              )}
            </Stack>
          </Stack>
        </FiltersCard>
      </LocalizationProvider>

      <SystemLogsFeed logs={logs} isLoading={isLoading} />

      {totalCount > 0 && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1}
        >
          <Pagination
            count={totalPages}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
            color='primary'
            shape='rounded'
            size='small'
          />
          <Box>
            <Select
              size='small'
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              sx={{ fontSize: 13 }}
            >
              {PAGE_SIZE_OPTIONS.map(n => (
                <MenuItem key={n} value={n}>
                  {t('systemLogs.perPage', { count: n, defaultValue: '{{count}} per page' })}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
