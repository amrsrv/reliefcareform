/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22577A',
        accent: '#41CAB5',
        secondary: '#8958FE',
        background: '#F8FAFC',
        text: '#000000',
        placeholder: '#6B7280',
        muted: '#6B7280',
        success: '#41CAB5',
        error: '#EF4444',
        card: '#FFFFFF',
        'selected-bg': '#E0F7F5',
        'brand-light': '#F0FDFC',
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading': ['22px', { lineHeight: '32px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'button': ['15px', { lineHeight: '20px', fontWeight: '500' }],
        'label': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'hint': ['13px', { lineHeight: '19px', fontWeight: '400' }],
        'progress': ['13px', { lineHeight: '16px', fontWeight: '400' }],
      },
      boxShadow: {
        'card': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'focus': '0 0 0 3px rgba(65, 202, 181, 0.15)',
        'selected': '0 10px 25px -3px rgba(65, 202, 181, 0.1), 0 4px 6px -2px rgba(65, 202, 181, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 25%, #334155 50%, #475569 75%, #64748B 100%)',
        'brand-mesh': 'radial-gradient(at 40% 20%, hsla(228, 100%, 74%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%), radial-gradient(at 40% 40%, hsla(355, 100%, 93%, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(22, 100%, 77%, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(182, 100%, 70%, 1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'brand-radial': 'radial-gradient(ellipse at center, #22577A 0%, #41CAB5 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'progress-fill': 'progressFill 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxHeight: {
        'form': '65vh',
        'options': '55vh',
      },
      borderRadius: {
        'brand': '8px',
      },
      flex: {
        '2': '2 2 0%',
      },
    },
  },
  plugins: [],
};