/** 라우팅 키 겸 템플릿 구분. demo·demo2는 같은 데모 템플릿(날짜만 다름), challenge는 챌린지 템플릿. */
export type PageType = 'demo' | 'demo2' | 'challenge';

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
  };
}
