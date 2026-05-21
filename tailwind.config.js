/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F5F0',
        'cream-2': '#EFEBE0',
        amber: { DEFAULT: '#D97706', dark: '#B45309', light: '#F59E0B' },
        rose: { DEFAULT: '#BE3E54', light: '#E5A0A8' },
        ink: { DEFAULT: '#2A1810', soft: '#4A3528', muted: '#6B6051' },
        hair: '#E8E1D5',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Lora', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { xl: '12px', '2xl': '16px', '3xl': '20px' },
      boxShadow: {
        warm: '0 1px 2px rgba(42,24,16,0.04), 0 4px 16px rgba(42,24,16,0.06)',
        'warm-lg': '0 4px 12px rgba(42,24,16,0.06), 0 16px 48px rgba(42,24,16,0.08)',
      },
    },
  },
  plugins: [],
};
