import { Card as MuiCard, CardProps } from '@mui/material'

interface Props extends Omit<CardProps, 'variant'> {
  variant?: CardProps['variant'] | 'hotel'
}

const Card = ({ ...props }: Props) => {
  return <MuiCard {...(props as CardProps)} />
}

export default Card
