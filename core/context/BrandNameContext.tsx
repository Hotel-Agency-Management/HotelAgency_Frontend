'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useBrandName, type BrandNameState } from '@/core/hooks/useBrandName'
import themeConfig from '@/core/configs/themeConfig'

const defaultValue: BrandNameState = {
  brandName: themeConfig.templateName,
  isLoading: false,
}

const BrandNameContext = createContext<BrandNameState>(defaultValue)

export function BrandNameProvider({ children }: { children: ReactNode }) {
  const value = useBrandName()
  return <BrandNameContext.Provider value={value}>{children}</BrandNameContext.Provider>
}

export function useBrandNameContext(): BrandNameState {
  return useContext(BrandNameContext)
}
