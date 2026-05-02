import { styled } from '@mui/material/styles'
import { Tabs } from '@mui/material'

export const BorderedTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}))
