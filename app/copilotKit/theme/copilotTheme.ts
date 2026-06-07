export function getCopilotThemeVars({
  primary,
  isDark,
}: {
  primary: string
  isDark: boolean
}) {
  return {
    "--copilot-kit-primary-color": primary,
    "--copilot-kit-contrast-color": "#fff",

    "--copilot-kit-background-color": isDark ? "#161616" : "#ffffff",
    "--copilot-kit-input-background-color": isDark ? "#1e1e1e" : "#f6f8fc",

    "--copilot-kit-secondary-color": isDark ? "#161616" : "#ffffff",
    "--copilot-kit-secondary-contrast-color": isDark
      ? "rgba(230,235,255,0.92)"
      : "#0f1117",

    "--copilot-kit-separator-color": isDark
      ? "rgba(255,255,255,0.07)"
      : "rgba(0,0,0,0.09)",

    "--copilot-kit-muted-color": isDark
      ? "rgba(180,190,220,0.65)"
      : "rgba(15,17,23,0.55)",
  } as React.CSSProperties
}
