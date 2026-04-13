import { FeatureLimit } from "../configs/planConfig"

/** Format feature limits as a comma-separated string or '-' if empty */
export const formatFeatureLimits = (featureLimits: FeatureLimit[]): string => {
  if (!featureLimits || featureLimits.length === 0) {
    return '-'
  }

  return featureLimits
    .map(limit => limit.limitValue)
    .join(', ')
}
