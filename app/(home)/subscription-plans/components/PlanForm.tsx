import {
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Divider,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PLAN_LIST, type PlanFormState, type PlanFormValues, type SubscriptionPlan } from '../types/plans'
import FeatureEditor from './FeatureEditor'
import { FormErrors, validatePlanForm, hasErrors } from '../util/plans'
import { makeInitialFormState, makeEmptyFormState, toSubmitValues } from '../util/planFormMapper'

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
  submitLabel,
}: PlanFormProps) {
  const { t } = useTranslation()
  const resolvedSubmitLabel = submitLabel ?? t('subscriptionPlans.savePlan', { defaultValue: 'Save Plan' })
  const isCreateMode = !initial
  const [values, setValues] = useState<PlanFormState>(
    initial ? makeInitialFormState(initial) : makeEmptyFormState(),
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const set = <K extends keyof PlanFormState>(key: K, value: PlanFormState[K]) => {
    setValues(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async () => {
    const errs =
      values.price === ''
        ? { ...validatePlanForm(toSubmitValues(values)), price: 'Price is required' }
        : validatePlanForm(toSubmitValues(values))

    if (hasErrors(errs)) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    try {
      await onSubmit(toSubmitValues(values))

      if (isCreateMode) {
        setValues(makeEmptyFormState())
        setErrors({})
      }
    } catch {
      // The parent submit handler owns API error messaging.
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Stack gap={3}>
      <Stack spacing={2}>
        <Typography variant='subtitle2' color='text.secondary'>
          {t('subscriptionPlans.form.basicInfo', { defaultValue: 'Basic Information' })}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth required error={!!errors.name}>
              <InputLabel>Plan Name</InputLabel>

              <Select
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                label="Plan Name"
              >
                {PLAN_LIST.map((plan) => (
                  <MenuItem key={plan} value={plan}>
                    {plan}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{errors.name}</FormHelperText>
            </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={values.status === 'Active'}
                onChange={e => set('status', e.target.checked ? 'Active' : 'Inactive')}
              />
            }
            label={t('subscriptionPlans.form.active', { defaultValue: 'Active' })}
            sx={{ whiteSpace: 'nowrap', ml: 0 }}
          />
        </Stack>

        <TextField
          label={t('subscriptionPlans.form.description', { defaultValue: 'Description' })}
          fullWidth
          required
          multiline
          minRows={2}
          value={values.description}
          onChange={e => set('description', e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          placeholder={t('subscriptionPlans.form.descriptionPlaceholder', { defaultValue: 'Brief description of what this plan offers' })}
        />
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Typography variant='subtitle2' color='text.secondary'>
          {t('subscriptionPlans.form.pricing', { defaultValue: 'Pricing' })}
        </Typography>

        <TextField
          label={t('subscriptionPlans.form.price', { defaultValue: 'Price (USD)' })}
          type='number'
          fullWidth
          value={values.price}
          onChange={e => set('price', e.target.value === '' ? '' : Number(e.target.value))}
          error={!!errors.price}
          helperText={errors.price}
          inputProps={{ min: 0 }}
        />
      </Stack>

      <Divider />

      <FeatureEditor
        features={values.planFeatures}
        errors={errors.features}
        onChange={features => set('planFeatures', features)}
      />

      <Divider />

      <Stack direction='row' spacing={1.5} justifyContent='flex-end'>
        {onCancel && (
          <Button variant='outlined' onClick={onCancel} disabled={submitting}>
            {t('common.cancel', { defaultValue: 'Cancel' })}
          </Button>
        )}
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} color='inherit' /> : undefined}
        >
          {submitting ? t('subscriptionPlans.form.saving', { defaultValue: 'Saving…' }) : resolvedSubmitLabel}
        </Button>
      </Stack>
    </Stack>
  )
}
