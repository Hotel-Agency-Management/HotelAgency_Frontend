import { Grid } from "@mui/material"
import { AgencyRequest } from "."
import { ActionType } from "../types/agency"
import AgencyCard from "./AgencyCard"
import { LoadingState, ErrorState, EmptyState } from "./StateViews"

interface ContentFactoryProps {
  pageStatus: 'idle' | 'loading' | 'error'
  filtered: AgencyRequest[]
  hasFilters: boolean
  onRetry: () => void
  onClearFilters: () => void
  onAction: (request: AgencyRequest, action: ActionType) => void
  onViewDetails: (request: AgencyRequest) => void
}

export function ContentFactory({
  pageStatus,
  filtered,
  hasFilters,
  onRetry,
  onClearFilters,
  onAction,
  onViewDetails,
}: ContentFactoryProps) {
  switch (pageStatus) {
    case 'loading':
      return <LoadingState />

    case 'error':
      return <ErrorState onRetry={onRetry} />

    case 'idle':
      if (filtered.length === 0) {
        return (
          <EmptyState
            hasFilters={hasFilters}
            onClearFilters={onClearFilters}
          />
        )
      }

      return (
        <Grid container spacing={2.5}>
          {filtered.map(request => (
            <Grid key={request.id} size={{ xs: 12, sm: 6 }}>
              <AgencyCard
                request={request}
                onAction={onAction}
                onViewDetails={onViewDetails}
              />
            </Grid>
          ))}
        </Grid>
      )

    default:
      return null
  }
}
