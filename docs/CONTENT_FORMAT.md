# 상세페이지 콘텐츠 포맷 (상속 규격)

상세페이지는 **마크다운 1개 = 페이지 1개**다. 형식(`## 섹션`)은 고정, 내용만 갈아끼우면
디자인·구조가 그대로 유지된다. 파서: `src/parser/normalizeCourseData.ts`.

## 새 강의 추가 3단계
1. `content/_TEMPLATE.md`를 복사 → `content/{slug}.md`로 저장하고 내용 채우기
2. `src/types.ts`의 `PageType`에 라우팅 키 추가 (예: `'demo3'`)
3. 아래 3곳에 등록
   - `src/App.tsx` → `SOURCES`(md+slug), `TOGGLE`(미리보기 탭 라벨)
   - `scripts/generate-prompts.ts` → `SOURCES`

> 데모 계열은 `demo`/`demo2`처럼 `DemoLanding`으로, `challenge`는 `ChallengeLanding`으로 렌더된다.
> (App.tsx: `page === 'challenge' ? ChallengeLanding : DemoLanding`)

## 섹션 → 필드 매핑
| 마크다운 섹션 | CourseData 필드 | 비고 |
|---|---|---|
| `# 제목` (H1) | `title` | Hero 대제목·StickyCTA |
| `## 페이지 타입` | `pageType` | `demo` \| `challenge` |
| `## 기본 정보` (라벨:값) | `basics.*` | 아래 라벨 표 참고 |
| `## 한 줄 소개` | `oneLiner` | Hero 서브카피 |
| `## 타깃 수강생` | `targets` | |
| `## 고객 문제` | `problems` | |
| `## 무료 데모에서 배우는 것` / `## 4주 커리큘럼` | `curriculum` | demo=불릿 / challenge=`### 주차` 서브섹션 |
| `## 제공 자료` | `benefits` | |
| `## 핵심 USP` | `usp` | challenge |
| `## 평가 구조` | `evaluation` | |
| `## 환급 구조` | `refund` | |
| `## 신뢰 요소` | `trust` | |
| `## 추천 대상` | `recommendedFor` | |
| `## 비추천 대상` | `notRecommendedFor` | |
| `## 신청 방법` | `howToJoin` | |
| `## FAQ` | `faq` | `### 질문` + 다음 줄 답변 |
| `## 유의사항` | `notice` | Final CTA 하단 |
| `## 링크` | `links` | `신청폼:` → `apply`, `카카오톡:` → `kakao` |

### `## 기본 정보` 라벨
`강의일`/`시작일`→`date`, `시간`→`time`, `진행 방식`/`방식`→`format`, `가격`→`price`,
`신청 방식`→`method`, `기간`→`duration`, `운영 구조`→`groupStructure`, `CTA`→`cta`

### 커리큘럼(challenge) 주차 형식
```
### 1주차 · 쇼핑숏폼 준비운동
7월 19일(일) 14시          ← 날짜 줄(30자 미만, "월/일/주차/시" 포함) → date
- 학습 주제 …               ← topics
- [제공] 제공 자료 …         ← provided
```

## 원칙
- **모든 섹션은 선택**이다. 없으면 해당 블록이 렌더에서 자동으로 빠진다(파서가 빈 배열 반환 → 컴포넌트 조건부 렌더).
- 표·정책 같은 **구조화 데이터**(가격·평가표·환불표)는 마크다운이 아니라 `src/data/challenge.ts`에서 관리한다.
- 신청 링크는 데모의 경우 `#signup`(하단 폼 스크롤), 카카오톡은 실제 오픈채팅방 URL.
