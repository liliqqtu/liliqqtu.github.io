/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pixel: {
          bg: '#0a0d14',
          card: '#121722',
          cardHover: '#171e2c',
          border: '#2a3449',
          borderActive: '#38bdf8',
          green: '#10b981',
          greenLight: '#34d399',
          amber: '#f59e0b',
          amberLight: '#fbbf24',
          blue: '#38bdf8',
          purple: '#a855f7',
          red: '#f43f5e',
          textMuted: '#94a3b8',
          textMain: '#f1f5f9'
        }
      },
      fontFamily: {
        pixel: ['"Silkscreen"', '"Press Start 2P"', 'monospace'],
        sans: ['"Inter"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.9)',
        'pixel': '4px 4px 0px 0px rgba(0, 0, 0, 0.9)',
        'pixel-lg': '6px 6px 0px 0px rgba(0, 0, 0, 0.9)',
        'pixel-emerald': '4px 4px 0px 0px #059669',
        'pixel-amber': '4px 4px 0px 0px #d97706',
        'pixel-blue': '4px 4px 0px 0px #0284c7',
      }
    },
  },
  plugins: [],
}
