# PRD v1 — 새러데이클럽 쇼핑숏폼 상세페이지 생성 에이전트

> 프로젝트명: **Saturday Club Course Landing Agent v1**
> 원본: `PRD v1 — 새러데이클럽 쇼핑숏폼 상세페이지 생성 에이전트.docx` (2026-06-25)

---

## 1. 프로젝트 개요

쇼핑숏폼 **무료 데모강의**와 **유료 4주 실전 챌린지반**의 상세페이지를 빠르게 제작하는 **로컬 기반 상세페이지 생성 에이전트**.

사용자가 강의 기획 내용을 **Markdown 파일**로 입력하면, 에이전트가 마케팅 구조에 맞게 해석해 다음을 생성한다.

- 무료 데모강의 상세페이지 / 유료 4주 챌린지 상세페이지
- 각 페이지별 썸네일 4종 (16:9, 1:1, 4:5, 9:16)
- HTML 미리보기
- 1000px 고정 폭 긴 상세페이지 이미지 (PNG/JPG)
- 섹션별 수정 요청 프롬프트

---

## 2. v1 핵심 목표

### 1차 적용 강의
"촬영 없이, 얼굴 노출 없이 초보자부터 시작하는 쇼핑숏폼 수익화 과정"

### A. 무료 데모강의 페이지
- 목적: 신청폼 입력 + 카카오톡 오픈채팅방 입장 유도
- 강의일 7월 9일 저녁 8시 / 온라인 라이브 / 무료
- 흐름: 신청폼 → 신청 완료 → 카톡 오픈채팅 링크 안내
- 주요 CTA: **무료 데모강의 신청하기**

### B. 유료 4주 챌린지 페이지
- 목적: 데모강의 이후 유료 과정 전환
- 과정명: 얼굴 노출 없는 쇼핑숏폼 4주 실전 챌린지반
- 데모 다음 주 일요일부터 4주 / 10명 단위 소그룹
- 과제 제출·콘텐츠 업로드·반응 확인·성과 기반 평가
- 환급: 10명당 우수자 1명 강의비 환급 / 가격은 데모 마지막에 공개
- 주요 CTA: **4주 실전 챌린지 신청하기**

---

## 3. v1 해결 방향

- MD 파일을 입력값으로 사용
- 상세페이지는 HTML/CSS 기반 생성, **텍스트는 실제 텍스트로 유지**
- 1000px 고정 폭 이미지로 export
- 자체 랜딩페이지용 반응형 구조 지원
- 섹션별 수정 요청 프롬프트 자동 생성
- 후기/성공사례가 없으면 **운영 구조·자료·평가 방식·환급 구조**를 신뢰 요소로 사용

---

## 4. 마케팅 설계 원칙

전환 목적. 프레임워크: **AIDA / PAS / JTBD / Risk Reversal / Conversion Hierarchy**.

Conversion Hierarchy 설득 순서:
1. 나에게 해당되는 문제인가
2. 지금 배워야 하는 이유가 있는가
3. 처음 해도 가능한가
4. 무엇을 배우는가 / 받는가
5. 누가 운영하는가
6. 어떻게 신청하는가
7. 리스크는 무엇인가
8. 지금 신청해야 하는 이유

---

## 5. 디자인 방향

- 화이트 배경 랜딩페이지형
- 색상: Primary Blue CTA / Accent Orange / Background White·Light Gray / Text Black·Deep Navy / Support 도트·픽셀
- 브랜드 무드: 도트 디자인, 픽셀 감성, 로봇 캐릭터, 초보자 친화, 실험실/챌린지/게임형 성장
- 자산 정책: 무료 아이콘 또는 제공된 브랜드 자산 우선, 없으면 placeholder 후 교체 가능하게 설계

---

## 6. 레이아웃 정책

- export 기준 **1000px 고정 폭**, 세로는 콘텐츠에 따라 자동 확장
- 랜딩 반응형: 데스크톱 max-width 1000px / 태블릿 100%+padding / 모바일 1열+CTA 반복
- 최종 이미지: `full-page.png`, `full-page.jpg`

---

## 7. 생성 산출물 (페이지별 공통)

- HTML 미리보기
- 1000px 긴 상세페이지 PNG / JPG
- 썸네일 16:9 / 1:1 / 4:5 / 9:16
- 섹션별 수정 요청 프롬프트 목록 (`edit-prompts.md`)

---

## 8. 입력 데이터 구조 (Markdown)

`content/shopping-shorts-demo.md`, `content/shopping-shorts-challenge.md`

공통 섹션 헤더:
- `# 제목`
- `## 페이지 타입` → `demo` | `challenge`
- `## 기본 정보` (강의일/시간/방식/가격/신청방식/CTA …)
- `## 한 줄 소개`
- `## 타깃 수강생`
- `## 고객 문제` (demo) / `## 핵심 USP` (challenge)
- `## 무료 데모에서 배우는 것` / `## 4주 커리큘럼`
- `## 제공 자료` / `## 평가 구조` / `## 환급 구조`
- `## 신뢰 요소`
- `## FAQ`
- `## 유의사항`

(원본 PRD 8.1 / 8.2의 MD 예시를 `content/`에 그대로 시드로 사용)

---

## 9. 페이지 섹션 구조

### 9.1 무료 데모강의 (12 섹션)
01 Hero · 02 Why Now · 03 Beginner Promise · 04 Problem · 05 Demo Curriculum · 06 What You Get · 07 Trust Without Reviews · 08 Who This Is For · 09 Who This Is Not For · 10 How To Join · 11 FAQ · 12 Final CTA

### 9.2 유료 챌린지 (10 섹션)
01 Hero · 02 Problem · 03 Mechanism · 04 4-Week Curriculum · 05 Evaluation System · 06 Refund System · 07 What You Build · 08 Who This Is For · 09 FAQ · 10 Final CTA

---

## 10. 수정 요청 기능

- v1은 영역 드래그 제외, **섹션별 수정 요청만** 제공
- 각 섹션에 수정 요청 버튼 → 해당 섹션 정보 기반 수정 프롬프트 생성
- 출력: `output/{page}/edit-prompts.md`

---

## 11. 썸네일 생성

- 비율 4종: 16:9 / 1:1 / 4:5 / 9:16
- 공통 구성: 로고/텍스트, 강의명, 핵심 USP, 날짜/시간, 무료·4주 강조, CTA 문구, 도트/픽셀/로봇 그래픽
- 데모 핵심 문구: "촬영 없이, 얼굴 노출 없이 / 초보자부터 시작하는 / 쇼핑숏폼 수익화 과정" + "7월 9일 저녁 8시 무료 데모강의"
- 챌린지 핵심 문구: "얼굴 노출 없는 / 쇼핑숏폼 4주 실전 챌린지반" + "직접 만들고 올리고 성과를 확인합니다"

---

## 12. 기술 스택

| 영역 | 선택 |
|------|------|
| 프론트엔드 | Vite + React + TypeScript |
| 스타일 | Tailwind CSS |
| Markdown 파싱 | gray-matter + remark |
| 이미지 Export | Playwright |
| 패키지 매니저 | npm 또는 pnpm |

---

## 13. 폴더 구조

```
course-landing-agent/
  content/
    shopping-shorts-demo.md
    shopping-shorts-challenge.md
  src/
    main.tsx
    App.tsx
    parser/        parseMarkdown.ts, normalizeCourseData.ts
    templates/     DemoLanding.tsx, ChallengeLanding.tsx, Thumbnail.tsx
    components/
      layout/      PageShell, Section, CTAButton, EditMarker
      sections/    Hero, WhyNow, Problem, Curriculum, Benefit, Trust,
                   Target, NotFor, HowToJoin, Evaluation, Refund, FAQ, FinalCTA
      brand/       DotPattern, PixelRobot, SaturdayClubLogo
    styles/        globals.css, theme.css
  public/assets/   robot/ dots/ references/ thumbnails/
  scripts/         export-page.ts, export-thumbnails.ts, generate-prompts.ts
  output/
    shopping-shorts-demo/      index.html, full-page.png/jpg, thumbnail-*.png, edit-prompts.md
    shopping-shorts-challenge/ (동일)
  package.json
  README.md
```

---

## 14. 명령어

```
npm run dev               # 개발 미리보기
npm run export:demo       # 무료 데모 페이지 export
npm run export:challenge  # 유료 챌린지 페이지 export
npm run export:all        # 전체 export
npm run prompts           # 수정 프롬프트 생성
```

---

## 15. Qshop 적용 (v1 권장 방식)

HTML 랜딩페이지를 기본으로 만들고, 긴 이미지는 백업/상세이미지 용도로 함께 export.
(A안 HTML 삽입 = 텍스트 수정·모바일·SEO 유리하나 Qshop 허용 범위 확인 필요 / B안 긴 이미지 = 빠르나 수정·모바일 약함)

---

## 16. 환급/성과 표현 가이드

- 사용 가능: "성과 기반 우수자 선정", "조회수·클릭·구매전환 종합 평가", "10명당 1명 수강료 환급"
- 금지: "누구나 수익 가능", "구매전환 보장", "무조건 환급", "수강료를 벌 수 있음", "4주 뒤 수익화 성공"
- 권장 고지: "…성과가 가장 높은 1명을 선정해 수강료를 환급합니다. 단, 수익과 구매전환은 보장하지 않습니다."

---

## 17. v1 제외 범위

관리자 로그인 · DB 저장 · 결제 연동 · 회원가입 직접 구현 · 카카오 오픈채팅 API · AI 이미지 자동 생성 · 영역 드래그 수정 · 다중 테마 · A/B 테스트 자동화 · 실제 Qshop API 연동

---

## 18. v1 성공 기준

- **기능**: MD 입력 → 두 페이지 생성 / HTML 미리보기 / 1000px 긴 이미지 export / 썸네일 4종 / 섹션 수정 프롬프트 / 모바일 가독성
- **마케팅**: 첫 화면에서 목적·무료 즉시 이해 / 후기 없이 신뢰 구조 / CTA 반복 / 챌린지 실행·환급 구조 명확 / 수익 보장 오해 방지 고지 / 브랜드 무드 반영
- **품질**: 1000px에서 한글 줄바꿈 자연스러움 / CTA 명확 / 색·그래픽 일관 / 구매 전환형 구조

---

## 19. 개발 우선순위

1. **Step 1 — 무료 데모 페이지** (HTML 미리보기 + 1000px 이미지 + 썸네일 4종 + 수정 프롬프트) ← MVP
2. **Step 2 — 유료 챌린지 페이지** (데모 구조 재사용 + 성과·환급·4주 강조)
3. **Step 3 — Qshop 반영 방식 테스트**

---

## 20. v2 확장 후보

입력 UI · 섹션 순서 드래그 · 영역 선택 수정 · 디자인 테마 · Qshop 업로드 보조 · 신청폼/회원가입 연동 · CTA 클릭 추적 · A/B 카피 변형 · 강의별 템플릿 라이브러리 · 후기/성과 자동 삽입
