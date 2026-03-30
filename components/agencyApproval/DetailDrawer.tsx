import {
  Drawer,
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  IconButton,
  useTheme,
  Button,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import {
  X,
  Mail,
  Phone,
  MapPin,
  Globe,
  IdCard,
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import type { AgencyRequest, ActionType } from './types'
import StatusChip from './StatusChip'
import { formatFullDate } from '@/core/utils/Dateutils'
import { br } from '@/core/utils/themeUtils'
import { DetailItem } from './DetailItem'

interface DetailDrawerProps {
  request: AgencyRequest | null
  open: boolean
  onClose: () => void
  onAction: (request: AgencyRequest, action: ActionType) => void
}

export default function DetailDrawer({ request, open, onClose, onAction }: DetailDrawerProps) {
  const theme = useTheme()

  if (!request) return null

  const isPending = request.status === 'pending'
  const formattedDate = formatFullDate(request.submittedAt)

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 440 },
          border: 'none',
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Stack sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={2}
          sx={{ p: 3 }}
        >
          <Typography variant='subtitle1' fontWeight={700} sx={{ letterSpacing: '-0.01em' }}>
            Agency Details
          </Typography>

          <IconButton size='small' onClick={onClose} sx={{ borderRadius: br(theme) }}>
            <X size={18} />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        <Stack spacing={4} sx={{ px: 3, py: 3 }}>
          <Stack
            spacing={2}
            sx={{
              background: `linear-gradient(135deg, ${alpha(request.avatarColor, 0.06)} 0%, transparent 60%)`,
            }}
          >
            <Stack direction='row' spacing={2.5} alignItems='center'>
              <Avatar variant='brand' color={request.avatarColor}>
                {request.logoInitials}
              </Avatar>

              <Stack spacing={0.75}>
                <Typography
                  variant='h6'
                  fontWeight={800}
                  sx={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}
                >
                  {request.agencyName}
                </Typography>

                <StatusChip status={request.status} />
              </Stack>
            </Stack>

            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ lineHeight: 1.7, fontSize: '0.83rem' }}
            >
              {request.description}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography
              variant='overline'
              color='text.disabled'
              sx={{ fontSize: '0.65rem' }}
            >
              Contact Information
            </Typography>

            <Stack spacing={2.5}>
              <DetailItem icon={<Mail size={15} />} label='Owner / Contact' value={request.ownerName} />
              <DetailItem icon={<Mail size={15} />} label='Email Address' value={request.email} />
              <DetailItem icon={<Phone size={15} />} label='Phone Number' value={request.phone} />
              <DetailItem icon={<MapPin size={15} />} label='Location' value={request.location} />
              {request.website && (
                <DetailItem icon={<Globe size={15} />} label='Website' value={request.website} />
              )}
              {request.registrationNumber && (
                <DetailItem icon={<IdCard size={15} />} label='Registration No.' value={request.registrationNumber} />
              )}
              <DetailItem icon={<Calendar size={15} />} label='Submitted On' value={formattedDate} />
            </Stack>
          </Stack>

          {isPending && (
            <>
              <Divider />

              <Stack spacing={3}>
                <Typography
                  variant='overline'
                  color='text.disabled'
                  sx={{ fontSize: '0.65rem' }}
                >
                  Actions
                </Typography>

                <Stack spacing={1.5}>
                  <Button
                    fullWidth
                    variant='contained'
                    startIcon={<CheckCircle size={16} />}
                    onClick={() => {
                      onClose()
                      onAction(request, 'approve')
                    }}
                    color='success'
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    Approve Registration
                  </Button>

                  <Button
                    fullWidth
                    variant='outlined'
                    startIcon={<XCircle size={16} />}
                    onClick={() => {
                      onClose()
                      onAction(request, 'reject')
                    }}
                    color='error'
                  >
                    Reject Registration
                  </Button>
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </Drawer>
  )
}
