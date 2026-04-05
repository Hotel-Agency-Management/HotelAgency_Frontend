import { Stack, Typography, Button, CircularProgress, useTheme, alpha } from '@mui/material'
import { InboxOutlined, ErrorOutline, Refresh } from '@mui/icons-material'
import { br } from '@/core/utils/themeUtils'


function CenteredPageState({ children }: { children: React.ReactNode }) {
  return (
    <Stack alignItems="center" justifyContent="center" textAlign="center" py={10} px={3} gap={2}>
      {children}
    </Stack>
  )
}

interface StateIconBoxProps {
  icon: React.ReactNode
  color: string
}

function StateIconBox({ icon, color }: StateIconBoxProps) {
  const theme = useTheme()
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 64,
        height: 64,
        borderRadius: br(theme, 2),
        bgcolor: alpha(color, 0.08),
      }}
    >
      {icon}
    </Stack>
  )
}

interface StateLabelProps {
  title: string
  description: string
}

function StateLabel({ title, description }: StateLabelProps) {
  return (
    <Stack alignItems="center" gap={0.75}>
      <Typography variant="subtitle1" fontWeight={700} >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 300 }}
      >
        {description}
      </Typography>
    </Stack>
  )
}


export function LoadingState() {
  const theme = useTheme()
  return (
    <CenteredPageState>
      <CircularProgress size={36} thickness={3} sx={{ color: theme.palette.primary.main }} />
      <Typography variant="body2">
        Loading agency requests…
      </Typography>
    </CenteredPageState>
  )
}

interface EmptyStateProps {
  hasFilters?: boolean
  onClearFilters?: () => void
}

export function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  const theme = useTheme()

  const title = hasFilters ? 'No matching requests' : 'No requests yet'
  const description = hasFilters
    ? "Try adjusting your search or filter to find what you're looking for."
    : 'When agencies submit registration requests, they will appear here for your review.'

  return (
    <CenteredPageState>
      <StateIconBox
        icon={<InboxOutlined sx={{ fontSize: 28, color: theme.palette.primary.main, opacity: 0.7 }} />}
        color={theme.palette.primary.main}
      />
      <StateLabel title={title} description={description} />
      {hasFilters && (
        <Button
          variant="outlined"
          size="small"
          onClick={onClearFilters}
          sx={{ borderRadius: br(theme, 1.5), fontWeight: 600, fontSize: '0.8rem' }}
        >
          Clear Filters
        </Button>
      )}
    </CenteredPageState>
  )
}

interface ErrorStateProps {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  const theme = useTheme()
  return (
    <CenteredPageState>
      <StateIconBox
        icon={<ErrorOutline sx={{ fontSize: 28, color: theme.palette.error.main }} />}
        color={theme.palette.error.main}
      />
      <StateLabel
        title="Failed to load requests"
        description="Something went wrong while fetching agency requests. Please try again."
      />
      <Button
        variant="outlined"
        size="small"
        startIcon={<Refresh fontSize="small" />}
        onClick={onRetry}
        sx={{ borderRadius: br(theme, 1.5), fontWeight: 600, fontSize: '0.8rem' }}
      >
        Retry
      </Button>
    </CenteredPageState>
  )
}
