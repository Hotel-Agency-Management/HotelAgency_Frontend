import type { TFunction } from 'i18next'

export const getFeatureCards = (t: TFunction) => [
  {
    color: 'primary',
    icon: 'tabler:shield-check',
    title: t('terms.featureCards.guestProtection.title', { defaultValue: 'Guest Protection' }),
    description: t('terms.featureCards.guestProtection.description', {
      defaultValue: 'Define rules that protect both guests and your hotel from disputes.'
    })
  },
  {
    color: 'info',
    icon: 'tabler:scale',
    title: t('terms.featureCards.legalCompliance.title', { defaultValue: 'Legal Compliance' }),
    description: t('terms.featureCards.legalCompliance.description', {
      defaultValue: 'Stay aligned with local hospitality regulations and booking laws.'
    })
  },
  {
    color: 'warning',
    icon: 'tabler:building-estate',
    title: t('terms.featureCards.perHotelControl.title', { defaultValue: 'Per-Hotel Control' }),
    description: t('terms.featureCards.perHotelControl.description', {
      defaultValue: 'Each hotel under your agency can have its own tailored set of terms.'
    })
  },
  {
    color: 'success',
    icon: 'tabler:pencil-check',
    title: t('terms.featureCards.alwaysEditable.title', { defaultValue: 'Always Editable' }),
    description: t('terms.featureCards.alwaysEditable.description', {
      defaultValue: 'Draft, review, and activate updated terms whenever your policies change.'
    })
  }
]
