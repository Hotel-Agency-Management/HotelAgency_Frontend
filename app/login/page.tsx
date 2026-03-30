'use client'

import { Box, Button, Snackbar, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import LanguageDropdown from '@/components/common/LanguageDropdown'
import useLanguage from '@/core/hooks/useLanguage'

const MotionBox = motion.create(Box)

const HeroBefore = () => {
  const { t } = useTranslation()

  return (
    <Stack
      spacing={8}
      sx={{
        p: { xs: 6, md: 12 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: `url(https://images.unsplash.com/photo-1549294413-26f195200c16?w=1920&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant='overline'
          sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 2, mb: 1, display: 'block' }}
        >
          {t('login.heroBefore.overline', 'Welcome Back')}
        </Typography>
        <Typography
          variant='h2'
          sx={{ fontWeight: 900, mb: 2, letterSpacing: -1.5, fontSize: { md: '3rem', lg: '3.75rem' }, color: 'white' }}
        >
          {t('login.heroBefore.title', 'Sign in to your account')}
        </Typography>
        <Typography variant='h6' sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 450, fontWeight: 400 }}>
          {t('login.heroBefore.subtitle', 'Access your dashboard and manage your business')}
        </Typography>
      </Box>
    </Stack>
  )
}

const HeroAfter = () => {
  const { t } = useTranslation()

  return (
    <Stack
      spacing={8}
      sx={{
        p: { xs: 6, md: 12 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: `url(https://images.unsplash.com/photo-1549294413-26f195200c16?w=1920&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant='overline'
          sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 2, mb: 1, display: 'block' }}
        >
          {t('login.heroAfter.overline', 'Get Started')}
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontWeight: 900,
            color: 'white',
            mb: 2,
            letterSpacing: -1.5,
            fontSize: { md: '3rem', lg: '3.75rem' }
          }}
        >
          {t('login.heroAfter.title', 'Create your account')}
        </Typography>
        <Typography variant='h6' sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 450, fontWeight: 400 }}>
          {t('login.heroAfter.subtitle', 'Join thousands of businesses already using our platform')}
        </Typography>
      </Box>
    </Stack>
  )
}

export default function LoginPage() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [fillTrigger, setFillTrigger] = useState(0)
  const { language } = useLanguage()
  const isRTL = language === 'ar'

  const handleFillCredentials = () => {
    setShowEmailForm(true)
    setFillTrigger(t => t + 1)
  }

  const handleSwitchToSignup = () => {
    setShowEmailForm(false)
    setCurrentView('signup')
  }

  const handleSwitchToLogin = () => {
    setShowEmailForm(false)
    setCurrentView('login')
  }

  const sliderLeft = currentView === 'login' ? '47%' : '0%'

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%', display: { xs: 'none', md: 'flex' }, zIndex: 1 }}>
        <MotionBox
          initial={false}
          animate={{
            opacity: currentView === 'login' ? 1 : 0,
            x: currentView === 'login' ? 0 : -80,
            scale: currentView === 'login' ? 1 : 0.95
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          sx={{ position: 'absolute', top: 0, left: 0, width: '47%', height: '100%' }}
        >
          <HeroBefore />
        </MotionBox>

        <MotionBox
          initial={false}
          animate={{
            opacity: currentView === 'signup' ? 1 : 0,
            x: currentView === 'signup' ? 0 : 80,
            scale: currentView === 'signup' ? 1 : 0.95
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          sx={{ position: 'absolute', top: 0, right: 0, width: '47%', height: '100%' }}
        >
          <HeroAfter />
        </MotionBox>
      </Box>

      <MotionBox
        initial={false}
        animate={{
          [isRTL ? 'right' : 'left']: sliderLeft
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        sx={{
          position: 'absolute',
          top: 0,
          width: { xs: '100%', md: '53%' },
          height: '100%',
          bgcolor: theme => (theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 11, 12, 0.75)'),
          backdropFilter: 'blur(40px) saturate(180%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, md: 12 },
          zIndex: 10,
          borderLeft: theme => (currentView === 'login' ? `1px solid ${theme.palette.divider}` : 'none'),
          borderRight: theme => (currentView === 'signup' ? `1px solid ${theme.palette.divider}` : 'none'),
          boxShadow: theme => theme.shadows[20],
          overflowY: 'auto'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 480, py: 12 }}>
          <Box
            sx={{
              position: 'absolute',
              top: theme => theme.spacing(4),
              left: theme => theme.spacing(4),
              right: theme => theme.spacing(4),
              zIndex: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <LanguageDropdown />
          </Box>

          <AnimatePresence mode='wait'>
            {currentView === 'login' ? (
              <MotionBox
                key='login-panel'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <LoginForm
                  showEmailForm={showEmailForm}
                  setShowEmailForm={setShowEmailForm}
                  onSwitchToSignup={handleSwitchToSignup}
                  fillTrigger={fillTrigger}
                />
              </MotionBox>
            ) : (
              <MotionBox
                key='signup-panel'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <SignupForm onSwitchToLogin={handleSwitchToLogin} />
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </MotionBox>

      <Snackbar
        open={currentView === 'login'}
        message='Test credentials: admin@test.com / password123'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ zIndex: 20, '& .MuiSnackbarContent-message': { fontSize: '0.8rem' } }}
        action={
          <Button color='primary' size='small' variant='contained' onClick={handleFillCredentials}>
            Fill
          </Button>
        }
      />
    </Box>
  )
}
