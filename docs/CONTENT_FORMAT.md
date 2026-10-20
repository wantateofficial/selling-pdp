# 상세페이지 콘텐츠 포맷 (상속 규격)

상세페이지는 **마크다운 1개 = 페이지 1개**다. 형식(`## 섹션`)은 고정, 내용만 갈아끼우면
디자인·구조가 그대로 유지된다. 파서: `src/parser/normalizeCourseData.ts`.

## 새 강의 추가 3단계
1. `content/_TEMPLATE.md`를 복사 → `content/{slug}.md`로 저장하고 내용 채우기
2. `src/types.ts`의 `PageType`에 라우팅 키 추가 (예: `'demo3'`)
3. 아래 3곳에 등록
   - `src/App.tsx` → `SOURCES`(md+slug), `TOGGLE`(미리보기 탭 라벨)
   - `scripts/generate-prompts.ts` → `SOURCES`

> 템플릿은 라우팅 키가 아니라 마크다운의 `## 페이지 타입`으로 정한다. `demo`면 `DemoLanding`, `challenge`면 `ChallengeLanding`.
> (App.tsx: `data.pageType === 'challenge' ? ChallengeLanding : DemoLanding`)

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
| `## 수강생 전용 툴` | `tool` | `이름:`·`소개:`·`제공 기간:`·`시연:` 라벨 + 나머지 불릿은 기능 목록 (demo·challenge 공통, 없으면 섹션 숨김) |
| `## 링크` | `links` | `신청폼:` → `apply`, `카카오톡:` → `kakao`, `신청 저장:` → `signupEndpoint`(선택, 이 페이지만 다른 시트로 받을 때) |

### `## 기본 정보` 라벨
`강의일`/`시작일`→`date`, `시간`→`time`, `진행 방식`/`방식`→`format`, `가격`→`price`,
`신청 방식`→`method`, `기간`→`duration`, `운영 구조`→`groupStructure`, `CTA`→`cta`,
`기수`→`cohort`(2기부터 1기 수강생 후기 섹션 노출), `혜택`→`perk`(Hero 칩 한 줄 혜택), `혜택 제목`→`benefitTitle`(demo 혜택 섹션 제목), `신청 탭`→`signupTab`(신청자 시트 탭 이름, 없으면 `기수`)

신청자 저장 주소 기본값은 `src/data/signup.ts` 의 `SIGNUP_ENDPOINT` 에 있다.

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
