import type { SxProps, Theme } from '@mui/material'

export const cardSx = (canOpenFile: boolean): SxProps<Theme> => ({
  cursor: canOpenFile ? 'pointer' : 'default',
  position: 'relative',
  height: '100%',
})

export const editButtonSx: SxProps<Theme> = {
  position: 'absolute',
  top: 4,
  right: 4,
  opacity: 0,
  transition: 'opacity 0.2s',
  boxShadow: 1,
  zIndex: 1,
}

export const cardContentSx: SxProps<Theme> = {
  height: '100%',
}

export const fileNameSx: SxProps<Theme> = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-word',
}

export const hiddenInputStyle: React.CSSProperties = {
  display: 'none',
}
