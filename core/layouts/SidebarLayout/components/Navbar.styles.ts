import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const NavbarRoot = styled('header', {
  shouldForwardProp: prop => prop !== 'scrolled' && prop !== 'topNav',
})<{ scrolled: boolean; topNav: boolean }>(({ theme, scrolled, topNav }) => ({
  position: 'fixed',
  top: 0,
  height: 60,
  zIndex: theme.zIndex.appBar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  direction: 'ltr',
  paddingLeft: topNav ? 0 : theme.spacing(2),
  paddingRight: topNav ? 0 : theme.spacing(2),
  backdropFilter: scrolled && !topNav ? 'blur(12px)' : 'none',
  WebkitBackdropFilter: scrolled && !topNav ? 'blur(12px)' : 'none',
  backgroundColor: scrolled && !topNav ? alpha(theme.palette.background.paper, 0.75) : 'transparent',
  borderBottom: '1px solid',
  borderColor: scrolled && !topNav ? theme.palette.divider : 'transparent',
}))

export const SidebarMobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

export const NavbarBrandRoot = styled(Stack)(({ theme }) => ({
  minWidth: 0,
  cursor: 'pointer',
  color: theme.palette.text.primary,
}))

export const NavbarLogoFrame = styled(Stack)({
  width: 32,
  height: 32,
  flexShrink: 0,
})

export const NavbarUploadedLogo = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius,
}))

export const NavbarBrandTitle = styled(Typography)(({ theme }) => ({
  maxWidth: 150,
  [theme.breakpoints.up('sm')]: {
    maxWidth: 220,
  },
}))

export const NavbarActionsRoot = styled(Stack)({
  flexShrink: 0,
})

export const NavbarThemeToggleFrame = styled(Box)({
  '& .MuiIconButton-root': {
    width: 34,
    height: 34,
  },
})

export const NavbarLanguageButton = styled(IconButton)(({ theme }) => ({
  width: 34,
  height: 34,
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
  },
}))

export const topNavbarLanguageMenuPaperSx = {
  minWidth: 130,
  mt: 0.5,
  borderRadius: 2,
}

export const TopNavbarRoot = styled(Stack, {
  shouldForwardProp: prop => prop !== 'scrolled',
})<{ scrolled: boolean }>(({ theme, scrolled }) => ({
  width: '100%',
  height: 56,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderBottom: 0,
  borderRadius: 0,
  backgroundColor: alpha(theme.palette.background.paper, scrolled ? 0.78 : 0.52),
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: scrolled ? theme.shadows[3] : '0 8px 24px rgba(0,0,0,0.08)',
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}))

export const TopNavbarBrandGroup = styled(Stack)({
  minWidth: 0,
})

export const TopNavbarMobileMenuButton = styled(IconButton)(({ theme }) => ({
  width: 34,
  height: 34,
  color: theme.palette.text.secondary,
}))

export const TopNavbarLinkGroup = styled('nav')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.5),
  flex: 1,
  minWidth: 0,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}))

export const TopNavbarButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  height: 34,
  minWidth: 0,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  fontWeight: active ? 700 : 500,
  textTransform: 'none',
  borderRadius: theme.spacing(1.75),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.14) : theme.palette.action.hover,
  },
}))

export const topNavbarMobileMenuPaperSx = {
  minWidth: 200,
  mt: 0.5,
  borderRadius: 2,
}

export const TopNavbarMobileMenuIcon = styled(Stack)(({ theme }) => ({
  marginRight: theme.spacing(1.25),
  color: theme.palette.text.secondary,
}))
