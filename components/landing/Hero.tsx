'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { landingContent as lc } from '@/components/landing/landingContent'
import { alpha } from '@mui/material/styles'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-fade',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: 'power3.out'
        }
      )

      gsap.fromTo(
        '.hero-panel',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay: 0.4,
          ease: 'power2.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      component='section'
      ref={sectionRef}
      sx={theme => ({
        minHeight: { xs: '90vh', md: '100vh' },
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: theme.palette.background.default,
        paddingTop: { xs: 11, md: 12 },
        paddingBottom: { xs: 4, md: 5 }
      })}
    >
      <Box
        sx={theme => ({
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=2200')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, ${alpha(theme.palette.common.black, 0.36)} 0%, ${alpha(theme.palette.common.black, 0.22)} 42%, ${alpha(theme.palette.common.black, 0.04)} 100%)`
          }
        })}
      />

      <Container maxWidth='lg' sx={{ zIndex: 2 }}>
        <Stack spacing={{ xs: 3.5, md: 5 }} alignItems='stretch'>
          <Stack
            className='hero-fade'
            spacing={2.2}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            textAlign={{ xs: 'center', md: 'left' }}
            sx={{ maxWidth: 620 }}
          >
            <Typography
              className='hero-fade'
              variant='overline'
              sx={theme => ({
                color: alpha(theme.palette.common.white, 0.72),
                letterSpacing: '0.14em',
                alignSelf: { xs: 'center', md: 'flex-start' }
              })}
            >
              {lc.hero.eyebrow}
            </Typography>
            <Typography
              className='hero-fade'
              variant='h1'
              sx={{
                color: 'common.white',
                maxWidth: 620,
                fontWeight: 500,
                fontSize: { xs: '2.1rem', sm: '2.9rem', md: '4.4rem' },
                lineHeight: 1.03,
                textWrap: 'balance'
              }}
            >
              {lc.hero.title}
            </Typography>
            <Typography
              className='hero-fade'
              variant='body1'
              sx={theme => ({
                color: alpha(theme.palette.common.white, 0.8),
                maxWidth: 560,
                fontWeight: 400,
                alignSelf: { xs: 'center', md: 'flex-start' }
              })}
            >
              {lc.hero.subtitle}
            </Typography>
            <Button className='hero-fade' variant='contained' size='large' href={lc.hero.primaryCta.href} sx={{ minWidth: 180 }}>
              {lc.hero.primaryCta.label}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
