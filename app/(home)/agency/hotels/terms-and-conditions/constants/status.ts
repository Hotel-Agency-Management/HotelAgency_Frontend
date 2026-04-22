export const HOTEL_TERMS_STATUSES = {
  ACTIVE: "ACTIVE",
  DRAFT: "DRAFT",
} as const;

export const HOTEL_TERMS_STATUS_VALUES = [
  HOTEL_TERMS_STATUSES.ACTIVE,
  HOTEL_TERMS_STATUSES.DRAFT,
] as const;

export const HOTEL_TERMS_STATUS_OPTIONS = [
  { value: HOTEL_TERMS_STATUSES.ACTIVE, label: "Active" },
  { value: HOTEL_TERMS_STATUSES.DRAFT, label: "Draft" },
] as const;
