import { useMemo, useState, useEffect } from 'react';
import demoMd from '../content/shopping-shorts-demo.md?raw';
import demo2Md from '../content/shopping-shorts-demo-0718.md?raw';
import challengeMd from '../content/shopping-shorts-challenge.md?raw';
import { normalizeCourseData } from './parser/normalizeCourseData';
import { DemoLanding } from './templates/DemoLanding';
import { ChallengeLanding } from './templates/ChallengeLanding';
import { ContentProtection } from './components/system/ContentProtection';
import type { PageType } from './types';

const SOURCES: Record<PageType, { md: string; slug: string }> = {
  demo: { md: demoMd, slug: 'shopping-shorts-demo' },
  demo2: { md: demo2Md, slug: 'shopping-shorts-demo-0718' },
  challenge: { md: challengeMd, slug: 'shopping-shorts-challenge' },
};

const TOGGLE: { key: PageType; label: string }[] = [
  { key: 'demo', label: '데모1 (7/9)' },
  { key: 'demo2', label: '데모2 (7/18)' },
  { key: 'challenge', label: '4주 챌린지' },
];

// 미리보기 전용 UI(페이지 토글)는 스테이징/개발에서만 노출, 라이브(프로덕션)에선 숨김.
// (프로덕션 빌드는 .env.production 의 VITE_SHOW_EDIT_REQUEST=false)
// → 라이브에선 각 날짜 페이지가 독립적이라 방문자가 다른 날짜로 바꿔치기 못 함.
const PREVIEW_UI = import.meta.env.VITE_SHOW_EDIT_REQUEST !== 'false';

function getInitialPage(): PageType {
  const p = new URLSearchParams(window.location.search).get('page');
  if (p === 'challenge') return 'challenge';
  if (p === 'demo2') return 'demo2';
  return 'demo';
}

export default function App() {
  const [page, setPage] = useState<PageType>(getInitialPage);
  const params = new URLSearchParams(window.location.search);
  const isExport = params.get('export') === '1';

  useEffect(() => {
    if (isExport) document.body.classList.add('exporting');
  }, [isExport]);

  // 뒤로/앞으로 가기 시 URL의 ?page 와 화면을 동기화.
  useEffect(() => {
    const sync = () => setPage(getInitialPage());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // 미리보기 탭 클릭 → URL(?page=)을 바꾸고 화면 전환. (탭이 곧 공유 가능한 주소)
  const goTo = (key: PageType) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', key);
    url.hash = '';
    window.history.pushState({}, '', url);
    setPage(key);
  };

  const data = useMemo(() => {
    const src = SOURCES[page];
    return normalizeCourseData(src.md, src.slug);
  }, [page]);

  return (
    <>
      <ContentProtection enabled={!isExport} />
      {!isExport && PREVIEW_UI && (
        <div className="no-export sticky top-0 z-50 flex items-center justify-center gap-2 border-b-2 border-sc-outline bg-white px-4 py-2">
          <span className="text-sm font-bold">미리보기:</span>
          {TOGGLE.map((t) => (
            <button
              key={t.key}
              onClick={() => goTo(t.key)}
              className={`rounded-md border-2 border-sc-outline px-3 py-1 text-sm font-bold ${
                page === t.key ? 'bg-sc-blue text-white' : 'bg-white text-sc-outline'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {page === 'challenge' ? (
        <ChallengeLanding data={data} fixedWidth={isExport} />
      ) : (
        <DemoLanding data={data} fixedWidth={isExport} />
      )}
    </>
  );
}
