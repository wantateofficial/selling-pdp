import { Section } from '../layout/Section';
import type { PricingPlan } from '../../data/challenge';

/** Section (challenge). Pricing — 기수 한정 특별가 3구간 (할인율 % 비노출, 금액·인원 위주) */
export function PricingSection({ plan }: { plan: PricingPlan }) {
  return (
    <Section
      sectionKey="pricing"
      eyebrow={`${plan.cohort} 한정 특별가`}
      title={plan.title}
      bg="white"
    >
      <p className="mb-6 max-w-2xl text-sc-outline/75">{plan.note}</p>

      <div className="grid gap-4 md:grid-cols-3">
        {plan.tiers.map((t) => (
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

      <p className="mt-4 text-xs text-sc-outline/45">{plan.footnote}</p>
    </Section>
  );
}
