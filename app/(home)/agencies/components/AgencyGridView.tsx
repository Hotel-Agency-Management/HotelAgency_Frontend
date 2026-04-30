import { Grid } from '@mui/material'
import AgencyCard from './AgencyCard'
import { Agency } from '../types/agency'
import { StaggerGroup, StaggerItem } from '@/components/animation/StaggerGroup'

interface Props {
  agencies: Agency[]
  onAgencyClick: (agencyId: number) => void
  onSettingsClick: (agencyId: number) => void
}

export default function AgencyGridView({ agencies, onAgencyClick, onSettingsClick }: Props) {
  return (
    <StaggerGroup staggerDelay={0.06} direction="up" distance={16} style={{ width: '100%' }}>
      <Grid container spacing={2}>
        {agencies.map((agency) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={agency.id}>
            <StaggerItem>
              <AgencyCard agency={agency} onClick={onAgencyClick} onSettingsClick={onSettingsClick} />
            </StaggerItem>
          </Grid>
        ))}
      </Grid>
    </StaggerGroup>
  )
}
