'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

const section = lc.operationsPulse
const cardOffsets = [
  { x: -90, y: -36 },
  { x: 90, y: -28 },
  { x: -84, y: 34 },
  { x: 84, y: 40 }
]

export default function OperationsPulse() {
  const sectionRef = useRef<HTMLElement>(null)

  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const bgPaper = theme.palette.background.paper
  const divider = theme.palette.divider

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const headerEls = sectionRef.current?.querySelectorAll('.pulse-header')
      const core = sectionRef.current?.querySelector('.pulse-core')
      const cards = gsap.utils.toArray<HTMLElement>('.pulse-card', sectionRef.current)
      const ring = sectionRef.current?.querySelector('.pulse-ring')

      if (headerEls?.length) {
        gsap.from(headerEls, {
          y: 26,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 84%', once: true }
        })
      }

      if (core) {
        gsap.from(core, {
          scale: 0.88,
          autoAlpha: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        })
      }

      cards.forEach((card, index) => {
        const offset = cardOffsets[index]

        gsap.from(card, {
          x: offset.x,
          y: offset.y,
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true
          }
        })

        gsap.to(card, {
          y: `+=${index % 2 === 0 ? -14 : 14}`,
          duration: 2.8 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })

      if (ring) {
        gsap.to(ring, {
          rotate: 360,
          duration: 28,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center'
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id='operations-pulse' ref={sectionRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div className='pulse-header'>
          <SectionLabel>{section.label}</SectionLabel>
        </div>
        <h2
          className='pulse-header'
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: textPrimary,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '860px'
          }}
        >
          {section.heading}
        </h2>
        <p
          className='pulse-header'
          style={{
            fontFamily: 'var(--font)',
            color: textSecondary,
            lineHeight: 1.75,
            fontSize: '1rem',
            maxWidth: '760px',
            marginTop: '16px'
          }}
        >
          {section.body}
        </p>
      </div>

      <div
        className='pulse-shell'
        style={{
          position: 'relative',
          marginTop: '54px',
          minHeight: '720px',
          borderRadius: '36px',
          overflow: 'hidden',
          border: `1px solid ${alpha(primaryMain, 0.14)}`,
          background: `linear-gradient(180deg, ${alpha(primaryMain, 0.06)} 0%, ${bgPaper} 24%, ${bgPaper} 100%)`
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(${alpha(primaryMain, 0.06)} 1px, transparent 1px),
              linear-gradient(90deg, ${alpha(primaryMain, 0.06)} 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1), transparent 88%)',
            pointerEvents: 'none'
          }}
        />

        <div
          className='pulse-ring'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            border: `1px dashed ${alpha(primaryMain, 0.18)}`,
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div
          className='pulse-core'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '360px',
            transform: 'translate(-50%, -50%)',
            padding: '34px',
            borderRadius: '34px',
            textAlign: 'center',
            border: `1px solid ${alpha(primaryMain, 0.16)}`,
            background: `linear-gradient(180deg, ${alpha(primaryMain, 0.12)} 0%, ${bgPaper} 72%)`,
            boxShadow: `0 30px 90px ${alpha(theme.palette.common.black, 0.12)}`
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              padding: '8px 14px',
              borderRadius: '999px',
              background: alpha(primaryMain, 0.1),
              color: primaryMain,
              fontFamily: 'var(--font)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase'
            }}
          >
            {section.mainBadge}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 700,
              fontSize: 'clamp(1.45rem, 2.8vw, 2rem)',
              lineHeight: 1.12,
              color: textPrimary,
              margin: '18px 0 14px'
            }}
          >
            {section.mainTitle}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font)',
              color: textSecondary,
              fontSize: '0.95rem',
              lineHeight: 1.75,
              margin: 0
            }}
          >
            {section.mainBody}
          </p>
        </div>

        {section.cards.map((card, index) => (
          <article
            key={card.title}
            className={`pulse-card pulse-card--${index + 1}`}
            style={{
              position: 'absolute',
              width: '286px',
              padding: '24px',
              borderRadius: '28px',
              border: `1px solid ${divider}`,
              background: alpha(bgPaper, 0.9),
              backdropFilter: 'blur(18px)',
              boxShadow: `0 22px 60px ${alpha(theme.palette.common.black, 0.08)}`
            }}
          >
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
              {card.eyebrow}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font)',
                color: textPrimary,
                fontSize: '1.16rem',
                lineHeight: 1.2,
                margin: '14px 0 10px'
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font)',
                color: textSecondary,
                fontSize: '0.88rem',
                lineHeight: 1.72,
                margin: 0
              }}
            >
              {card.desc}
            </p>
          </article>
        ))}
      </div>

      <style>{`
        .pulse-card--1 { top: 44px; left: 44px; }
        .pulse-card--2 { top: 82px; right: 40px; }
        .pulse-card--3 { left: 62px; bottom: 52px; }
        .pulse-card--4 { right: 44px; bottom: 86px; }

        @media (max-width: 1099px) {
          .pulse-card--1 { left: 18px; }
          .pulse-card--2 { right: 18px; }
          .pulse-card--3 { left: 24px; }
          .pulse-card--4 { right: 24px; }
        }

        @media (max-width: 959px) {
          .pulse-shell {
            min-height: auto !important;
            display: grid !important;
            gap: 18px !important;
            padding: 20px !important;
          }

          .pulse-ring {
            display: none !important;
          }

          .pulse-core,
          .pulse-card {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            bottom: auto !important;
            left: auto !important;
            width: 100% !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
