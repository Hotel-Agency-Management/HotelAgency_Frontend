import { IconButton, Stack } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

type ActionButtonColor = 'primary' | 'tertiary' | 'error'

interface ActionIconButtonProps {
  actionColor: ActionButtonColor
}

export const ActionsContainer = styled(Stack)(() => ({
  width: '100%',
}))

export const ActionIconButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== 'actionColor',
})<ActionIconButtonProps>(({ actionColor, theme }) => {
  const mainColor = theme.palette[actionColor].main

  return {
    color: mainColor,
    backgroundColor: alpha(mainColor, 0.1),
    '&:hover': {
      backgroundColor: alpha(mainColor, 0.18),
    },
  }
})
