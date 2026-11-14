import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/** 스마트스토어 상세 이미지로 내보낼 때(?export=1) 움직이는 요소와 버튼을 정적으로 바꾼다 */
const ExportCtx = createContext(false);
import type { CourseData } from '../types';
import { StickyCTA } from '../components/layout/StickyCTA';
import { Footer } from '../components/layout/Footer';
import { SaturdayClubLogo } from '../components/brand/SaturdayClubLogo';
import { PRICING_PLANS, EVALUATION, REFUND_TABLE } from '../data/challenge';
import { Block, Heading, Instructor, Cohort, Mascot } from './DemoLandingV2';
import { Proof } from './DemoLandingV3';

/**
 * 2기 4주 챌린지(?page=challenge2) 전용 판매 화면. 2026-11-13 판매 구조 개편판.
 *
 * 1기 challenge 는 기존 ChallengeLanding 그대로 둔다.
 * 판매 원칙 (리서치: Hormozi 오퍼 구조, Ali Abdaal PTYA, 월부, 패스트캠퍼스 환급챌린지)
 *  - 첫 화면에 혜택 3개와 얼리버드 가격
 *  - 데모를 안 들은 사람도 이해하게 "돈이 들어오는 구조"를 먼저 설명
 *  - 리워드는 "끝까지 올린 사람이 받는다"로 초보 눈높이에 맞춤
 * 글 원칙 (대표 요청)
 *  - 한 줄에 한 덩어리만. 긴 문장은 의미 단위로 줄을 나눈다
 *  - 영어 라벨, 이모지 아이콘, 가운뎃점, 카드 박스 장식 없음
 */

interface Props {
  data: CourseData;
  fixedWidth?: boolean;
}

/** 줄 단위로 끊어서 보여 준다. 배열 하나가 한 줄 */
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

function Kicker({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-[14px] font-bold text-sc-orange md:text-[16px]">{children}</p>;
}

function CTA({ data, className = '' }: { data: CourseData; className?: string }) {
  const isExport = useContext(ExportCtx);
  if (isExport)
    return (
      <p className={`block w-full border-2 border-sc-outline bg-[#41649b] py-4 text-center text-lg font-extrabold text-white ${className}`}>
        구매하기 버튼으로 신청하세요
      </p>
    );
  return (
    <a
      href={data.links.apply}
      onClick={() => window.clarity?.('event', 'cta_click')}
      className={`block w-full rounded-xl border-2 border-sc-outline bg-[#41649b] py-4 text-center text-lg font-extrabold text-white shadow-pixel transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#365584] motion-reduce:transition-none ${className}`}
    >
      {data.basics.cta}
    </a>
  );
}


/* ───────── 셀링 장치 ───────── */
/** 가격 구간 마감 시각 (한국 시간). 대표 확정 가격 정책 2026-11-13 */
const DEADLINES = [
  { name: '얼리버드', price: '25만원', next: '35만원', at: new Date('2026-11-19T23:59:59+09:00') },
  { name: '2차', price: '35만원', next: '50만원', at: new Date('2026-11-21T23:59:59+09:00') },
];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** 지금 적용 중인 가격 구간과 남은 시간 */
function useCurrentTier() {
  const now = useNow();
  const tier = DEADLINES.find((d) => d.at.getTime() > now.getTime());
  if (!tier) return null;
  const ms = tier.at.getTime() - now.getTime();
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return { ...tier, left: `${d > 0 ? `${d}일 ` : ''}${pad(h)}:${pad(m)}:${pad(sec)}` };
}

function Countdown({ className = '' }: { className?: string }) {
  const t = useCurrentTier();
  const isExport = useContext(ExportCtx);
  if (isExport) return null;
  if (!t) return null;
  return (
    <p className={`font-bold tabular-nums ${className}`}>
      {t.name} {t.price} 마감까지 <span className="text-sc-orange">{t.left}</span>
    </p>
  );
}

/** 섹션 사이 중간 신청 띠 */
function CTAStrip({ data, line }: { data: CourseData; line: string }) {
  const isExport = useContext(ExportCtx);
  return (
    <section data-section="cta-strip" className="bg-sc-outline px-6 py-8 text-white md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[18px] font-extrabold md:text-[22px]">{line}</p>
          <Countdown className="mt-1 text-[15px] text-white/80 md:text-[16px]" />
          {isExport && (
            <p className="mt-1 text-[15px] font-bold text-white/80">
              얼리버드 25만원은 <span className="text-sc-orange">11월 19일(목)까지, 선착순 10명</span>
            </p>
          )}
        </div>
        <CTA data={data} className="md:w-[340px]" />
      </div>
    </section>
  );
}

/** 혼자 할 때와 챌린지에서의 비교 */
function Compare() {
  const rows = [
    { k: '제품 고르기', solo: '뭘 팔지 며칠씩 고민해요', with: '성공 제품 리스트로 바로 시작해요' },
    { k: '영상 소스', solo: '찾다가 지쳐요', with: '에이전트가 찾고 자막까지 지워요' },
    { k: '대본', solo: '빈 화면 앞에서 멈춰요', with: '대본 3개가 바로 나와요' },
    { k: '뭐가 문제인지', solo: '아무도 안 알려 줘요', with: '과제 피드백으로 짚어 드려요' },
    { k: '꾸준히 하기', solo: '반응 없으면 그만둬요', with: '매주 과제와 순위가 붙잡아 줘요' },
  ];
  return (
    <Block name="compare">
      <Heading>
        혼자 할 때와
        <br />
        챌린지에서 할 때
      </Heading>
      <div className="mt-10 md:mt-14">
        <div className="grid grid-cols-[1fr_1fr] gap-x-3 border-b-2 border-sc-outline pb-3 text-[14px] font-bold md:grid-cols-[180px_1fr_1fr] md:text-[16px]">
          <span className="hidden md:block" />
          <span className="text-sc-outline/45">혼자 할 때</span>
          <span className="text-sc-orange">챌린지에서</span>
        </div>
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[1fr_1fr] gap-x-3 border-b border-sc-outline/10 py-4 md:grid-cols-[180px_1fr_1fr] md:py-5">
            <span className="col-span-2 mb-1 text-[13px] font-bold text-sc-outline/45 md:col-span-1 md:mb-0 md:text-[16px] md:text-sc-outline">
              {r.k}
            </span>
            <span className="text-[15px] text-sc-outline/45 line-through decoration-sc-outline/25 md:text-[18px]">{r.solo}</span>
            <span className="text-[15px] font-bold md:text-[18px]">{r.with}</span>
          </div>
        ))}
      </div>
    </Block>
  );
}

/** 이런 분께 맞아요 / 안 맞아요 */
function FitFor() {
  const yes = ['부업을 시작은 하고 싶은데 혼자서는 안 되는 분', '얼굴, 목소리 없이 해 보고 싶은 분', '퇴근 후, 아이 재운 뒤 하루 1시간을 낼 수 있는 분'];
  const no = ['한 달 만에 큰돈을 기대하는 분', '4주 동안 과제할 시간을 전혀 못 내는 분'];
  return (
    <Block name="fit" tone="cream">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <p className="text-[22px] font-extrabold md:text-[28px]">이런 분께 맞아요</p>
          <ul className="mt-5 space-y-3 text-[17px] font-semibold md:text-[19px]">
            {yes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[22px] font-extrabold text-sc-outline/55 md:text-[28px]">이런 분께는 안 맞아요</p>
          <ul className="mt-5 space-y-3 text-[17px] font-semibold text-sc-outline/55 md:text-[19px]">
            {no.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-sc-outline/45">미리 솔직하게 말씀드려요.</p>
        </div>
      </div>
    </Block>
  );
}

/** 한 문장만 크게 보여 주는 강조 띠 */
function Statement({ lines, tone = 'blue' }: { lines: string[]; tone?: 'blue' | 'orange' }) {
  const bg = tone === 'orange' ? 'bg-sc-orange' : 'bg-sc-blue';
  return (
    <section data-section="statement" className={`${bg} px-6 py-14 text-white md:px-10 md:py-20`}>
      <div className="mx-auto w-full max-w-[1040px]">
        <Lines className="text-[28px] font-extrabold leading-[1.3] tracking-tight md:text-[48px]" lines={lines} />
      </div>
    </section>
  );
}

/* ───────── 1. 첫 화면 ───────── */
function Hero({ data }: { data: CourseData }) {
  const plan = PRICING_PLANS[data.basics.cohort ?? '2기'];
  const early = plan.tiers[0];
  const regular = plan.tiers[plan.tiers.length - 1];
  const perks = ['쇼핑숏폼 에이전트 12월 31일까지 무료', '상위 10% 성적우수 리워드 10만원', '대본, 영상 과제 피드백'];

  return (
    <section data-section="hero" className="bg-sc-cream px-6 pb-14 pt-8 md:px-10 md:pb-24 md:pt-10">
      <div className="mx-auto w-full max-w-[1040px]">
        <SaturdayClubLogo className="mb-10 md:mb-16" />
        <div className="grid items-start gap-12 md:grid-cols-[1fr_400px] md:gap-20">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-5">
              <span className="rounded-full border-2 border-sc-outline bg-sc-orange px-3 py-1 text-sm font-extrabold text-white shadow-pixel-sm">
                2기 모집
              </span>
              <span className="rounded-full border-2 border-sc-outline bg-white px-3 py-1 text-sm font-bold text-sc-blue">
                4주 실전 챌린지
              </span>
            </div>
            <h1 className="text-[30px] font-extrabold leading-[1.3] tracking-tight md:text-[46px] md:leading-[1.22]">
              <span className="mb-1.5 inline-block whitespace-nowrap bg-sc-orange px-2 pb-0.5 leading-[1.25] text-white md:mb-2 md:px-3">
                촬영, 얼굴 노출 NO!
              </span>
              <span className="block">왕초보도 4주 만에</span>
              <span className="block">쇼핑숏폼 부업 시작</span>
            </h1>
            <Lines
              className="mt-6 text-[17px] font-semibold leading-relaxed text-sc-outline/70 md:mt-8 md:text-[20px]"
              lines={['강사가 직접 운영하며 쌓은 노하우,', '4주 동안 그대로 전수해요.']}
            />

            <dl className="mt-8 grid grid-cols-[56px_1fr] gap-y-2 text-[15px] md:mt-10 md:text-[17px]">
              <dt className="text-sc-outline/45">시작</dt>
              <dd className="font-bold">11월 22일 일요일 오후 2시</dd>
              <dt className="text-sc-outline/45">기간</dt>
              <dd className="font-semibold text-sc-outline/80">4주, 5주차 특강 포함</dd>
              <dt className="text-sc-outline/45">방식</dt>
              <dd className="font-semibold text-sc-outline/80">온라인 라이브, 다음 날 녹화본</dd>
            </dl>
          </div>

          <div>
            <div className="border-2 border-sc-outline bg-white p-6 shadow-pixel md:p-8">
              <div className="flex items-center gap-2">
                <span className="bg-sc-orange px-2 py-1 text-[13px] font-extrabold text-white md:text-[14px]">
                  {early.name} {early.seats}
                </span>
                <span className="text-[13px] font-bold text-sc-outline/55 md:text-[14px]">{early.condition}</span>
              </div>
              <p className="mt-4 text-[16px] font-semibold text-sc-outline/40 line-through md:text-[18px]">
                {regular.name} {regular.price}
              </p>
              <p className="text-[56px] font-extrabold leading-none tracking-tight md:text-[72px]">{early.price}</p>
              <Countdown className="mt-4 text-[15px] md:text-[16px]" />
              <ul className="mt-5 space-y-1.5 border-t border-sc-outline/15 pt-4">
                {perks.map((p) => (
                  <li key={p} className="text-[15px] font-bold md:text-[16px]">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <CTA data={data} className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
}


/* ───────── 1-2. 2기 신청하면 받는 것 (혜택 스택) ───────── */
function PerkStack() {
  const perks = [
    { t: '4주 라이브 + 5주차 특강', d: '라이브를 놓쳐도 다음 날 녹화본으로 봐요' },
    { t: '쇼핑숏폼 에이전트', d: '12월 31일까지 무료로 써요' },
    { t: '대본, 영상 과제 피드백', d: '어디를 고치면 되는지 짚어 드려요' },
    { t: '주차별 제공 자료', d: '성공 제품 리스트부터 템플릿까지' },
    { t: '성적우수 리워드 10만원', d: '끝까지 완주한 상위 10%에게' },
    { t: '수강생 단톡방', d: '막히면 바로 물어봐요' },
  ];
  return (
    <section data-section="perks" className="bg-sc-outline px-6 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-[1040px]">
        <p className="text-[14px] font-bold text-sc-orange md:text-[16px]">2기 신청하면 받는 것</p>
        <h2 className="mt-2 text-[26px] font-extrabold leading-snug tracking-tight md:text-[42px] md:leading-tight">
          노하우만 알려 주고
          <br />
          끝내지 않아요
        </h2>
        <ol className="mt-10 grid gap-px bg-white/15 md:mt-14 md:grid-cols-3">
          {perks.map((p, i) => (
            <li key={p.t} className="bg-sc-outline py-6 md:px-6 md:py-8">
              <p className="text-[34px] font-extrabold leading-none text-sc-orange md:text-[40px]">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-3 text-[19px] font-extrabold md:text-[21px]">{p.t}</p>
              <p className="mt-1 text-[15px] text-white/65 md:text-[16px]">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── 2. 돈이 들어오는 구조 (데모 안 들은 사람용) ───────── */
function HowMoney() {
  const steps = [
    { n: '01', t: '제품 고르기', d: ['쿠팡에서 잘 팔리는 제품을', '하나 골라요.'] },
    { n: '02', t: '영상 올리기', d: ['제품 영상에 자막과 음성을 입혀', '릴스로 올려요.', '얼굴도, 촬영도 필요 없어요.'] },
    { n: '03', t: '수수료 받기', d: ['누군가 내 영상 속 링크로 사면', '판매 금액의 일부가', '수수료로 들어와요.'] },
  ];
  return (
    <Block name="how-money">
      <Kicker>쇼핑숏폼이 처음이라면</Kicker>
      <Heading>
        돈은 이렇게
        <br />
        들어와요
      </Heading>
      <ol className="mt-10 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
        {steps.map((s) => (
          <li key={s.n} className="border-t-2 border-sc-outline pt-5">
            <p className="text-[15px] font-bold text-sc-orange">{s.n}</p>
            <p className="mt-1 text-[22px] font-extrabold md:text-[26px]">{s.t}</p>
            <Lines className="mt-3 text-[16px] leading-relaxed text-sc-outline/70 md:text-[17px]" lines={s.d} />
          </li>
        ))}
      </ol>
    </Block>
  );
}

/* ───────── 6. 혼자 하면 멈추는 이유와 챌린지 구조 ───────── */
function WhyChallenge() {
  const stuck = [
    '어떤 제품을 골라야 할지 모르겠고',
    '영상을 만들어 놓고도 못 올리고',
    '반응이 없으면 그냥 멈춰요.',
  ];
  const how = [
    { t: '매주 과제', d: ['그 주에 올릴 영상이 정해져 있어요.', '뭘 해야 할지 고민할 필요가 없어요.'] },
    { t: '과제 피드백', d: ['과제로 낸 대본과 영상을 봐 드려요.', '어디를 고치면 되는지 알려 드려요.'] },
    { t: '순위와 리워드', d: ['업로드와 과제를 점수로 매겨요.', '끝까지 한 사람에게 보상이 가요.'] },
  ];
  return (
    <Block name="why-challenge" tone="cream">
      <Heading>
        혼자 하면
        <br />
        왜 멈출까요?
      </Heading>
      <Lines className="mt-6 text-[18px] font-semibold leading-relaxed text-sc-outline/70 md:text-[21px]" lines={stuck} />
      <Lines className="mt-6 text-[18px] font-extrabold leading-relaxed md:text-[21px]" lines={['다들 여기서 멈춰요.', '같이 끝까지 갈 사람이 있으면 달라져요.']} />

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-12">
        {how.map((h) => (
          <div key={h.t}>
            <p className="text-[20px] font-extrabold md:text-[22px]">{h.t}</p>
            <Lines className="mt-2 text-[16px] leading-relaxed text-sc-outline/65 md:text-[17px]" lines={h.d} />
          </div>
        ))}
      </div>
    </Block>
  );
}

/* ───────── 7. 성적우수 리워드 ───────── */
function Reward() {
  const short: Record<number, string> = {
    50: '약속한 영상을 끝까지 올렸는지',
    35: '매주 과제를 기한 안에 냈는지',
    10: '단톡방에서 함께 소통했는지',
    5: '조회수, 클릭, 구매로 이어졌는지',
  };
  const name = (s: string) => s.replace(/\s*\(.*\)$/, '').replace(/\s*·\s*/g, ', ');
  return (
    <Block name="reward">
      <Kicker>성적우수 리워드</Kicker>
      <Heading>
        끝까지 완주한 상위 10%에게
        <br />
        10만원을 드려요
      </Heading>
      <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-sc-outline/75 md:text-[19px]">
        <Lines lines={[<b key="a" className="text-sc-outline">추첨? 아닙니다!</b>, '시작 전에 공개한 아래 기준으로 점수를 매겨요.', '50명이 완주하면 상위 5명이 받습니다.']} />
        <Lines lines={[<b key="b" className="text-sc-outline">잘 만드는 사람보다 꾸준한 사람이 유리해요.</b>, '100점 중 85점이 꾸준함 점수예요.', '조회수나 판매 점수는 5점뿐이에요.']} />
      </div>

      <div className="mt-10 grid gap-x-12 border-t border-sc-outline/10 md:mt-14 md:grid-cols-2">
        {EVALUATION.map((e) => (
          <div key={e.item} className="flex items-baseline gap-5 border-b border-sc-outline/10 py-5 md:py-6">
            <span className="w-12 shrink-0 text-[30px] font-extrabold text-sc-blue md:text-[34px]">{e.points}</span>
            <div>
              <p className="text-[17px] font-bold md:text-[19px]">{name(e.item)}</p>
              <p className="mt-1 text-[14px] text-sc-outline/55 md:text-[15px]">{short[e.points]}</p>
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-8 space-y-1 text-xs leading-relaxed text-sc-outline/45">
        <li>순위는 실명이 아니라 본인이 정한 닉네임으로만 공개해요.</li>
        <li>발표 후 24시간 동안 이의신청을 받고, 끝나면 14일 안에 입금해요.</li>
        <li>리워드는 기타소득이라 제세공과금을 빼고 드려요.</li>
        <li>리워드는 수강취소 환불과 별개 제도예요.</li>
      </ul>
    </Block>
  );
}

/* ───────── 8. 수강생 전용 에이전트 ───────── */
/**
 * 에이전트 기능 (2026-11-13 대표 확정, 더빙은 제외).
 * 3번 자막 지우기는 실제 전후 영상을 붙여 크게 강조한다.
 * compare.mp4 는 원본(AS-IS)과 결과(TO-BE)를 같은 장면으로 맞춰 좌우로 붙인 한 개의 영상이라 두 화면이 어긋나지 않는다.
 */
const AGENT_STEPS = [
  { t: '제품 입력', d: ['제품 이름이나 사진만 넣으면', 'AI가 제품을 정리해요.'] },
  { t: '영상 찾기', d: ['해외 영상을 검색하거나 링크를 넣고', '쓸 영상 5~9개를 골라요.'] },
  { t: '자막 지우기', d: ['고른 영상의 자막을 지워요.', '지우기 전과 후를 나란히 보여 줘요.'], featured: true },
  { t: '대본 만들기', d: ['대본 3개, 썸네일 멘트, 캡션, 고정댓글을 만들어요.', '고쳐 달라고 하면 다시 써 줘요.'] },
  { t: '내려받기', d: ['자막 지운 영상, 대본, 자막 파일을', '한 번에 내려받아요.'] },
];

function SubtitleCompare() {
  // 라벨은 영상 밖 위쪽에 둔다 (영상 안에 두면 지워질 글자를 가림)
  return (
    <div>
      <div className="mb-2 grid grid-cols-2 gap-[3px] text-[13px] font-bold md:text-[15px]">
        <span className="bg-sc-outline px-2 py-1.5 text-white md:px-3">지우기 전</span>
        <span className="bg-sc-orange px-2 py-1.5 text-white md:px-3">지운 후</span>
      </div>
      <div className="relative">
        <img
          src="/assets/agent/compare.gif"
          alt="같은 장면의 자막 지우기 전과 후"
          className="block aspect-[9/8] w-full bg-sc-outline/10 object-cover"
        />
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white" />
      </div>
      <p className="mt-3 text-[13px] text-sc-outline/50 md:text-[14px]">같은 영상, 같은 장면이에요.</p>
    </div>
  );
}

function Agent() {
  return (
    <Block name="agent" tone="cream">
      <Kicker>수강생 전용 에이전트</Kicker>
      <Heading>
        제품만 넣으면
        <br />
        영상 재료가 나와요
      </Heading>
      <Lines
        className="mt-6 text-[17px] leading-relaxed text-sc-outline/75 md:text-[19px]"
        lines={['영상 찾기부터 대본까지 한곳에서 해요.', '12월 31일까지 무료로 쓸 수 있어요.']}
      />

      <ol className="mt-10 border-t-2 border-sc-outline md:mt-14">
        {AGENT_STEPS.map((st, i) => {
          const num = String(i + 1).padStart(2, '0');
          if (st.featured) {
            return (
              <li key={st.t} className="-mx-6 border-b border-sc-outline/15 bg-white px-6 py-10 md:mx-0 md:px-10 md:py-14">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_500px] md:grid-rows-[auto_1fr] md:gap-x-14 md:gap-y-0">
                  <div className="md:self-end">
                    <p className="text-[15px] font-bold text-sc-orange">{num}</p>
                    <p className="mt-1 text-[26px] font-extrabold leading-snug md:text-[34px]">
                      중국 영상 자막,
                      <br />
                      깨끗하게 지워 줘요
                    </p>
                  </div>
                  <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
                    <SubtitleCompare />
                  </div>
                  <div className="md:col-start-1 md:row-start-2">
                    <Lines
                      className="text-[16px] leading-relaxed text-sc-outline/70 md:mt-5 md:text-[18px]"
                      lines={['해외 영상에 붙은 글자를 지워서', '바로 쓸 수 있게 바꿔 줘요.', '여기에 내 대본만 입히면 돼요.']}
                    />
                    <p className="mt-6 text-[14px] font-bold text-sc-outline/55 md:text-[15px]">지워지는 것</p>
                    <ul className="mt-2 space-y-1 text-[16px] font-bold md:text-[18px]">
                      <li>중국어 자막</li>
                      <li>영어 상품 이름표</li>
                      <li>다른 계정의 워터마크</li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          }
          return (
            <li
              key={st.t}
              className="grid gap-1 border-b border-sc-outline/15 py-6 md:grid-cols-[72px_220px_1fr] md:items-baseline md:gap-0 md:py-7"
            >
              <p className="text-[14px] font-bold text-sc-orange md:text-[15px]">{num}</p>
              <p className="text-[20px] font-extrabold md:text-[22px]">{st.t}</p>
              <Lines className="mt-1 text-[15px] leading-relaxed text-sc-outline/65 md:mt-0 md:text-[17px]" lines={st.d} />
            </li>
          );
        })}
      </ol>
    </Block>
  );
}

/* ───────── 9. 커리큘럼 (주차별로 접어 둠) ───────── */
function Curriculum({ data }: { data: CourseData }) {
  const isExport = useContext(ExportCtx);
  return (
    <Block name="curriculum">
      <Heading>
        5주 동안
        <br />
        이렇게 배워요
      </Heading>
      {!isExport && <p className="mt-4 text-[15px] text-sc-outline/55 md:text-[16px]">주차를 누르면 자세한 내용이 보여요.</p>}
      <div className="mt-8 border-t border-sc-outline/10 md:mt-12">
        {data.curriculum.map((w) => (
          <details key={w.label} open={isExport || undefined} className="group border-b border-sc-outline/10">
            <summary className="flex cursor-pointer list-none items-center gap-5 py-5 md:gap-8 md:py-6">
              <span className="w-16 shrink-0 text-[14px] font-bold text-sc-orange md:w-20 md:text-[15px]">{w.label}</span>
              <span className="flex-1">
                <span className="block text-[18px] font-extrabold md:text-[21px]">{w.title}</span>
                <span className="block text-[13px] text-sc-outline/45 md:text-[14px]">{w.date}</span>
              </span>
              <span className="text-xl text-sc-outline/40 transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="pb-7 pl-[84px] md:pl-28">
              <ul className="space-y-1.5 text-[15px] text-sc-outline/80 md:text-[17px]">
                {w.topics.map((t) => (
                  <li key={t}>{t.replace(/\s*·\s*/g, ', ')}</li>
                ))}
              </ul>
              {w.provided.length > 0 && (
                <p className="mt-4 text-[13px] leading-relaxed text-sc-outline/50 md:text-[14px]">
                  <span className="font-bold text-sc-outline/70">제공 자료 </span>
                  {w.provided.join(', ').replace(/\s*·\s*/g, ', ')}
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </Block>
  );
}

/* ───────── 10. 가격 ───────── */
function Pricing({ data }: { data: CourseData }) {
  const plan = PRICING_PLANS[data.basics.cohort ?? '2기'];
  const includes = [
    '라이브 강의 5회, 다음 날 녹화본',
    '주차마다 제공 자료',
    '쇼핑숏폼 에이전트 (12월 31일까지 무료)',
    '대본, 영상 과제 피드백',
    '수강생 단톡방',
    '성적우수 리워드 도전',
  ];
  return (
    <Block id="pricing" name="pricing" tone="cream">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <Heading>
            빨리 시작할수록
            <br />
            가격이 낮아요
          </Heading>
          <div className="mt-8 border-t border-sc-outline/15 md:mt-12">
            {plan.tiers.map((t) => (
              <div key={t.name} className="flex items-center justify-between gap-4 border-b border-sc-outline/15 py-5">
                <div>
                  <p className={`text-[17px] font-bold md:text-[19px] ${t.highlight ? 'text-sc-orange' : ''}`}>
                    {t.name}
                    {t.seats && <span className="ml-2 text-[14px] font-semibold">{t.seats}</span>}
                  </p>
                  <p className="mt-0.5 text-[14px] text-sc-outline/55">{t.condition}</p>
                </div>
                <p
                  className={`shrink-0 font-extrabold ${
                    t.highlight ? 'text-[32px] md:text-[38px]' : 'text-[22px] text-sc-outline/50 md:text-[26px]'
                  }`}
                >
                  {t.price}
                </p>
              </div>
            ))}
          </div>
          <Lines
            className="mt-4 text-[13px] leading-relaxed text-sc-outline/50"
            lines={['결제한 날짜 기준으로 가격이 정해져요.', '얼리버드는 10명이 차면 날짜 전이라도 마감돼요.']}
          />
        </div>

        <div className="md:pt-3">
          <Countdown className="mb-6 text-[16px] md:text-[18px]" />
          <p className="text-[15px] font-bold text-sc-outline/55 md:text-[16px]">가격에 모두 포함돼요</p>
          <ul className="mt-4 space-y-3 md:mt-5">
            {includes.map((t) => (
              <li key={t} className="text-[17px] font-semibold text-sc-outline/85 md:text-[20px]">
                {t}
              </li>
            ))}
          </ul>
          <CTA data={data} className="mt-10" />
        </div>
      </div>
    </Block>
  );
}

/* ───────── 11. 안심 (환불) ───────── */
function Refund() {
  return (
    <Block name="refund">
      <Heading>
        1주차 시작 전에는
        <br />
        전액 환불돼요
      </Heading>
      <Lines
        className="mt-6 text-[16px] leading-relaxed text-sc-outline/65 md:text-[18px]"
        lines={['마음이 바뀌어도 괜찮아요.', '시작한 뒤에는 학원법 기준에 따라 아래처럼 환불돼요.']}
      />
      <div className="mt-8 max-w-[720px] border-t border-sc-outline/15">
        {REFUND_TABLE.map((r) => (
          <div key={r.when} className="flex justify-between gap-4 border-b border-sc-outline/15 py-3.5 text-[15px] md:text-[16px]">
            <span className="text-sc-outline/75">{r.when}</span>
            <span className="shrink-0 font-bold">{r.rule}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-sc-outline/45">자세한 내용은 환불규정 전문을 따라요.</p>
    </Block>
  );
}

/* ───────── 12. 자주 묻는 질문 (짧게 끊어 다시 씀) ───────── */
const FAQ_V2: { q: string; a: string[] }[] = [
  {
    q: '직장이나 육아와 같이 할 수 있나요?',
    a: ['네, 그런 분들 기준으로 만들었어요.', '과제는 매주 있지만', '영상 하나 만드는 게 익숙해지면 부담이 크지 않아요.'],
  },
  {
    q: '라이브 시간에 못 들으면요?',
    a: ['괜찮아요.', '다음 날 녹화본을 드려요.', '녹화본을 보고 그대로 따라 하시면 돼요.'],
  },
  {
    q: '얼굴 노출이나 촬영이 필요한가요?',
    a: ['아니요.', '얼굴 없이, 촬영 없이', '제품 영상만으로 진행해요.'],
  },
  {
    q: '데모강의를 못 들었는데 괜찮을까요?',
    a: ['괜찮아요.', '1주차에서 처음부터 다시 짚어 드려요.'],
  },
  {
    q: '4주 끝나고 혼자 계속할 수 있을까요?',
    a: ['네, 그러려고 만든 챌린지예요.', '제품 고르기부터 업로드, 반응 확인까지', '한 바퀴를 직접 돌려 보고 끝나요.'],
  },
];

function Faq() {
  const isExport = useContext(ExportCtx);
  return (
    <Block name="faq">
      <h2 className="text-[22px] font-extrabold md:text-[28px]">자주 묻는 질문</h2>
      <div className="mt-6 divide-y divide-sc-outline/10 border-y border-sc-outline/10 md:mt-10">
        {FAQ_V2.map((f) => (
          <details key={f.q} open={isExport || undefined} className="group py-4 md:py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold md:text-[18px]">
              {f.q}
              <span className="text-xl text-sc-outline/40 transition-transform group-open:rotate-45">+</span>
            </summary>
            <Lines className="mt-3 text-[15px] leading-relaxed text-sc-outline/75 md:text-[16px]" lines={f.a} />
          </details>
        ))}
      </div>
    </Block>
  );
}

/* ───────── 13. 마지막 신청 ───────── */
function BottomCTA({ data }: { data: CourseData }) {
  const early = PRICING_PLANS[data.basics.cohort ?? '2기'].tiers[0];
  return (
    <Block id="signup" name="final-cta" tone="blue">
      <div className="flex flex-col items-center text-center">
        <Heading>
          11월 22일 일요일,
          <br />
          1주차에서 만나요
        </Heading>
        <p className="mt-5 text-[16px] font-semibold text-white/75 md:text-[18px]">
          얼리버드 {early.price}, {early.condition}, {early.seats}
        </p>
        <Countdown className="mt-2 text-[15px] text-white md:text-[17px]" />
        <div className="mt-8 w-full max-w-[440px]">
          <CTA data={data} />
        </div>
        {data.notice.length > 0 && (
          <ul className="mt-10 w-full max-w-[560px] space-y-1.5 text-left text-xs leading-relaxed text-white/55 md:text-[13px]">
            {data.notice.map((n) => (
              <li key={n}>{n.replace(/\s*·\s*/g, ', ')}</li>
            ))}
          </ul>
        )}
      </div>
    </Block>
  );
}

export function ChallengeLandingV2({ data, fixedWidth }: Props) {
  // fixedWidth(= ?export=1) 이면 스마트스토어용: 모바일 폭 그대로, 움직이는 요소와 버튼은 정적으로
  return (
    <ExportCtx.Provider value={!!fixedWidth}>
    <main id="landing-root" className="w-full bg-white">
      <Hero data={data} />
      <PerkStack />
      <HowMoney />
      <Proof />
      <Instructor role="챌린지 진행" />
      <Cohort />
      <CTAStrip data={data} line="1기처럼, 이번엔 직접 해 보세요" />
      <WhyChallenge />
      <Compare />
      <Agent />
      <CTAStrip data={data} line="에이전트는 12월 31일까지 무료예요" />
      <Statement lines={['100점 중 85점은', '꾸준함 점수예요.', '끝까지 올린 사람이 받아요.']} />
      <Reward />
      <FitFor />
      <Curriculum data={data} />
      <Pricing data={data} />
      <Refund />
      <Faq />
      <Mascot />
      <BottomCTA data={data} />
      {!fixedWidth && <Footer />}
      <StickyCTA data={data} buttonClass="bg-[#41649b] hover:bg-[#365584]" widthClass="max-w-[1040px]" />
    </main>
    </ExportCtx.Provider>
  );
}
