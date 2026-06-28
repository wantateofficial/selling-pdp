import type { ReactNode } from 'react';

/**
 * 섹션당 핵심 한 문장 강조 박스.
 * 레퍼런스의 "노란 강조 박스" 역할을 브랜드 컬러(--sc-orange)로 구현.
 */
export function HighlightBox({ children }: { children: ReactNode }) {
  return (
    <div className="sc-card border-sc-orange bg-sc-orange/10 p-5">
      <p className="text-left text-lg font-extrabold leading-snug text-sc-outline">
        {children}
      </p>
    </div>
  );
}
