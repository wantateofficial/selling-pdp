/**
 * 브랜드 시스템 배럴 — 디자인 시스템의 단일 import 창구.
 *
 * 이 폴더(src/brand/)가 곧 "상속 대상"이다. 홈페이지 프로젝트 착수 시(구조 A)
 * 이 폴더를 `_shared/course_ui/`로 옮기고, 아래 프리미티브 컴포넌트 파일들도 함께 이동한다.
 * 소비자는 항상 이 배럴에서 가져오므로, 옮긴 뒤에도 import 경로 한 줄만 바꾸면 된다.
 *
 * 구성:
 *  - identity : 브랜드 값(이름·상호·이메일) 단일 소스
 *  - 프리미티브 : Logo / PixelRobot / DotPattern / CTAButton / Section / HighlightBox / PageShell
 *
 * (디자인 토큰(색·그림자·폰트)은 tailwind-preset.js 에 있고 Tailwind 유틸리티 클래스로 소비한다.
 *  TSX에서 원자 색값이 필요해지면 그때 타입 있는 tokens.ts 를 추가한다 — YAGNI.)
 */
export { BRAND, COPYRIGHT } from './identity';

// 브랜드/레이아웃 프리미티브 (파일 위치는 유지, 창구만 통일)
export { SaturdayClubLogo } from '../components/brand/SaturdayClubLogo';
export { PixelRobot } from '../components/brand/PixelRobot';
export { DotPattern } from '../components/brand/DotPattern';
export { CTAButton } from '../components/layout/CTAButton';
export { Section } from '../components/layout/Section';
export { HighlightBox } from '../components/layout/HighlightBox';
export { PageShell } from '../components/layout/PageShell';
