'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Menu as MenuIcon } from 'lucide-react'
import useLanguage from '@/core/hooks/useLanguage'
import { useSidebar } from '../SidebarContext'
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '../Sidebar'
import { SidebarUtils } from '../utils/SidebarUtils'
import { useAbility } from '@/core/hooks/useAbility'
import { useActiveRoute } from '../ActiveRouteContext'
import { useActiveBranding } from '@/core/hooks/useActiveBranding'
import { NavbarActions } from './NavbarActions'
import { NavbarBrand } from './NavbarBrand'
import type { NavbarProps } from './Navbar.types'
import { NavbarRoot, SidebarMobileMenuButton } from './Navbar.styles'
import { TopNavbarContent } from './TopNavbarContent'
import { TopNavbarMobileMenu } from './TopNavbarMobileMenu'

export const NAVBAR_HEIGHT = 60

export default function Navbar({ appBarRight, appName = 'Shortcut Next', logo, navItems = [], variant = 'sidebar' }: NavbarProps) {
  const theme = useTheme()
  const { isCollapsed, toggleMobileOpen } = useSidebar()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { language, handleLanguageChange } = useLanguage()
  const isRtl = language === 'ar'
  const router = useRouter()
  const ability = useAbility()
  const activePath = useActiveRoute()
  const activeBranding = useActiveBranding()
  const [scrolled, setScrolled] = useState(false)
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null)
  const [navAnchor, setNavAnchor] = useState<null | HTMLElement>(null)

  const navLinks = useMemo(() => SidebarUtils.flattenPermittedNavItems(navItems, ability), [ability, navItems])
  const isTopNav = variant === 'top-nav'
  const customLogo = activeBranding.logo
  const showUploadedLogo = !logo && Boolean(customLogo)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sidebarOffset = isTopNav || isMobile ? 0 : isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  const handleNavigate = (path: string) => {
    setNavAnchor(null)
    router.push(path)
  }

  const brand = (
    <NavbarBrand
      appName={appName}
      customLogo={customLogo}
      logo={logo}
      showUploadedLogo={showUploadedLogo}
      onClick={() => router.push('/')}
    />
  )

  const rightActions = (
    <NavbarActions
      appBarRight={appBarRight}
      isTopNav={isTopNav}
      language={language}
      langAnchor={langAnchor}
      onLanguageMenuOpen={setLangAnchor}
      onLanguageMenuClose={() => setLangAnchor(null)}
      onLanguageChange={handleLanguageChange}
    />
  )

  return (
    <NavbarRoot
      scrolled={scrolled}
      topNav={isTopNav}
      // left/right use style (not sx) to bypass MUI's RTL auto-swap,
      // matching the same pattern used in Sidebar.tsx's Framer Motion style prop.
      style={{
        left: isRtl ? 0 : sidebarOffset,
        right: isRtl ? sidebarOffset : 0,
        // All transitions here because inline style takes precedence over sx transition
        transition: [
          'left 0.3s cubic-bezier(0.4,0,0.2,1)',
          'right 0.3s cubic-bezier(0.4,0,0.2,1)',
          'background-color 0.25s ease',
          'border-color 0.25s ease'
        ].join(', ')
      }}
    >
      {isTopNav ? (
        <>
          <TopNavbarContent
            activePath={activePath}
            brand={brand}
            isMobile={isMobile}
            navLinks={navLinks}
            rightActions={rightActions}
            scrolled={scrolled}
            onMobileMenuOpen={setNavAnchor}
            onNavigate={handleNavigate}
          />

          <TopNavbarMobileMenu
            activePath={activePath}
            anchorEl={navAnchor}
            navLinks={navLinks}
            onClose={() => setNavAnchor(null)}
            onNavigate={handleNavigate}
          />
        </>
      ) : isMobile ? (
        <SidebarMobileMenuButton onClick={toggleMobileOpen} size='small'>
          <MenuIcon size={18} />
        </SidebarMobileMenuButton>
      ) : (
        <Box />
      )}

      {!isTopNav && rightActions}
    </NavbarRoot>
  )
}
