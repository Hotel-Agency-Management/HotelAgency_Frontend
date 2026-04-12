'use client'

import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { FadeIn, FloatingElement, StaggerGroup, StaggerItem } from '@/components/animation'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

const section = lc.momentumWall
const cardFloatOffsets = [-10, 10, -12, 12]

export default function MomentumWall() {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const bgPaper = theme.palette.background.paper
  const divider = theme.palette.divider

  return (
    <section id='momentum-wall' style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div className='momentum-layout' style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '32px', alignItems: 'start' }}>
        <FadeIn direction='left' distance={34}>
          <div className='momentum-copy'>
            <SectionLabel>{section.label}</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 4vw, 2.85rem)',
                color: textPrimary,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                margin: '0 0 16px'
              }}
            >
              {section.heading}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font)',
                color: textSecondary,
                lineHeight: 1.78,
                fontSize: '1rem',
                margin: 0,
                maxWidth: '460px'
              }}
            >
              {section.body}
            </p>

            <div
              style={{
                marginTop: '24px',
                padding: '18px 20px',
                borderRadius: '24px',
                border: `1px dashed ${alpha(primaryMain, 0.26)}`,
                background: alpha(primaryMain, 0.05)
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font)',
                  color: textPrimary,
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  margin: 0
                }}
              >
                {section.note}
              </p>
            </div>
          </div>
        </FadeIn>

        <StaggerGroup className='momentum-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }} staggerDelay={0.1}>
          {section.cards.map((card, index) => (
            <StaggerItem key={card.title}>
              <FloatingElement y={cardFloatOffsets[index]} duration={2.6 + index * 0.2} delay={index * 0.1}>
                <div className={`momentum-card-wrap momentum-card--${index + 1}`}>
                  <article
                    style={{
                      position: 'relative',
                      minHeight: index === 0 || index === 3 ? '240px' : '210px',
                      padding: '24px',
                      borderRadius: '28px',
                      border: `1px solid ${index % 2 === 0 ? alpha(primaryMain, 0.18) : divider}`,
                      background:
                        index % 2 === 0
                          ? `linear-gradient(180deg, ${alpha(primaryMain, 0.09)} 0%, ${bgPaper} 66%)`
                          : bgPaper,
                      boxShadow: `0 24px 70px ${alpha(theme.palette.common.black, 0.08)}`
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '14px',
                        fontFamily: 'var(--font)',
                        color: alpha(primaryMain, 0.09),
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        lineHeight: 1
                      }}
                    >
                      {card.stat}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font)',
                        color: textPrimary,
                        fontSize: '1.2rem',
                        lineHeight: 1.18,
                        margin: '0 0 14px',
                        maxWidth: '240px',
                        position: 'relative',
                        zIndex: 1
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font)',
                        color: textSecondary,
                        fontSize: '0.9rem',
                        lineHeight: 1.72,
                        margin: 0,
                        position: 'relative',
                        zIndex: 1
                      }}
                    >
                      {card.desc}
                    </p>
                  </article>
                </div>
              </FloatingElement>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <style>{`
        .momentum-card--1 { transform: rotate(-1.4deg); }
        .momentum-card--2 { transform: rotate(1.2deg) translateY(24px); }
        .momentum-card--3 { transform: rotate(-0.9deg) translateY(-10px); }
        .momentum-card--4 { transform: rotate(1.6deg) translateY(18px); }

        @media (max-width: 959px) {
          .momentum-layout {
            grid-template-columns: 1fr !important;
          }

          .momentum-grid {
            margin-top: 8px !important;
          }
        }

        @media (max-width: 639px) {
          .momentum-grid {
            grid-template-columns: 1fr !important;
          }

          .momentum-card--1,
          .momentum-card--2,
          .momentum-card--3,
          .momentum-card--4 {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
