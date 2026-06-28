import { Section } from '../layout/Section';

interface Props {
  items: string[];
}

/** Section 09. Who This Is Not For — 과장 방지 + 신뢰 상승 */
export function NotForSection({ items }: Props) {
  return (
    <Section
      sectionKey="not-for"
      eyebrow="NOT FOR"
      title="이런 분께는 권하지 않아요"
      bg="cream"
    >
      <ul className="grid gap-3">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-3 text-lg font-semibold text-sc-outline/70">
            <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-sc-outline/40 text-sm font-extrabold">
              ✕
            </span>
            {t}
          </li>
        ))}
      </ul>
    </Section>
  );
}
