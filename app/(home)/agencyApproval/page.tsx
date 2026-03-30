'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  Box,
  Container,
  Typography,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  alpha,
} from '@mui/material'
import { Building } from 'lucide-react'
import { ActionType, AgencyRequest, ConfirmDialogState, FilterState, SnackbarState } from '@/components/agencyApproval/types'
import { MOCK_REQUESTS } from '@/core/data/AgencyRequest'
import SummaryStats from '@/components/agencyApproval/SummaryStats'
import DetailDrawer from '@/components/agencyApproval/DetailDrawer'
import { br } from '@/core/utils/themeUtils'
import { EmptyState, ErrorState, LoadingState } from '@/components/agencyApproval/StateViews'
import AgencyCard from '@/components/agencyApproval/AgencyCard'
import ConfirmDialog from '@/components/agencyApproval/ConfirmDialog'
import FilterBar from '@/components/agencyApproval/FilterBar'
import Avatar from '@/components/ui/Avatar'


type PageStatus = 'idle' | 'loading' | 'error'

const DEFAULT_FILTERS: FilterState = {
  search:  '',
  status:  'all',
  sortBy:  'newest',
}

function filterAndSort(
  requests: AgencyRequest[],
  filters: FilterState,
): AgencyRequest[] {
  let result = [...requests]

  if (filters.status !== 'all') {
    result = result.filter(r => r.status === filters.status)
  }

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      r =>
        r.agencyName.toLowerCase().includes(q) ||
        r.ownerName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q),
    )
  }

  result.sort((a, b) => {
    if (filters.sortBy === 'newest') return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    if (filters.sortBy === 'oldest') return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
    return a.agencyName.localeCompare(b.agencyName)
  })

  return result
}

const CLOSED_CONFIRM: ConfirmDialogState = { open: false, action: null, request: null }
const CLOSED_SNACKBAR: SnackbarState     = { open: false, message: '', severity: 'info' }


export default function AgencyApprovalsPage() {
  const theme = useTheme()

  const [requests, setRequests] = useState<AgencyRequest[]>(MOCK_REQUESTS)
  const [pageStatus, setPageStatus] = useState<PageStatus>('idle')

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>(CLOSED_CONFIRM)
  const [actionLoading, setActionLoading] = useState(false)
  const [snackbar, setSnackbar] = useState<SnackbarState>(CLOSED_SNACKBAR)
  const [detailRequest, setDetailRequest] = useState<AgencyRequest | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => filterAndSort(requests, filters), [requests, filters])
  const pendingCount = useMemo(() => requests.filter(r => r.status === 'pending').length, [requests])
  const hasFilters = filters.search !== '' || filters.status !== 'all'

  const handleFilterChange = useCallback((partial: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...partial }))
  }, [])

  const handleClearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const handleViewDetails = useCallback((request: AgencyRequest) => {
    setDetailRequest(request)
    setDrawerOpen(true)
  }, [])

  const handleAction = useCallback((request: AgencyRequest, action: ActionType) => {
    setConfirmDialog({ open: true, action, request })
  }, [])

  const handleConfirm = useCallback(async (action: ActionType) => {
    if (!confirmDialog.request) return
    const { request } = confirmDialog

    setActionLoading(true)

    // Simulate async API call
    await new Promise(resolve => setTimeout(resolve, 1200))

    const newStatus = action === 'approve' ? 'approved' : 'rejected'
    setRequests(prev =>
      prev.map(r => r.id === request.id ? { ...r, status: newStatus } : r),
    )

    setSnackbar({
      open: true,
      message: action === 'approve'
        ? `✓ ${request.agencyName} has been approved successfully.`
        : `${request.agencyName} has been rejected.`,
      severity: action === 'approve' ? 'success' : 'error',
    })

    setActionLoading(false)
    setConfirmDialog(CLOSED_CONFIRM)
  }, [confirmDialog])

  const handleRetry = useCallback(() => {
    setPageStatus('loading')
    setTimeout(() => {
      setRequests(MOCK_REQUESTS)
      setPageStatus('idle')
    }, 1000)
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pb: 8,
      }}
    >
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          pt: { xs: 3, sm: 4 },
          pb: { xs: 3, sm: 4 },
        }}
      >
        <Container maxWidth='lg'>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent='space-between'
            spacing={2}
          >
            <Stack direction='row' alignItems='center' spacing={2}>
              <Avatar variant='brand' color={theme.palette.primary.main}>
                <Building size={20} color={theme.palette.primary.contrastText} />
              </Avatar>
              <Box>
                <Typography
                  variant='h5'
                  fontWeight={800}
                  sx={{ letterSpacing: '-0.025em', lineHeight: 1.2 }}
                >
                  Agency Approval Requests
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ fontSize: '0.82rem', mt: 0.25 }}>
                  Review and manage agency registration applications
                </Typography>
              </Box>
            </Stack>

            {pendingCount > 0 && (
              <Stack
                sx={{
                  px: 2,
                  py: 0.875,
                  borderRadius: br(theme, 1.5),
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    color: theme.palette.warning.dark,
                  }}
                >
                  {pendingCount} pending {pendingCount === 1 ? 'request' : 'requests'}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth='lg' sx={{ pt: { xs: 3, sm: 4 } }}>
        <Stack spacing={3}>

          <SummaryStats requests={requests} />

          <FilterBar
            filters={filters}
            pendingCount={pendingCount}
            onFilterChange={handleFilterChange}
          />

          {pageStatus === 'idle' && filtered.length > 0 && (
            <Typography
              variant='caption'
              color='text.disabled'
              sx={{ fontSize: '0.75rem', px: 0.5 }}
            >
              Showing {filtered.length} of {requests.length} requests
            </Typography>
          )}

          {pageStatus === 'loading' ? (
            <LoadingState />
          ) : pageStatus === 'error' ? (
            <ErrorState onRetry={handleRetry} />
          ) : filtered.length === 0 ? (
            <EmptyState hasFilters={hasFilters} onClearFilters={handleClearFilters} />
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                  xl: 'repeat(3, 1fr)',
                },
                gap: 2.5,
              }}
            >
              {filtered.map(request => (
                <AgencyCard
                  key={request.id}
                  request={request}
                  onAction={handleAction}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Container>

      <ConfirmDialog
        state={confirmDialog}
        onConfirm={handleConfirm}
        onClose={() => !actionLoading && setConfirmDialog(CLOSED_CONFIRM)}
        isLoading={actionLoading}
      />

      <DetailDrawer
        request={detailRequest}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAction={handleAction}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4500}
        onClose={() => setSnackbar(CLOSED_SNACKBAR)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar(CLOSED_SNACKBAR)}
          variant='filled'
          sx={{
            borderRadius: br(theme, 1.5),
            fontSize: '0.83rem',
            fontWeight: 500,
            boxShadow: theme.shadows[8],
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
