'use client'

import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animation'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import themeConfig from '@/core/configs/themeConfig'

export default function WhyBook() {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider
  const bgPaper = theme.palette.background.paper

  return (
    <section id='why-book' style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div className='why-book-layout' style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: '28px', alignItems: 'stretch' }}>
        <FadeIn direction='left' distance={36}>
          <div
            style={{
              position: 'relative',
              minHeight: '620px',
              borderRadius: '32px',
              overflow: 'hidden',
              border: `1px solid ${alpha(primaryMain, 0.18)}`,
              backgroundColor: bgPaper
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.common.black, 0.08)} 0%, ${alpha(theme.palette.common.black, 0.6)} 100%), url('${lc.whyBook.featureImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.common.black, 0.18)} 38%, ${alpha(theme.palette.common.black, 0.74)} 100%)`
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '32px',
                right: '32px',
                bottom: '30px'
              }}
            >
              <SectionLabel>{lc.whyBook.label}</SectionLabel>
              <h2
                style={{
                  fontFamily: 'var(--font)',
                  color: theme.palette.common.white,
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.04em',
                  margin: '0 0 16px'
                }}
              >
                {lc.whyBook.heading}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font)',
                  color: alpha(theme.palette.common.white, 0.78),
                  lineHeight: 1.78,
                  fontSize: '0.98rem',
                  margin: 0,
                  maxWidth: '560px'
                }}
              >
                {lc.whyBook.body}
              </p>
            </div>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gap: '18px' }}>
          <StaggerGroup staggerDelay={0.1} style={{ display: 'grid', gap: '18px', height: '100%' }}>
            {lc.whyBook.items.map(item => (
              <StaggerItem key={item.title} style={{ height: '100%' }}>
                <div
                  style={{
                    height: '100%',
                    minHeight: 142,
                    padding: '24px 24px 22px',
                    borderRadius: themeConfig.borderRadius,
                    border: `1px solid ${divider}`,
                    background: `linear-gradient(180deg, ${alpha(primaryMain, 0.06)} 0%, ${bgPaper} 72%)`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font)',
                        color: primaryMain,
                        fontSize: '0.72rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        margin: 0
                      }}
                    >
                      {item.kicker}
                    </p>

                    <h3
                      style={{
                        fontFamily: 'var(--font)',
                        color: textPrimary,
                        fontSize: '1.08rem',
                        lineHeight: 1.18,
                        margin: '14px 0 10px'
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

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
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <style>{`
        @media (max-width: 959px) {
          .why-book-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 639px) {
          .why-book-layout > div:first-child {
            min-height: 460px !important;
          }
        }
      `}</style>
    </section>
  )
}
