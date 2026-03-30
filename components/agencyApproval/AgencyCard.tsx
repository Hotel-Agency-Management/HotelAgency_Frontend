import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Button,
  Tooltip,
  useTheme,
} from '@mui/material'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import type { AgencyRequest, ActionType } from './types'
import StatusChip from './StatusChip'
import { formatShortDate } from '@/core/utils/Dateutils'
import Avatar from '../ui/Avatar'

interface AgencyCardProps {
  request: AgencyRequest
  onAction: (request: AgencyRequest, action: ActionType) => void
  onViewDetails: (request: AgencyRequest) => void
}

interface InfoRowProps {
  icon: React.ReactNode
  value: string
}

function InfoRow({ icon, value }: InfoRowProps) {
  const theme = useTheme()
  return (
    <Stack direction='row' alignItems='center' spacing={1} sx={{ minWidth: 0 }}>
      <Stack
        sx={{
          color: theme.palette.text.disabled,
          flexShrink: 0,
        }}
      >
        {icon}
      </Stack>
      <Typography
        variant='body2'
        color='text.secondary'
        noWrap
        sx={{ fontSize: '0.8rem', fontWeight: 400 }}
      >
        {value}
      </Typography>
    </Stack>
  )
}

export default function AgencyCard({ request, onAction, onViewDetails }: AgencyCardProps) {
  const theme = useTheme()
  const isPending = request.status === 'pending'

  const formattedDate = formatShortDate(request.submittedAt)

  return (
    <Card>
      {isPending && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: theme.spacing(3),
            bottom: theme.spacing(3),
            width: 3,
            borderRadius: '0 2px 2px 0',
            bgcolor: theme.palette.warning.main,
          }}
        />
      )}

      <CardContent sx={{ p: theme.spacing(3), '&:last-child': { pb: theme.spacing(3) } }}>
        <Stack direction='row' alignItems='flex-start' justifyContent='space-between' spacing={2} mb={2}>
          <Stack direction='row' alignItems='center' spacing={2} sx={{ minWidth: 0 }}>
            <Avatar variant="user" color={request.avatarColor}>
              {request.logoInitials}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant='subtitle1'
                fontWeight={700}
                noWrap
                sx={{
                  fontSize: '0.95rem',
                }}
              >
                {request.agencyName}
              </Typography>
              {request.registrationNumber && (
                <Typography
                  variant='caption'
                  sx={{ fontSize: '0.7rem' }}
                >
                  {request.registrationNumber}
                </Typography>
              )}
            </Box>
          </Stack>

          <StatusChip status={request.status} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              fontSize: '0.82rem',
              lineHeight: 1.65,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {request.description}
          </Typography>

          <Stack spacing={2}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 1,
              }}
            >
              <InfoRow icon={<User size={14} />} value={request.ownerName} />
              <InfoRow icon={<Mail size={14} />} value={request.email} />
              <InfoRow icon={<Phone size={14} />} value={request.phone} />
              <InfoRow icon={<MapPin size={14} />} value={request.location} />
            </Box>
            <Divider />
          </Stack>
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' alignItems='center' spacing={0.75}>
            <Calendar size={12} color={theme.palette.text.disabled} />
            <Typography variant='caption' color='text.disabled' sx={{ fontSize: '0.72rem' }}>
              Submitted {formattedDate}
            </Typography>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={1}>
            <Tooltip title='View full details' placement='top'>
              <Button
                size='small'
                variant='text'
                endIcon={<ArrowRight size={13} />}
                onClick={() => onViewDetails(request)}
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Details
              </Button>
            </Tooltip>

            {isPending && (
              <>
                <Divider orientation='vertical' flexItem sx={{ height: 20, alignSelf: 'center' }} />

                <Tooltip title='Reject this agency' placement='top'>
                  <Button
                    size='small'
                    variant='outlined'
                    startIcon={<XCircle size={14} />}
                    onClick={() => onAction(request, 'reject')}
                    color='error'
                  >
                    Reject
                  </Button>
                </Tooltip>

                <Tooltip title='Approve this agency' placement='top'>
                  <Button
                    size='small'
                    variant='contained'
                    startIcon={<CheckCircle size={14} />}
                    onClick={() => onAction(request, 'approve')}
                    color='success'
                  >
                    Approve
                  </Button>
                </Tooltip>
              </>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
