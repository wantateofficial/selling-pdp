import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';

const POINTS = [
  {
    t: '이제 소비는 짧은 영상에서 시작됩니다',
    d: '사람들이 정보를 글이 아니라 짧은 영상(숏폼)으로 접하기 시작하면서, 물건을 사는 과정도 숏폼 안에서 이뤄지고 있어요.',
  },
  {
    t: '상품을 검색이 아니라 콘텐츠에서 발견합니다',
    d: '필요한 걸 검색창에 치기 전에, 피드를 넘기다 만난 영상에서 먼저 사고 싶어집니다.',
  },
  {
    t: '콘텐츠를 만드는 일이 곧 수익으로 이어집니다',
    d: '쇼핑숏폼은 영상을 만드는 과정과 수익으로 연결되는 구조가 하나로 붙어 있어요.',
  },
];

// 출처가 있는 통계로 신빙성 보강
const STATS = [
  { v: '82.7%', l: '숏폼 시청 경험률 (2022년 56.5% → 2024년 82.7%)' },
  { v: '53.9%', l: '숏폼을 보고 상품을 구매한 경험이 있는 소비자' },
  { v: '21.6%', l: '인스타그램에서 직접 쇼핑한 경험률 (릴스 이용률은 46.2%)' },
];

/** Section 02. Why Now — 지금 배워야 하는 이유 */
export function WhyNowSection() {
  return (
    <Section sectionKey="why-now" eyebrow="WHY NOW" title="왜 지금 쇼핑숏폼인가" bg="white">
      <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
        <PixelRobot expression="surprised" size={130} className="mx-auto" />
        <div className="grid gap-4">
          {POINTS.map((p, i) => (
            <div key={p.t} className="sc-card flex gap-4 p-5">
              <span className="text-2xl font-extrabold text-sc-orange">0{i + 1}</span>
              <div>
                <p className="text-lg font-bold">{p.t}</p>
                <p className="text-sc-outline/75">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 통계 근거 (테두리 없이) */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.v} className="rounded-2xl bg-sc-gray p-4">
            <span className="block text-3xl font-extrabold text-sc-blue">{s.v}</span>
            <span className="mt-1 block text-sm font-semibold leading-snug text-sc-outline/80">
              {s.l}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-sc-outline/45">
        출처: 방송통신위원회·KISDI 『2024 방송매체 이용행태조사』, 오픈서베이 『소셜미디어·숏폼 트렌드 리포트 2024』, 픽플리 『숏폼 콘텐츠 마케팅 소비자 경험 2024』
      </p>
    </Section>
  );
}
