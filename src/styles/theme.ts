export const theme = {
  colors: {
    black: '#1F1F1F',
    white: '#ffffff',
    ink: '#13131a',
    paper: '#f8f8fc',
    gray100: '#f1f1f6',
    gray200: '#dfdfea',
    gray500: '#7e7e93',
    gray700: '#47475a',
    accent: '#8c7cff',
    accentTwo: '#ff7d96',
    neon: '#5af2c9',
    /** Solutions section — vivid pink on white (brand reference) */
    solutionsAccent: '#E91E63',
    solutionsDivider: '#E0E0E0',
    /** Warm pink-grey ground (pairs with solutionsAccent; avoids cool blue-grey) */
    paperBlush: '#faf6f8',
  },
  fonts: {
    display: "'Bricolage Grotesque', 'Inter', sans-serif",
    serif: "'Playfair Display', 'Times New Roman', serif",
    sans: "'Inter', 'Helvetica Neue', sans-serif",
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    x2l: '48px',
    x3l: '64px',
    x4l: '96px',
    x5l: '128px',
  },
  layout: {
    maxWidth: '1280px',
    textWidth: '760px',
    sectionY: 'clamp(80px, 11vw, 152px)',
  },
  motion: {
    fast: '420ms cubic-bezier(0.22, 1, 0.36, 1)',
    smooth: '1200ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const

export type AppTheme = typeof theme
