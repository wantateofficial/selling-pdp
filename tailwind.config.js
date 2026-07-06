import scPreset from './src/brand/tailwind-preset.js';

/**
 * 디자인 토큰은 브랜드 프리셋(src/brand/tailwind-preset.js)에서 상속한다.
 * 이 파일에는 프로젝트별 설정(content 스캔 경로)만 둔다.
 * → 홈페이지 프로젝트도 같은 프리셋을 presets로 참조하면 디자인이 자동 일치한다.
 */
/** @type {import('tailwindcss').Config} */
export default {
  presets: [scPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [],
};
