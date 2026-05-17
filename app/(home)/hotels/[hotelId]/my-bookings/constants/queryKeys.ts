export const CUSTOMER_RESERVATION_QUERY_KEYS = {
  list: () => ['customer-my-reservations'] as const,
  detail: (id: number) => ['customer-my-reservations', id] as const,
}
