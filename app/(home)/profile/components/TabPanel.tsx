import { Box } from '@mui/material'
import { FadeIn } from '@/components/animation'

interface TabPanelProps {
  value: number
  index: number
  children: React.ReactNode
}

export function TabPanel({ value, index, children }: TabPanelProps) {
  return value === index ? (
    <FadeIn direction='up' distance={12} transition={{ duration: 0.2 }}>
      <Box sx={{ pt: 3 }}>{children}</Box>
    </FadeIn>
  ) : null
}
