/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Environment — deep navy / near-black
        navy: '#05070c',
        navy2: '#090d16',
        panel: '#0c1120',
        panel2: '#111729',
        line: 'rgba(244,241,234,0.09)',
        line2: 'rgba(244,241,234,0.20)',

        // Identity — purple
        purple: '#4c2f8f',
        purpleDeep: '#241246',
        purpleSoft: '#9884c9',
        purpleBright: '#7c4fe0',

        // Precision — gold
        gold: '#c69a2e',
        goldLight: '#e3bd5c',
        goldDim: '#8a6c22',

        // Information
        ink: '#f4f1e8',
        paper: '#f4f1e8',
        muted: '#a9a6ae',
        dim: '#666370',
      },
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      backgroundImage: {
        'fine-grid':
          'linear-gradient(rgba(244,241,234,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,234,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
        'grid-sm': '24px 24px',
      },
    },
  },
  plugins: [],
}
