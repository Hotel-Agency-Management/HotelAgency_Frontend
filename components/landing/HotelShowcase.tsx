'use client'

import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/animation'
import { landingContent as lc } from '@/components/landing/landingContent'

const showcase = lc.hotelShowcase

export default function HotelShowcase() {
  const theme = useTheme()
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider
  const bgPaper = theme.palette.background.paper
  const primaryMain = theme.palette.primary.main

  return (
    <section id='hotel-showcase' style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '56px' }}>
        <FadeIn direction='up' distance={20}>
          <span
            style={{ fontFamily: 'var(--font)', color: primaryMain, fontSize: '0.72rem', letterSpacing: '0.14em' }}
          >
            {showcase.label}
          </span>
        </FadeIn>

        <FadeIn direction='up' distance={26} transition={{ delay: 0.08 }}>
          <h2
            style={{
              fontFamily: 'var(--font)',
              color: textPrimary,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.1,
              marginTop: '10px',
              marginBottom: 0
            }}
          >
            {showcase.heading}
          </h2>
        </FadeIn>

        <FadeIn direction='up' distance={26} transition={{ delay: 0.14 }}>
          <p
            style={{ fontFamily: 'var(--font)', color: textSecondary, maxWidth: '760px', lineHeight: 1.7, marginTop: '14px' }}
          >
            {showcase.body}
          </p>
        </FadeIn>
      </div>

      <StaggerGroup
        staggerDelay={0.12}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '20px'
        }}
      >
        {showcase.items.map(item => (
          <StaggerItem key={item.title}>
            <div
              style={{
                border: `1px solid ${divider}`,
                borderRadius: `${Number(theme.shape.borderRadius) * 1.4}px`,
                overflow: 'hidden',
                background: bgPaper,
                height: '100%'
              }}
            >
              <div
                style={{
                  height: '220px',
                  backgroundImage: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.55)} 0%, ${alpha(theme.palette.common.black, 0.08)} 70%), url('${item.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div style={{ padding: '22px' }}>
                <h3 style={{ fontFamily: 'var(--font)', color: textPrimary, fontSize: '1.15rem', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font)', color: textSecondary, fontSize: '0.92rem', lineHeight: 1.65 }}>{item.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <style>{`
        @media (max-width: 1023px) {
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 699px) {
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
