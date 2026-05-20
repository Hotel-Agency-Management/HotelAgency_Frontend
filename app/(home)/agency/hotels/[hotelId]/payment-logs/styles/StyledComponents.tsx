import { Badge, Box, Card, Drawer } from '@mui/material'
import { PaletteColor, styled } from '@mui/material/styles'

export const PaymentLogCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  padding: theme.spacing(2.5),
  cursor: 'pointer',
  borderColor: selected
    ? theme.palette.primary.main
    : theme.palette.divider,
  backgroundColor: selected
    ? theme.palette.action.selected
    : theme.palette.background.paper,
  transition: 'border-color 0.15s, background-color 0.15s',

  '&:hover': {
    borderColor: theme.palette.primary.light,
  },
}))

export const PaymentDrawerPaper = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 420,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}))

export const DateGroupHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.caption,
  fontWeight: 700,
  color: theme.palette.text.disabled,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: theme.spacing(1.5, 2, 0.5),
}))

export const TimelineDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.success.main : theme.palette.divider,
  flexShrink: 0,
  marginTop: 5,
}))

export const TimelineConnector = styled(Box)(({ theme }) => ({
  width: 2,
  flex: 1,
  minHeight: 24,
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(0.5, 0),
  alignSelf: 'center',
}))

export const PaymentSummaryCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== '$active' && prop !== '$palette',
})<{
  $active?: boolean
  $palette: PaletteColor
}>(({ theme, $active, $palette }) => ({
  padding: theme.spacing(2.5),
  borderColor: $active ? $palette.main : theme.palette.divider,
  borderWidth: $active ? 2 : 1,
  transition: 'border-color 0.2s',
}))

export const StatusDotBadge = styled(Badge, {
  shouldForwardProp: prop => prop !== '$color',
})<{ $color: string }>(({ $color }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: $color,
  },
}))
