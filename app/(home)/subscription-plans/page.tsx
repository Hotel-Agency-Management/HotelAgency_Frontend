'use client'

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import DeleteDialog from './components/DeleteDialog'
import PlanForm from './components/PlanForm'
import { usePlansManager } from './hooks/usePlansManager'
import { PlansContentFactory } from './components/PlansContentFactory'
import EditPlanDialog from './components/EditPlanDialog'

export default function SubscriptionPlansPage() {
  const {
    plans,
    pageStatus,
    editOpen,
    deleteOpen,
    snackbar,
    closeEdit,
    editPlan,
    deletePlan,
    deleteLoading,
    handleCreate,
    handleEdit,
    handleDelete,
    handleRetry,
    openEdit,
    openDelete,
    closeDelete,
    closeSnackbar,
  } = usePlansManager()

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth='lg'>
        <Stack spacing={4}>
          <Stack>
            <Typography variant='h5' fontWeight={700}>Subscription Plans</Typography>
            <Typography variant='body2' color='text.secondary'>
              Create and manage the plans available to hotel agencies on the platform.
            </Typography>
          </Stack>

          <Paper variant='outlined' sx={{ p: 3 }}>
            <Typography variant='subtitle1' fontWeight={600}>Create New Plan</Typography>
            <Divider sx={{ mb: 3 }} />
            <PlanForm onSubmit={handleCreate} submitLabel='Create Plan' />
          </Paper>

          <Stack>
            <Typography variant='subtitle1' fontWeight={600} mb={2}>Existing Plans</Typography>

            <PlansContentFactory
              pageStatus={pageStatus}
              plans={plans}
              onRetry={handleRetry}
              onEdit={openEdit}
              onDelete={openDelete}
            />

          </Stack>
        </Stack>
      </Container>

      <EditPlanDialog
        open={editOpen}
        plan={editPlan}
        onClose={closeEdit}
        onSubmit={handleEdit}
      />
      <DeleteDialog
        plan={deletePlan}
        open={deleteOpen}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onClose={() => !deleteLoading && closeDelete()}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={closeSnackbar} variant='filled'>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
