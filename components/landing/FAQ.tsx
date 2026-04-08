'use client'

import { useState } from 'react'
import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { FadeIn, RevealHeight, StaggerGroup, StaggerItem } from '@/components/animation'
import { useTheme } from '@mui/material'

const faqs = lc.faq.items

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const divider = theme.palette.divider

  const toggle = (index: number) => {
    setOpenIndex(current => (current === index ? null : index))
  }

  return (
    <section id='faq' style={{ padding: '100px 24px', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <FadeIn direction='up' distance={18}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SectionLabel>{lc.faq.label}</SectionLabel>
          </div>
        </FadeIn>

        <FadeIn direction='up' distance={24} transition={{ delay: 0.08 }}>
          <h2
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: textPrimary,
              margin: 0
            }}
          >
            {lc.faq.heading}
          </h2>
        </FadeIn>
      </div>

      <StaggerGroup staggerDelay={0.08} style={{ display: 'grid', gap: 0 }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i

          return (
            <StaggerItem key={faq.question}>
              <div
                style={{
                  borderBottom: `1px solid ${divider}`,
                  borderLeft: `3px solid ${isOpen ? primaryMain : 'transparent'}`,
                  padding: '20px 0 20px 16px',
                  transition: 'border-color 0.28s ease'
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: isOpen ? primaryMain : textPrimary,
                      fontFamily: 'var(--font)',
                      transition: 'color 0.28s ease'
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      fontSize: '1.4rem',
                      color: textSecondary,
                      lineHeight: 1,
                      flexShrink: 0,
                      marginLeft: '16px',
                      display: 'inline-block',
                      fontFamily: 'var(--font)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.28s ease'
                    }}
                  >
                    +
                  </span>
                </button>

                <RevealHeight open={isOpen}>
                  <p
                    style={{
                      color: textSecondary,
                      fontFamily: 'var(--font)',
                      fontWeight: 400,
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      paddingTop: '12px',
                      margin: 0
                    }}
                  >
                    {faq.answer}
                  </p>
                </RevealHeight>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
