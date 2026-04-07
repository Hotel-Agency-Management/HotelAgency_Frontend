// components/ui/IconButton.tsx
import { IconButton as MuiIconButton, IconButtonProps } from '@mui/material'

interface Props extends Omit<IconButtonProps, 'variant'> {
  variant?: 'amenity' 
}

const IconButton = ({ ...props }: Props) => {
  return <MuiIconButton {...(props as IconButtonProps)} />
}

export default IconButton
