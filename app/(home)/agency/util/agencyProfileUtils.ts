import { AgencyProfile, FileItem } from '../types/agencyProfile'
import { AgencyProfileResponse } from '../configs/agencyProfileConfig'
import { resolveBrandingColors, sanitizeBrandingSettings, type BrandingSettings } from '@/core/theme/palette/branding'
import { EMPTY_PROFILE } from '../constants/agencyProfileConstants'
import { resolveProfileBlobUrl } from '@/core/constant/blobStorage'
import type { UploadAgencyDocumentResponse } from '@/components/auth/agency/configs/agencyDocumentsConfig'
import type { DocumentType } from '../constants/documentTypes'

export function resolveAgencyLogoUrl(logoUrl?: string | null): string | null {
  return resolveProfileBlobUrl(logoUrl)
}

export function mapAgencyProfile(profile?: AgencyProfileResponse): AgencyProfile {
  if (!profile) return EMPTY_PROFILE

  return {
    name: profile.name ?? '',
    phone: profile.phone ?? '',
    country: profile.country ?? '',
    city: profile.city ?? '',
    files: [],
    planId: profile.planId,
  }
}

export function mapDocumentToFileItem(doc: UploadAgencyDocumentResponse): FileItem {
  const url = resolveAgencyLogoUrl(doc.filePath ?? doc.url)
  const ext = url?.split('?')[0]?.split('.').pop()?.toLowerCase()
  const type = ext === 'pdf' ? 'application/pdf' : ext?.match(/^(png|jpe?g|gif|webp)$/) ? `image/${ext}` : 'application/octet-stream'

  return {
    id: String(doc.id),
    name: doc.documentType,
    documentType: doc.documentType as DocumentType,
    url: url ?? '',
    type,
  }
}

export function mapBrandingSettings(
  profile?: AgencyProfileResponse,
  fallback?: BrandingSettings
): BrandingSettings {
  return sanitizeBrandingSettings({
    logo: resolveAgencyLogoUrl(profile?.logoUrl) ?? fallback?.logo,
    colors: resolveBrandingColors({
      primary: profile?.primaryColor ?? fallback?.colors.primary,
      secondary: profile?.secondaryColor ?? fallback?.colors.secondary,
      tertiary: profile?.tertiaryColor ?? fallback?.colors.tertiary,
    }),
  })
}
