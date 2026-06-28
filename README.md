# 새러데이클럽 — 쇼핑숏폼 상세페이지

쇼핑숏폼 **무료 데모강의**와 **4주 실전 챌린지** 전환용 랜딩 상세페이지.
Vite + React + TypeScript + Tailwind 로 만든 단일 페이지 프리뷰입니다.

> 이 저장소는 **CTO 핸드오프용 프리뷰/스펙**입니다. 카피·구조·정책·디자인 톤이 확정된
> 기준안이며, 실제 홈페이지는 이 톤에 맞춰 새로 개발하시면 됩니다.

## 실행

```bash
npm install
npm run dev        # http://localhost:5183
```

- 무료 데모: `http://localhost:5183/?page=demo`
- 4주 챌린지: `http://localhost:5183/?page=challenge`
- 상단 미리보기 토글로도 전환 가능.

## 구조

```
content/                 # 카피 원본(Markdown) — demo / challenge
src/
  data/
    company.ts           # 회사/강사 트랙레코드·통계·신뢰 포인트
    challenge.ts         # 챌린지 전용: 가격·성적우수 리워드·평가표·환불(날짜기준)
    legal.ts             # 사업자정보 + 환불규정·개인정보처리방침·이용약관
  components/
    sections/            # 각 섹션 컴포넌트
    layout/              # Section/CTA/StickyCTA/Footer 등
    brand/               # SC 마스코트(PixelRobot)·로고·도트패턴
    system/              # ContentProtection(콘텐츠 보호)
  templates/             # DemoLanding / ChallengeLanding (섹션 조립)
public/assets/           # 마스코트 SVG, 강사 사진, 릴스 GIF
MASTER_LAYOUT.md         # 섹션 순서·설득 구조 스펙(권위)
DESIGN.md                # 브랜드 컬러·마스코트 토큰
```

## 핸드오프 시 꼭 채워야 할 것 (법적 필수)

`src/data/legal.ts` 의 `[기입 필요]` 항목 — 전자상거래법상 표시 의무:
- 상호(법인명), 대표자, 사업자등록번호, 통신판매업신고번호, 주소
- 고객센터/이메일, 개인정보보호책임자, 호스팅 제공자, 위탁사

> 환불규정·개인정보처리방침·이용약관은 표준안 초안입니다. **최종본은 법률 검토 후 확정** 권장.

## 핵심 규칙(카피 작성 시)

- 수익/구매전환 **“보장” 표현 금지** (사실·출처 기반 수치만).
- 가격: “정가 50만원→15만원” 식 비교가격 단정 금지 → “정규 오픈 예정가 50만원 · 1기 한정가”.
- 보상은 “환급”이 아니라 **“성적우수 리워드”** (수강취소 환불과 분리), 제세공과금 공제 고지.
- 환불은 **날짜(각 주차 강의일 14:00) 기준**. 상세 전문은 페이지 하단 `Footer` 환불규정.

## 콘텐츠 보호 / 개발자모드

페이지에 우클릭·드래그·개발자도구 단축키 억제가 걸려 있습니다. 작업 시 해제:
- 주소 끝에 `?dev=1` (해제) / `?dev=0` (복원), 또는 아무 곳에나 **`devmode`** 입력 → 토글.
- 상태는 브라우저 localStorage 에 저장됩니다.

## 빌드

```bash
npm run build      # dist/
npm run preview
```
