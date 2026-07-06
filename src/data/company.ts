/**
 * 회사/팀 트랙레코드 — 강의별이 아닌 회사 공통 신뢰 데이터.
 * 출처: 사용자 제공(2026-06) + 강사 소개 노션.
 * ⚠️ PRD §16 준수: 수익/전환 "보장" 표현 금지. 숫자는 사실 기반 지표만.
 */

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

/** Hero 직후 숫자 증명 블록 */
export const COMPANY_STATS: StatItem[] = [
  { value: '1,698명', label: '누적 AX 강의 수강생', sub: '2025 ~ 2026 상반기' },
  { value: '4건', label: '기업 AX 전환 프로젝트', sub: '2025 ~ 2026' },
  { value: '36만+', label: '강사 직접 제작 쇼핑숏폼 누적 조회수', sub: '직접 제작 콘텐츠 7개 합산' },
];

/** "우리는 이렇게 했다" 회사/팀 실적 타임라인 */
export interface TrackRecordItem {
  period: string;
  points: string[];
}

export const TRACK_RECORD: TrackRecordItem[] = [
  { period: '2025', points: ['AX 강의 수강생 1,154명 운영', '기업 AX 전환 프로젝트 2건 수행'] },
  { period: '2026 상반기', points: ['AX 강의 수강생 544명 운영', '기업 AX 전환 프로젝트 2건 수행'] },
];

/** 강사 프로필 (닉네임 전환 예정 — 현재 본명, TODO: 닉네임으로 교체) */
export const INSTRUCTOR = {
  name: '송현진',
  title: '前 창업부트캠프 총괄 PM',
  cardImage: '/assets/instructor/processed/card-bust.jpg',
  bannerImage: '/assets/instructor/processed/banner.jpg',
  bannerCaption: '강사가 직접 운영한 창업부트캠프 네트워킹데이 현장',
};

/** 강사 이력 (개인 후기 대신 "직접 해본 사람"임을 보여주는 신뢰 요소) */
export const INSTRUCTOR_BACKGROUND: string[] = [
  '연 매출 22억 규모 성인 부업 교육 플랫폼 전략기획 팀장',
  '예비·기창업자 대상 창업부트캠프 교육 프로그램 총괄 PM',
  '숏폼·부업 재테크·부동산 신규 강의 런칭 다수',
  '쇼핑숏폼을 직접 기획·제작·운영',
];

/** 강사 본인이 만든 쇼핑숏폼 결과 (학생 후기 부재 → 실제 제작 실적으로 증명) */
export interface ProofItem {
  name: string;
  views: string;
  /** 인스타 조회수 */
  insta: string;
  /** 틱톡 조회수 */
  tiktok: string;
  /** 어디서 터졌나 */
  hotOn: string;
  /** 한 줄 코멘트 (왜/어떻게 터졌나) */
  note: string;
  /** 자동재생 루프 GIF 경로 (mp4 트리밍 후 생성). 없으면 placeholder 표시 */
  gif?: string;
}

/** Real Results에 노출할 조회수 상위 4개 (하나씩, 좌우 번갈아 + 성과 패널) */
export const PROOF_TOP4: ProofItem[] = [
  {
    name: '차량 TPE 카매트',
    views: '약 16만',
    insta: '2,655',
    tiktok: '15.8만',
    hotOn: '틱톡',
    note: '틱톡에서 크게 터진 대표 콘텐츠. 실사용 장면이 반응을 끌었습니다.',
    gif: '/assets/reels/gif/01-carmat.gif',
  },
  {
    name: '버블 염색제',
    views: '약 13.9만',
    insta: '835',
    tiktok: '13.8만',
    hotOn: '틱톡',
    note: '비포·애프터가 명확한 제품이라 끝까지 보는 영상이 많았습니다.',
    gif: '/assets/reels/gif/02-bubbledye.gif',
  },
  {
    name: '미니 고데기',
    views: '약 2.6만',
    insta: '931',
    tiktok: '2.5만',
    hotOn: '틱톡',
    note: '휴대성 강조 한 컷으로 저장·공유가 붙었습니다.',
    gif: '/assets/reels/gif/03-minihairiron.gif',
  },
  {
    name: '차량용 테이블',
    views: '11,679',
    insta: '5,479',
    tiktok: '6,200',
    hotOn: '틱톡·인스타 고르게',
    note: '두 플랫폼에서 고르게 퍼진 케이스. 같은 영상으로 양쪽을 잡았습니다.',
    gif: '/assets/reels/gif/04-cartable.gif',
  },
];

/** WHY TRUST US — 신뢰 근거 5가지 (회사 자산 기반) */
export interface TrustPoint {
  icon: string;
  title: string;
  desc: string;
}

export const TRUST_POINTS: TrustPoint[] = [
  {
    icon: '🏢',
    title: '기업·기관도 맡기는 교육팀',
    desc: '기업 AX 전환 프로젝트 4건을 수행했고, 기업·기관(B2B·B2G) 교육도 진행합니다. 개인의 후기가 아니라, 조직이 맡길 만큼 검증된 팀이에요.',
  },
  {
    icon: '👥',
    title: '이미 1,698명이 들은 검증된 커리큘럼',
    desc: '처음 만든 실험이 아닙니다. 2025년부터 1,698명이 거쳐 가며 다듬어 온 교육이에요.',
  },
  {
    icon: '🆓',
    title: '항상 무료로 먼저 보여드립니다',
    desc: '감추고 팔지 않아요. 매번 무료 데모강의로 내용을 직접 확인한 뒤 시작하시면 됩니다.',
  },
  {
    icon: '💸',
    title: '거품 없는 정직한 가격',
    desc: '수백만 원을 호가하는 강의가 아니에요. 누구나 부담 없이 시작할 수 있는 가격으로 운영합니다.',
  },
  {
    icon: '🤝',
    title: '안 되는 것도 솔직하게 말합니다',
    desc: '수익을 보장한다고 말하지 않아요. 되는 구조와 한계를 있는 그대로 알려드립니다.',
  },
];

/** 조회수 ≠ 수익 고지 (PRD §16) */
export const PROOF_DISCLAIMER =
  '위 수치는 강사가 직접 제작한 콘텐츠의 조회수 실적이며, 조회수가 수익을 보장하지 않습니다.';
