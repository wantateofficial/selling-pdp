# 브랜드 시스템 (상속 규격)

상세페이지와 (앞으로 만들) 홈페이지가 **하나의 디자인 시스템을 공유**하도록 브랜드 자산을
`src/brand/`에 모아 두었다. 소비자는 배럴(`src/brand/index.ts`) 한 곳에서 가져온다.

## 구성
| 파일 | 역할 | 리브랜딩 시 |
|---|---|---|
| `src/brand/tailwind-preset.js` | 디자인 토큰(색·그림자·폰트·모션) = **단일 소스** | 색만 바꾸면 전체 톤 반영 |
| `src/brand/identity.ts` | 브랜드 값(이름·배지·상호·이메일·저작권) | **이 파일만** 고치면 로고·푸터·타이틀·사업자정보 반영 |
| `src/brand/index.ts` | 배럴 — 토큰·아이덴티티·프리미티브 단일 import 창구 | — |

토큰은 `tailwind.config.js`가 `presets: [scPreset]`로 상속한다. 즉 유틸리티 클래스
(`bg-sc-blue`, `shadow-pixel` 등)의 정의가 프리셋 한 곳에서 나온다.

### 프리미티브(배럴로 재노출)
`SaturdayClubLogo` · `PixelRobot` · `DotPattern` · `CTAButton` · `Section` · `HighlightBox` · `PageShell`
(파일은 아직 `src/components/`에 있고, 배럴에서만 통합 노출. 아래 이관 시 함께 이동.)

## 리브랜딩(이름 변경) 방법
1. `src/brand/identity.ts`의 `BRAND.name` / `BRAND.badge` 수정 → 로고·푸터·"숫자로 보는 OO"·사업자정보 자동 반영
2. 색 변경은 `src/brand/tailwind-preset.js`의 `BRAND_COLORS` 수정
> ⚠️ 법적 약관 **본문 산문**(legal.ts의 "주식회사 원테이트(브랜드명 …)" 문구)은 리브랜딩 시
> 법률 검토와 함께 별도로 갱신한다(자동 치환 대상 아님). 구조화된 사업자정보(COMPANY_INFO)는 자동 반영됨.

## 구조 A — `_shared/course_ui` 이관 계획 (홈페이지 착수 시)
홈페이지는 **새 프로젝트**로 만들고, 이 브랜드 시스템을 공유해 디자인 표류를 막는다.

1. `src/brand/` 폴더 + 프리미티브 컴포넌트 파일들을 `_shared/course_ui/`로 이동
2. 각 프로젝트 `tailwind.config.js` → `presets: [require('.../_shared/course_ui/tailwind-preset.js')]`
3. 소비자는 배럴에서 import하므로 **경로 한 줄**만 교체
4. `_shared/course_ui/README.md`에 사용법·의존성·사용 프로젝트 목록 기재 (공용 모듈 규격 §5)

> 지금은 in-repo 상속(상세페이지들끼리 공유). 홈페이지라는 **2번째 소비자**가 실제로 생기는 시점에
> `_shared`로 승격한다(YAGNI: 재사용이 확정될 때 추출).
