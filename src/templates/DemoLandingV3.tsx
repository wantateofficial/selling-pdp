import type { CSSProperties, ReactNode } from 'react';
import type { CourseData } from '../types';
import { StickyCTA } from '../components/layout/StickyCTA';
import { Footer } from '../components/layout/Footer';
import { SaturdayClubLogo } from '../components/brand/SaturdayClubLogo';
import { SignupForm } from '../components/sections/SignupForm';
import { PROOF_TOP4, PROOF_DISCLAIMER } from '../data/company';
import { Block, Heading, Instructor, Cohort, Mascot, Faq } from './DemoLandingV2';

/**
 * 2기 2차 무료 데모(?page=demo4, 11/18 수 20:30) 전용 화면. 2026-11-15 셀링형 개편.
 *
 * demo3(DemoLandingV2)의 내용을 모두 담고, 아래를 바꾼다.
 *  - 전자책 2권(책 1 쇼핑숏폼 왕초보 가이드, 책 2 스레드 쿠파스 첫걸음)을 첫 화면과 별도 섹션에서 크게
 *  - 영상은 모두 GIF
 *  - 섹션 배경에 검정, 파랑 띠를 넣어 강약
 *  - "강의팔이 아니냐"는 의심을 먼저 꺼내고 증거로 답한다
 * 순서: 첫 화면(신청) → 전자책 2권 → 실제 조회수 → 의심 띠 → 강사 → 1기 결과와 후기
 *      → 이런 고민 → 1시간 반 동안 다루는 것 → FAQ → 에스씨 → 신청 → 약관
 */

interface Props {
  data: CourseData;
  fixedWidth?: boolean;
}

const FAQ_KEEP = ['정말 무료', '전자책은 신청만', '어떤 프로그램', '컴퓨터를 잘 못', '얼굴도 목소리도'];

const BOOK1 = ['쇼핑숏폼 수익화 구조 정리', '영상 소재: 틱톡, 인스타그램 검색 키워드', '후킹 멘트 모음집', '썸네일 문구 모음집'];
const BOOK2 = ['AI를 활용한 스레드 프로필 세팅법', '초보자가 꼭 알아야 할 스레드 신고 피하는 전략', '스레드+쿠팡파트너스 추천 제품 3가지 기준'];

function Lines({ lines, className = '' }: { lines: ReactNode[]; className?: string }) {
  return (
    <p className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          {l}
        </span>
      ))}
    </p>
  );
}

/* ───────── 전자책 표지 ───────── */
/** 책 1: demo3 확정 디자인 그대로 (globals.css .ebook) */
function Book1({ size }: { size?: number }) {
  const [carmat, bubbledye, hairiron] = PROOF_TOP4;
  const phones = [
    { item: bubbledye, cls: 'ebook-p1' },
    { item: carmat, cls: 'ebook-p2' },
    { item: hairiron, cls: 'ebook-p3' },
  ];
  const style: CSSProperties | undefined = size ? { fontSize: size } : undefined;
  return (
    <div className="ebook" style={style} role="img" aria-label="쇼핑숏폼 왕초보 가이드 전자책 표지">
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

/** 책 2: 스레드 흑백 톤. 로고 대신 게시글 카드 두 장 */
function Book2({ size }: { size?: number }) {
  const style: CSSProperties | undefined = size ? { fontSize: size } : undefined;
  return (
    <div className="ebook" style={style} role="img" aria-label="왕초보를 위한 스레드 쿠파스 첫걸음 전자책 표지">
      <div className="ebook-cover th">
        <div className="ebook-in">
          <p className="ebook-kicker">왕초보를 위한</p>
          <p className="ebook-title">
            스레드
            <br />
            쿠파스 첫걸음
          </p>
          <p className="ebook-brand">새러데이 랩</p>
        </div>
        <div className="th-post th-p1">
          <i />
          <div>
            <b>saturday.lab</b>
            <span>요즘 제일 많이 팔린 살림템 3개</span>
            <em>답글 128 · 좋아요 2.4천</em>
          </div>
        </div>
        <div className="th-post th-p2">
          <i />
          <div>
            <b>saturday.lab</b>
            <span>프로필 세팅부터 제품 고르기까지</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── 1. 첫 화면 ───────── */
function Hero({ data }: { data: CourseData }) {
  const { basics } = data;
  const title = data.title.replace(/^\[[^\]]+\]\s*/, '');
  const [line1, ...rest] = title.split(/(?<=[!?])\s+/);

  return (
    <section data-section="hero" className="bg-sc-cream px-6 pb-14 pt-8 md:px-10 md:pb-24 md:pt-10">
      <div className="mx-auto w-full max-w-[1040px]">
        <SaturdayClubLogo className="mb-10 md:mb-16" />
        <div className="grid items-end gap-10 md:grid-cols-[1fr_400px] md:gap-20">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-5">
              <span className="rounded-full border-2 border-sc-outline bg-sc-orange px-3 py-1 text-sm font-extrabold text-white shadow-pixel-sm">
                {basics.cohort ?? '2기'} 모집
              </span>
              <span className="rounded-full border-2 border-sc-outline bg-white px-3 py-1 text-sm font-bold text-sc-blue">
                무료 데모강의
              </span>
            </div>
            <h1 className="mb-8 text-[28px] font-extrabold leading-[1.3] tracking-tight md:mb-10 md:text-[46px] md:leading-[1.25]">
              <span className="mb-1.5 inline-block whitespace-nowrap bg-sc-orange px-2 pb-0.5 leading-[1.25] text-white md:mb-2 md:px-3">
                {line1}
              </span>
              {rest
                .join(' ')
                .replace(/할 수 있는/, '할 수 있는')
                .split(/(?<=있는)\s+/)
                .map((t) => (
                  <span key={t} className="block">
                    {t}
                  </span>
                ))}
            </h1>

            {/* 전자책 2권 미리보기: 첫 화면에서 혜택이 바로 보이게 */}
            <div className="mb-8 flex items-center gap-5 border-y border-sc-outline/15 py-5 md:mb-10">
              <div className="flex shrink-0 items-end">
                <div className="-rotate-6">
                  <Book1 size={2.6} />
                </div>
                <div className="-ml-5 rotate-3">
                  <Book2 size={2.6} />
                </div>
              </div>
              <div>
                <p className="text-[13px] font-bold text-sc-orange md:text-[14px]">라이브 참여자 전원</p>
                <p className="text-[19px] font-extrabold leading-snug md:text-[24px]">전자책 2권을 드려요</p>
              </div>
            </div>

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

/* ───────── 2. 전자책 2권 ───────── */
function Books() {
  const books = [
    { n: '책 1', t: '쇼핑숏폼 왕초보 가이드', items: BOOK1, cover: <Book1 /> },
    { n: '책 2', t: '왕초보를 위한 스레드 쿠파스 첫걸음', items: BOOK2, cover: <Book2 /> },
  ];
  return (
    <section data-section="books" className="bg-sc-outline px-6 py-16 text-white md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1040px]">
        <p className="text-[14px] font-bold text-sc-orange md:text-[16px]">라이브 참여자 전원에게 드려요</p>
        <h2 className="mt-2 text-[26px] font-extrabold leading-snug tracking-tight md:text-[42px] md:leading-tight">
          200만원 넘는 유료강의 2개,
          <br />
          직접 듣고 운영하며
          <br />
          정리한 전자책 2권
        </h2>
        <Lines
          className="mt-6 text-[16px] leading-relaxed text-white/70 md:text-[19px]"
          lines={['강의를 듣고 끝나지 않게', '혼자서도 따라 할 수 있도록 정리했어요.']}
        />

        <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-12">
          {books.map((b) => (
            <div key={b.n}>
              <div className="flex justify-center">{b.cover}</div>
              <p className="mt-10 text-[14px] font-bold text-sc-orange md:mt-12">{b.n}</p>
              <p className="mt-1 text-[21px] font-extrabold md:text-[24px]">{b.t}</p>
              <ul className="mt-4 space-y-2 border-t border-white/15 pt-4 text-[15px] text-white/80 md:text-[17px]">
                {b.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 3. 실제 조회수 (GIF) ───────── */
export function Proof() {
  const gif = (video?: string) => (video ? video.replace('/web/', '/gif-sm/').replace(/\.mp4$/, '.gif') : undefined);
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
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md bg-sc-outline/10">
              <img src={gif(item.video) ?? item.gif} alt={`${item.name} 쇼핑숏폼`} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 md:mt-4">
              <p className="text-[13px] text-sc-outline/45 md:text-[14px]">{item.name}</p>
              <p className="text-[24px] font-extrabold leading-tight text-sc-blue md:text-[30px]">{item.views}회</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-10 text-xs text-sc-outline/45">{PROOF_DISCLAIMER}</p>
    </Block>
  );
}

/* ───────── 4. 의심 먼저 꺼내기 ───────── */
function Doubt() {
  return (
    <section data-section="doubt" className="bg-sc-blue px-6 py-14 text-white md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-[1040px]">
        <p className="text-[18px] font-bold text-white/70 md:text-[22px]">또 강의팔이 아니냐고요?</p>
        <Lines
          className="mt-3 text-[28px] font-extrabold leading-[1.3] tracking-tight md:text-[46px]"
          lines={['그래서 무료로,', '라이브로 직접 보여 드려요.']}
        />
        <p className="mt-5 text-[15px] text-white/70 md:text-[18px]">강사가 누구인지, 1기가 어떻게 됐는지 먼저 확인해 보세요.</p>
      </div>
    </section>
  );
}

/* ───────── 6. 이런 고민 ───────── */
function Problems({ data }: { data: CourseData }) {
  if (data.problems.length === 0) return null;
  return (
    <Block name="problems" tone="cream">
      <Heading>이런 고민, 해 보셨죠?</Heading>
      <ul className="mt-10 border-t border-sc-outline/15 md:mt-14">
        {data.problems.map((p) => (
          <li key={p} className="border-b border-sc-outline/15 py-4 text-[17px] font-semibold md:py-5 md:text-[21px]">
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[17px] font-extrabold md:text-[21px]">이번 라이브에서 하나씩 풀어 드려요.</p>
    </Block>
  );
}

/* ───────── 7. 1시간 반 동안 다루는 것 ───────── */
function Curriculum({ data }: { data: CourseData }) {
  const items = data.curriculum.map((c) => c.text || c.title || '').filter(Boolean);
  return (
    <Block name="curriculum">
      <Heading>1시간 반 동안 다루는 것</Heading>
      <ol className="mt-10 grid gap-y-5 md:mt-14 md:grid-cols-2 md:gap-x-16 md:gap-y-7">
        {items.map((t, i) => (
          <li key={t} className="flex items-baseline gap-4 border-b border-sc-outline/10 pb-4">
            <span className="w-7 shrink-0 text-[15px] font-extrabold text-sc-orange md:text-[17px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[16px] font-semibold text-sc-outline/85 md:text-[19px]">{t}</span>
          </li>
        ))}
      </ol>
    </Block>
  );
}

/* ───────── 9. 신청 ───────── */
function BottomSignup({ data }: { data: CourseData }) {
  return (
    <Block id="signup" name="final-cta" tone="blue">
      <div className="flex flex-col items-center text-center">
        <Heading>
          {data.basics.date} 저녁 8시 30분,
          <br />
          라이브에서 만나요
        </Heading>
        <p className="mt-5 text-[16px] font-semibold text-white/75 md:text-[18px]">전자책 2권은 라이브 참여자에게만 드려요.</p>
        <div className="mt-8 w-full max-w-[440px]">
          <SignupForm data={data} placement="bottom" alwaysActive />
        </div>
        {data.notice.length > 0 && (
          <ul className="mt-10 w-full max-w-[520px] space-y-1 text-left text-xs leading-relaxed text-white/55">
            {data.notice.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </div>
    </Block>
  );
}

export function DemoLandingV3({ data, fixedWidth }: Props) {
  return (
    <main id="landing-root" className={fixedWidth ? 'mx-auto w-[1000px] bg-white' : 'w-full bg-white'}>
      <Hero data={data} />
      <Books />
      <Proof />
      <Doubt />
      <Instructor />
      <Cohort />
      <Problems data={data} />
      <Curriculum data={data} />
      <Faq data={data} keep={FAQ_KEEP} />
      <Mascot />
      <BottomSignup data={data} />
      <Footer />
      <StickyCTA data={data} buttonClass="bg-[#41649b] hover:bg-[#365584]" widthClass="max-w-[1040px]" />
    </main>
  );
}
