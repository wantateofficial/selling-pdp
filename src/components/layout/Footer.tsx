import { useState, useEffect } from 'react';
import { COMPANY_INFO, POLICIES } from '../../data/legal';

/** 페이지 최하단 푸터 — 전자상거래법 사업자정보 + 필수 정책(환불·개인정보·약관) */
export function Footer() {
  const [open, setOpen] = useState<string | null>(null);

  // 신청 폼의 동의 문구(#policy-terms 등)나 직접 진입 시 해당 정책을 펼치고 스크롤.
  useEffect(() => {
    const openFromHash = () => {
      const m = window.location.hash.match(/^#policy-(\w+)/);
      if (!m) return;
      const id = m[1];
      if (!POLICIES.some((p) => p.id === id)) return;
      setOpen(id);
      requestAnimationFrame(() => {
        document.getElementById(`policy-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <footer className="border-t border-black/10 bg-sc-gray px-6 py-10 text-sc-outline/80">
      <div className="mx-auto w-full max-w-[840px]">
        {/* 정책 아코디언 */}
        <div className="mb-8 divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10 bg-white">
          {POLICIES.map((pol) => {
            const isOpen = open === pol.id;
            return (
              <div key={pol.id} id={`policy-${pol.id}`} className="scroll-mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : pol.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-black/[0.02]"
                >
                  <span className="font-bold">{pol.title}</span>
                  <span
                    className={`text-sc-outline/40 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 px-5 pb-5 text-sm leading-relaxed">
                      <p className="text-xs text-sc-outline/45">최종 개정: {pol.updated}</p>
                      {pol.sections.map((s) => (
                        <div key={s.h}>
                          <p className="font-semibold">{s.h}</p>
                          {s.p.map((line, i) => (
                            <p key={i} className="mt-1 text-sc-outline/70">
                              {line}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 사업자 정보 */}
        <dl className="grid gap-x-6 gap-y-1.5 text-xs leading-relaxed text-sc-outline/60 sm:grid-cols-2">
          {COMPANY_INFO.map((c) => (
            <div key={c.label} className="flex gap-2">
              <dt className="shrink-0 font-semibold text-sc-outline/75">{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs text-sc-outline/45">
          본 페이지의 수치·후기·실적은 사실에 기반하며, 수익이나 구매전환을 보장하지 않습니다.
          <br />© 2026 주식회사 원테이트 (새러데이클럽). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
