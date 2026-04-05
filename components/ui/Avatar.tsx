import { Avatar as MuiAvatar, AvatarProps } from '@mui/material'

interface Props extends Omit<AvatarProps, 'variant'> {
  variant?: AvatarProps['variant'] | 'profileLarge' | 'user' | 'soft' | 'brand'
}

const Avatar = ({ ...props }: Props) => {
  return <MuiAvatar {...(props as AvatarProps)} />
}

export default Avatar