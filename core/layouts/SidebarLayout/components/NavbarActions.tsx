'use client'

import type { ReactNode } from 'react'
import { Menu, MenuItem, Tooltip } from '@mui/material'
import { Languages } from 'lucide-react'
import ThemeToggle from '@/components/common/ThemeToggle'
import type { Locale } from '@/core/configs/i18n'
import ProfileButton from './ProfileButton'
import {
  NavbarActionsRoot,
  NavbarLanguageButton,
  NavbarThemeToggleFrame,
  topNavbarLanguageMenuPaperSx,
} from './Navbar.styles'

interface NavbarActionsProps {
  appBarRight?: ReactNode
  isTopNav: boolean
  language: string
  langAnchor: HTMLElement | null
  onLanguageMenuOpen: (anchor: HTMLElement) => void
  onLanguageMenuClose: () => void
  onLanguageChange: (language: Locale) => void
}

export function NavbarActions({
  appBarRight,
  isTopNav,
  language,
  langAnchor,
  onLanguageMenuOpen,
  onLanguageMenuClose,
  onLanguageChange,
}: NavbarActionsProps) {
  const handleLanguageChange = (locale: Locale) => {
    onLanguageChange(locale)
    onLanguageMenuClose()
  }

  return (
    <NavbarActionsRoot direction='row' alignItems='center' spacing={0.75}>
      {appBarRight}

      <NavbarThemeToggleFrame>
        <ThemeToggle />
      </NavbarThemeToggleFrame>

      <Tooltip title='Language'>
        <NavbarLanguageButton
          size='small'
          onClick={event => onLanguageMenuOpen(event.currentTarget)}
        >
          <Languages size={18} />
        </NavbarLanguageButton>
      </Tooltip>

      <Menu
        anchorEl={langAnchor}
        open={Boolean(langAnchor)}
        onClose={onLanguageMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { elevation: 3, sx: topNavbarLanguageMenuPaperSx } }}
      >
        <MenuItem selected={language === 'en'} onClick={() => handleLanguageChange('en' as Locale)}>
          English
        </MenuItem>
        <MenuItem selected={language === 'ar'} onClick={() => handleLanguageChange('ar' as Locale)}>
          العربية
        </MenuItem>
      </Menu>

      {isTopNav && <ProfileButton variant='navbar' />}
    </NavbarActionsRoot>
  )
}
