# 새러데이클럽 디자인 시스템 (v1 확정)

> 출처: 제공된 브랜드 자산 `public/assets/references/mascot-guide.png` (SC 마스코트 가이드 시트)
> 이 값이 PRD 5장(디자인 방향)의 권위 있는 확정본이다.

## 1. 컬러 토큰 (가이드 시트 hex 확정)

| 토큰 | hex | 역할 |
|------|-----|------|
| `--sc-outline` | `#1A1A24` | 외곽선 / 본문 텍스트 (Deep Navy) |
| `--sc-face` | `#F5F3EC` | 마스코트 얼굴 / 크림 배경 |
| `--sc-cream` | `#F9F1DC` | 섹션 보조 배경 (SVG 배경색) |
| `--sc-blue` | `#4A6FA5` | 브랜드 블루 / Primary CTA |
| `--sc-orange` | `#FF7A1A` | 액센트 / 강조 하이라이트 |
| `--sc-mint` | `#4FC3A8` | 스크린 컬러 / 포인트 |
| `--sc-white` | `#FFFFFF` | 기본 배경 |
| `--sc-gray` | `#F4F5F7` | Light Gray 카드 배경 |

- **Primary CTA**: `--sc-blue` 버튼 + 흰 텍스트
- **고강조 포인트**: `--sc-orange` (배지, 밑줄, 강조 숫자)
- 본문: `--sc-outline`, 배경: `--sc-white` / `--sc-cream`

## 2. 마스코트 시스템 (SC 로봇 · 8표정)

`public/assets/robot/` — 투명 배경 픽셀아트 SVG. 섹션별 용도 매핑:

| 표정 | 파일 | 용도 |
|------|------|------|
| IDLE | `robot-idle.svg` | Hero / 메인 비주얼 |
| WINK | `robot-wink.svg` | CTA 옆 ("어서와요") |
| CODING | `robot-coding.svg` | 커리큘럼 / 작업 |
| MONEY | `robot-money.svg` | 가격 / 환급 / 후기 |
| CHEER | `robot-cheer.svg` | 수료 / 성공 / 모집 마감 / Final CTA |
| SLEEPY | `robot-sleepy.svg` | 점검 / 휴식 (보조) |
| SURPRISED | `robot-surprised.svg` | Why Now / 발견 / 뉴스 |
| THINKING | `robot-thinking.svg` | FAQ / 고민 / 문제 제시 |

## 3. 무드 / 스타일

- 화이트 배경 랜딩 + 픽셀/도트 액센트
- 둥근 모서리 카드, 픽셀 보더 느낌
- 폰트: Pretendard (한글 줄바꿈 안정) / 숫자·영문 강조엔 픽셀 폰트 선택 가능
- 도트 패턴은 코드(`DotPattern`)로 생성, 마스코트는 제공 SVG 사용

## 4. 섹션-마스코트 배치 가이드 (데모 페이지)

01 Hero → IDLE / 02 Why Now → SURPRISED / 03 Beginner Promise → WINK /
04 Problem → THINKING / 05 Curriculum → CODING / 06 What You Get → MONEY /
07 Trust → IDLE / 11 FAQ → THINKING / 12 Final CTA → CHEER
