/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sc: {
          outline: '#1A1A24',
          face: '#F5F3EC',
          cream: '#F9F1DC',
          blue: '#4A6FA5',
          'blue-dark': '#3A5985',
          orange: '#FF7A1A',
          mint: '#4FC3A8',
          gray: '#F4F5F7',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Pretendard Variable', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1000px' },
      boxShadow: {
        pixel: '4px 4px 0 0 #1A1A24',
        'pixel-sm': '3px 3px 0 0 #1A1A24',
        'pixel-lg': '6px 6px 0 0 #1A1A24',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
