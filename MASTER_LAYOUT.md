# 마스터 레이아웃 스펙 (v1 확정 방향)

> 출처: 레퍼런스 6종(셀피쉬클럽·EO school·스터디파이·스파르타클럽·이상한마케팅) 강점 합성.
> 방향 결정(2026-06-27): **라이트+마스코트 브랜드 유지(DESIGN.md), 셀피쉬형 "팀·숫자·증거" 설득 구조만 차용.**
> 컬러/마스코트 토큰은 `DESIGN.md`가 권위. 이 문서는 **섹션 구조·블록·설득 순서**가 권위.

## 0. 핵심 전략

강사진이 아직 약함(대표·CTO 외 첫 강의 多) → **개인 강사 이력으로 신뢰를 만들지 않는다.**
대신 셀피쉬클럽처럼 **회사/팀이 해온 것 + 누적 숫자 + 결과 증거**로 신뢰를 만든다.
단, PRD §16 준수: "수익 보장"·"무조건 환급" 류 금지. 숫자는 **사실 기반 회사 지표**만.

## 1. 설득 순서 (Conversion Hierarchy + 레퍼런스 합성)

```
01 Hero            마스코트 IDLE · 한 줄 USP · 1차 CTA · 핵심 메타(무료/날짜)
02 Stat Proof      [NEW] 누적 숫자 3~4개 (주황 강조)        ← "이 회사 진짜 한다"
03 Problem/WhyNow  고객 문제 (THINKING/SURPRISED)
04 Track Record    [NEW ★] "우리는 이렇게 했다" 회사/팀 실적  ← 신뢰의 핵심 앵커
05 Beginner/Mech   처음 해도 되는 이유 / 작동 원리 (WINK)
06 Curriculum      챕터형 커리큘럼 (CODING)
07 Proof Captures  [NEW] 결과·후기 캡처 그리드 (MONEY)
08 What You Get    제공 자료 / 산출물
09 Eval + Refund   평가·환급 (challenge 전용)
10 Target/NotFor   추천 / 비추천 대상
11 How To Join     신청 절차 + 인라인 신청 안내
12 FAQ             아코디언 (THINKING)
13 Final CTA       반복 CTA · 마감/가격 (CHEER)
+  Sticky CTA      스크롤 내내 하단 고정 CTA 바
```

데모: 02·04·07 포함, 09 제외. 챌린지: 09 포함.

## 2. 신규 공용 블록 (레퍼런스에서 추출)

| 블록 | 역할 | 레퍼런스 근거 |
|------|------|--------------|
| `StatProof` | 큰 숫자 카드 3~4개 (예: 운영 N기·누적 조회수·콘텐츠 수) | 셀피쉬 91.9% / EO 150%↑ |
| `TrackRecord` | "우리는 이렇게 했다" 타임라인/실적 서술 + 보조 캡처 | 셀피쉬 회사 실적 중심 |
| `ProofCapture` | 결과·대화 후기 캡처 그리드 (없으면 placeholder) | 셀피쉬·스터디파이 카톡 캡처 |
| `HighlightBox` | 섹션당 핵심 한 문장 강조 박스 (`--sc-orange` 배경) | 전 레퍼런스 노란 박스 = 우리는 주황 |
| `StickyCTA` | 하단 고정 CTA/메타 바 | EO 고정 가격바 |

기존 `Section/CTAButton/PixelRobot/DotPattern`은 그대로 재사용.

## 3. 스타일 규칙 (라이트 유지)

- 배경: `--sc-white` / 섹션 교차 `--sc-cream`. **다크 미사용.**
- 강조(셀피쉬의 노랑 역할) = `--sc-orange` HighlightBox + 숫자 강조.
- 숫자 증명은 픽셀 폰트 가능, 본문은 Pretendard.
- 섹션마다 마스코트 1개 (DESIGN.md §4 배치표 따름), 신규 섹션 매핑:
  Stat Proof→SURPRISED · Track Record→IDLE · Proof Captures→MONEY.

> **구현 상태(2026-06-28)**: 위 신규 블록 4개 + StickyCTA 구현 완료, 두 템플릿 재배치·렌더 검증 완료.
> 회사 공통 데이터(숫자·트랙레코드·강사 실적)는 `src/data/company.ts`에 모여 있다 (강의별 MD 아님).
> 학생 후기는 미보유 → ProofCapture가 강사 본인 콘텐츠 실적으로 대체, "후기 준비 중" 자리 표시.

## 4. 다음 작업에 필요한 입력 (사용자 제공)

1. **회사/팀 트랙레코드** — `## 회사 실적` MD 섹션 신설용:
   누적 기수, 수강생 수, 운영 콘텐츠/조회수 합, 대표·CTO 성과 등 **사실 숫자**와
   "우리는 이렇게 했다" 1~2문단. (없는 항목은 빼고 가능한 것만)
2. **결과/후기 캡처** — 있으면 이미지, 없으면 placeholder로 두고 자리만 잡음.
3. ⚠️ 모든 숫자·표현은 PRD §16 가이드 준수 (수익/전환 보장 금지).

## 5. 구현 영향 범위 (확정 후 착수)

- `content/*.md`: `## 회사 실적`, `## 결과 증거` 섹션 헤더 추가
- `parser/normalizeCourseData.ts` + `types.ts`: `trackRecord`, `stats`, `proofCaptures` 필드 추가
- `components/sections/`: StatProof / TrackRecord / ProofCapture 신설, HighlightBox 레이아웃 추가
- `templates/DemoLanding·ChallengeLanding`: 위 설득 순서로 섹션 재배치
- `StickyCTA`: PageShell에 추가
