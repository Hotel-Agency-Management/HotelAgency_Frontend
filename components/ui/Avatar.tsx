// components/ui/Avatar.tsx
import { Avatar as MuiAvatar, AvatarProps } from '@mui/material'

interface Props extends Omit<AvatarProps, 'variant'> {
  variant?: AvatarProps['variant'] | 'profileLarge'
}

const Avatar = ({ ...props }: Props) => {
  return <MuiAvatar {...(props as AvatarProps)} />
}

export default Avatar
