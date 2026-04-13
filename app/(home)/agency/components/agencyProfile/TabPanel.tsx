import Box from "@mui/material/Box"

export function TabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode
  value: number
  index: number
}) {
  return (
    <Box hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </Box>
  )
}
