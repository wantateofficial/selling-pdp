import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';
import type { CourseData } from '../../types';

/**
 * Section (challenge). 수강생 전용 툴 — 유료 수강생에게 수강기간 동안 무료로 여는 프로그램.
 * 콘텐츠 md 의 `## 수강생 전용 툴` 이 있을 때만 보인다. 데모 페이지에서는 `시연:` 문구로 "데모에서 보여 준다"를 강조한다.
 */
export function ToolSection({
  tool,
  robot = true,
}: {
  tool: NonNullable<CourseData['tool']>;
  robot?: boolean;
}) {
  const period = tool.period || '수강기간 동안 무료';
  return (
    <Section sectionKey="tool" eyebrow="수강생 전용 툴" title={tool.name || '쇼핑숏폼 수강생 전용 툴'} bg="cream">
      <div className={`grid items-center gap-8 ${robot ? 'md:grid-cols-[1fr_auto]' : ''}`}>
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-sc-orange px-3 py-1 text-xs font-extrabold text-white">
              챌린지 수강생에게만
            </span>
            <span className="rounded-full bg-sc-mint px-3 py-1 text-xs font-extrabold text-sc-outline">
              {period}
            </span>
          </div>
          {tool.demoNote && (
            <p className="mt-4 inline-block rounded-lg bg-sc-blue px-3 py-2 text-sm font-extrabold text-white">
              {tool.demoNote}
            </p>
          )}
          {tool.intro && <p className="mt-4 font-semibold leading-relaxed">{tool.intro}</p>}
          {tool.features.length > 0 && (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {tool.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl border-2 border-sc-blue/30 bg-white p-4">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-sc-blue text-sm font-extrabold text-white">
                    ✓
                  </span>
                  <p className="font-semibold">{f}</p>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-sc-outline/50">
            ※ 툴은 수강기간 동안에만 이용할 수 있고, 수강기간이 끝나면 이용이 종료됩니다.
          </p>
        </div>
        {robot && <PixelRobot expression="cheer" size={120} className="mx-auto" />}
      </div>
    </Section>
  );
}
