import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import tailwindcssRadixColors from 'tailwindcss-radix-colors'

export default {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans]
      },
      keyframes: {
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' }
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in'
      },
      screens: {
        'radix-xs': '520px',
        'radix-sm': '768px',
        'radix-md': '1024px',
        'radix-lg': '1280px',
        'radix-xl': '1640px'
      }
    }
  },
  plugins: [tailwindcssRadixColors]
} satisfies Config
