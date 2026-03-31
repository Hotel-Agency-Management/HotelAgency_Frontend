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
import { ConfirmDialogState, ActionType } from '../types/agency'
import { ACTION_CONFIG } from '../constants/actionConfig'

interface ConfirmDialogProps {
  state: ConfirmDialogState
  onConfirm: (action: ActionType) => void
  onClose: () => void
  isLoading: boolean
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
    >
      <DialogTitle>
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

      <DialogActions>
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
