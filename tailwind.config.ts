import type { Config } from 'tailwindcss'

/**
 * Tailwind v4 primary tokens live in `src/app/(frontend)/globals.scss` (@theme).
 * This file extends tooling compatibility and documents the design system palette.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: {
          light: '#f8fafc',
          dark: '#09090b',
        },
        accent: {
          indigo: '#6366f1',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
          emerald: '#34d399',
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        'gradient-cta': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'gradient-mesh':
          'radial-gradient(ellipse 55% 40% at 18% 18%, rgb(99 102 241 / 0.12), transparent 65%), radial-gradient(ellipse 45% 35% at 82% 78%, rgb(139 92 246 / 0.08), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgb(99 102 241 / 0.35)',
        'glow-lg': '0 25px 50px -12px rgb(99 102 241 / 0.25)',
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'scale-in': 'scale-in 0.45s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
