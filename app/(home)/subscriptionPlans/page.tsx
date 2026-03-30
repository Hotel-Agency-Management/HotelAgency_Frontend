'use client'

import { useState, useCallback } from 'react'
import {
  Box, Container, Typography, Stack, Divider,
  Paper, Grid, Snackbar, Alert, Dialog,
  DialogTitle, DialogContent, IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { LoadingState, ErrorState, EmptyState } from '@/components/agencyApproval/StateViews'
import { SnackbarState } from '@/components/agencyApproval/types'
import DeleteDialog from '@/components/plans/DeleteDialog'
import PlanCard from '@/components/plans/PlanCard'
import PlanForm from '@/components/plans/PlanForm'
import { SubscriptionPlan, PlanFormValues } from '@/components/plans/types'
import { generateId } from '@/components/plans/util/plans'
import { MOCK_PLANS } from '@/core/data/MockPlan'

type PageStatus = 'idle' | 'loading' | 'error'

const CLOSED_SNACKBAR: SnackbarState = { open: false, message: '', severity: 'info' }

const now = () => new Date().toISOString()

export default function SubscriptionPlansPage() {
  const [plans, setPlans]               = useState<SubscriptionPlan[]>(MOCK_PLANS)
  const [pageStatus, setPageStatus]     = useState<PageStatus>('idle')
  const [editPlan, setEditPlan]         = useState<SubscriptionPlan | null>(null)
  const [editOpen, setEditOpen]         = useState(false)
  const [deletePlan, setDeletePlan]     = useState<SubscriptionPlan | null>(null)
  const [deleteOpen, setDeleteOpen]     = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [snackbar, setSnackbar]         = useState<SnackbarState>(CLOSED_SNACKBAR)

  const closeSnackbar = useCallback(() => setSnackbar(CLOSED_SNACKBAR), [])

  const showSnackbar = useCallback((message: string, severity: SnackbarState['severity']) => {
    setSnackbar({ open: true, message, severity })
  }, [])

  const handleCreate = useCallback(async (values: PlanFormValues) => {
    await new Promise(r => setTimeout(r, 800))
    const newPlan: SubscriptionPlan = { ...values, id: generateId(), createdAt: now(), updatedAt: now() }
    setPlans(prev => [...prev, newPlan])
    showSnackbar(`Plan "${newPlan.name}" created successfully.`, 'success')
  }, [showSnackbar])

  const openEdit = useCallback((plan: SubscriptionPlan) => {
    setEditPlan(plan)
    setEditOpen(true)
  }, [])

  const closeEdit = useCallback(() => {
    setEditOpen(false)
    setEditPlan(null)
  }, [])

  const handleEdit = useCallback(async (values: PlanFormValues) => {
    if (!editPlan) return
    await new Promise(r => setTimeout(r, 800))
    setPlans(prev => prev.map(p => p.id === editPlan.id ? { ...p, ...values, updatedAt: now() } : p))
    showSnackbar(`Plan "${values.name}" updated successfully.`, 'success')
    closeEdit()
  }, [editPlan, showSnackbar, closeEdit])

  const openDelete = useCallback((plan: SubscriptionPlan) => {
    setDeletePlan(plan)
    setDeleteOpen(true)
  }, [])

  const handleDelete = useCallback(async () => {
    if (!deletePlan) return
    setDeleteLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setPlans(prev => prev.filter(p => p.id !== deletePlan.id))
    showSnackbar(`Plan "${deletePlan.name}" deleted.`, 'info')
    setDeleteLoading(false)
    setDeleteOpen(false)
    setDeletePlan(null)
  }, [deletePlan, showSnackbar])

  const handleRetry = useCallback(() => {
    setPageStatus('loading')
    setTimeout(() => {
      setPlans(MOCK_PLANS)
      setPageStatus('idle')
    }, 1000)
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Stack spacing={4}>
          <Stack>
            <Typography variant="h5" fontWeight={700}>Subscription Plans</Typography>
            <Typography variant="body2" color="text.secondary">
              Create and manage the plans available to hotel agencies on the platform.
            </Typography>
          </Stack>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2.5}>Create New Plan</Typography>
            <Divider sx={{ mb: 3 }} />
            <PlanForm onSubmit={handleCreate} submitLabel="Create Plan" />
          </Paper>

          <Stack>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>Existing Plans</Typography>

            {pageStatus === 'loading' && <LoadingState />}
            {pageStatus === 'error'   && <ErrorState onRetry={handleRetry} />}
            {pageStatus === 'idle' && plans.length === 0 && <EmptyState />}

            {pageStatus === 'idle' && plans.length > 0 && (
              <Grid container spacing={2.5}>
                {plans.map(plan => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={plan.id}>
                    <PlanCard plan={plan} onEdit={openEdit} onDelete={openDelete} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
        </Stack>
      </Container>

      <Dialog open={editOpen} onClose={closeEdit} maxWidth="md" fullWidth scroll="paper">
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight={700}>Edit Plan — {editPlan?.name}</Typography>
            <IconButton size="small" onClick={closeEdit}>
              <Close fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          {editPlan && (
            <PlanForm
              initial={editPlan}
              onSubmit={handleEdit}
              onCancel={closeEdit}
              submitLabel="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteDialog
        plan={deletePlan}
        open={deleteOpen}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onClose={() => !deleteLoading && setDeleteOpen(false)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={closeSnackbar} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
