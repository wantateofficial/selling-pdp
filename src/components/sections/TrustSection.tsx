import { Section } from '../layout/Section';
import { TRUST_POINTS } from '../../data/company';

/** Section 07. Why Trust Us — 회사 자산 기반 신뢰 근거 5가지 */
export function TrustSection() {
  return (
    <Section
      sectionKey="trust"
      eyebrow="WHY TRUST US"
      title="광고가 아니라 실적으로 말합니다"
      bg="gray"
    >
      <div className="grid gap-3 md:grid-cols-2">
        {TRUST_POINTS.map((t, i) => (
          <div
            key={t.title}
            className={`sc-card flex gap-4 p-5 ${
              i === TRUST_POINTS.length - 1 ? 'md:col-span-2' : ''
            }`}
          >
            <span className="w-8 shrink-0 text-center text-2xl leading-none">{t.icon}</span>
            <div>
              <p className="text-lg font-bold leading-snug">{t.title}</p>
              <p className="mt-1 text-sc-outline/75">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
