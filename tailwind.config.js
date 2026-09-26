/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07050f',
        surface: '#0f0c22',
        card: '#17132e',
        card2: '#1e1a38',
        border: 'rgba(180,130,255,0.13)',
        border2: 'rgba(200,150,255,0.28)',
        text: '#f0ecff',
        muted: '#9b8ec0',
        dim: '#584f7a',
        gold: '#d4a017',
        gold2: '#e8b82a',
        gold3: '#f5cc5c',
        purple: '#7c3aed',
        purple2: '#a855f7',
      },
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
