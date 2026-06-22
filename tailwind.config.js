/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Royal maroon / blush cream / gold — matching the reference invitation
        maroon: {
          DEFAULT: '#6E1124',
          light: '#8C1E33',
          dark: '#4A0A18',
          deep: '#3A0712',
          wine: '#5A0E1E',
        },
        cream: {
          DEFAULT: '#F4E6DC',
          light: '#FBF3EB',
          dark: '#EAD7C8',
          blush: '#F0DCD1',
        },
        gold: {
          DEFAULT: '#C29A45',
          light: '#E7CD86',
          glow: '#FBEBC0',
          dark: '#A07A2C',
        },
        rose: {
          DEFAULT: '#A81E32',
          light: '#C8324A',
          leaf: '#5E6B3E',
        },
        ink: {
          DEFAULT: '#5A2530',
          light: '#7A4049',
          dark: '#3D1822',
        },
      },
      fontFamily: {
        script: ['"Allura"', 'cursive'],
        vibes: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      boxShadow: {
        card: '0 24px 60px -24px rgba(58, 7, 18, 0.55)',
        gold: '0 0 26px -4px rgba(231, 205, 134, 0.6)',
        device: '0 40px 120px -30px rgba(58, 7, 18, 0.7)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
      },
    },
  },
  plugins: [],
}
