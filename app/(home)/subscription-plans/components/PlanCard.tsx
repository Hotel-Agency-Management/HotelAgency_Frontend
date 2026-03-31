import {
  Card,
  CardContent,
  CardActions,
  Stack,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material'

import { Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react'
import type { SubscriptionPlan } from '../types/plans'
import { formatPrice } from '../util/plans'

interface PlanCardProps {
  plan: SubscriptionPlan
  onEdit: (plan: SubscriptionPlan) => void
  onDelete: (plan: SubscriptionPlan) => void
}

export default function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  const theme = useTheme()

  return (
    <Card
      variant='outlined'
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack
          direction='row'
          alignItems='flex-start'
          justifyContent='space-between'
          mb={1}
        >
          <Stack spacing={2}>
            <Typography variant='h6' fontWeight={700}>
              {plan.name}
            </Typography>

            <Typography variant='body2'>
              {formatPrice(plan.price, plan.billingCycle, plan.customBillingLabel)}
            </Typography>
          </Stack>

          <Chip
            label={plan.isActive ? 'Active' : 'Inactive'}
            size='small'
            color={plan.isActive ? 'success' : 'default'}
            variant='outlined'
          />
        </Stack>

        <Typography
          variant='body2'>
          {plan.description}
        </Typography>

        <Divider />

        <List dense disablePadding>
          {plan.features.map(feature => (
            <ListItem key={feature.id} disablePadding sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                {feature.enabled ? (
                  <CheckCircle
                    size={16}
                    color={theme.palette.success.main}
                  />
                ) : (
                  <XCircle
                    size={16}
                    color={theme.palette.text.disabled}
                  />
                )}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Stack direction='row' alignItems='center' spacing={0.75}>
                    <Typography
                      variant='body2'
                      color={
                        feature.enabled ? 'text.primary' : 'text.disabled'
                      }
                    >
                      {feature.name}
                    </Typography>

                    {feature.limit && (
                      <Chip
                        label={feature.limit}
                        size='small'
                        sx={{ height: 18, fontSize: '0.65rem' }}
                      />
                    )}
                  </Stack>
                }
                secondary={
                  feature.description ? (
                    <Typography variant='caption' color='text.disabled'>
                      {feature.description}
                    </Typography>
                  ) : undefined
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, py: 1 }}>
        <Tooltip title='Edit plan'>
          <IconButton size='small' onClick={() => onEdit(plan)}>
            <Pencil size={16} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Delete plan'>
          <IconButton
            size='small'
            color='error'
            onClick={() => onDelete(plan)}
          >
            <Trash2 size={16} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
