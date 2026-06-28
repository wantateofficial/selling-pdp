import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';
import type { RobotExpression } from '../brand/PixelRobot';

interface Props {
  sectionKey: string;
  eyebrow: string;
  title: string;
  items: string[];
  /** null이면 마스코트를 표시하지 않는다 */
  robot?: RobotExpression | null;
  bg?: 'white' | 'cream' | 'gray';
}

/** 제공 자료 / What You Get / What You Build 공용 — 체크 카드 그리드 */
export function BenefitSection({
  sectionKey,
  eyebrow,
  title,
  items,
  robot = 'money',
  bg = 'white',
}: Props) {
  return (
    <Section sectionKey={sectionKey} eyebrow={eyebrow} title={title} bg={bg}>
      <div className={`grid items-center gap-8 ${robot ? 'md:grid-cols-[1fr_auto]' : ''}`}>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((it) => (
            <div
              key={it}
              className="flex items-start gap-3 rounded-xl border-2 border-sc-mint/60 bg-white p-4"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-sc-mint text-sm font-extrabold text-sc-outline">
                ★
              </span>
              <p className="font-semibold">{it}</p>
            </div>
          ))}
        </div>
        {robot && <PixelRobot expression={robot} size={140} className="mx-auto" />}
      </div>
    </Section>
  );
}
