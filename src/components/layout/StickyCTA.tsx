import { useEffect, useState } from 'react';
import type { CourseData } from '../../types';

/**
 * 하단 고정 CTA 바 (레퍼런스의 고정 가격바 역할).
 * 웹 랜딩 전용 — export(긴 이미지) 시에는 no-export로 숨긴다.
 */
export function StickyCTA({
  data,
  showAfterId,
  buttonClass = 'bg-sc-blue hover:bg-sc-blue-dark',
  widthClass = 'max-w-[840px]',
}: {
  data: CourseData;
  showAfterId?: string;
  /** 버튼 색 (2기 데모는 신청 버튼과 같은 #41649b) */
  buttonClass?: string;
  /** 안쪽 내용 폭 (2기 데모는 본문과 같은 1040px) */
  widthClass?: string;
}) {
  // showAfterId 를 주면, 그 요소(첫 화면 신청폼)가 화면에서 사라진 뒤에만 바를 띄운다.
  const [visible, setVisible] = useState(!showAfterId);
  useEffect(() => {
    if (!showAfterId) return;
    const el = document.getElementById(showAfterId);
    if (!el) return setVisible(true);
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [showAfterId]);
  if (!visible) return null;

  const meta =
    data.pageType === 'demo'
      ? `${data.basics.date ?? ''} ${data.basics.time ?? ''}, ${data.basics.price ?? '무료'}`.trim()
      : data.basics.price || '데모강의 마지막에 가격 공개';

  return (
    <div className="no-export sticky bottom-0 z-40 border-t-2 border-sc-outline bg-white/95 px-5 py-3 backdrop-blur md:px-10">
      <div className={`mx-auto flex w-full ${widthClass} items-center justify-between gap-3`}>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{data.title}</p>
          <p className="truncate text-xs text-sc-outline/60">{meta}</p>
        </div>
        <a
          href={data.links.apply}
          onClick={() => window.clarity?.('event', 'cta_click')}
          className={`shrink-0 rounded-lg border-2 border-sc-outline ${buttonClass} px-5 py-2.5 text-sm font-extrabold text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-pixel-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
        >
          {data.basics.cta} →
        </a>
      </div>
    </div>
  );
}
