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
  Grid,
} from '@mui/material'
import {
  ArrowRight,
} from 'lucide-react'
import type { AgencyRequest, ActionType } from '../types/agency'
import StatusChip from './StatusChip'
import Avatar from '@/components/ui/Avatar'
import { InfoRow } from './InfoRow'
import { AGENCY_INFO_FIELDS } from '../constants/agencyConfig'
import AgencyCardActions from './AgencyCardActions'
import { fromNow } from '@/core/utils/Dateutils'
import { AGENCY_STATUS } from '@/components/auth/types/authType'

interface AgencyCardProps {
  request: AgencyRequest
  onAction: (request: AgencyRequest, action: ActionType) => void
  onViewDetails: (request: AgencyRequest) => void
}

export default function AgencyCard({ request, onAction, onViewDetails }: AgencyCardProps) {
  const theme = useTheme()
  const isPending = request.status === AGENCY_STATUS.PENDING

  const formattedDate = fromNow(request.submittedAt)

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

      <CardContent>
        <Stack gap={2}>
        <Stack direction='row' alignItems='flex-start' justifyContent='space-between' spacing={2} >
          <Stack direction='row' alignItems='center' spacing={2} sx={{ minWidth: 0 }}>
            <Avatar variant="user" color={request.avatarColor}>
              {request.logoInitials}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant='subtitle1'
                fontWeight={700}
                noWrap
              >
                {request.agencyName}
              </Typography>
              {request.registrationNumber && (
                <Typography
                  variant='caption'
                >
                  {request.registrationNumber}
                </Typography>
              )}
            </Box>
          </Stack>

          <StatusChip status={request.status} />
        </Stack>

        <Stack spacing={2}>
          <Typography
            variant='body2'
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {request.description}
          </Typography>

          <Stack gap={2}>
            <Grid container spacing={1}>
              {AGENCY_INFO_FIELDS.map(({ key, icon: Icon }) => (
                <Grid key={key} size={{ xs: 12, sm: 6 }} >
                  <InfoRow
                    icon={<Icon size={14} />}
                    value={request[key]}
                  />
                </Grid>
              ))}
            </Grid>
            <Divider />
          </Stack>
        </Stack>
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' alignItems='center' spacing={0.75}>
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
              <AgencyCardActions
              request={request}
              onAction={onAction}
            />
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
