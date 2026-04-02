export const DOCUMENT_TYPES = [
  "Commercial Registration",
  "Business License",
  "Tax Certificate",
  "Chamber of Commerce Certificate",
  "Agency Authorization Letter",
  "Owner ID / Passport",
  "Office Lease Agreement",
  "Insurance Certificate",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];
