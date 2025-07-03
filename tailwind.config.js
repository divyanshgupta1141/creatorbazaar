/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#003366', // Deep Blue
        'primary-50': '#E6F0FF', // Light Blue Tint
        'primary-100': '#CCE0FF', // Lighter Blue
        'primary-200': '#99C2FF', // Light Blue
        'primary-300': '#66A3FF', // Medium Light Blue
        'primary-400': '#3385FF', // Medium Blue
        'primary-500': '#0066CC', // Blue
        'primary-600': '#004D99', // Dark Blue
        'primary-700': '#003366', // Deep Blue - Primary
        'primary-800': '#002952', // Darker Blue
        'primary-900': '#001F3D', // Darkest Blue
        'primary-foreground': '#FFFFFF', // White

        // Secondary Colors
        'secondary': '#0483B8', // Medium Blue
        'secondary-50': '#E6F5FA', // Light Secondary Tint
        'secondary-100': '#CCEBF5', // Lighter Secondary
        'secondary-200': '#99D7EB', // Light Secondary
        'secondary-300': '#66C3E0', // Medium Light Secondary
        'secondary-400': '#33AFD6', // Medium Secondary
        'secondary-500': '#0483B8', // Medium Blue - Secondary
        'secondary-600': '#036A96', // Dark Secondary
        'secondary-700': '#025174', // Darker Secondary
        'secondary-800': '#023852', // Very Dark Secondary
        'secondary-900': '#011F30', // Darkest Secondary
        'secondary-foreground': '#FFFFFF', // White

        // Accent Colors
        'accent': '#00B4C6', // Teal
        'accent-50': '#E6F9FB', // Light Accent Tint
        'accent-100': '#CCF3F7', // Lighter Accent
        'accent-200': '#99E7EF', // Light Accent
        'accent-300': '#66DBE7', // Medium Light Accent
        'accent-400': '#33CFDF', // Medium Accent
        'accent-500': '#00B4C6', // Teal - Accent
        'accent-600': '#009AAA', // Dark Accent
        'accent-700': '#00808E', // Darker Accent
        'accent-800': '#006672', // Very Dark Accent
        'accent-900': '#004C56', // Darkest Accent
        'accent-foreground': '#FFFFFF', // White

        // Background Colors
        'background': '#FAFBFC', // Soft White
        'background-secondary': '#F3F4F6', // Light Gray
        'surface': '#FFFFFF', // Pure White
        'surface-secondary': '#F9FAFB', // Off White

        // Text Colors
        'text-primary': '#04253C', // Deep Navy
        'text-secondary': '#6B7280', // Neutral Gray
        'text-tertiary': '#9CA3AF', // Light Gray
        'text-inverse': '#FFFFFF', // White

        // Status Colors
        'success': '#10B981', // Emerald
        'success-50': '#ECFDF5', // Light Success Tint
        'success-100': '#D1FAE5', // Lighter Success
        'success-200': '#A7F3D0', // Light Success
        'success-300': '#6EE7B7', // Medium Light Success
        'success-400': '#34D399', // Medium Success
        'success-500': '#10B981', // Emerald - Success
        'success-600': '#059669', // Dark Success
        'success-700': '#047857', // Darker Success
        'success-800': '#065F46', // Very Dark Success
        'success-900': '#064E3B', // Darkest Success
        'success-foreground': '#FFFFFF', // White

        'warning': '#F59E0B', // Amber
        'warning-50': '#FFFBEB', // Light Warning Tint
        'warning-100': '#FEF3C7', // Lighter Warning
        'warning-200': '#FDE68A', // Light Warning
        'warning-300': '#FCD34D', // Medium Light Warning
        'warning-400': '#FBBF24', // Medium Warning
        'warning-500': '#F59E0B', // Amber - Warning
        'warning-600': '#D97706', // Dark Warning
        'warning-700': '#B45309', // Darker Warning
        'warning-800': '#92400E', // Very Dark Warning
        'warning-900': '#78350F', // Darkest Warning
        'warning-foreground': '#FFFFFF', // White

        'error': '#EF4444', // Red
        'error-50': '#FEF2F2', // Light Error Tint
        'error-100': '#FEE2E2', // Lighter Error
        'error-200': '#FECACA', // Light Error
        'error-300': '#FCA5A5', // Medium Light Error
        'error-400': '#F87171', // Medium Error
        'error-500': '#EF4444', // Red - Error
        'error-600': '#DC2626', // Dark Error
        'error-700': '#B91C1C', // Darker Error
        'error-800': '#991B1B', // Very Dark Error
        'error-900': '#7F1D1D', // Darkest Error
        'error-foreground': '#FFFFFF', // White

        // Border Colors
        'border': '#E5E7EB', // Light Gray
        'border-secondary': '#D1D5DB', // Medium Gray
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }], // 10px
        'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
        '8xl': ['6rem', { lineHeight: '1' }], // 96px
        '9xl': ['8rem', { lineHeight: '1' }], // 128px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
        '144': '36rem', // 576px
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
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-out',
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
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
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