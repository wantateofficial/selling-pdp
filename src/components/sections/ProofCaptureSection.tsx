import { useState } from 'react';
import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';
import { PROOF_TOP4, PROOF_DISCLAIMER, type ProofItem } from '../../data/company';

/** 세로(9:16) 미디어 — GIF가 있으면 자동재생, 없으면 placeholder */
function ReelMedia({ item }: { item: ProofItem }) {
  const [failed, setFailed] = useState(false);
  const showGif = item.gif && !failed;
  return (
    <div className="relative mx-auto aspect-[9/16] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-black/[0.08] bg-sc-gray shadow-[0_2px_10px_rgba(26,26,36,0.06)] sm:w-[312px]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
        <PixelRobot expression="money" size={48} />
        <span className="text-xs font-bold text-sc-outline/50">영상 준비 중</span>
      </div>
      {showGif && (
        <img
          src={item.gif}
          alt={`${item.name} 쇼핑숏폼`}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}

/** 성과 패널 — 조회수 + 플랫폼별(틱톡/인스타) */
function StatPanel({ item }: { item: ProofItem }) {
  return (
    <div className="flex-1">
      <p className="text-lg font-extrabold">{item.name}</p>
      <p className="mt-1 text-[40px] font-extrabold leading-none text-sc-blue">
        {item.views}
        <span className="ml-1 text-base font-bold text-sc-outline/50">회</span>
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="sc-card bg-sc-gray p-3">
          <p className="text-xs font-bold text-sc-outline/50">틱톡</p>
          <p className="text-base font-extrabold">{item.tiktok}</p>
        </div>
        <div className="sc-card bg-sc-gray p-3">
          <p className="text-xs font-bold text-sc-outline/50">인스타</p>
          <p className="text-base font-extrabold">{item.insta}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Section 07. Real Results — 강사가 직접 만든 쇼핑숏폼 결과.
 * 모바일 고려: 가로 나열 대신 한 번에 하나씩, 좌우 구도를 번갈아 보여준다.
 * 학생 후기는 준비 중 → 실제 제작 실적으로 증명. 외부 채널 링크는 이탈 방지를 위해 두지 않는다.
 */
export function ProofCaptureSection() {
  return (
    <Section
      sectionKey="proof"
      eyebrow="REAL RESULTS"
      title="강사가 직접 만든 쇼핑숏폼 결과"
      bg="white"
    >
      <div className="mb-8 flex items-center gap-3">
        <PixelRobot expression="money" size={64} />
        <p className="font-semibold text-sc-outline/80">
          말로만 가르치지 않습니다. 같은 방식으로 직접 만든 콘텐츠의 실제 조회수예요.
        </p>
      </div>

      <div className="space-y-8">
        {PROOF_TOP4.map((item, i) => (
          <div
            key={item.name}
            className={`flex flex-col items-center gap-5 border-t-2 border-sc-gray pt-8 first:border-t-0 first:pt-0 md:flex-row md:items-center md:gap-8 ${
              i % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <ReelMedia item={item} />
            <StatPanel item={item} />
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-sc-outline/50">{PROOF_DISCLAIMER}</p>
    </Section>
  );
}
