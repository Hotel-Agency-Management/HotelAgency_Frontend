import {
  Stack,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import type { PlanFormValues, SubscriptionPlan } from '../types/plans'
import FeatureEditor from './FeatureEditor'
import { makeEmptyForm, FormErrors, validatePlanForm, hasErrors } from '../util/plans'
import { BILLING_OPTIONS } from '../constants/billingOptions'

interface PlanFormProps {
  initial?: SubscriptionPlan
  onSubmit: (values: PlanFormValues) => Promise<void>
  onCancel?: () => void
  submitLabel?: string
}


export default function PlanForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = 'Save Plan',
}: PlanFormProps) {
  const [values, setValues] = useState<PlanFormValues>(
    initial
      ? {
          name: initial.name,
          description: initial.description,
          price: initial.price,
          billingCycle: initial.billingCycle,
          customBillingLabel: initial.customBillingLabel ?? '',
          isActive: initial.isActive,
          features: initial.features,
        }
      : makeEmptyForm(),
  )
  const [errors, setErrors]     = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const set = <K extends keyof PlanFormValues>(key: K, value: PlanFormValues[K]) => {
    setValues(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async () => {
    const errs = validatePlanForm(values)
    if (hasErrors(errs)) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant='subtitle2' color='text.secondary'>
          Basic Information
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label='Plan Name'
            fullWidth
            required
            value={values.name}
            onChange={e => set('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            placeholder='e.g. Pro'
          />

          <FormControlLabel
            control={
              <Switch
                checked={values.isActive}
                onChange={e => set('isActive', e.target.checked)}
              />
            }
            label='Active'
            sx={{ whiteSpace: 'nowrap', ml: 0 }}
          />
        </Stack>

        <TextField
          label='Description'
          fullWidth
          required
          multiline
          minRows={2}
          value={values.description}
          onChange={e => set('description', e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          placeholder='Brief description of what this plan offers'
        />
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography variant='subtitle2' color='text.secondary'>
          Pricing
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            select
            label='Billing Cycle'
            value={values.billingCycle}
            onChange={e => set('billingCycle', e.target.value as PlanFormValues['billingCycle'])}
            sx={{ minWidth: 160 }}
          >
            {BILLING_OPTIONS.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          {values.billingCycle !== 'custom' ? (
            <TextField
              label='Price (USD)'
              type='number'
              fullWidth
              value={values.price}
              onChange={e => set('price', Number(e.target.value))}
              error={!!errors.price}
              helperText={errors.price}
              inputProps={{ min: 0 }}
            />
          ) : (
            <TextField
              label='Billing Label'
              fullWidth
              required
              value={values.customBillingLabel}
              onChange={e => set('customBillingLabel', e.target.value)}
              error={!!errors.customBillingLabel}
              helperText={errors.customBillingLabel}
              placeholder='e.g. Contact Sales'
            />
          )}
        </Stack>
      </Stack>

      <Divider />

      <FeatureEditor
        features={values.features}
        errors={errors.features}
        onChange={features => set('features', features)}
      />

      <Divider />

      <Stack direction='row' spacing={1.5} justifyContent='flex-end'>
        {onCancel && (
          <Button variant='outlined' onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        )}
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} color='inherit' /> : undefined}
        >
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </Stack>
    </Stack>
  )
}
