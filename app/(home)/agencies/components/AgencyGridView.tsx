import { Grid } from '@mui/material'
import AgencyCard from './AgencyCard'
import { Agency } from '../types/agency'
import FadeIn from '@/components/animation/FadeIn'

interface Props {
  agencies: Agency[]
  onAgencyClick: (agencyName: string) => void
}

export default function AgencyGridView({ agencies, onAgencyClick }: Props) {
  return (
    <Grid container spacing={2}>
      {agencies.map((agency, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={agency.id}>
          <FadeIn direction='up' distance={16} transition={{ delay: index * 0.06 }}>
            <AgencyCard agency={agency} onClick={onAgencyClick} />
          </FadeIn>
        </Grid>
      ))}
    </Grid>
  )
}
