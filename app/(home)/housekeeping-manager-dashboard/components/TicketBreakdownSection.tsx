'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ChartFactory from '@/components/charts/ChartFactory'
import Spinner from '@/components/loaders/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useTicketPriorities, useTicketTypes } from '../hooks/queries/useHousekeepingDashboard'
import { LoadingBox } from '../styles/StyledComponents'

interface TicketBreakdownSectionProps {
  hotelId?: number
}

export default function TicketBreakdownSection({ hotelId }: TicketBreakdownSectionProps) {
  const { t } = useTranslation()

  const typesQuery = useTicketTypes(hotelId)
  const prioritiesQuery = useTicketPriorities(hotelId)

  const isLoading = typesQuery.isLoading || prioritiesQuery.isLoading
  const isError = typesQuery.isError || prioritiesQuery.isError

  if (isLoading) {
    return (
      <LoadingBox>
        <Spinner />
      </LoadingBox>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        message={t('dashboard.housekeepingManager.breakdown.loadError', { defaultValue: 'Failed to load ticket breakdown' })}
      />
    )
  }

  const typeItems = typesQuery.data?.data ?? []
  const priorityItems = prioritiesQuery.data?.data ?? []

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {t('dashboard.housekeepingManager.charts.ticketsByType', {
                  defaultValue: 'Tickets by Type',
                })}
              </Typography>
              <ChartFactory
                type="Doughnut"
                data={typeItems.map(item => ({ label: item.type, value: item.count }))}
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={4}
                height={260}
                showLegend
                legendPosition="bottom"
                legendAlign="center"
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {t('dashboard.housekeepingManager.charts.ticketsByPriority', {
                  defaultValue: 'Tickets by Priority',
                })}
              </Typography>
              <ChartFactory
                type="Doughnut"
                data={priorityItems.map(item => ({ label: item.priority, value: item.count }))}
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={4}
                height={260}
                showLegend
                legendPosition="bottom"
                legendAlign="center"
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
