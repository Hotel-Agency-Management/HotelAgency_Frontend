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
import { useTranslation } from 'react-i18next'
import StatusChip from './StatusChip'
import { br } from '@/core/utils/themeUtils'
import { AgencyRequest } from '.'
import { ActionType } from '../types/agency'
import { DetailItem } from './DetailItem'
import { fromNow } from '@/core/utils/Dateutils'
import LtrText from '@/components/ui/LtrText'
import { AGENCY_STATUS } from '@/components/auth/types/authType'

interface DetailDrawerProps {
  request: AgencyRequest | null
  open: boolean
  onClose: () => void
  onAction: (request: AgencyRequest, action: ActionType) => void
}

export default function DetailDrawer({ request, open, onClose, onAction }: DetailDrawerProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  if (!request) return null

  const isPending = request.status === AGENCY_STATUS.PENDING
  const formattedDate = fromNow(request.submittedAt)

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
    >
      <Stack sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={2}
          sx={{ p: 3 }}
        >
          <Typography variant='subtitle1' fontWeight={700}>
            {t('agencyApproval.drawer.title', 'Agency Details')}
          </Typography>

          <IconButton size='small' onClick={onClose} sx={{ borderRadius: br(theme) }}>
            <X size={18} />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        <Stack spacing={4} sx={{ p:3 }}>
          <Stack
            spacing={2}
            sx={{
              background: `linear-gradient(135deg, ${alpha(request.avatarColor, 0.06)} 0%, transparent 60%)`,
            }}
          >
            <Stack direction='row' gap={2.5} alignItems='center'>
              <Avatar variant='brand' color={request.avatarColor}>
                {request.logoInitials}
              </Avatar>

              <Stack spacing={0.75}>
                <Typography
                  variant='h6'
                  fontWeight={800}
                >
                  {request.agencyName}
                </Typography>

                <StatusChip status={request.status} />
              </Stack>
            </Stack>

            <Typography
              variant='body2'
            >
              {request.description}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <Typography
              variant='overline'
              color='text.disabled'
            >
              {t('agencyApproval.drawer.contactInfo', 'Contact Information')}
            </Typography>

            <Stack spacing={2.5}>
              <DetailItem icon={<Mail size={15} />} label={t('agencyApproval.drawer.ownerContact', 'Owner / Contact')} value={request.ownerName} />
              <DetailItem icon={<Mail size={15} />} label={t('agencyApproval.drawer.emailAddress', 'Email Address')} value={request.email} />
              <DetailItem icon={<Phone size={15} />} label={t('agencyApproval.drawer.phoneNumber', 'Phone Number')} value={<LtrText>{request.phone}</LtrText>} />
              <DetailItem icon={<MapPin size={15} />} label={t('agencyApproval.drawer.location', 'Location')} value={request.location} />
              {request.website && (
                <DetailItem icon={<Globe size={15} />} label={t('agencyApproval.drawer.website', 'Website')} value={request.website} />
              )}
              {request.registrationNumber && (
                <DetailItem icon={<IdCard size={15} />} label={t('agencyApproval.drawer.registrationNo', 'Registration No.')} value={request.registrationNumber} />
              )}
              <DetailItem icon={<Calendar size={15} />} label={t('agencyApproval.drawer.submittedOn', 'Submitted On')} value={formattedDate} />
            </Stack>
          </Stack>

          {isPending && (
            <>
              <Divider />

              <Stack spacing={3}>
                <Typography
                  variant='overline'
                  color='text.disabled'
                >
                  {t('agencyApproval.drawer.actions', 'Actions')}
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
                    {t('agencyApproval.drawer.approveRegistration', 'Approve Registration')}
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
                    {t('agencyApproval.drawer.rejectRegistration', 'Reject Registration')}
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
