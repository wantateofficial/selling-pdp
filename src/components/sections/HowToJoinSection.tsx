import { Section } from '../layout/Section';

interface Props {
  steps: string[];
}

/** Section 10. How To Join — 신청 흐름 안내 */
export function HowToJoinSection({ steps }: Props) {
  return (
    <Section sectionKey="how-to-join" eyebrow="HOW TO JOIN" title="신청은 이렇게 진행돼요" bg="white">
      <ol className="grid gap-4">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sc-orange text-base font-extrabold text-sc-outline">
              {i + 1}
            </span>
            <p className="pt-1 text-lg font-semibold">{s}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
