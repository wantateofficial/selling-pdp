import type { CourseData } from '../../types';
import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';

interface Props {
  data: CourseData;
}

/** Section 04. Problem — 고객의 막힘 포인트 */
export function ProblemSection({ data }: Props) {
  return (
    <Section
      sectionKey="problem"
      eyebrow="PROBLEM"
      title="혹시 여기서 멈춰 있지 않나요?"
      bg="white"
    >
      <div className="mb-6 flex justify-center">
        <PixelRobot expression="thinking" size={120} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {data.problems.map((p) => (
          <div
            key={p}
            className="flex items-start gap-3 rounded-xl border-2 border-sc-outline/15 bg-sc-gray p-4"
          >
            <span className="text-xl">😵</span>
            <p className="font-semibold">{p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
