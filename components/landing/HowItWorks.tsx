'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'

const section = lc.howItWorks

export default function HowItWorks() {
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
      const titleEls = sectionRef.current?.querySelectorAll('.how-work-header')
      const rows = gsap.utils.toArray<HTMLElement>('.how-work-row', sectionRef.current)

      if (titleEls?.length) {
        gsap.from(titleEls, {
          y: 28,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true
          }
        })
      }

      rows.forEach((row, index) => {
        const media = row.querySelector('.how-work-media')
        const mediaImage = row.querySelector('.how-work-media-image')
        const copy = row.querySelector('.how-work-copy')
        const direction = index % 2 === 0 ? 1 : -1

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            once: true
          }
        })

        tl.from(row, {
          y: 42,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power2.out'
        })

        if (media) {
          tl.from(media, {
            x: 70 * direction,
            autoAlpha: 0,
            duration: 0.85,
            ease: 'power3.out'
          }, '-=0.45')
        }

        if (mediaImage) {
          tl.fromTo(
            mediaImage,
            {
              xPercent: 14 * direction,
              scale: 1.14
            },
            {
              xPercent: 0,
              scale: 1,
              duration: 1.15,
              ease: 'power3.out'
            },
            '<'
          )
        }

        if (copy) {
          tl.from(copy, {
            x: -36 * direction,
            autoAlpha: 0,
            duration: 0.78,
            ease: 'power3.out'
          }, '-=0.75')
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id='how-it-works' ref={sectionRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '64px'
        }}
      >
        <div className='how-work-header'>
          <SectionLabel>{section.label}</SectionLabel>
        </div>
        <h2
          className='how-work-header'
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(1.95rem, 4vw, 3rem)',
            color: textPrimary,
            maxWidth: '860px',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            margin: 0
          }}
        >
          {section.heading}
        </h2>
        <p
          className='how-work-header'
          style={{
            fontFamily: 'var(--font)',
            color: textSecondary,
            fontSize: '1rem',
            lineHeight: 1.75,
            maxWidth: '760px',
            marginTop: '16px'
          }}
        >
          {section.body}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {section.steps.map((step, index) => {
          const isReversed = index % 2 === 1

          return (
            <article
              key={step.number}
              className='how-work-row'
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
                gap: '28px',
                alignItems: 'stretch'
              }}
            >
              <div
                className='how-work-media'
                style={{
                  order: isReversed ? 2 : 1,
                  position: 'relative',
                  minHeight: '360px',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  border: `1px solid ${alpha(primaryMain, 0.18)}`,
                  backgroundColor: bgPaper,
                  boxShadow: `0 30px 80px ${alpha(theme.palette.common.black, 0.16)}`
                }}
              >
                <div
                  className='how-work-media-image'
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.common.black, 0.1)} 0%, ${alpha(theme.palette.common.black, 0.45)} 100%), url('${step.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, ${alpha(primaryMain, 0.18)} 0%, transparent 42%, ${alpha(theme.palette.common.black, 0.2)} 100%)`
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    left: '22px',
                    padding: '10px 14px',
                    borderRadius: '999px',
                    background: alpha(theme.palette.common.white, 0.14),
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
                    fontFamily: 'var(--font)',
                    color: theme.palette.common.white,
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}
                >
                  {step.tag}
                </div>
              </div>

              <div
                className='how-work-copy'
                style={{
                  order: isReversed ? 1 : 2,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '30px',
                    background: `linear-gradient(180deg, ${alpha(primaryMain, 0.08)} 0%, ${bgPaper} 34%)`,
                    border: `1px solid ${divider}`,
                    padding: '34px',
                    overflow: 'hidden'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '46px',
                      height: '46px',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '14px',
                      border: `1px solid ${alpha(primaryMain, 0.08)}`,
                      background: alpha(primaryMain, 0.025),
                      boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.04)}`,
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'var(--font)',
                      fontSize: '0.95rem',
                      lineHeight: 1,
                      fontWeight: 700,
                      color: alpha(primaryMain, 0.28),
                      letterSpacing: '-0.04em',
                      pointerEvents: 'none'
                    }}
                  >
                    {step.number.replace('STEP ', '')}
                  </span>

                  <p
                    style={{
                      fontFamily: 'var(--font)',
                      color: primaryMain,
                      fontSize: '0.76rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      margin: 0
                    }}
                  >
                    {step.number}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font)',
                      color: textPrimary,
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      lineHeight: 1.15,
                      margin: '16px 0 14px',
                      maxWidth: '420px',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font)',
                      color: textSecondary,
                      fontSize: '0.98rem',
                      lineHeight: 1.75,
                      margin: 0,
                      maxWidth: '470px',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {step.desc}
                  </p>

                  <div style={{ marginTop: '24px', display: 'grid', gap: '12px', position: 'relative', zIndex: 1 }}>
                    {step.points.map(point => (
                      <div
                        key={point}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '14px 16px',
                          borderRadius: '18px',
                          border: `1px solid ${alpha(primaryMain, 0.12)}`,
                          background: alpha(primaryMain, 0.04)
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            marginTop: '8px',
                            borderRadius: '50%',
                            background: primaryMain,
                            flexShrink: 0,
                            boxShadow: `0 0 18px ${alpha(primaryMain, 0.35)}`
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font)',
                            color: textSecondary,
                            fontSize: '0.92rem',
                            lineHeight: 1.7
                          }}
                        >
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 899px) {
          .how-work-row {
            grid-template-columns: 1fr !important;
          }

          .how-work-media,
          .how-work-copy {
            order: initial !important;
          }
        }

        @media (max-width: 639px) {
          .how-work-media {
            min-height: 280px !important;
          }

          .how-work-copy > div {
            padding: 26px !important;
          }
        }
      `}</style>
    </section>
  )
}
