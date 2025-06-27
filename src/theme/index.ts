import { createTheme } from '@mantine/core'

const customColors = {
  BasicRed: '#9C0034'
}

const theme = createTheme({
  //Fonts
  fontFamily: 'Inter, sans-serif',
  headings: {
    sizes: {
      h1: { fontSize: '40px' },
      h2: { fontSize: '32px' },
      h3: { fontSize: '24px' },
      h4: { fontSize: '20px' },
      h5: { fontSize: '16px' },
      h6: { fontSize: '14px' }
    }
  },

  // Breakpoints
  breakpoints: {
    xs: '360px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1440px'
  },

  defaultRadius: 'md',

  // Colors
  black: '#11151C',
  primaryShade: 5,
  defaultGradient: { from: 'primary.5', to: 'primary.3' },
  colors: {
    primary: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1'
    ]
  },
  primaryColor: 'primary',
  other: {
    colors: customColors
  }
})

declare module '@mantine/core' {
  export interface MantineThemeOther {
    colors: typeof customColors
  }
}

export default theme