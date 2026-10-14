import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';
import { INSTRUCTOR } from '../../data/company';
import {
  CHAT_REVIEWS,
  FEEDBACK_SHOTS,
  ACCOUNT_CHANGE,
  REVIEW_DISCLAIMER,
  REVIEWS_CONSENT_CONFIRMED,
  type ChatReview,
} from '../../data/reviews';

// 게재 동의 확인 전에는 스테이징/개발에서만 보인다. (프로덕션 빌드는 .env.production 의 VITE_SHOW_EDIT_REQUEST=false)
const IS_PREVIEW = import.meta.env.VITE_SHOW_EDIT_REQUEST !== 'false';

/** 카카오톡 대화를 말풍선으로 옮긴 카드 — 수강생은 왼쪽, 강사는 오른쪽 */
function ChatCard({ review, wide }: { review: ChatReview; wide?: boolean }) {
  return (
    <figure className={`sc-card flex flex-col p-5 ${wide ? 'md:col-span-2' : ''}`}>
      <figcaption className="mb-4 flex flex-wrap items-center gap-2">
        {/* 프로필 사진은 싣지 않는다. 흐린 자리표시만 보여준다 */}
        <span aria-hidden className="h-8 w-8 rounded-full bg-sc-outline/25 blur-[3px]" />
        <span className="text-sm font-extrabold">{review.who}</span>
        {review.revenue && (
          <span className="rounded-md bg-sc-mint px-2 py-1 text-xs font-extrabold text-sc-outline">
            {review.revenue}
          </span>
        )}
        {review.results.map((r) => (
          <span key={r} className="rounded-md bg-sc-gray px-2 py-1 text-xs font-semibold">
            {r}
          </span>
        ))}
      </figcaption>

      <div className="flex flex-1 flex-col gap-2">
        {review.lines.map((line, i) =>
          line.from === 'student' ? (
            <p
              key={i}
              className="max-w-[88%] self-start rounded-2xl rounded-tl-sm bg-sc-gray px-4 py-3 text-[15px] font-semibold leading-relaxed"
            >
              {line.text}
            </p>
          ) : (
            <div key={i} className="max-w-[88%] self-end">
              <p className="mb-1 text-right text-[11px] font-bold text-sc-outline/45">
                {INSTRUCTOR.name} 강사
              </p>
              <p className="rounded-2xl rounded-tr-sm bg-sc-blue px-4 py-3 text-[15px] font-semibold leading-relaxed text-white">
                {line.text}
              </p>
            </div>
          ),
        )}
      </div>
    </figure>
  );
}

function SubHeading({ children }: { children: string }) {
  return <h3 className="mb-4 mt-10 text-xl font-extrabold leading-snug">{children}</h3>;
}

/**
 * Section. Student Reviews — 1기 수강생 후기 (2기 페이지 전용).
 * 강사 실적(ProofCaptureSection) 바로 뒤에서 "수강생도 해냈다"를 보여준다.
 * 큰 수익보다 실행 과정(첫 업로드·피드백·계정 변화) 중심으로 구성한다.
 */
export function ReviewSection() {
  if (CHAT_REVIEWS.length === 0) return null;
  if (!REVIEWS_CONSENT_CONFIRMED && !IS_PREVIEW) return null;

  const { before, after } = ACCOUNT_CHANGE;

  return (
    <Section
      sectionKey="reviews"
      eyebrow="1기 수강생 후기"
      title="먼저 시작한 1기는 이렇게 해냈어요"
      bg="cream"
    >
      {!REVIEWS_CONSENT_CONFIRMED && (
        <p className="no-export mb-6 rounded-lg border-2 border-dashed border-sc-orange bg-white p-3 text-sm font-bold text-sc-orange">
          수강생 게재 동의 확인 전이라, 라이브 페이지에는 이 섹션이 나오지 않아요.
        </p>
      )}

      <div className="flex items-center gap-3">
        <PixelRobot expression="cheer" size={64} />
        <p className="font-semibold text-sc-outline/80">
          왕초보로 시작한 1기 수강생들이 챌린지 동안 카카오톡으로 남긴 실제 대화예요.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {CHAT_REVIEWS.map((r, i) => (
          <ChatCard key={r.who} review={r} wide={i === 0} />
        ))}
      </div>

      <SubHeading>과제를 내면 이렇게 돌려드려요</SubHeading>
      <p className="-mt-2 mb-4 text-sm text-sc-outline/60">
        실제 수강생 과제라 상세 내용은 흐리게 처리했어요.
      </p>
      <div className="grid gap-4">
        {FEEDBACK_SHOTS.map((f) => (
          <figure key={f.title} className="overflow-hidden sc-card">
            <img
              src={f.image}
              alt={`1기 수강생 과제에 남긴 ${f.title} 시트`}
              className="block w-full"
              loading="lazy"
            />
            <figcaption className="border-t border-black/[0.06] p-4">
              <p className="font-extrabold text-sc-blue">{f.title}</p>
              <p className="mt-1 text-sm text-sc-outline/75">{f.desc}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <SubHeading>0에서 시작한 계정이 일주일 남짓 만에</SubHeading>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[before, after].map((s, i) => (
          <figure key={s.label} className="overflow-hidden sc-card">
            <figcaption className="p-3 sm:p-4">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-xs font-extrabold ${
                  i === 0 ? 'bg-sc-gray text-sc-outline' : 'bg-sc-orange text-white'
                }`}
              >
                {s.label}
              </span>
              <ul className="mt-2 space-y-0.5 text-sm font-semibold">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </figcaption>
            <img
              src={s.image}
              alt={`1기 수강생 인스타그램 계정 (${s.label})`}
              className="block w-full border-t border-black/[0.06]"
              loading="lazy"
            />
          </figure>
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-sc-outline/50">{REVIEW_DISCLAIMER}</p>
    </Section>
  );
}
