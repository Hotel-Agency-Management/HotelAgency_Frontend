'use client'

import { Chip, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { formatLogDateTime } from '../utils/dateFormat'
import { getActionTypeConfig, resolveActionTypePalette } from '../utils/getActionTypeConfig'
import { ActionTypeAvatar, LogCard as StyledLogCard } from '../styles/StyledComponents'
import { LogDataColumn } from './LogDataColumn'
import type { SystemLogItem } from '../types/systemLog'

interface SystemLogCardProps {
  log: SystemLogItem
}

export function SystemLogCard({ log }: SystemLogCardProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const actionConfig = getActionTypeConfig(log.action)
  const palette = resolveActionTypePalette(theme, actionConfig.color)

  return (
    <StyledLogCard variant='outlined'>
      {/* Mobile layout (xs → sm) */}
      <Stack display={{ xs: 'flex', md: 'none' }} gap={1.5}>
        <Stack direction='row' alignItems='center' gap={1.5}>
          <ActionTypeAvatar $color={palette.main}>
            <Icon icon={actionConfig.icon} fontSize={18} color={palette.main} />
          </ActionTypeAvatar>
          <Stack flex={1} gap={0.25}>
            <Typography variant='body2' fontWeight={600}>
              {log.actorName}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {log.actorRole}
            </Typography>
          </Stack>
          <Chip
            label={log.action.replace(/_/g, ' ')}
            size='small'
            color={actionConfig.color === 'grey' ? 'default' : actionConfig.color}
            sx={{ fontWeight: 600 }}
          />
        </Stack>

        <Typography variant='body2' sx={{ pl: 7 }}>
          {log.description}
        </Typography>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ pl: 7 }}>
          <Typography variant='caption'>
            {log.entityType}
          </Typography>
          <Typography variant='caption'>
            {formatLogDateTime(log.createdAt)}
          </Typography>
        </Stack>
      </Stack>

      {/* Desktop layout (md+) */}
      <Stack display={{ xs: 'none', md: 'flex' }} direction='row' alignItems='center' gap={2.5}>
        <ActionTypeAvatar $color={palette.main}>
          <Icon icon={actionConfig.icon} fontSize={20} color={palette.main} />
        </ActionTypeAvatar>

        <Stack gap={0.25} width={160} flexShrink={0}>
          <Typography variant='body2' fontWeight={600} noWrap>
            {log.actorName}
          </Typography>
          <Typography variant='caption' color='text.secondary' noWrap>
            {log.actorRole}
          </Typography>
        </Stack>

        <Stack flex={1} gap={0.5} minWidth={0}>
          <Typography variant='caption' fontWeight={500}>
            {t('systemLogs.table.description', { defaultValue: 'Description' })}
          </Typography>
          <Typography variant='body2' noWrap>
            {log.description}
          </Typography>
        </Stack>

        <Chip
          label={log.action.replace(/_/g, ' ')}
          size='small'
          color={actionConfig.color === 'grey' ? 'default' : actionConfig.color}
          sx={{ fontWeight: 600, width: 200 }}
        />


        <LogDataColumn label={t('systemLogs.table.entityType', { defaultValue: 'Entity Type' })} value={log.entityType} width={130} />

        <LogDataColumn
          label={t('systemLogs.table.date', { defaultValue: 'Date' })}
          value={formatLogDateTime(log.createdAt)}
          align='right'
          width={150}
        />
      </Stack>
    </StyledLogCard>
  )
}
