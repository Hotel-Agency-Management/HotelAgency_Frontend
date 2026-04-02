import { COLORS } from "../data/chartColor";

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map(v =>
        Math.round(Math.max(0, Math.min(255, v)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
      .toUpperCase()
  );
}

function getLuminance(hex: string): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function getChartColors(isDark: boolean): string[] {
  return COLORS.map(color => {
    if (isDark) return color;

    const lum = getLuminance(color);
    const factor = lum * 0.3;
    const [r, g, b] = hexToRgb(color);
    const adjust = (c: number) => Math.max(0, Math.round(c - factor * 255));
    return rgbToHex(adjust(r), adjust(g), adjust(b));
  });
}
