import { MenuItem as MuiMenuItem, MenuItemProps } from '@mui/material'

interface Props extends Omit<MenuItemProps, 'variant'> {
  variant?: 'default' | 'danger'
}

const MenuItem = ({ ...props }: Props) => {
  return <MuiMenuItem {...(props as MenuItemProps)} />
}

export default MenuItem
