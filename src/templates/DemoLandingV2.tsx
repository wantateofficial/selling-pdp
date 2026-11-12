import type { ReactNode } from 'react';
import type { CourseData } from '../types';
import { StickyCTA } from '../components/layout/StickyCTA';
import { Footer } from '../components/layout/Footer';
import { SaturdayClubLogo } from '../components/brand/SaturdayClubLogo';
import { SignupForm } from '../components/sections/SignupForm';
import { ChatCard } from '../components/sections/ReviewSection';
import { CHAT_REVIEWS } from '../data/reviews';
import { INSTRUCTOR, PROOF_TOP4, PROOF_DISCLAIMER, type ProofItem } from '../data/company';

/**
 * 2기 무료 데모(?page=demo3) 전용 화면. 2026-11 광고 전환 개선판.
 *
 * 기존 DemoLanding(1기 demo, demo2 공용)과 분리해서, 이 페이지만 바꾼다.
 * 원칙
 *  - 첫 화면에서 바로 신청
 *  - 글은 최소, 실제 영상과 후기 위주
 *  - 영어 라벨, 이모지, 가운뎃점 장식 없음
 *  - 에스씨 마스코트는 신청 직전 한 번만
 *  - PC는 여백을 넉넉히 (섹션 하나에 메시지 하나)
 *
 * 순서: 첫 화면(신청폼) → 강사 실제 조회수 → 강사 소개 → 1기 결과와 후기
 *      → 2시간 동안 다루는 것 → 참여 혜택(전자책) → 에스씨 → 신청폼 → FAQ → 약관
 */

interface Props {
  data: CourseData;
  fixedWidth?: boolean;
}

/** FAQ는 자주 묻는 것만 남긴다 (다시 보기는 첫 화면에 이미 있음) */
const FAQ_KEEP = ['정말 무료', '어떤 프로그램', '컴퓨터를 잘 못', '얼굴도 목소리도'];

/** 참여 혜택 전자책 수록 내용 (대표 확정 문구, 2026-11-11) */
const EBOOK_CONTENTS = [
  '쇼핑숏폼 수익화 구조 정리',
  '영상 소재: 틱톡, 인스타그램 검색 키워드',
  '후킹 멘트 모음집',
  '썸네일 문구 모음집',
];

/** 섹션 공통 여백. PC에서 위아래를 넉넉히 둔다 */
function Block({
  id,
  name,
  tone = 'white',
  children,
}: {
  id?: string;
  name: string;
  tone?: 'white' | 'cream' | 'blue';
  children: ReactNode;
}) {
  const bg = tone === 'cream' ? 'bg-sc-cream' : tone === 'blue' ? 'bg-sc-blue text-white' : 'bg-white';
  return (
    <section id={id} data-section={name} className={`${bg} scroll-mt-4 px-6 py-16 md:px-10 md:py-28`}>
      <div className="mx-auto w-full max-w-[1040px]">{children}</div>
    </section>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[26px] font-extrabold leading-snug tracking-tight md:text-[38px] md:leading-tight">
      {children}
    </h2>
  );
}

function VideoTile({ item }: { item: ProofItem }) {
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md bg-sc-outline/10">
      {item.video ? (
        <video
          src={item.video}
          poster={item.poster}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${item.name} 쇼핑숏폼`}
        />
      ) : item.gif ? (
        <img
          src={item.gif}
          alt={`${item.name} 쇼핑숏폼`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : null}
    </div>
  );
}

/* ───────── 1. 첫 화면 ───────── */
function Hero({ data }: { data: CourseData }) {
  const { basics } = data;
  // "[2기] " 머리말은 위 작은 글씨로 대신한다. 느낌표 뒤에서 줄을 나눈다.
  const title = data.title.replace(/^\[[^\]]+\]\s*/, '');
  const [line1, ...rest] = title.split(/(?<=[!?])\s+/);

  return (
    <section data-section="hero" className="bg-sc-cream px-6 pb-14 pt-8 md:px-10 md:pb-24 md:pt-10">
      <div className="mx-auto w-full max-w-[1040px]">
        <SaturdayClubLogo className="mb-10 md:mb-16" />
        <div className="grid items-end gap-10 md:grid-cols-[1fr_400px] md:gap-20">
          <div>
            <p className="mb-3 text-[15px] font-bold text-sc-orange md:text-[17px]">
              {basics.cohort ?? '2기'} 무료 데모강의
            </p>
            <h1 className="mb-8 text-[28px] font-extrabold leading-[1.3] tracking-tight md:mb-10 md:text-[46px] md:leading-[1.25]">
              {/* "촬영, 얼굴 노출 NO!" 는 주황 박스 위 흰 글씨로 강조 (2026-11-12 대표 요청) */}
              <span className="mb-1.5 flex flex-wrap gap-x-2 gap-y-1.5 md:mb-2">
                {line1.split(/,\s*/).map((part, i, arr) => (
                  <span
                    key={part}
                    className="inline-block bg-sc-orange px-2 pb-0.5 leading-[1.25] text-white md:px-3"
                  >
                    {part}
                    {i < arr.length - 1 ? ',' : ''}
                  </span>
                ))}
              </span>
              {rest.length > 0 &&
                // "~할 수 있는" 뒤에서 줄을 나누고, "할 수 있는"은 붙여 둔다
                rest
                  .join(' ')
                  .replace(/할 수 있는/, '할\u00A0수\u00A0있는')
                  .split(/(?<=있는)\s+/)
                  .map((t) => (
                    <span key={t} className="block">
                      {t}
                    </span>
                  ))}
            </h1>

            <dl className="grid grid-cols-[56px_1fr] gap-y-2 text-[15px] md:text-[17px]">
              <dt className="text-sc-outline/45">일시</dt>
              <dd className="font-bold">
                {basics.date} {basics.time}
              </dd>
              <dt className="text-sc-outline/45">방식</dt>
              <dd className="font-semibold text-sc-outline/80">{basics.format}, 구글 미트</dd>
              <dt className="text-sc-outline/45">비용</dt>
              <dd className="font-semibold text-sc-outline/80">{basics.price}</dd>
            </dl>
          </div>

          <div>
            <p className="mb-4 text-[15px] font-bold md:text-[16px]">다시 보기 없이 라이브로만 진행해요.</p>
            <div id="signup-top">
              <SignupForm data={data} placement="hero" compact alwaysActive />
            </div>
            <p className="mt-3 text-[13px] text-sc-outline/50">신청하면 카카오톡으로 강의 링크를 보내드려요.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── 2. 강사 실제 조회수 ───────── */
function Proof() {
  return (
    <Block name="proof">
      <Heading>
        얼굴 없이 만든 영상,
        <br />
        실제 조회수예요
      </Heading>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-8">
        {PROOF_TOP4.map((item) => (
          <figure key={item.name}>
            <VideoTile item={item} />
            <figcaption className="mt-3 md:mt-4">
              <p className="text-[13px] text-sc-outline/45 md:text-[14px]">{item.name}</p>
              <p className="text-[22px] font-extrabold leading-tight text-sc-blue md:text-[26px]">
                {item.views}회
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-10 text-xs text-sc-outline/45">{PROOF_DISCLAIMER}</p>
    </Block>
  );
}

/* ───────── 3. 강사 소개 ───────── */
function Instructor() {
  const lines = [
    '연 매출 22억 부업 교육 플랫폼 전략기획 팀장',
    '창업부트캠프 총괄 PM',
    '쇼핑숏폼 채널 직접 기획, 운영',
  ];
  return (
    <Block name="instructor">
      {/* PC: 오른쪽 현장 사진은 왼쪽(강사 사진 위끝 ~ 이력 마지막 줄) 높이에 맞춘다 */}
      <div className="grid gap-12 border-t border-sc-outline/10 pt-14 md:grid-cols-[auto_1fr] md:items-stretch md:gap-14 md:pt-24">
        <div>
          <div className="flex items-end gap-5 md:gap-7">
            <img
              src={INSTRUCTOR.cardImage}
              alt={`${INSTRUCTOR.name} 강사`}
              className="h-[170px] w-[136px] shrink-0 rounded-md object-cover md:h-[230px] md:w-[184px]"
              loading="lazy"
            />
            <div className="pb-1">
              <p className="text-[13px] text-sc-outline/45">데모강의 진행</p>
              <p className="mt-1 text-[22px] font-extrabold md:text-[28px]">{INSTRUCTOR.name} 강사</p>
              <p className="mt-0.5 text-[14px] font-semibold text-sc-outline/60 md:text-[15px]">
                {INSTRUCTOR.title}
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-1.5 text-[15px] font-medium text-sc-outline/55 md:mt-7 md:text-[17px]">
            {lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        {/* 현장 사진 */}
        <figure className="relative md:h-full">
          <img
            src={INSTRUCTOR.bannerImage}
            alt={INSTRUCTOR.bannerCaption}
            className="aspect-[1200/575] w-full rounded-md object-cover md:aspect-auto md:h-full"
            loading="lazy"
          />
          <figcaption className="mt-2 text-[12px] text-sc-outline/45 md:absolute md:left-0 md:top-full">
            {INSTRUCTOR.bannerCaption}
          </figcaption>
        </figure>
      </div>
    </Block>
  );
}

/* ───────── 4. 1기 결과와 후기 ───────── */
function Cohort() {
  return (
    <Block name="reviews" tone="cream">
      <Heading>먼저 시작한 1기</Heading>

      <dl className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-16">
        <div>
          <dt className="text-[14px] text-sc-outline/45 md:text-[15px]">1기 수강생 8명 중</dt>
          <dd className="mt-1 text-[20px] font-extrabold leading-snug md:text-[26px]">
            영상이나 글을 10개 이상 올린 수강생은 수익&nbsp;발생
          </dd>
        </div>
        <div>
          <dt className="text-[14px] text-sc-outline/45 md:text-[15px]">첫 수익 발생 시기</dt>
          <dd className="mt-1 text-[20px] font-extrabold leading-snug md:text-[26px]">챌린지 4주차</dd>
        </div>
      </dl>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
        {CHAT_REVIEWS.map((r) => (
          <ChatCard key={r.who} review={r} plain />
        ))}
      </div>

      <p className="mt-10 text-xs text-sc-outline/45">
        1기 수강생과 실제로 나눈 카카오톡 대화이며, 이름과 프로필은 가렸습니다. 결과에는 개인차가 있고, 수익을 보장하지 않습니다.
      </p>
    </Block>
  );
}

/* ───────── 5. 2시간 동안 다루는 것 ───────── */
function Curriculum({ data }: { data: CourseData }) {
  const items = data.curriculum.map((c) => c.text || c.title || '').filter(Boolean);
  return (
    <Block name="curriculum">
      <Heading>2시간 동안 다루는 것</Heading>
      <ol className="mt-10 grid gap-y-5 md:mt-14 md:grid-cols-2 md:gap-x-16 md:gap-y-7">
        {items.map((t, i) => (
          <li key={t} className="flex items-baseline gap-4">
            <span className="w-6 shrink-0 text-[14px] font-bold text-sc-orange md:text-[15px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[16px] font-semibold text-sc-outline/85 md:text-[19px]">{t}</span>
          </li>
        ))}
      </ol>
    </Block>
  );
}

/* ───────── 6. 참여 혜택: 전자책 ───────── */
/** 전자책 표지 정면 목업 (2026-11-12 대표 확정 디자인 B). 스타일은 globals.css 의 .ebook */
function EbookCover() {
  // 표지 휴대폰 순서: 왼쪽 염색제, 가운데 카매트, 오른쪽 고데기. 조회수는 실적 데이터에서 "약 " 을 뗀 값
  const [carmat, bubbledye, hairiron] = PROOF_TOP4;
  const phones = [
    { item: bubbledye, cls: 'ebook-p1' },
    { item: carmat, cls: 'ebook-p2' },
    { item: hairiron, cls: 'ebook-p3' },
  ];
  return (
    <div className="ebook mx-auto" role="img" aria-label="쇼핑숏폼 왕초보 가이드 전자책 표지">
      <div className="ebook-cover">
        <div className="ebook-in">
          <p className="ebook-kicker">촬영 없이, 얼굴 없이</p>
          <p className="ebook-title">
            쇼핑숏폼
            <br />
            왕초보
            <br />
            가이드
          </p>
          <p className="ebook-brand">새러데이 랩</p>
        </div>
        {phones.map(({ item, cls }) => (
          <div key={item.name} className={`ebook-phone ${cls}`}>
            <img src={item.poster} alt="" loading="lazy" />
            <span className="ebook-views">
              <small>조회수</small>
              <b>{item.views.replace(/^약\s*/, '').replace(/회$/, '')}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Benefit() {
  return (
    <Block name="benefit" tone="cream">
      <div className="grid items-center gap-12 md:grid-cols-[320px_1fr] md:gap-20">
        <EbookCover />
        <div>
          <p className="text-[14px] font-bold text-sc-orange md:text-[16px]">라이브 참여자 전원</p>
          <div className="mt-2">
            <Heading>
              쇼핑숏폼 왕초보 가이드
              <br />
              전자책을 드려요
            </Heading>
          </div>
          <p className="mt-8 text-[13px] font-semibold text-sc-outline/45 md:mt-10 md:text-[14px]">전자책에 담긴 내용</p>
          <ul className="mt-3 space-y-2.5 md:space-y-3">
            {EBOOK_CONTENTS.map((t) => (
              <li key={t} className="text-[16px] font-semibold text-sc-outline/85 md:text-[19px]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Block>
  );
}

/* ───────── 7. 에스씨 (페이지 전체에서 한 번만) ───────── */
function Mascot() {
  return (
    <section data-section="mascot" aria-hidden className="bg-white px-6 pb-2 pt-14 md:pt-24">
      <img
        src="/assets/robot/robot-money-hd.webp"
        alt=""
        width={220}
        height={233}
        className="mx-auto h-auto w-[170px] md:w-[220px]"
        loading="lazy"
      />
    </section>
  );
}

/* ───────── 8. 신청 ───────── */
function BottomSignup({ data }: { data: CourseData }) {
  return (
    <Block id="signup" name="final-cta" tone="blue">
      <div className="flex flex-col items-center text-center">
        <Heading>
          {data.basics.date} {data.basics.time?.split('~')[0]},
          <br />
          라이브에서 만나요
        </Heading>
        <div className="mt-10 w-full max-w-[440px]">
          <SignupForm data={data} placement="bottom" alwaysActive />
        </div>
        {data.notice.length > 0 && (
          <ul className="mt-10 max-w-[520px] space-y-1 text-xs leading-relaxed text-white/55">
            {data.notice.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </div>
    </Block>
  );
}

/* ───────── 9. 자주 묻는 질문 ───────── */
function Faq({ data }: { data: CourseData }) {
  const items = data.faq.filter((f) => FAQ_KEEP.some((k) => f.q.includes(k)));
  if (items.length === 0) return null;
  return (
    <Block name="faq">
      <h2 className="text-[22px] font-extrabold md:text-[28px]">자주 묻는 질문</h2>
      <div className="mt-6 divide-y divide-sc-outline/10 border-y border-sc-outline/10 md:mt-10">
        {items.map((f) => (
          <details key={f.q} className="group py-4 md:py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold md:text-[18px]">
              {f.q}
              <span className="text-xl text-sc-outline/40 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-[760px] text-[15px] leading-relaxed text-sc-outline/75 md:text-[16px]">{f.a}</p>
          </details>
        ))}
      </div>
    </Block>
  );
}

export function DemoLandingV2({ data, fixedWidth }: Props) {
  // PC에서 좌우 회색 여백 없이 화면 전체를 쓴다 (기존 PageShell 1000px 대신)
  return (
    <main id="landing-root" className={fixedWidth ? 'mx-auto w-[1000px] bg-white' : 'w-full bg-white'}>
      <Hero data={data} />
      <Proof />
      <Instructor />
      <Cohort />
      <Curriculum data={data} />
      <Benefit />
      <Mascot />
      <BottomSignup data={data} />
      <Faq data={data} />
      <Footer />
      <StickyCTA data={data} showAfterId="signup-top" />
    </main>
  );
}
