'use client'

import SectionLabel from '@/components/landing/SectionLabel'
import { landingContent as lc } from '@/components/landing/landingContent'
import { FadeIn, MagneticButton, StaggerGroup, StaggerItem } from '@/components/animation'
import { MOCK_PLANS } from '@/app/(home)/subscription-plans/data/MockPlan'
import { formatPrice } from '@/app/(home)/subscription-plans/util/plans'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { CheckCircle, XCircle } from 'lucide-react'

const activePlans = MOCK_PLANS.filter(plan => plan.isActive)

export default function Plans() {
  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary
  const bgPaper = theme.palette.background.paper
  const divider = theme.palette.divider

  if (!activePlans.length) return null

  return (
    <section id='plans' style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '56px'
        }}
      >
        <FadeIn direction='up' distance={18}>
          <div>
            <SectionLabel>{lc.plans.label}</SectionLabel>
          </div>
        </FadeIn>

        <FadeIn direction='up' distance={24} transition={{ delay: 0.08 }}>
          <h2
            className='plans-heading'
            style={{
              fontFamily: 'var(--font)',
              color: textPrimary,
              lineHeight: 1.12,
              letterSpacing: 0,
              margin: 0,
              maxWidth: '840px'
            }}
          >
            {lc.plans.heading}
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
            {lc.plans.body}
          </p>
        </FadeIn>
      </div>

      <StaggerGroup
        staggerDelay={0.12}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}
      >
        {activePlans.map(plan => {
          const isFeatured = plan.id === lc.plans.featuredPlanId

          return (
            <StaggerItem key={plan.id} style={{ height: '100%' }}>
              <article
                className='plan-card'
                style={{
                  height: '100%',
                  minHeight: 560,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                  borderRadius: 8,
                  background: isFeatured
                    ? `linear-gradient(180deg, ${alpha(primaryMain, 0.12)} 0%, ${bgPaper} 38%)`
                    : bgPaper,
                  border: `1px solid ${isFeatured ? alpha(primaryMain, 0.36) : divider}`,
                  boxShadow: isFeatured ? `0 18px 55px ${alpha(primaryMain, 0.14)}` : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ minHeight: 31, marginBottom: '18px' }}>
                  <span
                    style={{
                      visibility: isFeatured ? 'visible' : 'hidden',
                      alignSelf: 'flex-start',
                      borderRadius: 8,
                      border: `1px solid ${alpha(primaryMain, 0.28)}`,
                      background: alpha(primaryMain, 0.14),
                      color: primaryMain,
                      fontFamily: 'var(--font)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: 0,
                      padding: '6px 10px'
                    }}
                  >
                    {lc.plans.featuredBadge}
                  </span>
                </div>

                <div style={{ minHeight: 122 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font)',
                      color: textPrimary,
                      fontSize: '1.35rem',
                      lineHeight: 1.18,
                      letterSpacing: 0,
                      margin: '0 0 10px'
                    }}
                  >
                    {plan.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font)',
                      color: textSecondary,
                      fontSize: '0.92rem',
                      lineHeight: 1.68,
                      margin: 0
                    }}
                  >
                    {plan.description}
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingBottom: '22px', borderBottom: `1px solid ${alpha(primaryMain, 0.14)}` }}>
                  <p
                    style={{
                      fontFamily: 'var(--font)',
                      color: textPrimary,
                      fontSize: '2.1rem',
                      lineHeight: 1,
                      letterSpacing: 0,
                      fontWeight: 800,
                      margin: 0
                    }}
                  >
                    {formatPrice(plan.price, plan.billingCycle, plan.customBillingLabel)}
                  </p>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '24px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    flex: 1
                  }}
                >
                  {plan.features.map(feature => (
                    <li key={feature.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ display: 'inline-flex', paddingTop: '2px' }}>
                        {feature.enabled ? (
                          <CheckCircle size={17} color={theme.palette.success.main} />
                        ) : (
                          <XCircle size={17} color={theme.palette.text.disabled} />
                        )}
                      </span>

                      <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 0 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font)',
                            color: feature.enabled ? textPrimary : theme.palette.text.disabled,
                            fontSize: '0.9rem',
                            lineHeight: 1.45
                          }}
                        >
                          {feature.name}
                          {feature.limit && (
                            <span
                              style={{
                                display: 'inline-block',
                                marginLeft: '8px',
                                borderRadius: 8,
                                border: `1px solid ${alpha(primaryMain, 0.18)}`,
                                color: feature.enabled ? primaryMain : theme.palette.text.disabled,
                                fontSize: '0.68rem',
                                lineHeight: 1.2,
                                padding: '3px 7px'
                              }}
                            >
                              {feature.limit}
                            </span>
                          )}
                        </span>

                        {!feature.enabled && (
                          <span
                            style={{
                              fontFamily: 'var(--font)',
                              color: theme.palette.text.disabled,
                              fontSize: '0.74rem',
                              lineHeight: 1.4
                            }}
                          >
                            {lc.plans.inactiveFeatureLabel}
                          </span>
                        )}

                        {feature.description && (
                          <span
                            style={{
                              fontFamily: 'var(--font)',
                              color: textSecondary,
                              fontSize: '0.76rem',
                              lineHeight: 1.45
                            }}
                          >
                            {feature.description}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  as='a'
                  href={lc.plans.ctaHref}
                  style={{
                    marginTop: '28px',
                    width: '100%',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    padding: '12px 16px',
                    background: isFeatured ? primaryMain : 'transparent',
                    color: isFeatured ? '#fff' : primaryMain,
                    border: `1px solid ${isFeatured ? primaryMain : alpha(primaryMain, 0.36)}`,
                    fontFamily: 'var(--font)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: 0,
                    textDecoration: 'none'
                  }}
                >
                  {lc.plans.ctaLabel}
                </MagneticButton>
              </article>
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      <style>{`
        .plans-heading {
          font-size: 2.6rem;
        }

        @media (max-width: 1023px) {
          #plans [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .plans-heading {
            font-size: 2.15rem;
          }
        }

        @media (max-width: 699px) {
          #plans {
            padding: 88px 20px !important;
          }

          #plans [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }

          .plan-card {
            min-height: auto !important;
          }

          .plans-heading {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  )
}
