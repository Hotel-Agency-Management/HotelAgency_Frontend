'use client'

import type { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import { Menu as MenuIcon } from 'lucide-react'
import type { NavbarLink } from './Navbar.types'
import {
  TopNavbarBrandGroup,
  TopNavbarButton,
  TopNavbarLinkGroup,
  TopNavbarMobileMenuButton,
  TopNavbarRoot,
} from './Navbar.styles'

interface TopNavbarContentProps {
  activePath: string | null
  brand: ReactNode
  isMobile: boolean
  navLinks: NavbarLink[]
  rightActions: ReactNode
  scrolled: boolean
  onMobileMenuOpen: (anchor: HTMLElement) => void
  onNavigate: (path: string) => void
}

export function TopNavbarContent({
  activePath,
  brand,
  isMobile,
  navLinks,
  rightActions,
  scrolled,
  onMobileMenuOpen,
  onNavigate,
}: TopNavbarContentProps) {
  return (
    <TopNavbarRoot
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      spacing={1.5}
      scrolled={scrolled}
    >
      <TopNavbarBrandGroup direction='row' alignItems='center' spacing={1.5}>
        {isMobile && navLinks.length > 0 && (
          <TopNavbarMobileMenuButton
            onClick={event => onMobileMenuOpen(event.currentTarget)}
            size='small'
          >
            <MenuIcon size={18} />
          </TopNavbarMobileMenuButton>
        )}
        {brand}
      </TopNavbarBrandGroup>

      {!isMobile && (
        <TopNavbarLinkGroup
        >
          {navLinks.map(item => {
            const isActive = item.path === activePath

            return (
              <TopNavbarButton
                key={item.path}
                active={isActive}
                size='small'
                onClick={() => onNavigate(item.path)}
                startIcon={item.icon ? <Icon icon={item.icon} width={17} height={17} /> : undefined}
              >
                {item.title}
              </TopNavbarButton>
            )
          })}
        </TopNavbarLinkGroup>
      )}

      {rightActions}
    </TopNavbarRoot>
  )
}
