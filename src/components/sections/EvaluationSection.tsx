import { Section } from '../layout/Section';
import {
  EVALUATION,
  EVAL_PHILOSOPHY,
  TRANSFER_NOTE,
  FAIRNESS_NOTE,
  ANTI_FRAUD_NOTE,
  APPEAL_NOTE,
} from '../../data/challenge';

const TOTAL = EVALUATION.reduce((sum, e) => sum + e.points, 0);

/** Section (challenge). Leaderboard Evaluation — 사전 공개 평가표(100점)로 상위 10% 선정 */
export function EvaluationSection() {
  return (
    <Section
      sectionKey="evaluation"
      eyebrow="평가 기준"
      title="순위는 이렇게, 사전에 공개된 기준으로"
      bg="white"
    >
      {/* 평가 철학 — '과정 중심' 진정성 강조 */}
      <div className="mb-6 flex gap-3 rounded-xl border-2 border-sc-outline bg-sc-cream p-5 shadow-pixel-sm">
        <span className="shrink-0 text-2xl" aria-hidden>
          ❤️
        </span>
        <p className="text-[15px] font-semibold leading-relaxed text-sc-outline">
          {EVAL_PHILOSOPHY}
        </p>
      </div>

      <p className="mb-6 max-w-2xl text-sc-outline/75">
        선착순이나 추첨이 아니에요. 아래 항목을 점수로 합산해 전체 순위를 정하고, 4주를 끝까지
        완주한 분들 중 상위 10%를 성적우수 리워드 대상으로 선정합니다.
      </p>

      {/* 평가표 */}
      <div className="overflow-hidden sc-card">
        {/* 헤더 — 왼쪽 숫자가 '배점'임을 명확히 */}
        <div className="flex items-center gap-4 border-b-2 border-sc-outline/80 bg-sc-outline px-4 py-2.5 text-white">
          <span className="w-12 shrink-0 text-center text-xs font-extrabold">배점</span>
          <span className="text-xs font-extrabold tracking-wide">평가 항목</span>
          <span className="ml-auto text-xs font-semibold text-white/60">합계 100점</span>
        </div>
        {EVALUATION.map((e) => (
          <div
            key={e.item}
            className="flex items-center gap-4 border-b border-black/[0.06] p-4 last:border-b-0"
          >
            <span className="w-12 shrink-0 text-center text-xl font-extrabold text-sc-orange">
              {e.points}
            </span>
            <div>
              <p className="font-bold">
                <span className="mr-1.5" aria-hidden>
                  {e.icon}
                </span>
                {e.item}
              </p>
              <p className="text-sm text-sc-outline/65">{e.desc}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-4 bg-sc-gray p-4">
          <span className="w-12 shrink-0 text-center text-xl font-extrabold text-sc-blue">
            {TOTAL}
          </span>
          <p className="font-extrabold">합계 · 상위 10% 선정</p>
        </div>
      </div>

      {/* 고지 문구 */}
      <div className="mt-5 space-y-2">
        <p className="rounded-lg bg-sc-gray p-3 text-sm leading-relaxed text-sc-outline/75">
          🔎 {TRANSFER_NOTE}
        </p>
        <p className="rounded-lg bg-sc-gray p-3 text-sm leading-relaxed text-sc-outline/75">
          ⚖️ {FAIRNESS_NOTE}
        </p>
        <p className="rounded-lg bg-sc-gray p-3 text-sm leading-relaxed text-sc-outline/75">
          🚫 {ANTI_FRAUD_NOTE}
        </p>
        <p className="rounded-lg bg-sc-gray p-3 text-sm leading-relaxed text-sc-outline/75">
          🗳️ {APPEAL_NOTE}
        </p>
      </div>
    </Section>
  );
}
