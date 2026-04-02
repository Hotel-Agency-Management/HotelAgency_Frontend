import { Stack, Button, Box, useTheme } from '@mui/material'
import { br } from '@/core/utils/themeUtils'
import Badge from '@/components/landing/Badge'

interface TabItem<T> {
  label: string
  value: T
}

interface StatusFilterTabsProps<T> {
  tabs: TabItem<T>[]
  value: T
  pendingCount?: number
  onChange: (value: T) => void
}

export default function StatusFilterTabs<T extends string>({
  tabs,
  value,
  pendingCount = 0,
  onChange,
}: StatusFilterTabsProps<T>) {
  const theme = useTheme()

  return (
    <Stack direction='row' spacing={1} flexWrap='wrap'>
      {tabs.map(tab => {
        const isActive = value === tab.value

        return (
          <Button
            key={String(tab.value)}
            variant={isActive ? 'contained' : 'outlined'}
            size='small'
            onClick={() => onChange(tab.value)}
            sx={{
              borderRadius: br(theme, 1.5),
              px: { xs: 1.25, sm: 1.75 },
              py: 0.625,
              minWidth: 'fit-content',
              fontSize: '0.78rem',
              fontWeight: isActive ? 700 : 500,
            }}
          >
            <Stack direction='row' alignItems='center' spacing={0.75}>
              <Box component='span'>{tab.label}</Box>

              {tab.value === 'pending' && pendingCount > 0 && (
                <Badge label={pendingCount.toString()} variant='yellow' />
              )}
            </Stack>
          </Button>
        )
      })}
    </Stack>
  )
}
