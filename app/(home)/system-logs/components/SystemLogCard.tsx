'use client'

import { Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { formatLogDateTime } from '../utils/dateFormat'
import { getActionTypeConfig, resolveActionTypePalette } from '../utils/getActionTypeConfig'
import { getActionLabel } from '../utils/actionLabel'
import { getActorRoleLabel } from '../utils/actorRoleLabel'
import { getEntityTypeLabel } from '../utils/entityTypeLabel'
import { ActionTypeAvatar, ActionTypeChip, LogCard as StyledLogCard } from '../styles/StyledComponents'
import { LogDataColumn } from './LogDataColumn'
import type { SystemLogItem } from '../types/systemLog'

interface SystemLogCardProps {
  log: SystemLogItem
}

export function SystemLogCard({ log }: SystemLogCardProps) {
  const theme = useTheme()
  const { t, i18n } = useTranslation()
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
              {getActorRoleLabel(log.actorRole)}
            </Typography>
          </Stack>
          <ActionTypeChip
            label={getActionLabel(log.action, t)}
            size='small'
            color={actionConfig.color === 'grey' ? 'default' : actionConfig.color}
          />
        </Stack>

        <Typography variant='body2' sx={{ pl: 7 }}>
          {log.description}
        </Typography>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ pl: 7 }}>
          <Typography variant='caption'>
            {getEntityTypeLabel(log.entityType, t)}
          </Typography>
          <Typography variant='caption'>
            {formatLogDateTime(log.createdAt, t, i18n.language)}
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
            {getActorRoleLabel(log.actorRole)}
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

        <ActionTypeChip
          $desktop
          label={getActionLabel(log.action, t)}
          size='small'
          color={actionConfig.color === 'grey' ? 'default' : actionConfig.color}
        />


        <LogDataColumn
          label={t('systemLogs.table.entityType', { defaultValue: 'Entity Type' })}
          value={getEntityTypeLabel(log.entityType, t)}
          width={130}
        />

        <LogDataColumn
          label={t('systemLogs.table.date', { defaultValue: 'Date' })}
          value={formatLogDateTime(log.createdAt, t, i18n.language)}
          align='right'
          width={150}
        />
      </Stack>
    </StyledLogCard>
  )
}
