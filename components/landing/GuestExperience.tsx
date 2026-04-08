'use client'

import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { FadeIn, SpotlightCard, StaggerGroup, StaggerItem } from '@/components/animation'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function GuestExperience() {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const bgPaper = theme.palette.background.paper
  const divider = theme.palette.divider

  return (
    <section id='guest-experience' style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '56px' }}>
        <FadeIn direction='up' distance={18}>
          <div>
            <SectionLabel>{lc.guestExperience.label}</SectionLabel>
          </div>
        </FadeIn>

        <FadeIn direction='up' distance={24} transition={{ delay: 0.08 }}>
          <h2
            style={{
              fontFamily: 'var(--font)',
              color: textPrimary,
              fontSize: 'clamp(1.9rem, 4vw, 2.9rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: 0,
              maxWidth: '760px'
            }}
          >
            {lc.guestExperience.heading}
          </h2>
        </FadeIn>

        <FadeIn direction='up' distance={24} transition={{ delay: 0.14 }}>
          <p
            style={{
              fontFamily: 'var(--font)',
              color: textSecondary,
              lineHeight: 1.78,
              fontSize: '1rem',
              marginTop: '18px',
              maxWidth: '720px'
            }}
          >
            {lc.guestExperience.body}
          </p>
        </FadeIn>
      </div>

      <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }} staggerDelay={0.08}>
        {lc.guestExperience.items.map(item => (
          <StaggerItem key={item.title} style={{ height: '100%' }}>
            <SpotlightCard
              spotlightColor={alpha(primaryMain, 0.1)}
              spotlightSize={240}
              style={{
                height: '100%',
                minHeight: 360,
                borderRadius: '26px',
                overflow: 'hidden',
                border: `1px solid ${divider}`,
                background: bgPaper,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  height: '210px',
                  backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.common.black, 0.02)} 0%, ${alpha(theme.palette.common.black, 0.26)} 100%), url('${item.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              <div
                style={{
                  padding: '22px 22px 24px',
                  background: `linear-gradient(180deg, ${alpha(primaryMain, 0.04)} 0%, ${bgPaper} 100%)`,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: primaryMain,
                    boxShadow: `0 0 18px ${alpha(primaryMain, 0.35)}`,
                    marginBottom: '16px'
                  }}
                />

                <h3
                  style={{
                    fontFamily: 'var(--font)',
                    color: textPrimary,
                    fontSize: '1.08rem',
                    lineHeight: 1.22,
                    margin: '0 0 12px'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font)',
                    color: textSecondary,
                    fontSize: '0.88rem',
                    lineHeight: 1.68,
                    margin: 0
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <style>{`
        @media (max-width: 1023px) {
          #guest-experience [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 639px) {
          #guest-experience [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
