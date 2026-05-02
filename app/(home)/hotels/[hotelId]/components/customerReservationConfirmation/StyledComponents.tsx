import { Box, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ConfirmationHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
}))

export const ConfirmationBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflow: 'auto',
}))

export const ConfirmationActions = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2, 3),
}))

export const ConfirmationSpacer = styled(Box)({
  flex: 1,
})

export const SignaturePadContainer = styled(Stack)(({ theme }) => ({
  '& > .MuiPaper-root': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
  },
}))

export const SignaturePreview = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 110,
  objectFit: 'contain',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(1),
}))
