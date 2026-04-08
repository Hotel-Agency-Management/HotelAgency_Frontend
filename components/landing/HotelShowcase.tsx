'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

const showcase = lc.hotelShowcase

export default function HotelShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider
  const bgPaper = theme.palette.background.paper
  const primaryMain = theme.palette.primary.main

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.showcase-fade', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })

      gsap.from('.showcase-card', {
        y: 45,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', once: true }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id='hotel-showcase' ref={sectionRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '56px' }}>
        <span
          className='showcase-fade'
          style={{ fontFamily: 'var(--font)', color: primaryMain, fontSize: '0.72rem', letterSpacing: '0.14em' }}
        >
          {showcase.label}
        </span>
        <h2
          className='showcase-fade'
          style={{
            fontFamily: 'var(--font)',
            color: textPrimary,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: 1.1,
            marginTop: '10px'
          }}
        >
          {showcase.heading}
        </h2>
        <p
          className='showcase-fade'
          style={{ fontFamily: 'var(--font)', color: textSecondary, maxWidth: '760px', lineHeight: 1.7, marginTop: '14px' }}
        >
          {showcase.body}
        </p>
      </div>

      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '20px'
        }}
      >
        {showcase.items.map(item => (
          <div
            key={item.title}
            className='showcase-card'
            style={{
              border: `1px solid ${divider}`,
              borderRadius: `${theme.shape.borderRadius * 1.4}px`,
              overflow: 'hidden',
              background: bgPaper
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
        ))}
      </div>

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
