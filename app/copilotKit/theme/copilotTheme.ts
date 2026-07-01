import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

// CopilotKit v2 ships compiled Tailwind CSS inside `@layer`s. Unlayered rules
// (like MUI's GlobalStyles) always beat layered ones, regardless of
// specificity or source order — that's what lets these overrides win.
export function getCopilotChatOverrides(theme: Theme) {
  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
  const radius = Number(theme.shape.borderRadius)

  return {
    // Floating card on desktop (matches CopilotKit's own 768px breakpoint,
    // not MUI's 900px `md`), full-bleed on mobile.
    '.copilotKitSidebar': {
      border: 'none !important',
      borderRadius: '0 !important',
      // Clip square-cornered children to the rounded shape; box-shadow is
      // unaffected since it paints outside the border box.
      overflow: 'hidden !important',
      boxShadow: `${theme.shadows[8]} !important`,
      backgroundColor:
        theme.palette.mode === 'light'
          ? `${theme.palette.common.white} !important`
          : `${alpha(theme.palette.background.default, 0.92)} !important`,
      backdropFilter: theme.palette.mode === 'light' ? 'none !important' : 'blur(20px) saturate(1.4) !important',
      WebkitBackdropFilter: theme.palette.mode === 'light' ? 'none !important' : 'blur(20px) saturate(1.4) !important',
      // CopilotKit's `--background`/`--foreground`/etc. tokens only flip to
      // dark values under a `.dark` class this app never adds. Redefining
      // them here lets every nested wrapper inherit the right color.
      '--background': `${theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.background.default} !important`,
      '--foreground': `${theme.palette.text.primary} !important`,
      '--muted-foreground': `${theme.palette.text.secondary} !important`,
      '--border': `${theme.palette.divider} !important`,
      '@media (min-width: 768px)': {
        top: `${theme.spacing(1.5)} !important`,
        bottom: `${theme.spacing(1.5)} !important`,
        right: `${theme.spacing(1.5)} !important`,
        height: 'auto !important',
        maxHeight: `calc(100dvh - ${theme.spacing(3)}) !important`,
        borderRadius: `${radius * 2}px !important`,
        border: `1px solid ${alpha(theme.palette.divider, 0.6)} !important`,
      },
    },
    // Closed sidebar is only translated off-screen, not unrendered, so its
    // shadow/blur can still peek in. Force-hide it via the class CopilotKit
    // itself only applies while closed.
    '.copilotKitSidebar.cpk\\:pointer-events-none': {
      visibility: 'hidden !important',
    },
    '.copilotKitChat': {
      backgroundColor: 'transparent !important',
      paddingBlock: `${theme.spacing(1)} !important`,
    },
    '.copilotKitMessages': {
      backgroundColor: 'transparent !important',
      gap: `${theme.spacing(3)} !important`,
      paddingBlock: `${theme.spacing(2)} !important`,
    },
    // Many CopilotKit wrapper divs carry `data-copilotkit` and each paint
    // their own `background-color: var(--background)` independently — the
    // token fix above doesn't reliably cascade to all of them, so force
    // transparency directly on the known offenders.
    '[data-testid="copilot-message-list"]': {
      backgroundColor: 'transparent !important',
    },
    '[data-testid="copilot-scroll-content"]': {
      backgroundColor: 'transparent !important',
    },
    'div:has(> [data-testid="copilot-scroll-content"])': {
      backgroundColor: 'transparent !important',
    },
    '[data-testid="copilot-assistant-message"]': {
      backgroundColor: 'transparent !important',
    },
    '[data-testid="copilot-user-message"]': {
      backgroundColor: 'transparent !important',
    },
    // Hardcodes `bg-white dark:bg-gray-900` — the `dark:` variant never
    // activates, so it's permanently stuck white.
    '[data-testid="copilot-scroll-to-bottom"]': {
      backgroundColor: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
      border: `1px solid ${theme.palette.divider} !important`,
    },
    // `--tw-prose-*` tokens are pinned to light-mode oklch values the same
    // way as `--background` above; override the full set, not just body text.
    '.cpk\\:prose': {
      color: `${theme.palette.text.primary} !important`,
      '--tw-prose-body': `${theme.palette.text.primary} !important`,
      '--tw-prose-headings': `${theme.palette.text.primary} !important`,
      '--tw-prose-bold': `${theme.palette.text.primary} !important`,
      '--tw-prose-links': `${theme.palette.primary.main} !important`,
      '--tw-prose-lead': `${theme.palette.text.secondary} !important`,
      '--tw-prose-counters': `${theme.palette.text.secondary} !important`,
      '--tw-prose-bullets': `${alpha(theme.palette.text.secondary, 0.6)} !important`,
      '--tw-prose-hr': `${theme.palette.divider} !important`,
      '--tw-prose-quotes': `${theme.palette.text.primary} !important`,
      '--tw-prose-quote-borders': `${theme.palette.divider} !important`,
      '--tw-prose-captions': `${theme.palette.text.secondary} !important`,
      '--tw-prose-code': `${theme.palette.text.primary} !important`,
      '--tw-prose-pre-code': `${theme.palette.text.primary} !important`,
      '--tw-prose-pre-bg': `${alpha(theme.palette.text.primary, 0.05)} !important`,
      '--tw-prose-th-borders': `${theme.palette.divider} !important`,
      '--tw-prose-td-borders': `${alpha(theme.palette.divider, 0.6)} !important`,
      fontSize: `${theme.typography.body1.fontSize} !important`,
      lineHeight: '1.7 !important',
      maxWidth: 'none !important',
      '& > *:first-of-type': { marginTop: '0 !important' },
      '& > *:last-of-type': { marginBottom: '0 !important' },
      '& :where(ul, ol)': { paddingInlineStart: `${theme.spacing(2.75)} !important` },
      '& :where(li)': { marginBlock: `${theme.spacing(0.5)} !important` },
    },
    '[data-testid="copilot-tool-render-name"]': {
      color: `${theme.palette.success.dark} !important`,
      fontWeight: `${theme.typography.fontWeightMedium} !important`,
      fontSize: `${theme.typography.caption.fontSize} !important`,
    },
    '.hb-cpk-header': {
      border: 'none !important',
      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)} !important`,
      backgroundColor: `${alpha(theme.palette.background.paper, 0.72)} !important`,
      backdropFilter: 'blur(16px) saturate(1.3) !important',
      WebkitBackdropFilter: 'blur(16px) saturate(1.3) !important',
      padding: `${theme.spacing(2, 2.5)} !important`,
      borderRadius: '0 !important',
      '@media (min-width: 768px)': {
        borderTopLeftRadius: `${radius * 2}px !important`,
        borderTopRightRadius: `${radius * 2}px !important`,
      },
    },
    '[data-testid="copilot-header-title"]': {
      color: `${theme.palette.text.primary} !important`,
      fontWeight: `${theme.typography.fontWeightMedium} !important`,
      fontSize: `${theme.typography.body1.fontSize} !important`,
      letterSpacing: 'normal !important',
    },
    '[data-testid="copilot-close-button"]': {
      color: `${theme.palette.text.secondary} !important`,
      '&:hover': {
        backgroundColor: `${theme.palette.action.hover} !important`,
        color: `${theme.palette.text.primary} !important`,
      },
    },
    '.hb-cpk-toggle': {
      background: `${gradient} !important`,
      border: 'none !important',
      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)} !important`,
      transition: 'transform 0.15s ease',
      '&:hover': {
        transform: 'scale(1.06)',
      },
    },
    '.hb-cpk-user-msg': {
      background: `${gradient} !important`,
      color: `${theme.palette.primary.contrastText} !important`,
      border: 'none !important',
      borderRadius: `${radius * 2}px !important`,
      boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.28)} !important`,
      padding: `${theme.spacing(1.25, 2)} !important`,
      fontSize: `${theme.typography.body2.fontSize} !important`,
      lineHeight: '1.6 !important',
    },
    // Fixed 40px top padding plus a hover-only copy/edit toolbar that's
    // hidden via `visibility` (still reserves its height) — together they
    // caused a large gap below the bubble. Collapse the toolbar's height by
    // default and only expand it on hover.
    '.copilotKitMessage.copilotKitUserMessage': {
      paddingTop: '0 !important',
    },
    '[data-testid="copilot-user-toolbar"]': {
      maxHeight: '0 !important',
      marginTop: '0 !important',
      overflow: 'hidden !important',
      transition: 'max-height 0.15s ease !important',
    },
    '.copilotKitUserMessage:hover [data-testid="copilot-user-toolbar"]': {
      maxHeight: `${theme.spacing(4)} !important`,
    },
    '[data-testid="copilot-tool-render"] > div': {
      borderRadius: `${radius * 1.75}px !important`,
      border: `1px solid ${alpha(theme.palette.success.main, 0.24)} !important`,
      backgroundColor: `${alpha(theme.palette.success.main, 0.08)} !important`,
      boxShadow: 'none !important',
      padding: `${theme.spacing(1, 1.5)} !important`,
      backdropFilter: 'none !important',
    },
    // The input pill's ancestor wrapper is meant to carry CopilotKit's own
    // horizontal inset but it isn't reliably applied — target it directly.
    'div:has(> .copilotKitInput)': {
      paddingInline: `${theme.spacing(2)} !important`,
    },
    // The input footer's root (two levels up) also paints its own opaque
    // `var(--background)`, showing as a white strip behind the disclaimer.
    'div:has(> div > .copilotKitInput)': {
      backgroundColor: 'transparent !important',
    },
    '.copilotKitInput': {
      borderRadius: `${radius * 2.25}px !important`,
      border: `1px solid ${alpha(theme.palette.divider, 0.8)} !important`,
      backgroundColor: `${alpha(theme.palette.background.paper, 0.85)} !important`,
      backdropFilter: 'blur(12px) !important',
      WebkitBackdropFilter: 'blur(12px) !important',
      boxShadow: `${theme.shadows[2]} !important`,
      padding: `${theme.spacing(0.75, 1.25)} !important`,
      transition: 'box-shadow 0.15s ease, border-color 0.15s ease, background-color 0.15s ease',
      '&:focus-within': {
        borderColor: `${theme.palette.primary.main} !important`,
        backgroundColor: `${theme.palette.background.paper} !important`,
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)} !important`,
      },
    },
    '[data-testid="copilot-chat-textarea"]': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: `${theme.typography.body2.fontSize} !important`,
      lineHeight: '1.5 !important',
      '&::placeholder': {
        color: `${theme.palette.text.disabled} !important`,
      },
    },
    '[data-testid="copilot-send-button"]': {
      background: `${gradient} !important`,
      color: `${theme.palette.primary.contrastText} !important`,
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.35)} !important`,
      transition: 'transform 0.12s ease, opacity 0.12s ease !important',
      '&:hover': { opacity: '0.92 !important', transform: 'scale(1.04)' },
      '&:disabled': {
        background: `${alpha(theme.palette.text.primary, 0.08)} !important`,
        color: `${theme.palette.text.disabled} !important`,
        boxShadow: 'none !important',
      },
    },
    // Dormant until `suggestions` is wired up on <CopilotSidebar>.
    '[data-testid="copilot-suggestion"]': {
      background: `${gradient} !important`,
      color: `${theme.palette.primary.contrastText} !important`,
      border: 'none !important',
      borderRadius: `${radius * 2}px !important`,
      boxShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.25)} !important`,
      padding: `${theme.spacing(0.75, 1.5)} !important`,
      fontSize: `${theme.typography.caption.fontSize} !important`,
    },
  } as const
}
