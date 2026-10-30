import type { CourseData } from '../../types';
import { CTAButton } from '../layout/CTAButton';
import { EditMarker } from '../layout/EditMarker';
import { SaturdayClubLogo } from '../brand/SaturdayClubLogo';
import { PixelRobot } from '../brand/PixelRobot';
import { DotPattern } from '../brand/DotPattern';
import { ParenBreak } from '../layout/ParenBreak';

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
    basics.perk && `🎁 ${basics.perk}`,
  ].filter(Boolean) as string[];

  return (
    <section data-section="hero" className="relative overflow-hidden bg-sc-cream px-8 pb-16 pt-10">
      <DotPattern />
      <EditMarker sectionKey="hero" sectionTitle="Hero" />
      <div className="relative mx-auto w-full max-w-[840px]">
        <SaturdayClubLogo className="mb-8" />

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {basics.cohort && (
              <span className="rounded-full border-2 border-sc-outline bg-sc-orange px-3 py-1 text-sm font-extrabold text-white shadow-pixel-sm">
                {basics.cohort} 모집
              </span>
            )}
            <span className="rounded-full border-2 border-sc-outline bg-white px-3 py-1 text-sm font-bold text-sc-blue">
              {data.pageType === 'demo' ? '무료 데모강의' : '4주 실전 챌린지'}
            </span>
          </div>
          <h1 className="mb-5 text-[30px] sm:text-[34px] font-extrabold leading-[1.25] tracking-tight">
            {/* "…NO!" 처럼 느낌표·물음표 뒤에서 줄을 나누고, "할 수 있는"·"4주 실전"은 한 덩어리로 둔다 */}
            {data.title.split(/(?<=[!?])\s+/).map((part, i) => (
              <span key={i} className="block">
                {part.replace(/ 수 /g, '\u00A0수\u00A0').replace(/(\d+주) /g, '$1\u00A0')}
              </span>
            ))}
          </h1>
          <p className="mb-7 text-lg text-sc-outline/80">{data.oneLiner}</p>

          <div className="mb-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-sc-outline/20 bg-white px-3 py-1.5 text-sm font-semibold"
              >
                <ParenBreak text={c} subClassName="text-xs opacity-60" />
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
