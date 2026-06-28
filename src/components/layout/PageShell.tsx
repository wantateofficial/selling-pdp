import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  /** export 시 1000px 고정. 미리보기에서는 반응형 */
  fixedWidth?: boolean;
}

/**
 * 상세페이지 컨테이너.
 * - export 모드: 1000px 고정 (이미지 캡처 기준)
 * - 미리보기: max-w-page 반응형
 */
export function PageShell({ children, fixedWidth = false }: PageShellProps) {
  return (
    <div className="flex justify-center bg-sc-gray">
      <main
        id="landing-root"
        className={fixedWidth ? 'w-[1000px] bg-white' : 'w-full max-w-page bg-white'}
      >
        {children}
      </main>
    </div>
  );
}
