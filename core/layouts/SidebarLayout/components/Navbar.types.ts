import type { ReactNode } from 'react'
import type { SidebarNavItems } from '@/core/layouts/types'

export interface NavbarLink {
  path: string
  title: string
  icon?: string
}

export interface NavbarProps {
  appBarRight?: ReactNode
  appName?: string
  logo?: ReactNode
  navItems?: SidebarNavItems
  variant?: 'sidebar' | 'top-nav'
}
