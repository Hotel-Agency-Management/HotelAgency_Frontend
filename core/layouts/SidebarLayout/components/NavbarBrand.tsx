'use client'

import type { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import {
  NavbarBrandRoot,
  NavbarBrandTitle,
  NavbarLogoFrame,
  NavbarUploadedLogo,
} from './Navbar.styles'

interface NavbarBrandProps {
  appName: string
  customLogo?: string | null
  logo?: ReactNode
  showUploadedLogo: boolean
  onClick: () => void
}

export function NavbarBrand({
  appName,
  customLogo,
  logo,
  showUploadedLogo,
  onClick,
}: NavbarBrandProps) {
  return (
    <NavbarBrandRoot
      onClick={onClick}
      direction='row'
      alignItems='center'
      spacing={1}
    >
      <NavbarLogoFrame alignItems='center' justifyContent='center'>
        {logo ? (
          logo
        ) : showUploadedLogo ? (
          <NavbarUploadedLogo
            src={customLogo ?? undefined}
            alt={`${appName} logo`}
          />
        ) : (
          <Icon icon='local:shortcut-next' width={32} height={32} color='currentColor' />
        )}
      </NavbarLogoFrame>
      <NavbarBrandTitle variant='subtitle2' fontWeight={700} noWrap>
        {appName}
      </NavbarBrandTitle>
    </NavbarBrandRoot>
  )
}
