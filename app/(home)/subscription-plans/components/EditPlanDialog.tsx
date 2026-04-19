import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
  IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import PlanForm from './PlanForm'
import { SubscriptionPlan, PlanFormValues } from '../types/plans'

interface EditPlanDialogProps {
  open: boolean
  plan: SubscriptionPlan | null
  onClose: () => void
  onSubmit: (values: PlanFormValues) => Promise<void>
}

export default function EditPlanDialog({
  open,
  plan,
  onClose,
  onSubmit,
}: EditPlanDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            Edit Plan — {plan?.name}
          </Typography>

          <IconButton size="small" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>
      {plan && (
        <DialogContent dividers>
          <PlanForm
            key={plan.id}
            initial={plan}
            onSubmit={onSubmit}
            onCancel={onClose}
            submitLabel="Save Changes"
          />
        </DialogContent>
      )}
    </Dialog>
  )
}
