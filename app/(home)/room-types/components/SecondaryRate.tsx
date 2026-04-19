import { Box, Typography } from "@mui/material";
import { formatPrice } from "../../agency/hotels/[hotelId]/rooms/util/formatters";

export function SecondaryRate({ label, value, currency }: { label: string; value: number; currency: string }) {
  return (
    <Box>
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ textTransform: 'uppercase', fontWeight: 700 }}
      >
        {label}
      </Typography>
      <Typography variant='subtitle2' fontWeight={600}>
        {formatPrice(value, currency)}
      </Typography>
    </Box>
  )
}
