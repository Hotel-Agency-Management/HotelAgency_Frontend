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
import { formatFeatureLimits } from '../util/planFormatter'

interface PlanCardProps {
  plan: SubscriptionPlan
  onEdit: (plan: SubscriptionPlan) => void
  onDelete: (plan: SubscriptionPlan) => void
}

export default function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  const theme = useTheme()
  const isActive = plan.status === 'Active'

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
          spacing={1}
        >
          <Stack spacing={2}>
            <Typography variant='h6' fontWeight={700}>
              {plan.name}
            </Typography>

            <Typography variant='body2'>
              {formatPrice(plan.price)}
            </Typography>
          </Stack>

          <Chip
            label={plan.status}
            size='small'
            color={isActive ? 'success' : 'default'}
            variant='outlined'
          />
        </Stack>

        <Typography variant='body2'>
          {plan.description}
        </Typography>

        <Divider />

        <List dense disablePadding>
          {plan.planFeatures.map(feature => {
            const featureLimits = formatFeatureLimits(feature.featureLimits)

            return (
              <ListItem key={feature.id} disablePadding sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  {feature.isEnabled ? (
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
                          feature.isEnabled ? 'text.primary' : 'text.disabled'
                        }
                      >
                        {feature.featureName}
                      </Typography>

                      {featureLimits !== '-' && (
                        <Chip
                          label={featureLimits}
                          size='small'
                          sx={{ height: 18, fontSize: '0.65rem' }}
                        />
                      )}
                    </Stack>
                  }
                />
              </ListItem>
            )
          })}
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
