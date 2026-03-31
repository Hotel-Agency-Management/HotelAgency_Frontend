'use client'

import {
  Box,
  Container,
  Typography,
  Stack,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material'
import { Building } from 'lucide-react'
import { br } from '@/core/utils/themeUtils'
import Avatar from '@/components/ui/Avatar'
import ConfirmDialog from './components/ConfirmDialog'
import DetailDrawer from './components/DetailDrawer'
import FilterBar from './components/FilterBar'
import SummaryStats from './components/SummaryStats'
import PendingRequestsBadge from './components/PendingRequestsBadge'
import { ContentFactory } from './components/PageContentFactory'
import { useAgencyApprovals } from './hooks/useAgencyApprovals'
import { CLOSED_CONFIRM, CLOSED_SNACKBAR } from '@/core/constant/pageStatus'

export default function AgencyApprovalsPage() {

  const theme = useTheme()
  const {
    requests,
    pageStatus,
    filters,
    confirmDialog,
    actionLoading,
    snackbar,
    detailRequest,
    drawerOpen,
    filtered,
    pendingCount,
    hasFilters,
    handleFilterChange,
    handleClearFilters,
    handleViewDetails,
    handleAction,
    handleConfirm,
    handleRetry,
    setSnackbar,
    setConfirmDialog,
    setDrawerOpen,
  } = useAgencyApprovals()
  
  return (
    <Stack
        sx={{
          minHeight: '100vh',
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            py: { xs: 3, sm: 4 },
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
                  sx={{ lineHeight: 1.2 }}
                >
                  Agency Approval Requests
                </Typography>
                <Typography variant='body2'>
                  Review and manage agency registration applications
                </Typography>
              </Box>
            </Stack>

            {pendingCount > 0 && (
              <PendingRequestsBadge count={pendingCount} />
            )}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth='lg'>
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

          <ContentFactory
            pageStatus={pageStatus}
            filtered={filtered}
            hasFilters={hasFilters}
            onRetry={handleRetry}
            onClearFilters={handleClearFilters}
            onAction={handleAction}
            onViewDetails={handleViewDetails}
          />
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
    </Stack>
  )
}
