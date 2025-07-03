/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - CreatorBazaar Brand
        'primary': '#003366', // Deep Blue
        'primary-50': '#E6F0FF',
        'primary-100': '#CCE0FF',
        'primary-200': '#99C2FF',
        'primary-300': '#66A3FF',
        'primary-400': '#3385FF',
        'primary-500': '#0066CC',
        'primary-600': '#004D99',
        'primary-700': '#003366', // Primary
        'primary-800': '#002952',
        'primary-900': '#001F3D',
        'primary-foreground': '#FFFFFF',

        // Secondary Colors
        'secondary': '#0483B8', // Mid Gradient Blue
        'secondary-50': '#E6F5FA',
        'secondary-100': '#CCEBF5',
        'secondary-200': '#99D7EB',
        'secondary-300': '#66C3E0',
        'secondary-400': '#33AFD6',
        'secondary-500': '#0483B8', // Secondary
        'secondary-600': '#036A96',
        'secondary-700': '#025174',
        'secondary-800': '#023852',
        'secondary-900': '#011F30',
        'secondary-foreground': '#FFFFFF',

        // Accent Colors
        'accent': '#00B4C6', // Accent Teal
        'accent-50': '#E6F9FB',
        'accent-100': '#CCF3F7',
        'accent-200': '#99E7EF',
        'accent-300': '#66DBE7',
        'accent-400': '#33CFDF',
        'accent-500': '#00B4C6', // Accent
        'accent-600': '#009AAA',
        'accent-700': '#00808E',
        'accent-800': '#006672',
        'accent-900': '#004C56',
        'accent-foreground': '#FFFFFF',

        // Highlight Yellow
        'highlight': '#FFC100',
        'highlight-50': '#FFFBEB',
        'highlight-100': '#FEF3C7',
        'highlight-200': '#FDE68A',
        'highlight-300': '#FCD34D',
        'highlight-400': '#FBBF24',
        'highlight-500': '#FFC100', // Highlight
        'highlight-600': '#D97706',
        'highlight-700': '#B45309',
        'highlight-800': '#92400E',
        'highlight-900': '#78350F',
        'highlight-foreground': '#000000',

        // Background Colors
        'background': '#FAFBFC', // Soft White
        'background-secondary': '#F3F4F6',
        'surface': '#FFFFFF',
        'surface-secondary': '#F9FAFB',

        // Dark Theme Colors
        'dark-bg': '#04253C', // Deep Navy
        'dark-surface': '#0B1426',
        'dark-card': '#1A2332',
        'footer-black': '#0B0B0B',

        // Text Colors
        'text-primary': '#04253C', // Deep Navy
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
        'text-inverse': '#FFFFFF',

        // Status Colors
        'success': '#10B981',
        'success-50': '#ECFDF5',
        'success-100': '#D1FAE5',
        'success-200': '#A7F3D0',
        'success-300': '#6EE7B7',
        'success-400': '#34D399',
        'success-500': '#10B981',
        'success-600': '#059669',
        'success-700': '#047857',
        'success-800': '#065F46',
        'success-900': '#064E3B',
        'success-foreground': '#FFFFFF',

        'warning': '#F59E0B',
        'warning-50': '#FFFBEB',
        'warning-100': '#FEF3C7',
        'warning-200': '#FDE68A',
        'warning-300': '#FCD34D',
        'warning-400': '#FBBF24',
        'warning-500': '#F59E0B',
        'warning-600': '#D97706',
        'warning-700': '#B45309',
        'warning-800': '#92400E',
        'warning-900': '#78350F',
        'warning-foreground': '#FFFFFF',

        'error': '#EF4444',
        'error-50': '#FEF2F2',
        'error-100': '#FEE2E2',
        'error-200': '#FECACA',
        'error-300': '#FCA5A5',
        'error-400': '#F87171',
        'error-500': '#EF4444',
        'error-600': '#DC2626',
        'error-700': '#B91C1C',
        'error-800': '#991B1B',
        'error-900': '#7F1D1D',
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
        'base': ['1rem', { lineHeight: '1.75rem' }], // Loose line height
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
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
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
        'glow': '0 0 20px rgba(0, 180, 198, 0.3)',
        'glow-sm': '0 0 10px rgba(0, 180, 198, 0.2)',
        'glow-lg': '0 0 30px rgba(0, 180, 198, 0.4)',
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
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      minHeight: {
        'touch': '48px',
      },
      minWidth: {
        'touch': '48px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}