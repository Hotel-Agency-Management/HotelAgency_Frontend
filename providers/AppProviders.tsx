'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SettingsProvider } from '@/core/context/SettingsContext'
import ThemeComponent from '@/core/theme/ThemeComponent'
import I18nProvider from '@/providers/I18nProvider'
import HydrationGate from '@/components/wrappers/HydrationGate'
import { useSettings } from '@/core/hooks/useSettings'
import Spinner from '@/components/loaders/Spinner'
import { AuthProvider } from '@/core/context/AuthContext'
import MSWProvider from '@/providers/MSWProvider'
import AppToaster from '@/providers/AppToaster'
import '@/core/icons/customIcons'

function InnerProviders({ children, client }: { children: React.ReactNode; client: QueryClient }) {
  const { settings } = useSettings()

  return (
    <QueryClientProvider client={client}>
      <ThemeComponent settings={settings}>
        <I18nProvider>
          <HydrationGate fallback={<Spinner />}>{children}</HydrationGate>
          <AppToaster />
        </I18nProvider>
      </ThemeComponent>
    </QueryClientProvider>
  )
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())

  return (
    <MSWProvider>
      <AuthProvider>
        <SettingsProvider>
          <InnerProviders client={client}>{children}</InnerProviders>
        </SettingsProvider>
      </AuthProvider>
    </MSWProvider>
  )
}
