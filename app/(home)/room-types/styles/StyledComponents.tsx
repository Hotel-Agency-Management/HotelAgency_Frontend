import styled from "@emotion/styled"
import { Card, CardContent } from "@mui/material"

export const RoomTypeCardRoot = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export const RoomTypeCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 20
})
