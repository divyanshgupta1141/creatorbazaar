/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // New CreatorBazaar Brand Colors
        'primary': '#005F6B', // Deep Teal
        'primary-50': '#E6F7F8',
        'primary-100': '#CCEFF1',
        'primary-200': '#99DFE3',
        'primary-300': '#66CFD5',
        'primary-400': '#33BFC7',
        'primary-500': '#005F6B', // Primary
        'primary-600': '#004F59',
        'primary-700': '#003F47',
        'primary-800': '#002F35',
        'primary-900': '#001F23',
        'primary-foreground': '#FFFFFF',

        // Accent Coral
        'accent': '#FF6B6B', // Vibrant Coral
        'accent-50': '#FFF0F0',
        'accent-100': '#FFE1E1',
        'accent-200': '#FFC3C3',
        'accent-300': '#FFA5A5',
        'accent-400': '#FF8787',
        'accent-500': '#FF6B6B', // Accent
        'accent-600': '#FF4949',
        'accent-700': '#FF2727',
        'accent-800': '#E60505',
        'accent-900': '#C40404',
        'accent-foreground': '#FFFFFF',

        // Secondary Green
        'secondary': '#88B04B', // Earthy Green
        'secondary-50': '#F4F8ED',
        'secondary-100': '#E9F1DB',
        'secondary-200': '#D3E3B7',
        'secondary-300': '#BDD593',
        'secondary-400': '#A7C76F',
        'secondary-500': '#88B04B', // Secondary
        'secondary-600': '#6D8D3C',
        'secondary-700': '#526A2D',
        'secondary-800': '#37471E',
        'secondary-900': '#1C240F',
        'secondary-foreground': '#FFFFFF',

        // Highlight Yellow
        'highlight': '#FFD166',
        'highlight-50': '#FFFCF0',
        'highlight-100': '#FFF9E1',
        'highlight-200': '#FFF3C3',
        'highlight-300': '#FFEDA5',
        'highlight-400': '#FFE787',
        'highlight-500': '#FFD166', // Highlight
        'highlight-600': '#FFCB44',
        'highlight-700': '#FFC522',
        'highlight-800': '#FFBF00',
        'highlight-900': '#DDA000',
        'highlight-foreground': '#000000',

        // Background Colors
        'background': '#FAFBFC',
        'background-secondary': '#F3F4F6',
        'surface': '#FFFFFF',
        'surface-secondary': '#F9FAFB',

        // Dark Theme Colors
        'dark-bg': '#2C3E50', // Charcoal Blue
        'dark-surface': '#34495E',
        'dark-card': '#3C4F66',

        // Text Colors
        'text-primary': '#2C3E50',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
        'text-inverse': '#FFFFFF',

        // Status Colors
        'success': '#88B04B',
        'success-50': '#F4F8ED',
        'success-100': '#E9F1DB',
        'success-200': '#D3E3B7',
        'success-300': '#BDD593',
        'success-400': '#A7C76F',
        'success-500': '#88B04B',
        'success-600': '#6D8D3C',
        'success-700': '#526A2D',
        'success-800': '#37471E',
        'success-900': '#1C240F',
        'success-foreground': '#FFFFFF',

        'warning': '#FFD166',
        'warning-50': '#FFFCF0',
        'warning-100': '#FFF9E1',
        'warning-200': '#FFF3C3',
        'warning-300': '#FFEDA5',
        'warning-400': '#FFE787',
        'warning-500': '#FFD166',
        'warning-600': '#FFCB44',
        'warning-700': '#FFC522',
        'warning-800': '#FFBF00',
        'warning-900': '#DDA000',
        'warning-foreground': '#000000',

        'error': '#FF6B6B',
        'error-50': '#FFF0F0',
        'error-100': '#FFE1E1',
        'error-200': '#FFC3C3',
        'error-300': '#FFA5A5',
        'error-400': '#FF8787',
        'error-500': '#FF6B6B',
        'error-600': '#FF4949',
        'error-700': '#FF2727',
        'error-800': '#E60505',
        'error-900': '#C40404',
        'error-foreground': '#FFFFFF',

        // Border Colors
        'border': '#E5E7EB',
        'border-secondary': '#D1D5DB',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'xs': ['0.75rem', { lineHeight: '1.125rem' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.875rem' }],
        'xl': ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '3.25rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem' }],
        '8xl': ['6rem', { lineHeight: '6.25rem' }],
        '9xl': ['8rem', { lineHeight: '8.25rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      backdropBlur: {
        '25': '25px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(255, 107, 107, 0.3)',
        'glow-sm': '0 0 10px rgba(255, 107, 107, 0.2)',
        'glow-lg': '0 0 30px rgba(255, 107, 107, 0.4)',
        'card-hover': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}