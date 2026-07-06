/**
 * 브랜드 디자인 토큰 — Tailwind 프리셋 (색·그림자·폰트·모션).
 *
 * ⚠️ 이 파일이 "디자인 시스템의 단일 소스"다. 상세페이지·홈페이지가 모두 이 프리셋을 상속한다.
 * 구조 A 계획: 홈페이지 프로젝트 착수 시 이 파일을 `_shared/course_ui/tailwind-preset.js`로
 *   그대로 옮기고, 두 프로젝트의 tailwind.config.js가 `presets: [scPreset]`로 참조한다.
 *   (지금은 이 repo 안에 두고 in-repo로 상속. 옮길 때 import 경로만 바뀐다.)
 *
 * 리브랜딩 시 색만 바꾸면 전체 톤이 따라온다. 값의 의미:
 *   outline = 픽셀 테두리/본문 먹색, cream/face = 배경, blue = 주색, orange = CTA, mint = 포인트.
 */

/** 원자 토큰 (JS/TS 어디서든 import해서 쓸 수 있게 별도 export) */
export const BRAND_COLORS = {
  outline: '#1A1A24',
  face: '#F5F3EC',
  cream: '#F9F1DC',
  blue: '#4A6FA5',
  'blue-dark': '#3A5985',
  orange: '#FF7A1A',
  mint: '#4FC3A8',
  gray: '#F4F5F7',
};

export const BRAND_SHADOWS = {
  pixel: '4px 4px 0 0 #1A1A24',
  'pixel-sm': '3px 3px 0 0 #1A1A24',
  'pixel-lg': '6px 6px 0 0 #1A1A24',
};

export const BRAND_FONT = ['Pretendard', 'Pretendard Variable', 'system-ui', 'sans-serif'];

/** Tailwind 프리셋 — tailwind.config.js가 presets:[scPreset]로 상속 */
const scPreset = {
  theme: {
    extend: {
      colors: { sc: BRAND_COLORS },
      fontFamily: { sans: BRAND_FONT },
      maxWidth: { page: '1000px' },
      boxShadow: BRAND_SHADOWS,
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: { float: 'float 3s ease-in-out infinite' },
    },
  },
};

export default scPreset;
