import { styled } from "@mui/material/styles";
import { Card, IconButton, Typography } from "@mui/material";

export const FileCard = styled(Card, {
  shouldForwardProp: (p) => p !== 'canOpen',
})<{ canOpen: boolean }>(({ canOpen }) => ({
  cursor: canOpen ? 'pointer' : 'default',
  position: 'relative',
  height: '100%',
}));

export const EditButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 4,
  right: 4,
  opacity: 0,
  transition: 'opacity 0.2s',
  zIndex: 1,
}))

export const FileName = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-word',
}))
