'use client'

import { Menu, MenuItem } from '@mui/material'
import { Icon } from '@iconify/react'
import type { NavbarLink } from './Navbar.types'
import { topNavbarMobileMenuPaperSx, TopNavbarMobileMenuIcon } from './Navbar.styles'

interface TopNavbarMobileMenuProps {
  activePath: string | null
  anchorEl: HTMLElement | null
  navLinks: NavbarLink[]
  onClose: () => void
  onNavigate: (path: string) => void
}

export function TopNavbarMobileMenu({
  activePath,
  anchorEl,
  navLinks,
  onClose,
  onNavigate,
}: TopNavbarMobileMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{ paper: { elevation: 3, sx: topNavbarMobileMenuPaperSx } }}
    >
      {navLinks.map(item => (
        <MenuItem key={item.path} selected={item.path === activePath} onClick={() => onNavigate(item.path)}>
          {item.icon && (
            <TopNavbarMobileMenuIcon direction='row' alignItems='center'>
              <Icon icon={item.icon} width={18} height={18} />
            </TopNavbarMobileMenuIcon>
          )}
          {item.title}
        </MenuItem>
      ))}
    </Menu>
  )
}
