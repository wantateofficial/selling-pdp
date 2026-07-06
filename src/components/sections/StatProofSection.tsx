import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';
import { COMPANY_STATS } from '../../data/company';
import { BRAND } from '../../brand/identity';

/** Section 02. Stat Proof — Hero 직후 회사 누적 숫자로 "진짜 한다"를 증명 */
export function StatProofSection() {
  return (
    <Section
      sectionKey="stat-proof"
      eyebrow="BY THE NUMBERS"
      title={`숫자로 보는 ${BRAND.name}`}
      bg="white"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {COMPANY_STATS.map((s) => (
          <div key={s.label} className="sc-card flex flex-col items-center p-6 text-center">
            <span className="text-[40px] font-extrabold leading-none text-sc-blue">
              {s.value}
            </span>
            <span className="mt-3 font-bold leading-snug">{s.label}</span>
            {s.sub && <span className="mt-1 text-sm text-sc-outline/60">{s.sub}</span>}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <PixelRobot expression="surprised" size={64} />
        <p className="text-sm font-semibold text-sc-outline/70">
          이미 1,600명 넘는 분들과 함께 AX·부업 교육을 운영해 왔습니다.
        </p>
      </div>
    </Section>
  );
}
