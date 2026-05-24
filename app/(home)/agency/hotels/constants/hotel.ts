import type { TFunction } from 'i18next'

export const getHotelSteps = (t: TFunction) => [
  { label: t('agencyHotels.stepper.basicInfo', 'Basic info'),  description: t('agencyHotels.stepper.basicInfoDesc', 'Hotel details') },
  { label: t('agencyHotels.stepper.branding', 'Branding'),    description: t('agencyHotels.stepper.brandingDesc', 'Logo & theme') },
  { label: t('agencyHotels.stepper.manager', 'Manager'),      description: t('agencyHotels.stepper.managerDesc', 'Select from team') },
]

/** @deprecated Use getHotelSteps(t) instead */
export const HOTEL_STEPS = [
  { label: "Basic info",  description: "Hotel details" },
  { label: "Branding",    description: "Logo & theme"  },
  { label: "Manager",     description: "Select from team"  },
] as const;

export type StepIndex = 0 | 1 | 2;

export const DEFAULT_CANCELLATION_FEE_RATE = 0.4

export const DEFAULT_HOTELS_PAGE_SIZE = 9
