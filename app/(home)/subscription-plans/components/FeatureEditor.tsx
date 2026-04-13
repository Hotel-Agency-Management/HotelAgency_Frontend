import {
  Box,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Button,
  Typography,
  Divider,
  Tooltip,
} from '@mui/material'
import { Add, DeleteOutline } from '@mui/icons-material'
import { FeatureLimit, PlanFeature } from '../types/plans'
import { generateId, makeEmptyFeature } from '../util/plans'
import { updateFeature } from '../util/updateFeature'


interface FeatureEditorProps {
  features: PlanFeature[]
  errors?: Record<string, string>
  onChange: (features: PlanFeature[]) => void
}

export default function FeatureEditor({ features, errors = {}, onChange }: FeatureEditorProps) {
  const handleAdd = () => onChange([...features, makeEmptyFeature()])

  const handleRemove = (id: number) => onChange(features.filter(f => f.id !== id))

  const handleChange = (id: number, patch: Partial<PlanFeature>) =>
    onChange(updateFeature(features, id, patch))

  const handleLimitChange = (feature: PlanFeature, value: string) => {
    const primaryLimit = feature.featureLimits[0]
    const featureLimits: FeatureLimit[] =
      value === ''
        ? []
        : [
            {
              id: primaryLimit?.id ?? generateId(),
              limitValue: Number(value),
            },
          ]

    handleChange(feature.id, { featureLimits })
  }

  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='subtitle2' color='text.secondary'>
          Features
        </Typography>
        <Button
          size='small'
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{ textTransform: 'none' }}
        >
          Add Feature
        </Button>
      </Stack>

      {features.length === 0 && (
        <Typography variant='body2' color='text.disabled' sx={{ py: 2, textAlign: 'center' }}>
          No features yet. Click "Add Feature" to begin.
        </Typography>
      )}

      <Stack spacing={2}>
        {features.map((feature, index) => (
          <Box key={feature.id}>
            {index > 0 && <Divider />}

            <Stack spacing={1.5}>
              <Stack direction='row' alignItems='center' spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      size='small'
                      checked={feature.isEnabled}
                      onChange={e => handleChange(feature.id, { isEnabled: e.target.checked })}
                    />
                  }
                  label=''
                />

                <TextField
                  size='small'
                  fullWidth
                  placeholder='Feature name *'
                  value={feature.featureName}
                  onChange={e => handleChange(feature.id, { featureName: e.target.value })}
                  error={!!errors[feature.id]}
                  helperText={errors[feature.id]}
                />

                <Tooltip title='Remove feature'>
                  <span>
                    <IconButton
                      size='small'
                      onClick={() => handleRemove(feature.id)}
                      disabled={features.length === 1}
                      color='error'
                    >
                      <DeleteOutline fontSize='small' />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} pl={6}>
                <TextField
                  size='small'
                  fullWidth
                  type='number'
                  placeholder='Limit value (optional)'
                  value={feature.featureLimits[0]?.limitValue ?? ''}
                  onChange={e => handleLimitChange(feature, e.target.value)}
                  inputProps={{ min: 0 }}
                />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
