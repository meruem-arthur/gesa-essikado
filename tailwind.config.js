/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07060d',        // environment — near-black
        surface: '#0c0a17',    // panels sitting slightly above bg
        surface2: '#120f21',
        ink: '#f4f1ea',        // warm off-white — information
        muted: '#948da8',      // neutral gray-purple — secondary information
        dim: '#5b566e',
        line: 'rgba(244,241,234,0.09)',
        line2: 'rgba(244,241,234,0.16)',
        purple: '#6d4fd1',      // identity / interaction
        purple2: '#9b7cf0',
        purpledeep: '#2a1f52',  // rich dark purple — atmosphere
        gold: '#cf9f3f',        // precision / emphasis
        gold2: '#e3b957',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'clamp-hero': 'clamp(2.75rem, 9vw, 8rem)',
        'clamp-statement': 'clamp(2rem, 6vw, 4.5rem)',
      },
    },
  },
  plugins: [],
}
