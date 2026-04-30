export const HOTEL_STEPS = [
  { label: "Basic info",  description: "Hotel details" },
  { label: "Branding",    description: "Logo & theme"  },
  { label: "Manager",     description: "Select from team"  },
] as const;

export type StepIndex = 0 | 1 | 2;

export const DEFAULT_CANCELLATION_FEE_RATE = 0.4
