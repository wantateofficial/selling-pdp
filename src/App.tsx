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
  { key: 'demo', label: '무료 데모 7/9' },
  { key: 'demo2', label: '무료 데모 7/18' },
  { key: 'challenge', label: '4주 챌린지' },
];

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

  const data = useMemo(() => {
    const src = SOURCES[page];
    return normalizeCourseData(src.md, src.slug);
  }, [page]);

  return (
    <>
      <ContentProtection enabled={!isExport} />
      {!isExport && (
        <div className="no-export sticky top-0 z-50 flex items-center justify-center gap-2 border-b-2 border-sc-outline bg-white px-4 py-2">
          <span className="text-sm font-bold">미리보기:</span>
          {TOGGLE.map((t) => (
            <button
              key={t.key}
              onClick={() => setPage(t.key)}
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
