'use client'

import { useState } from 'react'
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { LogOut, MoreVertical, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import { useSidebar } from '../SidebarContext'
import { profileDummyData } from '@/lib/profileDummyData'
import themeConfig from '@/core/configs/themeConfig'

// Matches the sidebar's collapse animation
const SIDEBAR_TRANSITION = '0.3s cubic-bezier(0.4,0,0.2,1)'

interface ProfileButtonProps {
  variant?: 'sidebar' | 'navbar'
}

export default function ProfileButton({ variant = 'sidebar' }: ProfileButtonProps) {
  const { logout, user } = useAuth()
  const { isCollapsed } = useSidebar()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isNavbar = variant === 'navbar'

  const name = user?.name ?? profileDummyData.name
  const email = user?.email ?? profileDummyData.email
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleProfile = () => {
    handleClose()
    router.push('/profile')
  }

  const handleLogout = async () => {
    handleClose()
    await logout()
  }

  return (
    <>
      <Box sx={{ p: isNavbar ? 0 : 1.5 }}>
        <Tooltip title={isNavbar || isCollapsed ? `${name} — ${email}` : ''} placement={isNavbar ? 'bottom' : 'right'}>
          {/*
           * No independent width animation — the sidebar's overflow:hidden and
           * its own Framer Motion width tween handle all spatial changes.
           * We only animate gap/padding (CSS, same easing as sidebar) and
           * fade content in/out fast enough that nothing gets squashed.
           */}
          <Box
            onClick={handleOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              width: isNavbar ? 34 : 'auto',
              height: isNavbar ? 34 : 'auto',
              py: isNavbar ? 0 : 1,
              px: isNavbar ? 0 : isCollapsed ? 0.75 : 1.25,
              gap: isNavbar || isCollapsed ? 0 : 1.5,
              cursor: 'pointer',
              borderRadius: isNavbar ? '50%' : themeConfig.common.commonBorderRadius,
              border: '1px solid',
              borderColor: isNavbar ? 'transparent' : 'divider',
              bgcolor: theme => (isNavbar ? 'transparent' : theme.palette.primary.main + '10'),
              transition: `gap ${SIDEBAR_TRANSITION}, padding ${SIDEBAR_TRANSITION}, box-shadow 0.2s, border-color 0.2s`,
              '&:hover': {
                boxShadow: isNavbar ? 0 : 3,
                borderColor: isNavbar ? 'transparent' : 'primary.main',
                bgcolor: isNavbar ? 'action.hover' : undefined
              }
            }}
          >
            <Avatar
              sx={{
                width: isNavbar ? 28 : 34,
                height: isNavbar ? 28 : 34,
                flexShrink: 0,
                bgcolor: 'primary.main',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              {initials}
            </Avatar>

            {/* Text — fades out fast so the sidebar wall never catches it */}
          <AnimatePresence initial={false}>
              {!isNavbar && !isCollapsed && (
                <motion.div
                  key='profile-text'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15, delay: 0.14, ease: 'easeOut' } }}
                  exit={{ opacity: 0, transition: { duration: 0.1, ease: 'easeIn' } }}
                  style={{ overflow: 'hidden', minWidth: 0, flex: 1 }}
                >
                  <Typography variant='body2' fontWeight={600} noWrap>
                    {name}
                  </Typography>
                  <Typography variant='caption' color='text.secondary' noWrap display='block'>
                    {email}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Icon — same fast fade */}
          <AnimatePresence initial={false}>
              {!isNavbar && !isCollapsed && (
                <motion.div
                  key='profile-icon'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4, transition: { duration: 0.15, delay: 0.12, ease: 'easeOut' } }}
                  exit={{ opacity: 0, transition: { duration: 0.08, ease: 'easeIn' } }}
                  style={{ flexShrink: 0, display: 'flex' }}
                >
                  <MoreVertical size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: isNavbar ? 'bottom' : 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: isNavbar ? 'top' : 'bottom', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: { minWidth: 210, borderRadius: 2.5, overflow: 'hidden' }
          },
          list: {
            disablePadding: true,
            sx: { display: 'flex', flexDirection: 'column', p: 0.75, gap: 0.5 }
          }
        }}
      >
        {/* Header */}
        <Box sx={{ px: 1.5, pt: 1.25, pb: 1.5 }}>
          <Typography variant='body2' fontWeight={600} noWrap>
            {name}
          </Typography>
          <Typography variant='caption' color='text.secondary' noWrap display='block'>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ mx: 0.5, mb: 0.25 }} />

        <MenuItem onClick={handleProfile} sx={{ borderRadius: 1.5, py: 1 }}>
          <ListItemIcon>
            <User size={16} />
          </ListItemIcon>
          <Typography variant='body2'>View Profile</Typography>
        </MenuItem>

        <MenuItem onClick={handleLogout} sx={{ borderRadius: 1.5, py: 1, color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <LogOut size={16} />
          </ListItemIcon>
          <Typography variant='body2'>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
