import type { CourseData } from '../../types';
import { CTAButton } from '../layout/CTAButton';
import { EditMarker } from '../layout/EditMarker';
import { PixelRobot } from '../brand/PixelRobot';
import { DotPattern } from '../brand/DotPattern';

interface Props {
  data: CourseData;
}

/** Section 12. Final CTA — 최종 신청 유도 */
export function FinalCTASection({ data }: Props) {
  return (
    <section data-section="final-cta" className="relative overflow-hidden bg-sc-blue px-8 py-16 text-white">
      <DotPattern className="opacity-20" />
      <EditMarker sectionKey="final-cta" sectionTitle="Final CTA" />
      <div className="relative mx-auto flex w-full max-w-[840px] flex-col items-center text-center">
        <PixelRobot
          expression="cheer"
          size={150}
          className="mb-5 animate-float motion-reduce:animate-none"
        />
        <h2 className="mb-3 text-[30px] font-extrabold leading-snug">
          지금 신청하면 바로 안내드려요
        </h2>
        <p className="mb-8 text-white/85">
          신청 후 카카오톡 안내방에서 강의 링크와 준비물을 안내드립니다.
        </p>
        <CTAButton label={data.basics.cta} href={data.links.apply} variant="invert" />

        {data.notice.length > 0 && (
          <ul className="mt-10 max-w-[600px] space-y-1.5 text-left text-xs leading-relaxed text-white/60">
            {data.notice.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden>·</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
