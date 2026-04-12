'use client'

import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { FadeIn, TextReveal } from '@/components/animation'
import { landingContent as lc } from '@/components/landing/landingContent'

export default function Hero() {
  return (
    <Box
      component='section'
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
          <Stack spacing={2.2} alignItems={{ xs: 'center', md: 'flex-start' }} textAlign={{ xs: 'center', md: 'left' }} sx={{ maxWidth: 620 }}>
            <FadeIn direction='up' distance={20}>
              <Typography
                variant='overline'
                sx={theme => ({
                  color: alpha(theme.palette.common.white, 0.72),
                  letterSpacing: '0.14em',
                  alignSelf: { xs: 'center', md: 'flex-start' }
                })}
              >
                {lc.hero.eyebrow}
              </Typography>
            </FadeIn>

            <TextReveal
              text={lc.hero.title}
              as='h1'
              splitBy='word'
              staggerDelay={0.08}
              duration={0.72}
              style={{
                color: '#fff',
                maxWidth: 620,
                fontFamily: 'var(--font)',
                fontWeight: 500,
                fontSize: 'clamp(2.1rem, 6vw, 4.4rem)',
                lineHeight: 1.03,
                textWrap: 'balance',
                margin: 0
              }}
            />

            <FadeIn direction='up' distance={24} transition={{ delay: 0.12 }}>
              <Typography
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
            </FadeIn>

            <FadeIn direction='up' distance={24} transition={{ delay: 0.2 }}>
              <Button variant='contained' size='large' href={lc.hero.primaryCta.href} sx={{ minWidth: 180 }}>
                {lc.hero.primaryCta.label}
              </Button>
            </FadeIn>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
