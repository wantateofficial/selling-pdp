/**
 * 1기 수강생 후기 — 2기 데모·챌린지 페이지의 후기 섹션(ReviewSection) 데이터.
 * 출처: 1기 카카오톡 대화·과제 피드백 시트 캡처 (shop/1st, 2026-10).
 *
 * ⚠️ 대화 문장은 캡처 원문을 그대로 옮긴 것이다. 고쳐 쓰지 않는다. 이름은 성만 남기고 가리고, 프로필 사진은 싣지 않는다.
 * ⚠️ 카피 규칙 (PRD §16): 수익 "보장" 표현 금지. 수익은 사실 그대로만 적는다.
 */

/**
 * 수강생 게재 동의 확인 여부.
 * false 인 동안에는 라이브(프로덕션) 빌드에서 섹션 전체가 숨겨진다. 동의를 확인한 뒤 true 로 바꾼다.
 */
export const REVIEWS_CONSENT_CONFIRMED = true;

export interface ChatLine {
  from: 'student' | 'instructor';
  text: string;
}

export interface ChatReview {
  /** 가린 표기명 (성만 남기고 이름은 ○○) */
  who: string;
  lines: ChatLine[];
  /** 실행 결과 칩 */
  results: string[];
  /** 수익이 확인된 경우에만 */
  revenue?: string;
}

export const CHAT_REVIEWS: ChatReview[] = [
  {
    who: '하○○ 님',
    lines: [
      { from: 'student', text: '쌤~ 첫 수익 났어요~' },
      {
        from: 'student',
        text: '1주일만에 제품 6개 올렸어요. 그런데 구매는 제가 올린 제품이 아니고요. 제 링크 타고 들어와 다른 걸 샀더라구요~^^ 완전 신기해요~^^ 더 열심히 해 볼께요~',
      },
      { from: 'instructor', text: '○○님~~!! 너무 축하드려요!!!!' },
    ],
    revenue: '챌린지 중 첫 수익 발생',
    results: ['1주일에 제품 6개 업로드'],
  },
  {
    who: '박○○ 님',
    lines: [
      {
        from: 'instructor',
        text: '전체적으로 퀄리티가 눈에 띄게 많이 올라왔어요!! 꾸준히 레퍼런스 영상 참고하시고 직접 편집하시는 게 영상에서도 보입니다!!',
      },
      {
        from: 'student',
        text: '시간내주셔서 꼼꼼히 봐주셔 넘 감사합니다. 내일 부터는 이틀에 하나씩 올려보려해요 ㅎ 남들이 흉볼까봐 겁이나서 못올리고 있었는데 용기 주셔서 기운이나네요 ㅎ 부딪혀봐야겠어요',
      },
    ],
    results: ['첫 영상 업로드', '1:1 과제 피드백'],
  },
  {
    who: '유○○ 님',
    lines: [
      {
        from: 'student',
        text: "강사님~~ 부계정에 올린 정보제공 도달영상이 조회수 '1,000'을 넘겼어요~~^^",
      },
      {
        from: 'instructor',
        text: '오 좋습니다!!! 그럼 해당 계정은 이제 노출이 정상적으로 된다고 확실하게 판단할 수 있을 거 같아요!!',
      },
    ],
    results: ['도달 영상 조회수 1,000회 돌파', '4주차 과제까지 제출'],
  },
];

/**
 * 과제 피드백 시트 캡처 (강사가 수강생 과제에 직접 남긴 피드백).
 * 수강생 대본·영상·피드백 본문은 이미지 자체에 블러를 구워 넣었다 (CSS 블러 아님, 원본 복원 불가).
 */
export interface FeedbackShot {
  image: string;
  title: string;
  desc: string;
}

export const FEEDBACK_SHOTS: FeedbackShot[] = [
  {
    image: '/assets/reviews/feedback-script.jpg',
    title: '대본 피드백',
    desc: '원 대본과 재구성한 대본을 나란히 놓고, 문장마다 고칠 점과 예시를 적어 드려요.',
  },
  {
    image: '/assets/reviews/feedback-video.jpg',
    title: '영상 피드백',
    desc: '몇 초 구간이 왜 지루한지, 영상 소스를 몇 개 더 넣으면 좋을지까지 장면별로 짚어 드려요.',
  },
];

export const REVIEW_DISCLAIMER =
  '1기 수강생과 실제로 나눈 카카오톡 대화와 과제 기록을 옮긴 것이며, 수강생의 이름 일부와 프로필, 과제 상세 내용은 보호를 위해 가렸습니다. 결과에는 개인차가 있고, 수익을 보장하지 않습니다.';
