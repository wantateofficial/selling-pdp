import { useState } from 'react';
import type { CourseData } from '../../types';
import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';

interface Props {
  data: CourseData;
}

/** Section 11. FAQ — 클릭하면 펼쳐지는 아코디언 (전환 저해 요소 제거) */
export function FAQSection({ data }: Props) {
  const [open, setOpen] = useState<number | null>(0); // 첫 질문은 기본 펼침

  return (
    <Section sectionKey="faq" eyebrow="FAQ" title="자주 묻는 질문" bg="gray">
      <div className="mb-6 flex justify-center">
        <PixelRobot expression="thinking" size={110} />
      </div>
      <div className="grid gap-3">
        {data.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="sc-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-black/[0.02]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-sc-blue text-sm font-extrabold text-white">
                  Q
                </span>
                <p className="flex-1 font-bold leading-snug">{item.q}</p>
                <span
                  className={`shrink-0 text-sc-outline/40 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>

              {item.a && (
                <div
                  className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex items-start gap-3 px-5 pb-5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-sc-orange text-sm font-extrabold text-white">
                        A
                      </span>
                      <p className="leading-relaxed text-sc-outline/80">{item.a}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
