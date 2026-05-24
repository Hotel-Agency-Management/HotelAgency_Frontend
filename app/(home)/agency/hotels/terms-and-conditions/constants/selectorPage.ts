import type { TFunction } from 'i18next'

export const FEATURE_CARDS = [
  {
    color: "primary",
    icon: "tabler:shield-check",
    title: "Guest Protection",
    description: "Define rules that protect both guests and your hotel from disputes.",
  },
  {
    color: "info",
    icon: "tabler:scale",
    title: "Legal Compliance",
    description: "Stay aligned with local hospitality regulations and booking laws.",
  },
  {
    color: "warning",
    icon: "tabler:building-estate",
    title: "Per-Hotel Control",
    description: "Each hotel under your agency can have its own tailored set of terms.",
  },
  {
    color: "success",
    icon: "tabler:pencil-check",
    title: "Always Editable",
    description: "Draft, review, and activate updated terms whenever your policies change.",
  },
];

export const getFeatureCards = (t: TFunction) => [
  {
    color: "primary",
    icon: "tabler:shield-check",
    title: t('terms.featureCards.guestProtection.title', 'Guest Protection'),
    description: t('terms.featureCards.guestProtection.description', 'Define rules that protect both guests and your hotel from disputes.'),
  },
  {
    color: "info",
    icon: "tabler:scale",
    title: t('terms.featureCards.legalCompliance.title', 'Legal Compliance'),
    description: t('terms.featureCards.legalCompliance.description', 'Stay aligned with local hospitality regulations and booking laws.'),
  },
  {
    color: "warning",
    icon: "tabler:building-estate",
    title: t('terms.featureCards.perHotelControl.title', 'Per-Hotel Control'),
    description: t('terms.featureCards.perHotelControl.description', 'Each hotel under your agency can have its own tailored set of terms.'),
  },
  {
    color: "success",
    icon: "tabler:pencil-check",
    title: t('terms.featureCards.alwaysEditable.title', 'Always Editable'),
    description: t('terms.featureCards.alwaysEditable.description', 'Draft, review, and activate updated terms whenever your policies change.'),
  },
];
