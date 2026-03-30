import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material'
import { CheckCircle, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ActionType, ConfirmDialogState } from './types'

interface ConfirmDialogProps {
  state: ConfirmDialogState
  onConfirm: (action: ActionType) => void
  onClose: () => void
  isLoading: boolean
}

const ACTION_CONFIG: Record<
  ActionType,
  {
    title: string
    message: (name: string) => string
    confirmLabel: string
    colorKey: 'success' | 'error'
    Icon: LucideIcon
  }
> = {
  approve: {
    title: 'Approve Agency Registration',
    message: name =>
      `You are about to approve "${name}". They will receive an email notification and gain access to the platform immediately.`,
    confirmLabel: 'Approve',
    colorKey: 'success',
    Icon: CheckCircle,
  },
  reject: {
    title: 'Reject Agency Registration',
    message: name =>
      `You are about to reject "${name}". They will be notified by email. This action can be undone later if needed.`,
    confirmLabel: 'Reject',
    colorKey: 'error',
    Icon: XCircle,
  },
}

export default function ConfirmDialog({
  state,
  onConfirm,
  onClose,
  isLoading,
}: ConfirmDialogProps) {
  const theme = useTheme()
  const { open, action, request } = state

  if (!action || !request) return null

  const config = ACTION_CONFIG[action]
  const palette = theme.palette[config.colorKey]
  const Icon = config.Icon

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth='xs'
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          border: `1px solid ${theme.palette.divider}`,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction='row' alignItems='center' spacing={1.5}>
        <Avatar
          sx={{
            bgcolor: alpha(palette.main, 0.12),
            color: palette.main,
            width: 40,
            height: 40,
          }}
        >
          <Icon size={20} />
        </Avatar>
          <Typography
            variant='h6'
            fontWeight={700}
            sx={{ fontSize: '1rem'}}
          >
            {config.title}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack direction='row' spacing={1} alignItems='flex-start'>
          <Typography variant='body2' sx={{ lineHeight: 1.65, fontSize: '0.83rem' }}>
            {config.message(request.agencyName)}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions >
        <Button
          variant='outlined'
          size='small'
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={() => onConfirm(action)}
          size='small'
          disabled={isLoading}
          color={config.colorKey}
          sx={{
            fontWeight: 700,
          }}
        >
          {isLoading ? 'Processing…' : config.confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
