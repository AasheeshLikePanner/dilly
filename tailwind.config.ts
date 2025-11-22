import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-core': '#030303',
        'surface': '#0f0f0f',
        'surface-hover': '#1a1a1a',
        'border': '#262626',
        'border-highlight': '#404040',
        'text-primary': '#ededed',
        'text-secondary': '#000000',
        'accent': '#ffffff',
        'danger': '#ff4444',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient-workspace': 'radial-gradient(circle at 50% 0%, #1a1a1a 0%, transparent 60%), radial-gradient(circle at 80% 90%, #0d0d0d 0%, transparent 50%)',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeInDown: {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards 0.4s',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'primary-glow': '0 0 12px rgba(255,255,255,0.4)',
        'card-hover-shadow': '0 20px 40px rgba(0, 0, 0, 0.6)',
        'card-active-shadow': '0 0 30px rgba(255,255,255,0.15)',
        'btn-primary-hover-shadow': '0 0 20px rgba(255,255,255,0.3)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
export default config
