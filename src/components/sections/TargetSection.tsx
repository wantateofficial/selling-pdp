import { Section } from '../layout/Section';

interface Props {
  items: string[];
}

/** Section 08. Who This Is For — 추천 대상 */
export function TargetSection({ items }: Props) {
  return (
    <Section sectionKey="target" eyebrow="WHO IT'S FOR" title="이런 분께 추천해요" bg="white">
      <ul className="grid gap-3">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-3 text-lg font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-sc-blue text-sm font-extrabold text-white">
              ✓
            </span>
            {t}
          </li>
        ))}
      </ul>
    </Section>
  );
}
