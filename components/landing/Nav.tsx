'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import BrandLogo from '@/components/landing/BrandLogo'
import { MagneticButton } from '@/components/animation'
import { landingContent as lc } from '@/components/landing/landingContent'
import { useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import themeConfig from '@/core/configs/themeConfig'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const primaryMain = theme.palette.primary.main
  const dividerColor = theme.palette.divider
  const primaryBorderHover = alpha(primaryMain, 0.25)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleScroll = () => {
      if (!borderRef.current || !navRef.current) return
      const scrollY = window.scrollY

      gsap.to(borderRef.current, {
        borderColor: scrollY > 80 ? primaryBorderHover : dividerColor,
        duration: 0.3,
        overwrite: true
      })

      if (!prefersReduced) {
        const offset = Math.min(scrollY / 200, 1) * 2
        gsap.to(navRef.current, {
          y: offset,
          duration: 0.2,
          overwrite: true,
          ease: 'power1.out'
        })
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const progressTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      progressTrigger.kill()
    }
  }, [dividerColor, primaryBorderHover])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: -2,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '64px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        ref={borderRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          borderBottom: `1px solid ${dividerColor}`,
          transition: 'border-color 0.3s ease'
        }}
      >
        <BrandLogo size='md' />

        <MagneticButton
          as='a'
          href={lc.nav.cta.href}
          style={{
            fontFamily: 'var(--font)',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: primaryMain,
            color: '#fff',
            borderRadius: themeConfig.borderRadius,
            padding: '8px 20px',
            letterSpacing: '0.02em'
          }}
        >
          {lc.nav.cta.label}
        </MagneticButton>
      </div>

      <div
        ref={progressRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: '0%',
          background: primaryMain,
          transition: 'none',
          zIndex: 1001
        }}
      />
    </nav>
  )
}
