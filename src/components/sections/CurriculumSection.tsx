import type { CourseData } from '../../types';
import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';

interface Props {
  data: CourseData;
}

/** Section 05. Curriculum — demo: 배우는 것 / challenge: 주차별 테마·주제·제공 */
export function CurriculumSection({ data }: Props) {
  const isChallenge = data.pageType === 'challenge';
  return (
    <Section
      sectionKey="curriculum"
      eyebrow="CURRICULUM"
      title={isChallenge ? '4주 실전 커리큘럼' : '무료 데모에서 배우는 것'}
      bg="cream"
    >
      <div className="mb-6 flex justify-center">
        <PixelRobot expression="coding" size={130} />
      </div>

      <div className="grid gap-4">
        {data.curriculum.map((item, i) => {
          // demo: 단순 항목
          if (!item.label) {
            return (
              <div key={i} className="sc-card flex items-center gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sc-blue text-sm font-extrabold text-white">
                  {i + 1}
                </span>
                <p className="text-lg font-semibold">{item.text}</p>
              </div>
            );
          }
          // challenge: 주차 카드
          return (
            <div key={i} className="sc-card p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-sc-blue px-2.5 py-1 text-sm font-extrabold text-white">
                  {item.label.replace('주차', '')}주차
                </span>
                {item.title && <span className="text-lg font-extrabold">{item.title}</span>}
                {item.date && (
                  <span className="ml-auto text-sm font-semibold text-sc-outline/50">
                    {item.date}
                  </span>
                )}
              </div>
              <ul className="grid gap-1.5">
                {item.topics.map((t) => (
                  <li key={t} className="flex items-start gap-2 font-medium">
                    <span className="mt-[3px] text-sc-orange">·</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              {item.provided.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-sc-gray pt-3">
                  <span className="text-xs font-extrabold text-sc-blue">제공</span>
                  {item.provided.map((p) => (
                    <span
                      key={p}
                      className="rounded-md bg-sc-gray px-2 py-1 text-xs font-semibold"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
