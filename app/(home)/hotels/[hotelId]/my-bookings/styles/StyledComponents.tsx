import { Box, Card, CardContent, Paper, Stack, styled } from '@mui/material'

export const BookingCardRoot = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.2s, border-color 0.2s',
  '&:hover': {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}))

export const BookingCardHeader = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} ${theme.spacing(1.5)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const BookingCardBody = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)}`,
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}))

export const BookingCardFooter = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.spacing(2.5)} ${theme.spacing(2.5)}`,
}))

export const BookingCardIconBox = styled(Stack)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 6,
  backgroundColor: theme.palette.action.hover,
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const BookingHeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}14 0%, transparent 60%)`,
}))

export const BookingSectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  height: '100%',
}))

export const BookingSectionIconBadge = styled(Stack)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 6,
  backgroundColor: theme.palette.primary.main,
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.85,
  flexShrink: 0,
}))

export const BookingsLoadingBox = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 240,
})

export const BookingsEmptyState = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 320,
})

export const BookingsEmptyIconBox = styled(Stack)(({ theme }) => ({
  width: 72,
  height: 72,
  borderRadius: '50%',
  backgroundColor: theme.palette.action.hover,
  alignItems: 'center',
  justifyContent: 'center',
}))

interface BookingInfoValueProps {
  emphasized?: boolean
}

export const BookingInfoValue = styled(Box, {
  shouldForwardProp: prop => prop !== 'emphasized',
})<BookingInfoValueProps>(({ theme, emphasized }) => ({
  ...theme.typography.body2,
  fontWeight: emphasized ? 700 : 500,
  textAlign: 'right',
  color: emphasized ? theme.palette.primary.main : theme.palette.text.primary,
}))
