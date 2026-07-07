import { Section } from '../layout/Section';
import { REFUND_TABLE, REFUND_INTRO } from '../../data/challenge';

/**
 * Section (challenge). Refund — 학원법 기준 안내(REFUND_INTRO) + 경과율 환불 표.
 * 상세 환불규정 전문은 페이지 하단 Footer 의 '환불규정'에 둔다.
 */
export function RefundSection() {
  return (
    <Section sectionKey="refund" eyebrow="REFUND" title="환불 규정은 학원법 기준으로" bg="cream">
      <p className="mb-5 max-w-2xl leading-relaxed text-sc-outline/75">{REFUND_INTRO}</p>
      <div className="overflow-hidden sc-card">
        {REFUND_TABLE.map((r) => (
          <div
            key={r.when}
            className="flex items-center justify-between gap-4 border-b border-black/[0.06] p-4 last:border-b-0"
          >
            <span className="font-semibold text-sc-outline/85">{r.when}</span>
            <span className="shrink-0 font-extrabold text-sc-blue">{r.rule}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-sc-outline/55">
        ※ 성적우수 리워드와 수강취소 환불은 별개 제도입니다. 자세한 환불 규정은 페이지 맨 아래
        ‘환불규정’을 확인해 주세요.
      </p>
    </Section>
  );
}
