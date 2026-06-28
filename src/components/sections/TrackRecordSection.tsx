import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';
import { HighlightBox } from '../layout/HighlightBox';
import { TRACK_RECORD, INSTRUCTOR, INSTRUCTOR_BACKGROUND } from '../../data/company';

/** Section 04. Track Record — "우리는 이렇게 했다" 회사/팀 실적 (신뢰의 핵심 앵커) */
export function TrackRecordSection() {
  return (
    <Section
      sectionKey="track-record"
      eyebrow="OUR TRACK RECORD"
      title="우리는 이렇게 해왔습니다"
      bg="cream"
    >
      <div className="grid items-start gap-8 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          {TRACK_RECORD.map((t) => (
            <div key={t.period} className="sc-card p-5">
              <div className="mb-2 inline-block rounded-md bg-sc-blue px-3 py-1 text-sm font-bold text-white">
                {t.period}
              </div>
              <ul className="space-y-1.5">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 font-semibold">
                    <span className="text-sc-orange">▪</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <PixelRobot expression="idle" size={150} className="mx-auto" />
      </div>

      {/* 강사 현장 배너 — "직접 교육을 운영하는 사람" 시각 증거 */}
      <figure className="mt-6 overflow-hidden sc-card">
        <img
          src={INSTRUCTOR.bannerImage}
          alt={INSTRUCTOR.bannerCaption}
          className="block w-full"
          loading="lazy"
        />
        <figcaption className="bg-sc-outline px-4 py-2 text-center text-sm font-semibold text-white">
          {INSTRUCTOR.bannerCaption}
        </figcaption>
      </figure>

      {/* 강사 카드 — 사진 + 이름/직함 + 이력 */}
      <div className="mt-6 sc-card bg-white p-5">
        <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
          <div className="mx-auto w-[160px] overflow-hidden rounded-xl bg-white">
            <img
              src={INSTRUCTOR.cardImage}
              alt={`${INSTRUCTOR.name} 강사`}
              className="aspect-[4/5] w-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-xl font-extrabold">{INSTRUCTOR.name}</span>
              <span className="text-sm font-semibold text-sc-blue">{INSTRUCTOR.title}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {INSTRUCTOR_BACKGROUND.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sc-outline/90">
                  <span className="text-sc-orange">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <HighlightBox>
          이론만 아는 사람이 아니라,
          <br />
          직접 만들어 본 사람이 가르칩니다.
        </HighlightBox>
      </div>
    </Section>
  );
}
