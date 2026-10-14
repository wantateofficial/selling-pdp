/**
 * 신청자 저장 백엔드 (구글 Apps Script 웹앱 URL, backend/signup.gs).
 *
 * 여기에 주소를 넣어 두면 push 만으로 라이브·스테이징에 반영된다. (Netlify 환경변수 불필요)
 * 강의마다 다른 시트에 받고 싶으면 콘텐츠 md 의 `## 링크` 에 `- 신청 저장: <웹 앱 URL>` 을 적는다.
 * 같은 시트 안에서 탭만 나누려면 `## 기본 정보` 의 `기수` 또는 `신청 탭` 을 쓴다. ("{값} 신청자" 탭 자동 생성)
 *
 * 우선순위: md 의 `신청 저장` > 아래 상수 > VITE_SIGNUP_ENDPOINT(예전 방식, 상수가 비어 있을 때만).
 * 이 주소는 어차피 배포된 페이지 소스에 그대로 실리는 값이라 비밀이 아니다.
 */
export const SIGNUP_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzSCymf2-Nt76MgkAYne61_c1vS_UPL2atq7E2z16EGzENHdvI9GiONzxe36I9HyJfL/exec';

export function resolveSignupEndpoint(override?: string): string {
  return (
    override ||
    SIGNUP_ENDPOINT ||
    (import.meta.env.VITE_SIGNUP_ENDPOINT as string | undefined) ||
    ''
  );
}
