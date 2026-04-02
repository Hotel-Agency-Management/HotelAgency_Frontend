'use client'

// ** React Imports
import { createContext, useState, ReactNode, useEffect } from 'react'

// ** MUI Imports
import { Direction } from '@mui/material'

// ** ThemeConfig Import
import themeConfig from '../configs/themeConfig'
import {
  DEFAULT_BRANDING_SIGNATURE,
  DEFAULT_BRANDING_SETTINGS,
  isDefaultBrandingSettings,
  sanitizeBrandingSettings,
  type BrandingSettings
} from '../theme/palette/branding'

// ** Types Import
import { Mode, ThemeColor } from '../layouts/types'
import { Locale } from '../configs/i18n'

export type Settings = {
  mode: Mode
  direction: Direction
  themeColor: ThemeColor
  language: Locale
  branding: BrandingSettings
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  sidebarCollapsed?: boolean
}

export type PageSpecificSettings = {
  mode?: Mode
  direction?: Direction
  themeColor?: ThemeColor
  branding?: Partial<BrandingSettings>
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
}

interface SettingsProviderProps {
  children: ReactNode
  pageSettings?: PageSpecificSettings | void
}

type BrandingSource = 'default' | 'custom'

type StoredSettings = Partial<Settings> & {
  __brandingDefaultsSignature?: string
  __brandingSource?: BrandingSource
}

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  direction: themeConfig.direction,
  language: 'en',
  branding: DEFAULT_BRANDING_SETTINGS,
  toastPosition: themeConfig.toastPosition
}

const normalizeSettings = (value?: Partial<Settings> | PageSpecificSettings | null): Settings => ({
  ...initialSettings,
  ...value,
  branding: sanitizeBrandingSettings(value?.branding),
  toastPosition: initialSettings.toastPosition
})

const getBrandingSource = (branding: BrandingSettings): BrandingSource =>
  isDefaultBrandingSettings(branding) ? 'default' : 'custom'

const normalizeStoredSettings = (value?: StoredSettings | null): Settings => {
  const normalized = normalizeSettings(value)

  // Legacy entries were saved before branding metadata existed.
  // Reset them once so updated defaults take effect automatically.
  if (!value?.__brandingDefaultsSignature) {
    return normalizeSettings({ ...normalized, branding: DEFAULT_BRANDING_SETTINGS })
  }

  if (value.__brandingDefaultsSignature !== DEFAULT_BRANDING_SIGNATURE && value.__brandingSource !== 'custom') {
    return normalizeSettings({ ...normalized, branding: DEFAULT_BRANDING_SETTINGS })
  }

  return normalized
}

const restoreSettings = (): Settings => {
  try {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('settings')
      if (stored) return normalizeStoredSettings(JSON.parse(stored) as StoredSettings)
    }
  } catch {}

  return initialSettings
}

const storeSettings = (settings: Settings) => {
  const normalizedSettings = normalizeSettings(settings)
  const storableSettings: StoredSettings = {
    ...normalizedSettings,
    __brandingDefaultsSignature: DEFAULT_BRANDING_SIGNATURE,
    __brandingSource: getBrandingSource(normalizedSettings.branding)
  }

  delete storableSettings.toastPosition

  window.localStorage.setItem('settings', JSON.stringify(storableSettings))
}

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children, pageSettings }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>(() => restoreSettings())

  useEffect(() => {
    const restored = restoreSettings()
    const next = pageSettings ? normalizeSettings({ ...restored, ...pageSettings }) : restored

    setSettings(next)
  }, [pageSettings])

  const saveSettings = (updatedSettings: Settings) => {
    const normalizedSettings = normalizeSettings(updatedSettings)

    storeSettings(normalizedSettings)
    setSettings(normalizedSettings)
  }

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
