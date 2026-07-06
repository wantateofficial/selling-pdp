/**
 * 브랜드 아이덴티티 — 표시용 브랜드 값의 단일 소스.
 *
 * 리브랜딩(이름 변경) 시 이 파일만 고치면 로고·푸터·타이틀·사업자정보가 따라 바뀐다.
 * (법적 약관 본문의 정식 상호 표기는 법률 검토 대상이라 legal.ts 산문에 그대로 두고,
 *  구조화된 사업자정보(COMPANY_INFO)와 화면 표시 문구만 여기서 상속받는다.)
 *
 * 구조 A: 홈페이지 프로젝트도 이 파일을 `_shared/course_ui/identity.ts`에서 상속하게 옮긴다.
 */
export const BRAND = {
  /** 서비스명(브랜드 표시명) — 이름 확정 전까지 '새러데이클럽' 유지 */
  name: '새러데이클럽',
  /** 로고 픽셀 배지 텍스트 (2글자 권장) */
  badge: 'SC',
  /** 법인 정식 상호 */
  legalName: '주식회사 원테이트',
  /** 대표 연락 이메일 */
  email: 'contact@wantate.co.kr',
  /** 저작권 표기 연도 */
  year: 2026,
} as const;

/** 푸터 등에서 쓰는 저작권 문구 */
export const COPYRIGHT = `© ${BRAND.year} ${BRAND.legalName} (${BRAND.name}). All rights reserved.`;
