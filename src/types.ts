/** 라우팅 키. 템플릿은 마크다운의 '페이지 타입'(demo | challenge)으로 정한다. demo3·challenge2 = 2기. */
export type PageType = 'demo' | 'demo2' | 'demo3' | 'challenge' | 'challenge2';

export interface CurriculumItem {
  /** 주차 라벨 (challenge: "1주차"), demo는 비움 */
  label?: string;
  /** 주차 테마 (challenge: "쇼핑숏폼 준비운동") */
  title?: string;
  /** 진행 일시 */
  date?: string;
  /** 주차별 학습 주제들 */
  topics: string[];
  /** 제공 자료 ([제공] 항목) */
  provided: string[];
  /** demo 단순 항목용 텍스트 */
  text?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CourseData {
  pageType: PageType;
  slug: string;
  title: string;
  oneLiner: string;

  basics: {
    date?: string;
    time?: string;
    format?: string;
    price?: string;
    method?: string;
    duration?: string;
    groupStructure?: string;
    /** 기수 (예: "2기"). 2기부터 1기 수강생 후기 섹션이 붙는다. */
    cohort?: string;
    /** 신청자 시트 탭 이름 키 (없으면 cohort). "{값} 신청자" 탭에 쌓인다 */
    signupTab?: string;
    /** Hero 칩에 한 줄로 보여줄 혜택 (예: "참여자 전원 전자책 증정") */
    perk?: string;
    /** (demo) 혜택 섹션 제목. 비우면 기본 제목 */
    benefitTitle?: string;
    cta: string;
  };

  targets: string[];
  problems: string[];
  curriculum: CurriculumItem[];
  benefits: string[];
  usp: string[];
  evaluation: string[];
  refund: string;
  trust: string[];
  recommendedFor: string[];
  notRecommendedFor: string[];
  howToJoin: string[];
  faq: FaqItem[];
  notice: string[];

  links: {
    apply: string;
    kakao: string;
    /** 이 페이지 신청자만 다른 시트로 받을 때의 웹 앱 URL (없으면 기본값) */
    signupEndpoint?: string;
  };
}
