export const formatReviewCount = (reviews: number) =>
  new Intl.NumberFormat('en-US', {
    notation: reviews >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(reviews)
