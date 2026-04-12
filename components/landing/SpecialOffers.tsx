'use client'

import Badge from '@/components/landing/Badge'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { FadeIn, StaggerGroup, StaggerItem, TiltCard } from '@/components/animation'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function SpecialOffers() {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const bgPaper = theme.palette.background.paper
  const divider = theme.palette.divider

  return (
    <section id='offers' style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '56px' }}>
        <FadeIn direction='up' distance={18}>
          <div>
            <SectionLabel>{lc.offers.label}</SectionLabel>
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
              maxWidth: '820px'
            }}
          >
            {lc.offers.heading}
          </h2>
        </FadeIn>

        <FadeIn direction='up' distance={24} transition={{ delay: 0.14 }}>
          <p
            style={{
              fontFamily: 'var(--font)',
              color: textSecondary,
              lineHeight: 1.75,
              fontSize: '1rem',
              maxWidth: '760px',
              marginTop: '16px'
            }}
          >
            {lc.offers.body}
          </p>
        </FadeIn>
      </div>

      <StaggerGroup
        staggerDelay={0.12}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}
      >
        {lc.offers.items.map((offer, index) => (
          <StaggerItem key={offer.title} style={{ height: '100%' }}>
            <TiltCard
              maxRotation={6}
              scaleOnHover={1.012}
              style={{
                height: '100%',
                borderRadius: '28px',
                overflow: 'hidden',
                background: bgPaper,
                border: `1px solid ${index === 0 ? alpha(primaryMain, 0.22) : divider}`,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 460
              }}
            >
              <div
                style={{
                  height: '220px',
                  backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.common.black, 0.04)} 0%, ${alpha(theme.palette.common.black, 0.36)} 100%), url('${offer.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              <div
                style={{
                  padding: '26px 26px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  background:
                    index === 0
                      ? `linear-gradient(180deg, ${alpha(primaryMain, 0.08)} 0%, ${bgPaper} 100%)`
                      : bgPaper
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Badge label={offer.badge} variant={index === 0 ? 'primary' : index === 1 ? 'yellow' : 'purple'} />
                  <p
                    style={{
                      fontFamily: 'var(--font)',
                      color: primaryMain,
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      margin: 0,
                      textAlign: 'right'
                    }}
                  >
                    {offer.value}
                  </p>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font)',
                    color: textPrimary,
                    fontSize: '1.28rem',
                    lineHeight: 1.16,
                    margin: '0 0 12px'
                  }}
                >
                  {offer.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font)',
                    color: textSecondary,
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    margin: 0,
                    flex: 1
                  }}
                >
                  {offer.desc}
                </p>

                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: `1px solid ${alpha(primaryMain, 0.12)}`
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font)',
                      color: textSecondary,
                      fontSize: '0.82rem',
                      lineHeight: 1.62,
                      margin: 0
                    }}
                  >
                    {offer.note}
                  </p>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <style>{`
        @media (max-width: 959px) {
          #offers [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
