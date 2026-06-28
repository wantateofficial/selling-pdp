import type { ReactNode } from 'react';
import { EditMarker } from './EditMarker';

type BgVariant = 'white' | 'cream' | 'gray' | 'blue' | 'outline';

const BG: Record<BgVariant, string> = {
  white: 'bg-white text-sc-outline',
  cream: 'bg-sc-cream text-sc-outline',
  gray: 'bg-sc-gray text-sc-outline',
  blue: 'bg-sc-blue text-white',
  outline: 'bg-sc-outline text-white',
};

interface SectionProps {
  sectionKey: string;
  /** 작은 섹션 라벨 (eyebrow) */
  eyebrow?: string;
  /** 섹션 제목 (수정 프롬프트 라벨로도 사용) */
  title?: string;
  bg?: BgVariant;
  children: ReactNode;
  className?: string;
}

/** 상세페이지 섹션 래퍼. 공통 패딩 + 수정요청 버튼 슬롯. */
export function Section({
  sectionKey,
  eyebrow,
  title,
  bg = 'white',
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      data-section={sectionKey}
      className={`relative px-8 py-14 ${BG[bg]} ${className}`}
    >
      <EditMarker sectionKey={sectionKey} sectionTitle={title || eyebrow || sectionKey} />
      <div className="mx-auto w-full max-w-[840px]">
        {eyebrow && (
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-sc-orange">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mb-7 text-[28px] font-extrabold leading-snug">{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}
