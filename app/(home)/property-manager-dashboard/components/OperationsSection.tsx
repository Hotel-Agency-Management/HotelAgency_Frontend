'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import DoughnutChart from '@/components/charts/DoughnutChart'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import {
  SERVICE_REQUESTS_DISTRIBUTION,
  MAINTENANCE_CATEGORIES,
  MAINTENANCE_LABELS,
} from '../data/propertyManagerDashboardMock'

export default function OperationsSection() {
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Service Requests Distribution</Typography>
              <DoughnutChart
                data={SERVICE_REQUESTS_DISTRIBUTION}
                percentage
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={4}
                height={260}
                legendPosition="bottom"
                legendAlign="center"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Maintenance by Category</Typography>
              <HorizontalBarChart
                data={MAINTENANCE_CATEGORIES}
                labels={MAINTENANCE_LABELS}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
