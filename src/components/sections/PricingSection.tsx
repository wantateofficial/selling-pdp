import { Section } from '../layout/Section';
import { PRICING, PRICING_NOTE } from '../../data/challenge';

/** Section (challenge). Pricing — 1기 한정 특별가 3구간 (할인율 % 비노출, 금액·인원 위주) */
export function PricingSection() {
  return (
    <Section
      sectionKey="pricing"
      eyebrow="1기 한정 특별가"
      title="첫 챌린지, 지금이 가장 좋은 가격"
      bg="white"
    >
      <p className="mb-6 max-w-2xl text-sc-outline/75">{PRICING_NOTE}</p>

      <div className="grid gap-4 md:grid-cols-3">
        {PRICING.map((t) => (
          <div
            key={t.name}
            className={`sc-card flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-pixel-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
              t.highlight ? 'ring-2 ring-sc-orange' : ''
            }`}
          >
            {t.highlight && (
              <span className="mb-2 inline-block w-fit rounded-full bg-sc-orange px-3 py-1 text-xs font-extrabold text-white">
                가장 먼저, 가장 저렴하게
              </span>
            )}
            <span className="text-sm font-bold text-sc-blue">{t.name}</span>
            <span className="mt-1 text-3xl font-extrabold">{t.price}</span>
            <span className="mt-2 text-sm font-semibold text-sc-outline/80">{t.seats}</span>
            <span className="mt-1 text-sm leading-snug text-sc-outline/60">{t.condition}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-sc-outline/45">
        ※ 가격과 인원은 1기에 한정되며, 결제 완료 순으로 마감됩니다. 정규 오픈 예정가는 50만원입니다.
      </p>
    </Section>
  );
}
