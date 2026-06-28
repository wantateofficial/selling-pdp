import type { CourseData } from '../../types';
import { CTAButton } from '../layout/CTAButton';
import { EditMarker } from '../layout/EditMarker';
import { SaturdayClubLogo } from '../brand/SaturdayClubLogo';
import { PixelRobot } from '../brand/PixelRobot';
import { DotPattern } from '../brand/DotPattern';

interface Props {
  data: CourseData;
}

/** Section 01. Hero — 즉시 이해 + 신청 유도 */
export function HeroSection({ data }: Props) {
  const { basics } = data;
  const chips = [
    basics.date && `📅 ${basics.date}${basics.time ? ` ${basics.time}` : ''}`,
    basics.duration && `⏱ ${basics.duration}`,
    basics.format && `💻 ${basics.format}`,
    basics.price && `💸 ${basics.price}`,
    basics.groupStructure && `👥 ${basics.groupStructure}`,
  ].filter(Boolean) as string[];

  return (
    <section data-section="hero" className="relative overflow-hidden bg-sc-cream px-8 pb-16 pt-10">
      <DotPattern />
      <EditMarker sectionKey="hero" sectionTitle="Hero" />
      <div className="relative mx-auto w-full max-w-[840px]">
        <SaturdayClubLogo className="mb-8" />

        <div>
          <p className="mb-4 inline-block rounded-full border-2 border-sc-outline bg-white px-3 py-1 text-sm font-bold text-sc-blue">
            {data.pageType === 'demo' ? '무료 데모강의' : '4주 실전 챌린지'}
          </p>
          <h1 className="mb-5 text-[34px] font-extrabold leading-[1.25] tracking-tight">
            {data.title}
          </h1>
          <p className="mb-7 text-lg text-sc-outline/80">{data.oneLiner}</p>

          <div className="mb-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-sc-outline/20 bg-white px-3 py-1.5 text-sm font-semibold"
              >
                {c}
              </span>
            ))}
          </div>

          {/* 마스코트를 CTA 버튼 바로 위에 배치 */}
          <div className="flex flex-col items-center">
            <PixelRobot expression="idle" size={150} className="mb-2" />
            <CTAButton
              label={basics.cta}
              href={data.links.apply}
              variant="primary"
              subtext="신청 후 카카오톡 안내방에서 강의 링크와 준비물을 안내드립니다."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
