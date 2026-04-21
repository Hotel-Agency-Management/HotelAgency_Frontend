export const parsePositiveNumber = (value: string, fallback: number) => {
  const nextValue = Number(value)

  if (!Number.isFinite(nextValue) || nextValue < 1) {
    return fallback
  }

  return Math.round(nextValue)
}
